// grok-fun.com Worker。/api/* だけを処理する。静的配信は Static Assets が先に返す（run_worker_first: false）。
// D1 が落ちても 503 を返すだけで、記事の表示には影響しない。
import blocklistRaw from '../moderation/blocklist.txt';

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY?: string;
  IP_HASH_SALT?: string;
  COMMENTS_DISABLED?: string;
}

const EMOJIS = ['👍', '🔥', '🤔', '📌', '😂'] as const;
const SLUG_RE = /^[a-z0-9][a-z0-9/-]{0,120}$/;
const BODY_MAX = 500;
const NICKNAME_MAX = 24;
const COMMENT_LIMIT = 50;
const DUPLICATE_WINDOW_SEC = 60;
const REPORT_THRESHOLD = 3;
const RETENTION_DAYS = 90;
const MAX_JSON_BYTES = 8192;
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const OFFLINE_MESSAGE = 'いま反応を受け付けていません';

const BLOCKLIST: string[] = blocklistRaw
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'))
  .map((line) => line.toLowerCase());

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (url.pathname === '/api/reactions') return handleReactions(req, env, url);
    if (url.pathname === '/api/comments') return handleComments(req, env, url);
    if (url.pathname === '/api/reports') return handleReports(req, env);
    if (url.pathname.startsWith('/api/')) return json({ error: 'not_found', message: 'そのエンドポイントはありません' }, 404);
    // Static Assets に無かったパス。404.html を返す
    return env.ASSETS.fetch(req);
  },

  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    ctx.waitUntil(purgeOld(env));
  },
} satisfies ExportedHandler<Env>;

// ---------------------------------------------------------------- helpers

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow',
    },
  });
}

function dbUnavailable(): Response {
  return json({ error: 'db_unavailable', message: OFFLINE_MESSAGE }, 503);
}

function isCommentsDisabled(env: Env): boolean {
  return env.COMMENTS_DISABLED === '1';
}

function commentsDisabled(): Response {
  return json({ error: 'comments_disabled', message: 'コメントは現在停止中です' }, 503);
}

