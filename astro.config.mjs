// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/** @returns {Record<string, string>} */
function lastmods() {
  /** @type {Record<string, string>} */
  const map = {};
  let newest = '2026-09-08';
  for (const name of readdirSync(join(root, 'src/content/tips'))) {
    if (!name.endsWith('.md')) continue;
    const src = readFileSync(join(root, 'src/content/tips', name), 'utf8');
    const found = src.match(/^last_verified:\s*"?(\d{4}-\d{2}-\d{2})"?/m);
    if (!found) continue;
    const day = found[1];
    map[`/tips/${name.slice(0, -3)}/`] = day;
    if (day > newest) newest = day;
  }
  map['/'] = newest;
  map['/tips/'] = newest;
  map['/about/'] = newest;
  return map;
}

const LASTMOD = lastmods();

export default defineConfig({
  site: 'https://grok-fun.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname;
        const day = LASTMOD[path];
        if (day) item.lastmod = day;
        return item;
      },
    }),
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
