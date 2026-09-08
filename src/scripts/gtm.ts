// Google Tag Manager loader. インライン snippet の代わりに、Astro がこのファイルを外部 JS にバンドルする。
// CSP: script-src に https://www.googletagmanager.com を許可（public/_headers）。
const GTM_ID = 'GTM-NQMPJ2FS';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

const s = document.createElement('script');
s.async = true;
s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
document.head.appendChild(s);

export {};