async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  const length = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(length) && length > MAX_JSON_BYTES) return null;
  try {
    const text = await req.text();
    if (text.length > MAX_JSON_BYTES) return null;
    const parsed: unknown = JSON.parse(text);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function validSlug(value: unknown): value is string {
  return typeof value === 'string' && SLUG_RE.test(value);
}

function clientIp(req: Request): string {
  return req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '0.0.0.0';
}

// SHA-256(salt:ip) の先頭 16 バイトを hex で（32 文字）
async function ipHash(env: Env, ip: string): Promise<string> {
  const salt = env.IP_HASH_SALT ?? '';
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  return Array.from(new Uint8Array(digest).slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function isBlocked(...texts: string[]): boolean {
  if (BLOCKLIST.length === 0) return false;
  const haystack = texts.join('\n').toLowerCase();
  return BLOCKLIST.some((pattern) => haystack.includes(pattern));
}

// Turnstile siteverify。ok=false は検証失敗（403）、reachable=false は到達不能（503）
async function verifyTurnstile(env: Env, token: unknown, ip: string): Promise<{ ok: boolean; reachable: boolean }> {
  if (typeof token !== 'string' || token.length === 0 || token.length > 4096) return { ok: false, reachable: true };
  const form = new URLSearchParams();
  form.set('secret', env.TURNSTILE_SECRET_KEY ?? '');
  form.set('response', token);
  form.set('remoteip', ip);
  try {
    const res = await fetch(SITEVERIFY_URL, { method: 'POST', body: form });
    if (!res.ok) return { ok: false, reachable: false };
    const data = (await res.json()) as { success?: boolean };
    return { ok: data.success === true, reachable: true };
  } catch {
    return { ok: false, reachable: false };
  }
}


// ---------------------------------------------------------------- reactions

async function handleReactions(req: Request, env: Env, url: URL): Promise<Response> {
  if (req.method === 'GET') {
    const slug = url.searchParams.get('slug');
    if (!validSlug(slug)) return json({ error: 'bad_slug', message: 'slug が不正です' }, 400);
    try {
      const { results } = await env.DB.prepare('SELECT emoji, count FROM reactions WHERE slug = ?')
        .bind(slug)
        .all<{ emoji: string; count: number }>();
      const counts = new Map(results.map((r) => [r.emoji, r.count]));
      return json({ slug, reactions: EMOJIS.map((emoji) => ({ emoji, count: counts.get(emoji) ?? 0 })) });
    } catch (e) {
      console.error('reactions GET', e);
      return dbUnavailable();
    }
  }

  if (req.method === 'POST') {
    const body = await readJson(req);
    if (!body) return json({ error: 'bad_request', message: 'リクエストの形式が不正です' }, 400);
    const { slug, emoji } = body;
    if (!validSlug(slug)) return json({ error: 'bad_slug', message: 'slug が不正です' }, 400);
    if (typeof emoji !== 'string' || !(EMOJIS as readonly string[]).includes(emoji)) {
      return json({ error: 'bad_emoji', message: 'その絵文字は使えません' }, 400);
    }
    try {
      const row = await env.DB.prepare(
        'INSERT INTO reactions (slug, emoji, count) VALUES (?, ?, 1) ON CONFLICT(slug, emoji) DO UPDATE SET count = count + 1 RETURNING count',
      )
        .bind(slug, emoji)
        .first<{ count: number }>();
      return json({ emoji, count: row?.count ?? 1 });
    } catch (e) {
      console.error('reactions POST', e);
      return dbUnavailable();
    }
  }

  return json({ error: 'method_not_allowed', message: 'そのメソッドは使えません' }, 405);
}

// ---------------------------------------------------------------- comments

interface CommentRow {
  id: number;
  nickname: string;
  body: string;
  created_at: string;
}

async function handleComments(req: Request, env: Env, url: URL): Promise<Response> {
  if (req.method === 'GET') {
    const slug = url.searchParams.get('slug');
    if (!validSlug(slug)) return json({ error: 'bad_slug', message: 'slug が不正です' }, 400);
    if (isCommentsDisabled(env)) return json({ slug, comments: [], count: 0, disabled: true });
    try {
      const [list, total] = await env.DB.batch([
        env.DB.prepare(
          'SELECT id, nickname, body, created_at FROM comments WHERE slug = ? AND hidden = 0 ORDER BY created_at DESC, id DESC LIMIT ?',
        ).bind(slug, COMMENT_LIMIT),
        env.DB.prepare('SELECT COUNT(*) AS n FROM comments WHERE slug = ? AND hidden = 0').bind(slug),
      ]);
      const comments = (list.results ?? []) as unknown as CommentRow[];
      const count = ((total.results?.[0] as { n?: number } | undefined)?.n) ?? comments.length;
      return json({ slug, comments, count, disabled: false });
    } catch (e) {
      console.error('comments GET', e);
      return dbUnavailable();
    }
  }

  if (req.method === 'POST') {
    if (isCommentsDisabled(env)) return commentsDisabled();
    if (!env.TURNSTILE_SECRET_KEY) {
      return json({ error: 'turnstile_not_configured', message: 'コメントの投稿はまだ準備中です' }, 503);
    }
    const body = await readJson(req);
    if (!body) return json({ error: 'bad_request', message: 'リクエストの形式が不正です' }, 400);

    const slug = body.slug;
    if (!validSlug(slug)) return json({ error: 'bad_slug', message: 'slug が不正です' }, 400);

    const text = typeof body.body === 'string' ? body.body.replace(/\r\n/g, '\n').trim() : '';
    if (text.length === 0) return json({ error: 'empty_body', message: '本文を入力してください' }, 400);
    if ([...text].length > BODY_MAX) return json({ error: 'body_too_long', message: `本文は ${BODY_MAX} 文字までです` }, 400);

    const rawNickname = typeof body.nickname === 'string' ? body.nickname.trim() : '';
    if ([...rawNickname].length > NICKNAME_MAX) {
      return json({ error: 'nickname_too_long', message: `ニックネームは ${NICKNAME_MAX} 文字までです` }, 400);
    }
    const nickname = rawNickname.length === 0 ? '匿名' : rawNickname;

    if (isBlocked(text, nickname)) return json({ error: 'blocked', message: 'この内容は投稿できません' }, 400);

    const ip = clientIp(req);
    const verified = await verifyTurnstile(env, body.turnstile_token, ip);
    if (!verified.reachable) return json({ error: 'turnstile_unreachable', message: '確認サービスに接続できませんでした' }, 503);
    if (!verified.ok) return json({ error: 'turnstile_failed', message: '確認に失敗しました。ページを再読み込みしてください' }, 403);

    const hash = await ipHash(env, ip);
    try {
      const recent = await env.DB.prepare(
        `SELECT 1 AS hit FROM comments WHERE slug = ? AND ip_hash = ? AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ?) LIMIT 1`,
      )
        .bind(slug, hash, `-${DUPLICATE_WINDOW_SEC} seconds`)
        .first<{ hit: number }>();
      if (recent) return json({ error: 'too_soon', message: '投稿の間隔が短すぎます。少し待ってから再度お試しください' }, 429);

      const row = await env.DB.prepare(
        'INSERT INTO comments (slug, nickname, body, ip_hash) VALUES (?, ?, ?, ?) RETURNING id, nickname, body, created_at',
      )
        .bind(slug, nickname, text, hash)
        .first<CommentRow>();
      if (!row) return dbUnavailable();
      return json(row, 201);
    } catch (e) {
      console.error('comments POST', e);
      return dbUnavailable();
    }
  }

  return json({ error: 'method_not_allowed', message: 'そのメソッドは使えません' }, 405);
}

// ---------------------------------------------------------------- reports

async function handleReports(req: Request, env: Env): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed', message: 'そのメソッドは使えません' }, 405);
  if (isCommentsDisabled(env)) return commentsDisabled();
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ error: 'turnstile_not_configured', message: '通報はまだ準備中です' }, 503);
  }
  const body = await readJson(req);
  if (!body) return json({ error: 'bad_request', message: 'リクエストの形式が不正です' }, 400);

  const commentId = body.comment_id;
  if (typeof commentId !== 'number' || !Number.isInteger(commentId) || commentId <= 0) {
    return json({ error: 'bad_comment_id', message: 'comment_id が不正です' }, 400);
  }

  const ip = clientIp(req);
  const verified = await verifyTurnstile(env, body.turnstile_token, ip);
  if (!verified.reachable) return json({ error: 'turnstile_unreachable', message: '確認サービスに接続できませんでした' }, 503);
  if (!verified.ok) return json({ error: 'turnstile_failed', message: '確認に失敗しました。ページを再読み込みしてください' }, 403);

  const hash = await ipHash(env, ip);
  try {
    const exists = await env.DB.prepare('SELECT hidden FROM comments WHERE id = ?').bind(commentId).first<{ hidden: number }>();
    if (!exists) return json({ error: 'not_found', message: 'そのコメントはありません' }, 404);

    await env.DB.prepare('INSERT OR IGNORE INTO reports (comment_id, ip_hash) VALUES (?, ?)').bind(commentId, hash).run();
    const counted = await env.DB.prepare('SELECT COUNT(DISTINCT ip_hash) AS n FROM reports WHERE comment_id = ?')
      .bind(commentId)
      .first<{ n: number }>();
    const n = counted?.n ?? 0;
    let hidden = exists.hidden === 1;
    if (!hidden && n >= REPORT_THRESHOLD) {
      await env.DB.prepare('UPDATE comments SET hidden = 1 WHERE id = ?').bind(commentId).run();
      hidden = true;
    }
    return json({ reported: true, hidden });
  } catch (e) {
    console.error('reports POST', e);
    return dbUnavailable();
  }
}

// ---------------------------------------------------------------- cron

async function purgeOld(env: Env): Promise<void> {
  const cutoff = `-${RETENTION_DAYS} days`;
  try {
    const results = await env.DB.batch([
      env.DB.prepare(`DELETE FROM reports WHERE created_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ?)`).bind(cutoff),
      env.DB.prepare(`DELETE FROM comments WHERE created_at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', ?)`).bind(cutoff),
    ]);
    console.log('purge', { reports: results[0]?.meta?.changes ?? 0, comments: results[1]?.meta?.changes ?? 0 });
  } catch (e) {
    console.error('purge failed', e);
  }
}
