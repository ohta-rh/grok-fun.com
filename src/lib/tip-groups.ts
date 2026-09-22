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

export const CHAT_BLURB: Record<string, string> = {
  'three-entrances': 'どこから入るか',
  'free-vs-supergrok': '無料で足りるか、払うか',
  'expert-and-heavy': 'チャットの Heavy と、払う Heavy',
  'japanese-fix': '日本語がおかしい時に直す',
};

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
