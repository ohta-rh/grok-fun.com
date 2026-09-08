# grok-fun.com 企画・アーキテクチャ レビュー（Fable 5.1）

- 日付: 2026-09-08
- 対象: 企画書（実装なし、git 空、GitHub `ohta-rh/grok-fun.com` は public で空）
- レビュー環境の事実: `wrangler` はこのマシンの PATH に**無い**。`pnpm` はある。Node v25.5.0。

## 総合判定

**Conditional Approval。** 静的 $0 の骨格は正しいけど、「grok を含むドメイン名」と「一次情報の全文翻訳」という二つの法務リスクを凍結しないままコードを書き始めたら、後で全部やり直しになるわよ。

## 重要な指摘

### 1. [must] ドメイン `grok-fun.com` 自体が xAI ブランドガイドラインに抵触する可能性

- 証拠: x.ai/legal/brand-guidelines は「SpaceXAI / Grok のマークを、自社以外の **app title, domain name**, product/service name に使ってはならない」「マークの近くに何かを付加して新しいマークの印象を作ってはならない」と規定（検索スニペット経由で確認。ページ本体は bot に 403 を返すので、**オーナーがブラウザで全文を読むこと**）。
- 影響: SEO で伸びた瞬間に取り下げ要求が来るのが最悪ケース。伸びる前に潰しておく話。
- 修正: (a) ガイドライン記載の連絡先へ「非公式日本語情報サイト、ロゴ不使用、非公式表記あり」で書面許諾を求める、(b) 返答が無い/否なら、サイト名を「Grok」を主語にしない名前（例: 「〇〇 — Grok 非公式日本語ガイド」の副題扱い）にして、ドメインは維持しつつ露出を下げる、(c) いずれにせよ Grok/xAI のロゴ・ワードマーク画像は一切使わず、favicon と OGP はオリジナル。この判断はオーナーのもの。

### 2. [must] 「一次情報の日本語翻訳」は全文翻訳にすると著作権侵害と SEO の両方で負ける

- 証拠: x.ai/news は「© 2026 SpaceXAI LLC」、docs.x.ai は OSS ではなくライセンス表記なし。xai-org の GitHub にあるのは SDK 類（Apache-2.0）で docs 本体ではない。翻訳は二次的著作物で、許諾なしの全文掲載は日本法でも米国法でも黒に近い。Google 側も翻訳の丸写しは薄いコンテンツ扱い。
- 修正: 翻訳方針を「**要約 + 短い引用 + 原文リンク + 日付**」に固定。翻訳してよいのは事実データ（料金表、制限値、モデル ID、リリース日）で、これは著作物ではない。x.ai の news 一本を「何が変わったか / 日本のユーザーにどう効くか / 原文」の 3 段構成にする。「翻訳」を title や URL に入れない。

### 3. [must] 「grok {任意の日本語}」は要件として成立しない。MELCHIOR に同意、さらに厳しく見る

- 証拠: 「grok 使い方」「grok 料金」の検索意図は grok.com / X / 大手メディアが占めていて、ドメイン年齢ゼロの新規サイトが半年で頭語を取る根拠はない。今の企画には「取れなかったら何を変えるか」の判定基準もない。
- 修正: キーワードを 3 層に分けて凍結。
  - Tier A（必ず 3 か月以内に 20 位以内を狙う、長尾・鮮度勝負）: `grok 4.7 料金`, `grok imagine 動画 制限`, `grok bot 日本語 設定`, `grok api 料金 円`, `grok build 使い方` のような **製品名 × 具体属性**。
  - Tier B（半年後に 30 位以内）: `grok 料金`, `grok 無料`, `grok 日本語`。
  - Tier C（観測のみ）: `grok 使い方`, `grok とは`。
  - 計測は Search Console のみ。Tier A で 3 か月後に 0 件なら方針を変える、と今決める。

### 4. [must] 更新 SLA は初週に試される。Grok 4.7 が 9/11〜12 に来る

- 証拠: Grok 4.6 は 2026-08-12 公開、Grok 4.7 は 9/2 に Musk が予告し 9/11〜12 想定。公式の API ID・料金は未公開。
- 影響: フェーズ 0 に中身が無いまま 4.7 が出ると、「最初の大型ニュースを逃したサイト」からスタートになる。
- 修正: フェーズ 0 の完了条件に「4.7 リリース当日に `/news/grok-4-7` と `/pricing` の差分を出せる状態」を入れる。SLA の数字は凍結項目参照。

