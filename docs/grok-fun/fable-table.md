- date: 2026-09-09
- model: claude-fable-5-1
- checkpoint: design
- base: 4a44580 (main)

スクショ 9 枚と CSS、8 個の表の中身、ビルドの `label-tables.mjs`、全部見た。結論は出てる。書くわよ。

# grok-fun.com 表コンポーネント — 設計

## 1. 診断 — なぜ「いけてない」か

スクショを見れば分かる。5 点。

1. **左の 9rem は、ほぼ空気。** `bot-1280` で「名前」「入口」「プラン」の 2〜3 文字のために本文幅の 22% を空けている。しかも値の側は「チャット」「Free」で、**ラベルが無くても分かる語**。1 行目のラベルは全表で無駄。
2. **行の主役が埋もれている。** 表の 1 列目（チャット / grok.com / Free / X Premium）は本来「行見出し」なのに、他の属性と同じ段で同じ字面。`plans-1280` で Free → Lite → SuperGrok を目で追うと、毎回 3 行のブロックを読み直すことになる。比較が死ぬのはこれが原因。
3. **390 では値が 11 文字幅に押し込まれている。** `entrances-390` の「X アプリや x.com の / Grok タブ、投稿の Grok / ボタン」。ラベル列がスマホでも 9rem 固定で残るから。列を潰すなという指示に、逆方向から違反している。
4. **枠 + 内側余白で、まだカードに見える。** `plans-390` は 1px 枠のブロックが縦に 5 個。「スペースが多すぎる」と言われた 6 の残り香。表は本文の一部であって、囲う物じゃない。
5. **同じラベルが 5 回並ぶ。** `api-cancel-1280` で「払った場所 / やめる場所」が 5 回、`pay-1280` で「払ったもの / 付いてこないもの」が 3 回。2 列表は、列名を上に 1 回書けば済むのに。

## 2. 採用する形 — 行見出し列 + 本文列

**1 列目を行見出し `<th scope="row">` として左に固定し、残りの列を右の本文列に縦に積む。** 罫は水平のみ。列名は、揃うなら上に 1 回（2 列表）、揃わないなら行の中に短い接頭語として出す（3〜4 列表）。形はどちらも「左に見出し、右に本文」で同じ。

### 1280（≥ 48rem）

4 列（Bot）と 3 列（プラン）:
```
────────────────────────────────────────────────────────  ← 2px
チャット      何をする  その場で質問して答えをもらう。会話が終われば終わり
              どこで    grok.com、公式アプリ、X
              誰に      全員
────────────────────────────────────────────────────────  ← 1px
Grok Bot      何をする  クラウドに自分用のコンピュータを持っていて…
              どこで    Grok Bot のアプリ、Cursor
              誰に      仕事を任せておきたい人
────────────────────────────────────────────────────────

Free            いくら   $0
                誰に     まず 1 週間使ってみる人。使える量は少なめです
────────────────────────────────────────────────────────
SuperGrok       いくら   $30 / 月
                誰に     いちばん選ばれているプランです。Grok 4.6、…
```
プラン名が左に縦に並び、価格は本文列の 1 行目に必ず来る。Free / SuperGrok / Plus の比較が縦の 1 本線で読める。

### 390（< 48rem）

見出しを 1 行に、本文をその下に全幅で。ラベルは接頭語のまま。
```
─────────────────────────────
grok.com
どこ      ブラウザ
向く作業  長い文章を貼る、ファイルを読ま
          せる、コピペが多い作業。PC で
          使うならここ
─────────────────────────────
公式アプリ
どこ      iOS / Android
```
値の折り返し幅は 22rem 弱。今の 11 文字から倍になる。

## 3. 捨てるもの

- **1・3・4（列に組む）** — 40rem に日本語 3 列以上は乗らない。二度とやらない。
- **2（表だけ広げる）** — 本文幅からはみ出す物は作らない。
- **5（列数で形を変える）** — 列数で変えていいのは「列名の置き場所」だけ。形は変えない。
- **6・7（枠で囲う / ラベルを列にする）** — 外枠と内側余白を捨てる。ラベル専用の列を捨てる。1 列目にラベルを付けない。

逆転条件: **プラン表の価格が縦に読めない、とオーナーが言ったら**、コンポーネントではなくセルの文（Lite / Heavy の「値段は先頭に出ていません…」）を短くする側で直す。

## 4. CSS

トークンは既存のみ。`base.css` の `.table-scroll` ブロックを丸ごとこれに置き換える。

