# Grok JP（grok-fun.com）

日本語の非公式 Grok ファンコミュニティ。Astro 7 の静的サイト + Cloudflare Workers Static Assets。Worker は `/api/*` だけ。`run_worker_first` は **false 固定**（true にすると全リクエストが Worker を通り Free 枠を食う）。

パッケージマネージャは **pnpm**。GitHub Actions は使わない。デプロイは `pnpm build` のあと `wrangler deploy`。繰り返し手順は `.grok/skills/grok-jp-tips` と `.grok/skills/grok-jp-ship`。

## 公開する日本語（最優先）

正本は **`.grok/rules/writing.md`**。先に口語 3 行、事実は日付と数字。英語の公式を日本語に載せない。直訳は語を換えず、段落を書き直す。音読。表の見出しはスマホでラベルになる。

製品名は英語のまま残す（Grok, SuperGrok, Imagine, Bot, Build, Voice）。節の名前「TIPS」は既に公開済みなので変えない。

料金・制限の数字は一次情報に日付を付けて書く。公式の先頭に出ていない数字（例: Lite $10、Heavy $300）を公式の値段として扱わない。「自分のプラン画面で確認」と書く。

## コンテンツ

書き方の正本は **`.grok/rules/writing.md`**。要約:

- 新しい TIPS ページを勝手に増やさない。既存を厚くする。
- 各 TIPS の図は **インフォグラフィック**（`Infographic.astro`）。文字と数字が正確である図は Imagine に描かせない。OGP 用 JPG と Imagine の作例写真は別。
- 内部リンクは前後ナビだけに頼らない。本文の文脈リンクと、記事末の「関連する TIPS」の両方。アンカーは「TIPS 01」ではなく、リンク先の内容が分かる語。
- 公式ニュースの全文翻訳はしない。要約 + 短い引用 + 原文リンク。
- Bot 用プロンプト集は作らない。grokguide.jp へ送る。

## コミュニティ

記事は静的。いいねとコメントは Worker + D1 `grok-fun-community`（消えても記事は残る）。UI の劣化文は「いま反応を受け付けていません」。