### 5. [should] Cloudflare 無料枠完結は本物。ただし「Worker を 1 回も呼ばない構成」まで詰めること

- 証拠（公式）: 「Requests to static assets are free and unlimited」。Worker が呼ばれるのは `run_worker_first` 指定、SSR、アセット不一致時のみ。Free は 100k req/日、CPU 10ms、cron 5、静的ファイル 20,000 / 25MiB、Workers Builds Free は 3,000 分/月・同時 1・20 分タイムアウト。Pages のドキュメントには「Start new projects with Workers」と明記。
- 修正: wrangler 設定に `main` を**書かない**（assets-only Worker）。`not_found_handling = "404-page"`、`html_handling = "auto-trailing-slash"`。これで 404 も静的で返り、Worker スクリプト自体が存在しないから誤爆しようがない。`_headers` / `_redirects` は Static Assets が読むので CSP と旧 URL 転送はそこで。20,000 ファイル制限は OGP 画像を記事ごとに生成し始めると効いてくるので、ビルド後にファイル数を CI で数える。

### 6. [should] 「wrangler は入っている」は、この環境では偽

- 証拠: `which wrangler` → not found。グローバル npm にも無い。
- 修正: `wrangler` は devDependency に pin して `pnpm exec wrangler`。パッケージマネージャは **pnpm** で凍結（lockfile を commit、Workers Builds のビルドコマンドも `pnpm install --frozen-lockfile && pnpm build`）。

### 7. [should] CI が未定義。Workers Builds の自動デプロイと「main 直 push」運用は組み合わせると事故る

- 証拠: Workers Builds は本番ブランチ push で即デプロイ、非本番ブランチはプレビュー URL。企画には品質ゲートの記述がない。
- 修正: GitHub Actions で最低限 3 つ: `astro check`、frontmatter スキーマ検証（`last_verified` / `source_url` / `coverage` 必須）、内部リンク切れ検査。落ちたら Workers Builds 側もビルド失敗で止まるよう、同じコマンドをビルドコマンドに入れる。編集フローは「エージェントがブランチに下書き → PR → 人間がマージ → 自動デプロイ」で固定（MAGI 条件 5 と整合）。

### 8. [should] 「フルシリーズ追随」は BALTHASAR の言う通り一人では持たない。持たないことを画面に出す設計にする

- 修正: ハブごとに `coverage: full | tracking | index` を frontmatter に持たせ、`index` のページには「このハブは目次と一次情報リンクのみ」と自動表示。`last_verified` から 60 日超えたページはビルド時に「情報が古い可能性」バナーを静的に焼き込む。古さが自己申告されている鏡は「半信半疑」ではなく「正直な鏡」になる。

### 9. [should] 料金ページは「円が公式に無い」ことを明記しないと逆に信頼を失う

- 証拠: SuperGrok Lite $10 / SuperGrok $30 / Plus $100 / Heavy 約 $300（二次情報で確認。x.ai/pricing を一次として `last_verified` 付きで引くこと）。円建て公式価格は未公表。App Store / Google Play の JPY 価格は別体系。
- 修正: 料金表は USD 表示 + 「ストア課金は円建てで異なる」の注記 + 変更履歴（changelog）を同ページ内に。CASPAR の言う「料金・制限の変更履歴」がブックマーク価値の中核だから、ここは最初から差分形式で書く。

### 10. [should] コミュニティは v1 で作らない。Giscus は「コメント欄」としてだけ置く

- 証拠: Giscus は public repo + Discussions 有効 + GitHub アカウント必須。日本の一般ユーザーの参加率は低い。既に小さな X Corp Japan の Grok コミュニティがある。
- 修正: v1 の「コミュニティ」は X のコミュニティへの導線 + サイト側の RSS/ニュースレターまで。Giscus は技術ページ（/api, /build）限定。CSP に `frame-src https://giscus.app` が要る。フォーラム検討は PV 月 5 万を超えてから。

