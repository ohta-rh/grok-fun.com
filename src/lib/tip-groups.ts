import type { CollectionEntry } from 'astro:content';

export const PRODUCT_LABEL: Record<string, string> = {
  chat: 'チャット',
  imagine: 'Imagine',
  bot: 'Bot',
  automations: 'Automations',
  series: 'まとめ',
  build: 'Build',
  voice: 'Voice',
  api: 'API',
};

/** Products with zero TIPS are omitted. series is not folded into bot. */
const GROUP_ORDER = ['chat', 'imagine', 'bot', 'automations', 'series'] as const;

export const CHAT_READING_ORDER = [
  'three-entrances',
  'free-vs-supergrok',
  'expert-and-heavy',
  'japanese-fix',
] as const;

/** One line for the home map. The full titles live on /tips/. */
export const GROUP_BLURB: Record<string, string> = {
  chat: '入口、払い方、チャットで選ぶ Heavy と Expert mode。',
  imagine: '1 枚目の出し方と、動画にする順番。',
  bot: 'クラウドのコンピュータ、重い仕事、役を分けた並べ方。',
  automations: '決めた時刻に、チャットの仕事を走らせる。',
  series: 'チャット、Grok Bot、Grok Build は別の道具。',
};

export const CHAT_BLURB: Record<string, string> = {
  'three-entrances': 'どこから入るか',
  'free-vs-supergrok': '無料で足りるか、払うか',
  'expert-and-heavy': 'チャットの Heavy と、払う Heavy',
  'japanese-fix': '日本語がおかしい時に直す',
};

/** Days after `published` that a TIPS stays in the NEW block. Fact-check dates do not count. */
export const NEW_TIP_DAYS = 14;

export function todayJst(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function isNewTip(published: string | undefined, today = todayJst()): boolean {
  if (!published) return false;
  if (published > today) return false;
  const start = Date.parse(`${published}T00:00:00+09:00`);
  const end = Date.parse(`${today}T00:00:00+09:00`);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  const days = Math.round((end - start) / 86_400_000);
  return days >= 0 && days <= NEW_TIP_DAYS;
}

export function newTips(tips: CollectionEntry<'tips'>[], today = todayJst()) {
  return tips
    .filter((tip) => isNewTip(tip.data.published, today))
    .sort((a, b) => (b.data.published ?? '').localeCompare(a.data.published ?? ''));
}

export function groupTips(tips: CollectionEntry<'tips'>[]) {
  const byProduct = new Map<string, CollectionEntry<'tips'>[]>();
  for (const tip of tips) {
    const list = byProduct.get(tip.data.product) ?? [];
    list.push(tip);
    byProduct.set(tip.data.product, list);
  }
  const groups = [];
  for (const product of GROUP_ORDER) {
    const items = byProduct.get(product);
    if (!items?.length) continue;
    items.sort((a, b) => {
      if (product === 'chat') {
        const ia = CHAT_READING_ORDER.indexOf(a.id as (typeof CHAT_READING_ORDER)[number]);
        const ib = CHAT_READING_ORDER.indexOf(b.id as (typeof CHAT_READING_ORDER)[number]);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      }
      return a.data.order - b.data.order;
    });
    groups.push({
      product,
      label: PRODUCT_LABEL[product] ?? product,
      items,
    });
  }
  return groups;
}
