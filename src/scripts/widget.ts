// リアクションとコメントのウィジェット。記事ページでだけ読み込まれる。
// 描画は createElement + textContent のみ。innerHTML は使わない（本文は生のまま保存されている）。
// /api/* が失敗したら劣化表示（静的 HTML の初期状態）のままにする。記事本文には影響しない。

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
  getResponse: (id?: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onloadTurnstileCallback?: () => void;
  }
}

interface Reaction {
  emoji: string;
  count: number;
}
interface Comment {
  id: number;
  nickname: string;
  body: string;
  created_at: string;
}
interface ApiError {
  error?: string;
  message?: string;
}

const SLUG_RE = /^[a-z0-9][a-z0-9/-]{0,120}$/;
const OFFLINE = 'いま反応を受け付けていません';
const COMMENTS_OFFLINE = 'いま反応を受け付けていません。記事の内容には影響ありません。';
const COMMENTS_STOPPED = 'コメントは現在停止中です。';
const COMMENTS_PENDING = 'コメントの投稿はまだ準備中です。リアクションは使えます。';

// Turnstile の api.js は defer で後から動く。onload コールバックはこの時点で用意しておく
const turnstileLoaded = new Promise<void>((resolve) => {
  if (window.turnstile) {
    resolve();
    return;
  }
  window.onloadTurnstileCallback = () => resolve();
  window.setTimeout(resolve, 10_000);
});

const slug = location.pathname.replace(/^\/+|\/+$/g, '');
const reactionsRoot = document.querySelector<HTMLElement>('[data-reactions]');
const commentsRoot = document.querySelector<HTMLElement>('[data-comments]');

if (SLUG_RE.test(slug)) {
  if (reactionsRoot) void initReactions(reactionsRoot);
  if (commentsRoot) void initComments(commentsRoot);
}

// ---------------------------------------------------------------- fetch

