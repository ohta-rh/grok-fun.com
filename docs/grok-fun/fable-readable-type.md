# 日本語 TIPS 本文の組版 — 判断と修正

- date: 2026-09-09
- model: claude-fable-5-1
- checkpoint: design
- base: c8542b3 (main)

組版、ひと通り見たわ。base は `origin/main` と同じ `c8542b3`、ズレなし。判断を書く。

# 日本語 TIPS 本文の組版 — 判断と修正

対象: `src/styles/base.css`、`src/styles/tokens.css`、`astro.config.mjs`、`docs/grok-fun/visual-design.md`。数字と事実、コンポーネントには触れない。

## 判断（今の組版のどこが読みにくいか）

1. **見出しの段差が無い。** h2 `1.25rem` と h3 `1.05rem` と本文 `1rem` の差が 4px と 1px。太字の段落と h3 が見分けられない。料金 TIPS は h2 が 13 本、節の切れ目が本文に溶けている。
2. **段落の間が半行しかない。** 行間 1.8 に対して `p` の margin が `0.9rem`。日本語は語間スペースが無いので、段落境界は行間より広く空けないと一続きに見える。
3. **表が本文の行間 1.8 を継承している。** セルの行が本文と同じ高さで、表が「見比べる」道具になっていない。数字も本文書体のまま。
4. **390px で表を縮めて詰め込んでいる。** `0.8rem` は 12.8px。料金の数字を 12.8px で読ませるのは表の目的に反する。潰さず横スクロールにする方が正しい。
5. **`overflow-wrap: anywhere` がセルと見出しに掛かっている。** `2026-09-08` や `$30 / 月` が桁の途中で折れる。
6. **72ch は間違い。** BIZ UDPGothic の `0` は約 0.55em なので 72ch ≒ 40em。つまり今の `--measure: 40rem` と同じ幅で、17px なら 1 行 37 字前後。日本語の適正 35〜40 字に入っている。**measure は変えない。** 変えるのは文書の方。……本当にバカね、自分で書いた ch の意味を確かめもしなかったなんて。
7. ブレークポイントが `35.99rem / 36rem / 40rem / 48rem` の 4 つ。本文組版に関わるのは 1 つで足りる。

## [must]

### M1. 本文サイズを流動化し、日本語の折り返し規則を入れる
`base.css:3-10` 現行 `font-size: 100%; line-height: 1.8;`
```css
html {
  font-size: clamp(16px, 1rem + 0.2vw, 18px);
  line-height: 1.8;
  line-break: strict;
  overflow-wrap: break-word;
  font-kerning: none; /* UD フォントの字面を詰めない */
}
```

### M2. 見出しの段差を作る
`base.css:23-26` 現行 h1 `1.75rem`/1.4、h2 `1.25rem` 下線 2px、h3 `1.05rem`
```css
h1, h2, h3 { font-weight: 700; margin: 0; overflow-wrap: break-word; }
h1 { font-size: clamp(26px, 1.4rem + 1vw, 34px); line-height: 1.35; }
h2 {
  font-size: clamp(20px, 1.1rem + 0.5vw, 24px);
  line-height: 1.4;
  margin-top: var(--section);
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--rule);
}
h3 {
  font-size: 1em;
  line-height: 1.5;
  margin-top: 1.75rem;
  padding-left: 0.6em;
  border-left: 3px solid var(--indigo);
}
```
`base.css:365-368` の `@media (max-width: 48rem) { h1 { font-size: 1.5rem; } }` は clamp が肩代わりするので **h1 の行を削除**。`.unofficial` の行は残す。

### M3. 段落と箇条書きの間隔
`base.css:27-28` 現行 `p, ul, ol { margin: 0.9rem 0; } li { margin: 0.3rem 0; }`
```css
p, ul, ol, table { margin: 1.15em 0; }
ul, ol { padding-left: 1.4em; }
li { margin: 0.4em 0; }
li > ul, li > ol { margin: 0.2em 0; }
```

### M4. 表を 15px / 1.5 にし、数字を折らない
`base.css:46-52` 現行 `font-size: 0.95rem`、`overflow-wrap: anywhere`、390px で `0.8rem`
```css
table {
  border-collapse: collapse;
  width: 100%;
  min-width: 34rem;      /* 3〜4 列が潰れない下限。measure 40rem の内側に収まる */
  font-size: 15px;
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
}
th, td {
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-bottom: 1px solid var(--rule);
  vertical-align: top;
  overflow-wrap: break-word;
}
th { font-weight: 700; border-bottom-width: 2px; }
```
`49-52` 行の `@media (max-width: 35.99rem)` ブロックは **削除**。

