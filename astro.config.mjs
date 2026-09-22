// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { labelTableCells } from './scripts/label-tables.mjs';
import { enhanceHeroImages } from './scripts/enhance-heroes.mjs';

const root = dirname(fileURLToPath(import.meta.url));

/**
 * @param {string} dir
 * @param {string[]} out
 */
function walkMd(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkMd(p, out);
    else if (ent.name.endsWith('.md')) out.push(p);
  }
  return out;
}

/**
 * @param {string} file
 */
function verifiedDay(file) {
  const src = readFileSync(file, 'utf8');
  return src.match(/^last_verified:\s*"?(\d{4}-\d{2}-\d{2})"?/m)?.[1] ?? '';
}

/** @returns {Record<string, string>} */
function lastmods() {
  /** @type {Record<string, string>} */
  const map = {};
  let newestTip = '2026-09-08';
  const tipsDir = join(root, 'src/content/tips');
  for (const file of walkMd(tipsDir)) {
    const day = verifiedDay(file);
    if (!day) continue;
    const id = file.slice(tipsDir.length + 1, -3);
    map[`/tips/${id}/`] = day;
    if (day > newestTip) newestTip = day;
  }
  let newestNews = '';
  const newsDir = join(root, 'src/content/news');
  for (const file of walkMd(newsDir)) {
    const day = verifiedDay(file);
    if (!day) continue;
    const id = file.slice(newsDir.length + 1, -3);
    map[`/news/${id}/`] = day;
    if (day > newestNews) newestNews = day;
  }
  const newest = newestNews > newestTip ? newestNews : newestTip;
  map['/'] = newest;
  map['/tips/'] = newestTip;
  map['/news/'] = newestNews || newestTip;
  map['/about/'] = newest;
  return map;
}

const LASTMOD = lastmods();

/**
 * @param {string} dir
 * @param {string[]} out
 */
function walkHtml(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, out);
    else if (ent.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default defineConfig({
  site: 'https://grok-fun.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const day = LASTMOD[path];
        if (day) item.lastmod = day;
        return item;
      },
    }),
    {
      name: 'table-labels',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const rootDir = fileURLToPath(dir);
          for (const file of walkHtml(rootDir)) {
            const src = readFileSync(file, 'utf8');
            const next = enhanceHeroImages(labelTableCells(src));
            if (next !== src) writeFileSync(file, next);
          }
        },
      },
    },
  ],
  markdown: {
    // Shiki は style 属性をインラインで吐く。CSP style-src 'self' と衝突するので切る
    syntaxHighlight: false,
  },
  build: {
    // CSP は style-src 'self'。小さな CSS を <style> にインライン化させない
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // CSP は script-src 'self'。小さな <script>（GTM ローダー）を inline 化させず外部 JS にする
      assetsInlineLimit: 0,
    },
  },
});