async function api<T>(path: string, init?: RequestInit): Promise<{ ok: true; status: number; data: T } | { ok: false; status: number; data: ApiError | null }> {
  try {
    const res = await fetch(path, {
      credentials: 'same-origin',
      headers: { accept: 'application/json', ...(init?.body ? { 'content-type': 'application/json' } : {}) },
      ...init,
    });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    if (res.ok) return { ok: true, status: res.status, data: data as T };
    return { ok: false, status: res.status, data: data as ApiError | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

// ---------------------------------------------------------------- reactions

const REACTED_KEY = `grok-fun:reacted:${slug}`;

function readReacted(): Set<string> {
  try {
    const raw = localStorage.getItem(REACTED_KEY);
    const list: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list.filter((v): v is string => typeof v === 'string') : []);
  } catch {
    return new Set();
  }
}

function saveReacted(set: Set<string>): void {
  try {
    localStorage.setItem(REACTED_KEY, JSON.stringify([...set]));
  } catch {
    // プライベートモードなどで保存できなくても動作は続ける
  }
}

async function initReactions(root: HTMLElement): Promise<void> {
  const chips = [...root.querySelectorAll<HTMLButtonElement>('button[data-emoji]')];
  const note = root.querySelector<HTMLElement>('[data-reactions-note]');
  const reacted = readReacted();

  const degrade = (): void => {
    root.classList.add('is-offline');
    for (const chip of chips) {
      chip.disabled = true;
      const count = chip.querySelector<HTMLElement>('[data-count]');
      if (count) count.textContent = '';
    }
    if (note) note.textContent = OFFLINE;
  };

  const res = await api<{ reactions: Reaction[] }>(`/api/reactions?slug=${encodeURIComponent(slug)}`);
  if (!res.ok || !Array.isArray(res.data.reactions)) {
    degrade();
    return;
  }

  const counts = new Map(res.data.reactions.map((r) => [r.emoji, r.count]));
  root.classList.remove('is-offline');
  if (note) note.textContent = '';

  for (const chip of chips) {
    const emoji = chip.dataset.emoji ?? '';
    const countEl = chip.querySelector<HTMLElement>('[data-count]');
    const setCount = (n: number): void => {
      if (countEl) countEl.textContent = String(n);
    };
    setCount(counts.get(emoji) ?? 0);
    chip.disabled = false;
    chip.setAttribute('aria-pressed', reacted.has(emoji) ? 'true' : 'false');

    chip.addEventListener('click', async () => {
      if (reacted.has(emoji) || chip.disabled) return;
      const before = counts.get(emoji) ?? 0;
      // 楽観的に +1
      reacted.add(emoji);
      saveReacted(reacted);
      chip.setAttribute('aria-pressed', 'true');
      setCount(before + 1);

      const post = await api<{ emoji: string; count: number }>('/api/reactions', {
        method: 'POST',
        body: JSON.stringify({ slug, emoji }),
      });
      if (post.ok && typeof post.data.count === 'number') {
        counts.set(emoji, post.data.count);
        setCount(post.data.count);
        return;
      }
      // 失敗したら戻して劣化表示へ
      reacted.delete(emoji);
      saveReacted(reacted);
      chip.setAttribute('aria-pressed', 'false');
      setCount(before);
      degrade();
    });
  }
}

// ---------------------------------------------------------------- comments

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number): string => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

interface CommentsContext {
  siteKey: string;
  turnstile: TurnstileApi | null;
}

function renderComment(c: Comment, ctx: CommentsContext): HTMLLIElement {
  const li = el('li', 'comment');
  li.dataset.id = String(c.id);

  const head = el('div', 'comment-head');
  head.appendChild(el('span', 'comment-nickname', c.nickname || '匿名'));
  head.appendChild(el('span', 'comment-sep', ' · '));
  const time = el('time', 'comment-date', formatDate(c.created_at));
  time.dateTime = c.created_at;
  head.appendChild(time);

  const report = el('button', 'comment-report', '通報');
  report.type = 'button';
  report.addEventListener('click', () => void startReport(li, c.id, report, ctx));
  head.appendChild(report);

  li.appendChild(head);
  li.appendChild(el('p', 'comment-body', c.body));
  return li;
}

async function startReport(li: HTMLLIElement, id: number, button: HTMLButtonElement, ctx: CommentsContext): Promise<void> {
  const existing = li.querySelector<HTMLElement>('.comment-report-box');
  if (existing) return;
  button.disabled = true;

  const box = el('div', 'comment-report-box');
  const status = el('p', 'comment-report-status');
  box.appendChild(status);
  li.appendChild(box);

  if (!ctx.turnstile || !ctx.siteKey) {
    status.textContent = '通報はまだ準備中です。';
    return;
  }

  status.textContent = '確認のあと通報を送ります。';
  const holder = el('div', 'turnstile');
  box.appendChild(holder);

  let widgetId: string | null = null;
  const cleanup = (): void => {
    if (widgetId && ctx.turnstile) {
      try {
        ctx.turnstile.remove(widgetId);
      } catch {
        // すでに消えていても無視
      }
    }
    holder.remove();
  };

  try {
    widgetId = ctx.turnstile.render(holder, {
      sitekey: ctx.siteKey,
      theme: 'light',
      language: 'ja',
      callback: async (token: string) => {
        const res = await api<{ reported: boolean; hidden: boolean }>('/api/reports', {
          method: 'POST',
          body: JSON.stringify({ comment_id: id, turnstile_token: token }),
        });
        cleanup();
        if (res.ok) {
          status.textContent = res.data.hidden ? '通報を受け付けました。このコメントは非表示になりました。' : '通報を受け付けました。';
          if (res.data.hidden) li.querySelector('.comment-body')?.remove();
          return;
        }
        status.textContent = res.status === 503 && res.data?.error === 'comments_disabled' ? COMMENTS_STOPPED : '通報できませんでした。時間をおいて再度お試しください。';
        button.disabled = false;
      },
      'error-callback': () => {
        cleanup();
        status.textContent = '確認に失敗しました。ページを再読み込みしてください。';
        button.disabled = false;
      },
    });
  } catch {
    cleanup();
    status.textContent = '通報できませんでした。';
    button.disabled = false;
  }
}

async function initComments(root: HTMLElement): Promise<void> {
  const heading = root.querySelector<HTMLElement>('[data-comments-heading]');
  const statusEl = root.querySelector<HTMLElement>('[data-comments-status]');
  const list = root.querySelector<HTMLOListElement>('[data-comment-list]');
  const form = root.querySelector<HTMLFormElement>('[data-comment-form]');
  const pending = root.querySelector<HTMLElement>('[data-comments-pending]');
  const siteKey = root.dataset.sitekey ?? '';
  if (!list) return;

  const setStatus = (text: string): void => {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.hidden = text.length === 0;
  };

  const res = await api<{ comments: Comment[]; count: number; disabled?: boolean }>(`/api/comments?slug=${encodeURIComponent(slug)}`);
  if (!res.ok || !Array.isArray(res.data.comments)) {
    setStatus(COMMENTS_OFFLINE);
    return;
  }

  if (res.data.disabled) {
    setStatus(COMMENTS_STOPPED);
    return;
  }

  const ctx: CommentsContext = { siteKey, turnstile: null };
  const count = typeof res.data.count === 'number' ? res.data.count : res.data.comments.length;
  if (heading) heading.textContent = `コメント ${count} 件`;

  list.replaceChildren(...res.data.comments.map((c) => renderComment(c, ctx)));
  setStatus(res.data.comments.length === 0 ? 'まだコメントはありません。' : '');

  if (!form || !siteKey) {
    if (pending) {
      pending.textContent = COMMENTS_PENDING;
      pending.hidden = false;
    }
    return;
  }

  form.hidden = false;
  await turnstileLoaded;
  ctx.turnstile = window.turnstile ?? null;
  setupForm(form, list, heading, ctx, count, setStatus);
}

function setupForm(
  form: HTMLFormElement,
  list: HTMLOListElement,
  heading: HTMLElement | null,
  ctx: CommentsContext,
  initialCount: number,
  setStatus: (text: string) => void,
): void {
  let count = initialCount;
  const bodyEl = form.querySelector<HTMLTextAreaElement>('textarea[name="body"]');
  const nicknameEl = form.querySelector<HTMLInputElement>('input[name="nickname"]');
  const counter = form.querySelector<HTMLElement>('[data-counter]');
  const errorEl = form.querySelector<HTMLElement>('[data-error]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const holder = form.querySelector<HTMLElement>('[data-turnstile]');
  if (!bodyEl || !submit) return;

  const showError = (text: string): void => {
    if (!errorEl) return;
    errorEl.textContent = text;
    errorEl.hidden = text.length === 0;
  };

  const updateCounter = (): void => {
    const n = [...bodyEl.value].length;
    if (counter) {
      counter.textContent = `${n} / 500`;
      counter.classList.toggle('is-near-limit', n > 480);
    }
  };
  bodyEl.addEventListener('input', updateCounter);
  updateCounter();

  let widgetId: string | null = null;
  if (ctx.turnstile && holder) {
    try {
      widgetId = ctx.turnstile.render(holder, { sitekey: ctx.siteKey, theme: 'light', language: 'ja' });
    } catch {
      widgetId = null;
    }
  }
  if (!widgetId) {
    showError('確認ウィジェットを読み込めませんでした。ページを再読み込みしてください。');
    submit.disabled = true;
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    showError('');
    const body = bodyEl.value.trim();
    if (body.length === 0) {
      showError('本文を入力してください。');
      bodyEl.focus();
      return;
    }
    const token = ctx.turnstile?.getResponse(widgetId ?? undefined) ?? '';
    if (!token) {
      showError('確認が終わるまで少しお待ちください。');
      return;
    }

    submit.disabled = true;
    const label = submit.textContent;
    submit.textContent = '送信中…';

    const res = await api<Comment>('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ slug, nickname: nicknameEl?.value ?? '', body, turnstile_token: token }),
    });

    submit.disabled = false;
    submit.textContent = label;
    try {
      ctx.turnstile?.reset(widgetId ?? undefined);
    } catch {
      // 無視
    }

    if (res.ok) {
      if (typeof res.data?.id !== 'number') {
        showError('投稿できませんでした。時間をおいて再度お試しください。');
        return;
      }
      bodyEl.value = '';
      if (nicknameEl) nicknameEl.value = '';
      updateCounter();
      const item = renderComment(res.data, ctx);
      item.classList.add('is-new');
      list.prepend(item);
      window.setTimeout(() => item.classList.remove('is-new'), 2000);
      count += 1;
      if (heading) heading.textContent = `コメント ${count} 件`;
      setStatus('');
      return;
    }

    const code = res.data?.error ?? '';
    if (res.status === 403) showError('確認に失敗しました。ページを再読み込みしてください。');
    else if (res.status === 429) showError('投稿の間隔が短すぎます。1 分ほど待ってから再度お試しください。');
    else if (res.status === 400 && code === 'blocked') showError('この内容は投稿できません。');
    else if (res.status === 400 && res.data?.message) showError(res.data.message);
    else if (res.status === 503 && code === 'comments_disabled') showError(COMMENTS_STOPPED);
    else if (res.status === 503 && code === 'turnstile_not_configured') showError(COMMENTS_PENDING);
    else showError('投稿できませんでした。時間をおいて再度お試しください。');
  });
}

export {};
