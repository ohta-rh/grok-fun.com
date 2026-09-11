/** 貼るためのコードブロックにコピーボタンを付ける。JS が無いときは何も出さない。 */

function wire(pre: HTMLPreElement): void {
  const code = pre.querySelector(':scope > code');
  if (!code || pre.querySelector('.copy-btn')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy-btn';
  btn.textContent = 'コピー';

  const live = document.createElement('span');
  live.className = 'visually-hidden';
  live.setAttribute('aria-live', 'polite');

  const reset = (): void => {
    btn.textContent = 'コピー';
    live.textContent = '';
  };

  btn.addEventListener('click', async () => {
    const text = code.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'コピーしました';
      live.textContent = 'コピーしました';
      window.setTimeout(reset, 2000);
    } catch {
      btn.remove();
      live.remove();
    }
  });

  pre.prepend(btn, live);
}

for (const pre of document.querySelectorAll<HTMLPreElement>('article pre')) {
  wire(pre);
}
