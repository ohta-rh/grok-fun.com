/** Add data-label on tbody cells from thead, so narrow screens can stack rows as cards. */

/**
 * @param {string} html
 * @returns {string}
 */
export function stripTags(html) {
  return html.replace(/<[^>]+>/g, '');
}

/**
 * @param {string} html
 * @param {number} offset
 * @returns {boolean}
 */
function alreadyWrapped(html, offset) {
  const before = html.slice(Math.max(0, offset - 240), offset);
  return /<div\b[^>]*\btable-scroll\b[^>]*>\s*$/i.test(before);
}

/**
 * @param {string} html
 * @returns {string}
 */
export function wrapTables(html) {
  return html.replace(/<table\b[\s\S]*?<\/table>/gi, (table, offset) => {
    if (alreadyWrapped(html, offset)) return table;
    return `<div class="table-scroll">${table}</div>`;
  });
}

/**
 * @param {string} html
 * @returns {string}
 */
export function labelTableCells(html) {
  const labeled = html.replace(/<table\b[\s\S]*?<\/table>/gi, (table) => {
    const thead = table.match(/<thead\b[\s\S]*?<\/thead>/i)?.[0] ?? '';
    const heads = [...thead.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((m) =>
      stripTags(m[1]).replace(/\s+/g, ' ').trim(),
    );
    if (heads.length === 0) return table;
    let col = 0;
    let inThead = false;
    return table.replace(/<\/?thead\b[^>]*>|<td\b[^>]*>/gi, (token) => {
      if (/^<thead/i.test(token)) {
        inThead = true;
        return token;
      }
      if (/^<\/thead/i.test(token)) {
        inThead = false;
        col = 0;
        return token;
      }
      if (inThead) return token;
      if (/\bdata-label=/.test(token)) {
        col += 1;
        return token;
      }
      const label = heads[col % heads.length]
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;');
      col += 1;
      return token.replace(/<td/i, `<td data-label="${label}"`);
    });
  });
  return wrapTables(labeled);
}