### 11. [nit] CSP は最初から nonce/hash 前提で書きつつ、広告で崩れる前提を持つ

- Cloudflare Web Analytics を使うなら `script-src https://static.cloudflareinsights.com`、`connect-src https://cloudflareinsights.com` が必要。AdSense 導入時に CSP はほぼ崩れるので、フェーズ 3 で `Report-Only` に落とす判断を今から予定に入れる。

### 12. [nit] SEO の技術面で企画に無いもの

- `Article` / `FAQPage` 構造化データ、`sitemap.xml`、RSS、canonical、OGP。日本語のみなので hreflang は不要。i18n フレームワークも不要。「grok 4.6」のようなバージョン語は減衰するので `/models/grok-4-6` の形で恒久 URL にし、`/news` からは日付付きで参照する。

## MAGI 判定への反論または補強

- **MELCHIOR「静的 $0 は正しい」** → 補強。公式文言まで確認済み。ただし「誤って Worker が呼ばれる」を防ぐには `main` を書かない assets-only 構成まで落とす必要がある（指摘 5）。
- **MELCHIOR「非公式表示が必要」** → 不足。表示だけでは足りず、ドメイン名そのものがブランドガイドラインに引っかかる（指摘 1）。MAGI はここを見落としている。
- **BALTHASAR「2 年後は半信半疑の古い鏡」** → 同意。ただし救済策は「頑張って追随する」ではなく「古さを機械的に自己申告させる」（指摘 8）。運用 2 点は人の努力で 3 にはならない。設計で上げる。
- **BALTHASAR「test 2」** → 同意、企画に CI が一行も無い（指摘 7）。
- **CASPAR「Giscus+X はコミュニティにならない」** → 同意。v1 では「コミュニティ」を製品要件から外すべき。
- **CASPAR「Zenn/Qiita 連載 + X」の不採用** → 半分反論。ドメイン許諾が取れなかった場合の退避先として、この案は生きたまま置いておくべき。コンテンツを Markdown で git に持つ設計なら移植コストは低い。
- **条件 1「有限キーワード + SLA」** → 補強。層別と失敗判定まで含めて凍結（指摘 3）。
- **MAGI 全体の欠落**: 著作権（翻訳）の論点がゼロ。「一次情報の日本語翻訳」を売りにする企画で、これが無いのは審査の穴。

## 実装前に凍結すべき決定

1. **ブランド法務の立場**: 許諾メールを送るか、送らずにリスクを飲むか。飲むならサイト名から「Grok」を主語に置かない。ロゴ不使用は無条件。
2. **翻訳方針**: 全文翻訳はしない。「要約 + 引用 + 原文リンク + 日付」。事実データのみ日本語化。
3. **キーワード層別と失敗判定**: Tier A/B/C を確定し、「3 か月で Tier A が 0 件なら方針転換」を明文化。
4. **更新 SLA の数字**: chat/bot/build/imagine の公式発表は **72 時間以内**に日本語要約、voice/automations/api は **14 日以内**、料金・制限の変更は **24 時間以内**に changelog 追記。守れない週は `coverage` を落とす。
5. **スタック pin**: Astro 7.x `output: 'static'`、adapter なし、pnpm、`wrangler.jsonc` は assets-only（`main` なし）、`not_found_handling: "404-page"`、Workers Builds で main 自動デプロイ、GitHub Actions で 3 ゲート。
6. **コンテンツスキーマ**: frontmatter 必須項目 `title / description / last_verified / source_url[] / coverage / product`。ビルドで検証。
7. **編集フロー**: エージェント下書きはブランチ + PR、人間マージのみ本番。この repo は public なので下書きも公開される前提で書く。

## 次の一手

1. 今日中に x.ai/legal/brand-guidelines をブラウザで全文読み、許諾メールを送るか決める（決定 1）。
2. フェーズ 0 を 1 日で: `pnpm create astro`、`wrangler.jsonc`（assets-only）、`_headers` で CSP と非公式表示、`ohta-rh/grok-fun.com` に push、Workers Builds 接続、`grok-fun.com` にカスタムドメイン割当。
3. 9/11 までに `/pricing`（USD + changelog 形式）と `/models/grok-4-6` を出し、4.7 当日に差分を追記できる状態にする。ここが SLA の初回テスト。