### M5. 表は縮めず横スクロールにする（Markdown 表を div で包む）
Markdown の `<table>` は素で出るので、`astro.config.mjs` に 10 行の rehype を足す。
```js
// astro.config.mjs — markdown.rehypePlugins に追加
import { visit } from 'unist-util-visit'; // astro が同梱。無ければ npm i -D unist-util-visit
function wrapTables() {
  return (tree) => visit(tree, 'element', (node, i, parent) => {
    if (node.tagName !== 'table' || !parent || i == null) return;
    parent.children[i] = { type: 'element', tagName: 'div',
      properties: { className: ['table-scroll'] }, children: [node] };
  });
}
// markdown: { syntaxHighlight: false, rehypePlugins: [wrapTables] }
```
```css
.table-scroll {
  overflow-x: auto;
  margin: 1.15em calc(-1 * var(--gutter));
  padding: 0 var(--gutter);
  -webkit-overflow-scrolling: touch;
}
.table-scroll > table { margin: 0; }
```
390px では 34rem の表が gutter の外まで使って 1 画面半、指で送る。文字は 15px のまま。

## [should]

### S1. 料金と日付を mono にする
`base.css:31` 現行 `code, kbd, pre, time, .mono { font-family: var(--font-mono); }`
```css
code, kbd, pre, time, .mono, .num { font-family: var(--font-mono); font-weight: 500; }
.num { font-size: 0.95em; letter-spacing: 0; }
```
`free-vs-supergrok.md` の金額セルだけ `<span class="num">$30 / 月</span>` に置き換える。対象は「階段」表の 5 セル、API 表の 6 セル、Cursor の `$20`。本文中の日付は触らない（mono が散ると紙面が騒がしくなる）。

### S2. リード文を本文から一段だけ離す
`base.css:94-95` 現行 `.lead { font-size: 1.05rem; margin-top: 0.75rem; }`
```css
.lead { font-size: 1.05em; line-height: 1.75; margin: 0.75rem 0 0; }
.lead + * { margin-top: 1.5rem; }
```

### S3. 本文の折り返しをブレークポイント 1 つに
`tokens.css` の `--measure: 40rem` は据え置き。`visual-design.md:87` の「本文 72ch、テーブル 88ch」を次に書き換える。
```
本文 max-width 40rem（17px で 1 行 37 字前後）。テーブルは min-width 34rem、狭い画面では .table-scroll で横スクロール。
```
本文組版の media query は `48rem` の 1 本のみ。`36rem` / `40rem` は infofig 専用なので触らない。

## [nit]

- **N1.** `base.css:23` `overflow-wrap: anywhere` は h1〜h3 でも `break-word` に。URL 見出しは無い。
- **N2.** `html` に `hanging-punctuation: allow-end;` を足す。Safari だけ行末の句点がぶら下がり、右端が揃う。他は無視するので害なし。
- **N3.** `free-vs-supergrok.md` の「階段」表、プラン名 `**Free**` と金額 `**$30 / 月**` の両方が太字で、強調が相殺している。プラン名の太字を外して金額（S1 の mono）だけ立てる。事実は変えない。
- **N4.** `.sources ul` の `word-break: break-all` は URL 用なので残す。ただし `font-size: 0.875rem` を `14px` にして注釈サイズを固定値で揃える（`.card-head`、`.infofig-note`、`.reactions-note` も同じ 14px 系）。
- **N5.** `blockquote` は全 TIPS で未使用。消すか、使う日まで放置。

## 適用順

M1 → M2 → M3 → M4 → M5 の順で `base.css` を編集し、`npm run build` のあと 390px と 1280px で料金 TIPS を見る。確認点は 3 つ: h3 の縦棒が出る、表が 15px のまま横に送れる、`2026-09-08` が途中で折れない。

……これで読めるようになるはずよ。数字が読めない料金表なんて、表じゃないもの。

## Implementation notes

- M5: Astro 7 の既定 Markdown は Sätteri。`markdown.rehypePlugins` は `@astrojs/markdown-remark` が要り、パイプラインを unified に戻す。依存を増やさず、各 TIPS の表を `<div class="table-scroll">` で包んだ。新しい表も同じ包みが要る。
