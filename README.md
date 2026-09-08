# Grok JP

Unofficial Japanese fan community for the Grok series. Not affiliated with xAI.

Grok シリーズの非公式な日本語ファンコミュニティです。xAI とは関係ありません。

Live site: [https://grok-fun.com](https://grok-fun.com)

## What this is / これは何か

A thin, dated TIPS site so Japanese readers can see what Grok costs, where to pay, and how to keep replies in Japanese. The north star is a place people come back to — not a pile of pages.

日本語で Grok の料金、払う場所、返事を日本語に固定する方法を、日付付きで書く薄い TIPS サイトです。目指すのは「戻ってくる場所」であって、記事の山ではありません。

Every page carries an unofficial banner. Official Grok / xAI logos are not used.

全ページに非公式の表示があります。公式のロゴは使いません。

## Stack / 構成

- Static site: Astro 7 / 静的サイトは Astro 7
- Hosting: Cloudflare Workers Static Assets / 配信は Cloudflare Workers Static Assets
- Package manager: **pnpm** / パッケージマネージャは **pnpm**
- Worker handles `/api/*` only (likes and comments). `run_worker_first` stays **false** — turning it on would send every request through the Worker and burn the free quota.
- Worker は `/api/*` だけ（いいねとコメント）。`run_worker_first` は **false のまま**。true にすると全リクエストが Worker を通り、無料枠を食います。
- Comments and reactions: D1 `grok-fun-community` + Turnstile. Articles stay static if D1 is gone.
- コメントとリアクションは D1 `grok-fun-community` と Turnstile。D1 が落ちても記事は残ります。
- Analytics: Google Tag Manager `GTM-NQMPJ2FS` (GA4). Do not add a second gtag.js.
- 計測は Google Tag Manager `GTM-NQMPJ2FS`（GA4）。gtag.js を二本入れない。
- No GitHub Actions. Deploy from this machine.
- GitHub Actions は使いません。このマシンから公開します。

## Develop / 開発

```bash
pnpm install
pnpm dev
```

```bash
pnpm check          # astro check
pnpm check:worker   # wrangler types + tsc on worker/
pnpm build          # worker check + astro check + astro build
pnpm preview        # wrangler dev
```

## Deploy / 公開

```bash
pnpm build
pnpm run deploy     # wrangler deploy
```

Do not set `run_worker_first` true.

`run_worker_first` を true にしない。

Python urllib gets 403 from the live host. Use `curl -A 'Mozilla/5.0'`.

本番は Python の urllib だと 403 になります。`curl -A 'Mozilla/5.0'` を使ってください。

## Content / 記事

Writing rules: [`.grok/rules/writing.md`](.grok/rules/writing.md)

書き方の正本は [`.grok/rules/writing.md`](.grok/rules/writing.md) です。

- Do not add TIPS pages unless asked. Thicken what is already there.
- 頼まれない限り TIPS を増やさない。ある記事を厚くする。
- Reader-facing Japanese is judged by reading it aloud — title, headings, table headers, captions, alt, text in figures. Table headers become labels on a phone. Do not grow a banned-word list.
- 読者向けの日本語は音読で見る。title、見出し、表の見出し、キャプション、alt、図の中の文字。表の見出しはスマホでラベルになる。禁止語の表を育てて運用しない。
- News ingest stays off until Search Console is clean **and** 90 days after launch.
- ニュースの自動取り込みは、Search Console がきれいになること **かつ** 公開から 90 日、の両方を満たすまで動かさない。

Repeatable work lives in [`.grok/skills/grok-jp-tips`](.grok/skills/grok-jp-tips) and [`.grok/skills/grok-jp-ship`](.grok/skills/grok-jp-ship).

繰り返しの手順は [`.grok/skills/grok-jp-tips`](.grok/skills/grok-jp-tips) と [`.grok/skills/grok-jp-ship`](.grok/skills/grok-jp-ship) です。

## Docs / 文書

Planning and architecture: [`docs/grok-fun/README.md`](docs/grok-fun/README.md)

企画と設計の文書は [`docs/grok-fun/README.md`](docs/grok-fun/README.md) です。
