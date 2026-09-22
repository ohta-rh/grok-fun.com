import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const tips = await getCollection('tips');
  const news = await getCollection('news');
  const site = context.site;
  if (!site) throw new Error('astro.config の site が無いと RSS を出せません');
  const self = new URL('rss.xml', site).href;
  const items = [
    ...news.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: new Date(`${n.data.published}T00:00:00+09:00`),
      link: `/news/${n.id}/`,
      categories: ['news'],
    })),
    ...tips.map((t) => ({
      title: t.data.title,
      description: t.data.description,
      pubDate: new Date(`${t.data.last_verified}T00:00:00+09:00`),
      link: `/tips/${t.id}/`,
      categories: [t.data.product],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  return rss({
    title: 'Grok JP',
    description: 'TIPS と、大きな発表の日のメモです。新しいものから並べています。',
    site,
    trailingSlash: true,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>ja</language><atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
    items,
  });
}
