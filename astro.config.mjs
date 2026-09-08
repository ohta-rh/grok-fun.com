// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://grok-fun.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
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