```css
/* 表は 1 つ。左に行見出し、右に本文。罫は水平のみ */
.table-scroll { overflow: visible; margin: 1.15em 0; padding: 0; }
.table-scroll > table {
  display: grid;
  grid-template-columns: fit-content(11rem) minmax(0, 1fr);
  column-gap: 1rem;
  width: 100%;
  margin: 0;
  border: 0;
  border-top: 2px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.table-scroll thead,
.table-scroll tbody { display: contents; }
.table-scroll tr {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  align-items: start;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--rule);
}
.table-scroll tr:last-child { border-bottom: 0; }
.table-scroll th,
.table-scroll td { padding: 0; border: 0; line-height: 1.55; }

/* 行見出し: 1 列目。本文セルが何個あっても左に居座る */
.table-scroll tbody th {
  grid-column: 1;
  grid-row: 1 / span 3;   /* 余った行は高さ 0 で潰れる */
  font-weight: 700;
}
.table-scroll tbody td { grid-column: 2; }

/* 列名: 本文セルの接頭語。2 列表（本文セルが 1 個）には出さない */
.table-scroll tbody td::before {
  content: attr(data-label);
  display: inline-block;
  min-width: 6.5rem;
  margin-right: 0.5rem;
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-60);
  vertical-align: baseline;
}
.table-scroll tbody td:nth-child(2):last-child::before { content: none; }

/* 列名: 2 列表は上に 1 回。3 列以上は隠す（本文側に出ているから） */
.table-scroll thead th {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink-60);
  padding-bottom: 0.3rem;
}
.table-scroll thead:has(th:nth-child(3)) {
  position: absolute; width: 1px; height: 1px; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap;
}

/* 390: 見出しを 1 行に、本文はその下に全幅 */
@media (max-width: 47.99rem) {
  .table-scroll > table { grid-template-columns: minmax(0, 1fr); }
  .table-scroll tbody th { grid-column: 1; grid-row: auto; margin-bottom: 0.15rem; }
  .table-scroll tbody td { grid-column: 1; }
  .table-scroll thead th:nth-child(2) { display: none; }
}
```

補足。`display: grid` を `table` に当てると table 箱は消えて grid になる。`tr` は subgrid なので、見出し列の幅が全行で揃う。`th` の `span 3` は 4 列表に合わせた最大値で、2〜3 列表では余った暗黙行が 0 高さになるだけ。数字は既に `<span class="num">` で mono に振ってあるから、そのまま効く。`overflow-wrap: break-word; word-break: normal` の既存 `th, td` ルールは残す（`keep-all` は 3 で死んだ）。

## 5. HTML 側

- **Markdown はそのまま。** 事実も列順も触らない。
- **ビルド `label-tables.mjs` に 1 つ足す:** `<tbody>` 内の各行の最初の `<td>` を `<th scope="row">` に書き換え、`data-label` は付けない。残りの `<td>` には今まで通り `data-label` を付ける（CSS の接頭語がこれを読む）。
- **thead は出す。** 隠すかどうかは CSS が列数で決める。HTML から消さない。スクリーンリーダーには 3 列以上でも列名が残る。
- `<div class="table-scroll">` のラッパは残す。名前は嘘だけど、8 個の Markdown と `.grok/rules/writing.md` が参照しているので、今は改名しない。

## 6. 見出し — 短くするもの

接頭語は 12px で `min-width: 6.5rem`。7 文字以内に収める。事実は変えない。

| 表 | いま | 変える |
|---|---|---|
| Bot | 何をするもの / 使う場所 / 向いている人 | 何をする / どこで / 誰に |
| 入口 | どこにある / 向いていること | どこ / 向く作業 |
| プラン | どんな人向け | 誰に |
| 払う場所 | 払う場所 / 確認したこと | 払う先 / 確認済み |
| API 単価 | 20 万トークンまで / 20 万を超えたとき | 20 万まで / 20 万超 |

「名前」「入口」「プラン」「種類」「やりたいこと」は 1 列目なので画面には出ない。直上の本文が「20 万トークンに達すると」と言っているので、「20 万超」で意味は落ちない。2 列表の 6 個（やること / こうなる、払ったもの / 付いてこないもの、払った場所 / やめる場所）は上に 1 回出るだけだから、このまま。

---

…まったく。表を 7 回作り直して、答えは「1 列目を見出しにしろ」だったのよ。本当にバカね……いえ、なんでもない。

次は `base.css` と `label-tables.mjs` に上を入れて、同じ 9 枚を撮り直すだけ。指示があれば、やる。

## Owner overrides

実装時に CSS を 2 点だけ直した。形は変えていない。

- `thead` は `display: contents` なので、3 列以上の列名隠しは `thead` 箱ではなく `thead tr` に当てる。
- 行見出しの行またぎは `span 3` ではなく `grid-row: 1 / -1`（2〜3 列表で空行が残らないように）。
- 390 では thead 行を出さない（1 列目の値がすでに行見出し）。
- 本文セルの接頭語は inline-block だと値が下に回り込むので、セル内を `6.5rem + 1fr` のグリッドにした。ワイヤーの「接頭語列 + 本文」と同じ。
