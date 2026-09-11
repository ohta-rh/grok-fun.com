/** 閲覧時点の日付（Asia/Tokyo）で 60 日超なら古さの表示を出す。 */

export function daysSinceVerified(lastVerified: string, now = Date.now()): number {
  const start = new Date(`${lastVerified}T00:00:00+09:00`).getTime();
  if (Number.isNaN(start)) return 0;
  const tokyo = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(now));
  const today = new Date(`${tokyo}T00:00:00+09:00`).getTime();
  return Math.floor((today - start) / 86400000);
}

if (typeof document !== 'undefined') {
  for (const el of document.querySelectorAll<HTMLElement>('[data-last-verified]')) {
    const day = el.dataset.lastVerified ?? '';
    if (daysSinceVerified(day) > 60) el.hidden = false;
  }
}
