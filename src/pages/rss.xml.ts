import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const tips = (await getCollection('tips')).sort((a, b) => b.data.order - a.data.order);
  const site = context.site;
  if (!site) throw new Error('astro.config の site が無いと RSS を出せません');
  const self = new URL('rss.xml', site).href;
  return rss({
    title: 'Grok JP の TIPS',
    description: 'Grok を日本語で使うときの短い実用メモ。新しいものから並べています。',
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>ja</language><atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
    items: tips.map((t) => ({
      title: t.data.title,
      description: t.data.description,
      pubDate: new Date(`${t.data.last_verified}T00:00:00+09:00`),
      link: `/tips/${t.id}/`,
      categories: [t.data.product],
    })),
  });
}
