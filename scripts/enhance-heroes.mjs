/** Add srcset, lazy, and a zoom link on article figures. */

/**
 * @param {string} html
 * @returns {string}
 */
export function enhanceHeroImages(html) {
  let seen = 0;
  return html.replace(/<figure class="article-hero">([\s\S]*?)<\/figure>/gi, (figure) => {
    return figure.replace(/<img\b([^>]*)>/i, (img, attrs) => {
      if (/\bsrcset=/.test(attrs)) {
        seen += 1;
        return img;
      }
      const src = /\bsrc="([^"]+)"/.exec(attrs)?.[1];
      if (!src || !src.startsWith('/tips/')) return img;
      const stem = src.replace(/\.[^.]+$/, '');
      seen += 1;
      const extra = ` srcset="${stem}-720.webp 720w, ${stem}-1280.webp 1280w" sizes="(max-width: 40rem) 100vw, 40rem" decoding="async"${seen === 1 ? ' fetchpriority="high"' : ' loading="lazy"'}`;
      const next = `<img${attrs.replace(/\s*\/\s*$/, '')}${extra}>`;
      if (/<a\b/i.test(figure)) return next;
      return `<a href="${src}">${next}</a>`;
    });
  });
}
