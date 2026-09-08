# 実装計画: grok-fun.com

- 日付: 2026-09-08
- 前提: architecture.md に従う。凍結事項は magi-verdict.md。運用は operations.md（無人。人間マージなし）
- ~~期限の起点: Grok 4.7 リリース想定 2026-09-11〜12。**フェーズ 1 の `/pricing/` と `/models/grok-4-6/` は 9/11 までに公開**~~
- 2026-09-08 改訂（content-strategy.md）: **ローンチは TIPS-first。** フェーズ 1 は「ホーム + About + TIPS 4〜6 本」の静的サイトに差し替え。製品地図・料金 changelog・7 ハブ・news 3 本は TIPS が溜まってから。Grok 4.7 当日は**当日メモ 1 本**で対応する。フェーズ 1.5（無人取り込み）は実装してよいが、**有効化は Search Console でのインデックス確認 かつ 公開から 90 日の遅い方**。サイト名は **Grok JP**、分析は **GTM `GTM-NQMPJ2FS`** を初日から

## フェーズ一覧

| フェーズ | 内容 | 目安 | 完了条件 |
|---|---|---|---|
| 0 | scaffold: Astro static + wrangler assets + カスタムドメイン + 非公式バナー + CSP + **GTM** | 1 日 | `https://grok-fun.com/` がトップページを返し、非公式バナーと CSP ヘッダが出ている。GTM の外部 JS が読まれている |
| 1 | **TIPS-first ローンチ**: ホーム（Grok JP、タグライン、非公式判子、TIPS 一覧）+ About + `/tips/` + TIPS 4〜6 本（検証済み、`last_verified`、`source_url`）。**空ハブと news firehose は作らない** | 1 日 | 公開。以後 4 週は週 1 本、以後週 1〜2 本。大きなリリース日は当日メモ 1 本 |
| 1b | 製品地図、料金 changelog、getting-started、ハブ、news collection（旧フェーズ 1） | TIPS が製品ごとに 3 本以上溜まってから | ハブを `coverage: tracking` で置ける |
| 1.5 | **無人取り込み（Grok Build + launchd、この Mac）**: `.grok/ops/ingest.md`（日次 2 回、Grok が x.ai/news → 要約 Markdown → `pnpm build` → commit → push）、`.grok/ops/reverify.md`（週次、`coverage` 降格）、`ops/grok-run.sh`、plist 2 本。GitHub Actions なし。operations.md | 2 日（実装）。**有効化は信頼条件後**（Search Console 確認 かつ 公開 90 日） | launchd が新着を人手なしで main に commit し、Workers Builds が deploy する。失敗時は commit されず macOS 通知が出る |
| 2 | Worker + D1 でコメント / リアクション + Turnstile + **自動モデレーション + キルスイッチ** | 2 日 | 記事下でリアクションとコメントが動き、D1 を落としても記事が表示される。`COMMENTS_DISABLED=1` で投稿が止まる |
| 3 | 残りハブ `/voice` `/automations` `/api`、広告は後（X Tips は v1 で自動収集しない） | 継続 | `coverage` を各ハブで自己申告。AdSense は**公開後に判断**（PV 基準は置かない） |

## フェーズ 0: scaffold

### 手順

1. `pnpm create astro@latest . -- --template minimal --typescript strict --no-install --no-git`（既存 docs/ を残す）
2. `pnpm add -D wrangler @cloudflare/workers-types` / `pnpm add @astrojs/sitemap @astrojs/rss`
3. `astro.config.mjs`: `site: 'https://grok-fun.com'`, `output: 'static'`, `trailingSlash: 'always'`, sitemap 統合
4. `wrangler.jsonc`: architecture.md の設定。フェーズ 0 では `main` と `d1_databases` を**まだ書かない**（assets-only。Worker は無い）
5. `public/_headers`: CSP + セキュリティヘッダ
6. `src/layouts/Base.astro`: 非公式バナー、canonical、OGP、JSON-LD の枠
7. `src/pages/index.astro`, `src/pages/404.astro`
8. GitHub `ohta-rh/grok-fun.com` に push → Workers Builds 接続 → 本番ブランチ `main`、ビルド `pnpm install --frozen-lockfile && pnpm build`、デプロイ `pnpm exec wrangler deploy`
9. Cloudflare DNS に `grok-fun.com` → Worker の Custom Domain 割当（`wrangler.jsonc` の `routes[].custom_domain: true` で deploy 時に付く。2026-09-08 確認済み）。`www` → apex の 301 は Cloudflare ダッシュボードの Redirect Rule で行う。**`_redirects` に絶対 URL の行は書けない**（Workers Static Assets は相対パスのみ。deploy が `Invalid _redirects configuration: Only relative URLs are allowed` で落ちる。2026-09-08 に実際に落ちたので `public/_redirects` は置かない）
10. **GTM `GTM-NQMPJ2FS`** を `src/scripts/gtm.ts` として Astro にバンドル（`vite.build.assetsInlineLimit: 0` で inline 化禁止）+ `<noscript>` iframe。CSP に `www.googletagmanager.com` と `*.google-analytics.com` を確認（architecture.md）。Cloudflare Web Analytics は主計測にしない
11. `.githooks/pre-push`（`pnpm build` を実行、非 0 なら push 中止）+ 開発用チェックアウトで `git config core.hooksPath .githooks`。**GitHub Actions は作らない**（`.github/workflows/` を置かない）。品質ゲートはこの Mac の `pnpm build` と Workers Builds の同じコマンドの二重

### ファイル

```
astro.config.mjs
wrangler.jsonc
package.json  pnpm-lock.yaml  .gitignore  .nvmrc(または .node-version)
tsconfig.json
src/layouts/Base.astro
src/components/UnofficialBanner.astro
src/pages/index.astro
src/pages/404.astro
src/styles/tokens.css  src/styles/base.css
public/_headers  public/favicon.svg  public/robots.txt  public/og-default.png(後日)
.githooks/pre-push
```

### パッケージ

| 区分 | パッケージ |
|---|---|
| dependencies | `astro`, `@astrojs/sitemap`, `@astrojs/rss`, `@fontsource-variable/*`（visual-design.md で確定） |
| devDependencies | `wrangler`, `@cloudflare/workers-types`, `typescript`, `@astrojs/check` |

### `package.json` scripts

```json
{
  "dev": "astro dev",
  "check": "astro check",
  "validate": "node scripts/validate-frontmatter.mjs",
  "build": "pnpm check && pnpm validate && astro build && node scripts/check-links.mjs && node scripts/count-assets.mjs",
  "preview": "wrangler dev",
  "deploy": "wrangler deploy",
  "d1:migrate:local": "wrangler d1 migrations apply grok-fun-community --local",
  "d1:migrate": "wrangler d1 migrations apply grok-fun-community --remote"
}
```

`validate` / `check-links` / `count-assets` はフェーズ 0 ではスタブ（exit 0）でよい。フェーズ 1 で実装。

## フェーズ 1: TIPS-first ローンチ（content-strategy.md）

### 手順

1. `src/content.config.ts`: `tips` collection（`title`, `description`, `order`, `product`, `last_verified`, `source_url[]`）
2. `src/pages/index.astro`（Grok JP、タグライン、非公式判子、TIPS 一覧）、`about.astro`（非公式、商標、ロゴ不使用、GTM 表示）、`tips/index.astro`、`tips/[slug].astro`（一次情報ボックス、`StaleBanner`）、`404.astro`
3. TIPS 5 本: 日本語で固定する / 入口は 3 つ / 無料と SuperGrok の考え方 / Imagine 最短手順 / Bot と Build とチャットを混ぜない（Bot プロンプト集は grokguide.jp へ）
4. `robots.txt` 全許可、`@astrojs/sitemap`、JSON-LD（`WebSite`, `Article`）、canonical、OGP（画像は後）
5. `pnpm build` → `wrangler deploy`（assets-only）

**作らない:** 7 製品の空ハブ、製品地図の表、news の自動取り込み、コメント / リアクション（次のスライス）。

## フェーズ 1b: コンテンツ骨格（旧フェーズ 1。TIPS が溜まってから）

### 手順

1. `src/content.config.ts`: zod スキーマ（`title`, `description`, `product`, `last_verified`, `source_url[]`, `coverage`）。collection: `products`, `guides`, `news`, `models`, `pages`
2. `scripts/validate-frontmatter.mjs`: 全 Markdown を走査し必須項目と日付形式を検証。欠けたら exit 1
3. `src/components/StaleBanner.astro`（60 日超）、`CoverageBadge.astro`
4. コンテンツ（優先順）:
   1. `/pricing/` — USD 表 + ストア課金注記 + changelog 節（日付降順）。`coverage: full`
   2. `/models/grok-4-6/` — 恒久ページ。4.7 当日に `/models/grok-4-7/` を複製して差分を書く
   3. `/` — 製品地図（7 製品 × 無料でどこまで / プラン / 日本で使えるか）
   4. `/getting-started/`
   5. ハブ `/grok/` `/bot/` `/build/` `/imagine/`（`coverage: tracking`）。`/bot/` は grokguide.jp へ外部リンク
   6. `/news/2026/` に既存ニュース 3 本（4.6 リリース、直近の料金変更、Imagine の制限変更のいずれか）を「要約 + 引用 + 原文リンク」形式で
5. `scripts/check-links.mjs`: `dist/` の内部リンクを走査し 404 を検出
6. RSS `/rss.xml`、sitemap、JSON-LD（`Article`, `FAQPage`）
7. Grok 4.7 当日: `/news/2026/grok-4-7/` はフェーズ 1.5 の launchd + Grok が取り込む（間に合っていなければ手で書く）。`/models/grok-4-7/` と `/pricing/` changelog は手で追記。72 時間 SLA の初回テスト
8. news の frontmatter に `published_at`（任意）と `auto: boolean`（既定 false）を追加。`auto: true` のページに「この要約は自動生成です」を出す `AutoNotice.astro`

### ファイル

```
src/content.config.ts
src/content/products/{chat,bot,build,imagine}.md
src/content/guides/getting-started.md
src/content/models/grok-4-6.md
src/content/news/2026/*.md
src/content/pages/pricing.md
src/components/{StaleBanner,CoverageBadge,ProductMap,Changelog}.astro
src/pages/{[product]/index,getting-started,pricing,models/[slug],news/[...slug],rss.xml}.astro
scripts/validate-frontmatter.mjs  scripts/check-links.mjs  scripts/count-assets.mjs
```

## フェーズ 1.5: 無人取り込み（Grok Build + launchd、この Mac）

operations.md が仕様。ここは手順だけ。フェーズ 1 の直後、フェーズ 2 より前に入れる（コメント機能より新着が止まらないことが先）。**GitHub Actions は使わない。** 実行場所はオーナーの Mac、実行エンジンは `grok` CLI（headless）、deploy は Workers Builds。

### 手順

1. この Mac の準備（一度きり）: `grok login` 済みを確認、`grok models` でモデル ID を決めて `GROK_MODEL` に固定、ssh 鍵を Keychain に（`UseKeychain yes`、パスフレーズ入力なしで `git push` が通ること）、自動ログイン ON、電源アダプタ接続で自動スリープ OFF
2. 実行用 clone: `git clone git@github.com:ohta-rh/grok-fun.com.git ~/ops/grok-fun.com && cd ~/ops/grok-fun.com && pnpm install --frozen-lockfile`。開発用チェックアウトとは別
3. `scripts/validate-frontmatter.mjs` を拡張: `auto: true` の記事に対し `## 要約` 600 文字以下、`## 引用` の blockquote 各 120 文字以下 × 2 本以下、`published_at` が未来でない、title / description / ファイル名に「翻訳」なし。`pnpm build` に既に含まれる
4. `.grok/ops/ingest.md`: operations.md のプロンプト。x.ai/news の列挙 → 未取得 slug の突き合わせ → 5 本上限 → テンプレどおりの Markdown → `pnpm build` → `git add <paths>` → commit `ingest: <slug>` → `git pull --rebase origin main` → `git push origin main` → 最終行 `RESULT: ok|nothing|failed`
5. `src/components/AutoNotice.astro`: `auto: true` に「この要約は自動生成です。原文を確認してください」
6. `scripts/reverify.mjs`: 全 `source_url` に HEAD。404 / 410 で `coverage` を 1 段降格し `data/demoted.json` に記録。同一ホストの redirect は追随。`data/reverified-at.txt` を毎回更新
7. `.grok/ops/reverify.md`: `node scripts/reverify.mjs` → `pnpm build` → commit `reverify: <n> checked, <m> demoted` → pull --rebase → push → `RESULT:`
8. `ops/grok-run.sh`: operations.md の骨子。lock、`git reset --hard origin/main`、`pnpm install --frozen-lockfile`、30 分 watchdog、`grok --prompt-file .grok/ops/<name>.md --cwd ~/ops/grok-fun.com -m "$GROK_MODEL" --permission-mode bypassPermissions --no-subagents --max-turns 80 --deny ... --output-format json`、exit code と `RESULT:` の 2 段判定、失敗で `osascript` 通知 + `~/Library/Logs/grok-fun/<name>.log`
9. deny ルール（wrapper に固定）: `Bash(git push --force*)` `Bash(git push -f*)` `Bash(git add -A*)` `Bash(git add .*)` `Bash(*wrangler*)` `Bash(rm -rf*)` `Bash(git reset*)` `Bash(git checkout*)` `Bash(git switch*)` `Edit(worker/**)` `Edit(wrangler.jsonc)` `Edit(ops/**)` `Edit(.grok/**)`
10. `ops/com.grok-fun.ingest.plist`（`StartCalendarInterval` 10:00 / 22:00、`RunAtLoad: true`、`EnvironmentVariables.PATH` に `~/.grok/bin` と pnpm / node、`GROK_MODEL`）と `ops/com.grok-fun.reverify.plist`（月曜 11:00）。`~/Library/LaunchAgents/` にコピーして `launchctl bootstrap gui/$(id -u) <plist>`
11. Cloudflare Notifications で「Workers Builds: Build Failed」を有効化。GitHub 側の通知設定は不要（Actions が無い）
12. main に Branch protection を**付けない**（bot 経路が push できなくなる）
13. 動作確認: `~/ops/grok-fun.com/ops/grok-run.sh ingest` を手で 1 回起動し、ログの `RESULT:` → commit → Workers Builds deploy → `/news/2026/<slug>/` に「自動生成」表示が出るまでを見る。次に `launchctl kickstart gui/$(id -u)/com.grok-fun.ingest` で launchd 経由でも 1 回。以後は見ない

### ファイル

```
.grok/ops/ingest.md  .grok/ops/reverify.md
ops/grok-run.sh  ops/com.grok-fun.ingest.plist  ops/com.grok-fun.reverify.plist
scripts/reverify.mjs
scripts/validate-frontmatter.mjs(拡張)
data/ingest-skip.txt  data/reverified-at.txt  data/demoted.json
src/components/AutoNotice.astro
```

`.github/workflows/` は作らない。

### 環境変数 / 認証情報

| 名前 | 場所 | 用途 |
|---|---|---|
| Grok ログイン | この Mac `~/.grok/auth.json` | 取り込み・再検証。従量の `XAI_API_KEY` は使わない |
| `GROK_MODEL` | launchd plist `EnvironmentVariables` | モデル ID 固定 |
| `PATH` | launchd plist `EnvironmentVariables` | `grok`、`pnpm`、`node`、`git`、`jq` の解決 |
| ssh 鍵 | この Mac の Keychain | `git push origin main` |

GitHub Actions secret は存在しない。Cloudflare API トークンはこの Mac の運用経路に置かない。

## フェーズ 2: コミュニティ（Worker + D1 + Turnstile）

### 手順

1. Cloudflare ダッシュボードで Turnstile ウィジェット作成（ドメイン `grok-fun.com`、Managed）。サイトキーとシークレットを控える
2. `pnpm exec wrangler d1 create grok-fun-community` → `database_id` を `wrangler.jsonc` に
3. `migrations/0001_init.sql`（architecture.md のスキーマ）→ `pnpm d1:migrate:local` / `pnpm d1:migrate`
4. `wrangler.jsonc` に `main: "worker/index.ts"`、`d1_databases`、`assets.binding: "ASSETS"` を追加。**`run_worker_first: false` を明記**
5. `worker/index.ts`: `/api/reactions` `/api/comments` の GET / POST。それ以外は `env.ASSETS.fetch()`
6. シークレット: `pnpm exec wrangler secret put TURNSTILE_SECRET_KEY`。ローカルは `.dev.vars`
7. `src/components/ReactionBar.astro`, `CommentList.astro`: 静的 HTML（JS なしでも「読み込み中」ではなく「いま反応を受け付けていません」が初期表示、JS が成功したら置き換え）
8. `src/scripts/widget.ts`: fetch、劣化処理、localStorage による二度押し抑止、textContent 描画
9. Turnstile の `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer>` をコメントフォームのあるページのみに。サイトキーは `PUBLIC_TURNSTILE_SITE_KEY` からビルド時に埋める
10. CSP に `challenges.cloudflare.com` を確認
11. WAF レートリミット 1 ルール: `/api/comments` POST を IP あたり 10 req / 10 min
12. `migrations/0002_moderation.sql`: `comments.ip_hash TEXT NOT NULL`、`reports(comment_id, ip_hash, created_at)` + `UNIQUE(comment_id, ip_hash)`
13. `pnpm exec wrangler secret put IP_HASH_SALT`。Worker は `HMAC-SHA256(salt, cf-connecting-ip)` 先頭 16 バイトを保存。生 IP は保存しない
14. `worker/reports.ts`: `POST /api/reports {comment_id, turnstile_token}`。異なる `ip_hash` が 3 つで `hidden=1`
15. `worker/index.ts`: 同一 `ip_hash` × 同一 slug の 60 秒以内再投稿を 429（既存行の SELECT 1 回）
16. `moderation/blocklist.txt` を `worker/blocklist.ts` にビルド時生成（`scripts/build-blocklist.mjs` を `build` の先頭に）。部分一致で 400
17. `wrangler.jsonc` に `"triggers": { "crons": ["0 18 * * *"] }`。`scheduled` ハンドラで `created_at < now-90d` の comments / reports を DELETE
18. **キルスイッチ**: `COMMENTS_DISABLED` を `env` から読み、`1` なら POST 系 503 + GET 空配列。`widget.ts` は `comments_disabled` を受けて「コメントは現在停止中です」を表示、リアクションは継続。`wrangler secret put COMMENTS_DISABLED` → `1` で ON、`secret delete` で OFF。**ローカルで ON / OFF を一度ずつ確認**
19. `CommentList.astro` に通報ボタン（Turnstile 共用）

### ファイル

```
wrangler.jsonc(更新)
worker/index.ts
worker/{reactions,comments,reports,turnstile,json,blocklist}.ts
migrations/0001_init.sql  migrations/0002_moderation.sql
moderation/blocklist.txt  scripts/build-blocklist.mjs
src/components/ReactionBar.astro  src/components/CommentList.astro
src/scripts/widget.ts
.dev.vars(gitignore)
```

### 環境変数

| 名前 | 場所 | 用途 |
|---|---|---|
| `TURNSTILE_SECRET_KEY` | Worker secret（`wrangler secret put`）、ローカルは `.dev.vars` | siteverify |
| `PUBLIC_TURNSTILE_SITE_KEY` | ビルド時 env（Workers Builds の環境変数、ローカルは `.env`） | HTML に埋める公開キー |
| `IP_HASH_SALT` | Worker secret | 通報・重複投稿の IP ハッシュ |
| `COMMENTS_DISABLED` | Worker secret（通常は存在しない） | キルスイッチ。`1` で投稿停止 |

Astro は `PUBLIC_` 接頭辞のみクライアントに露出する。シークレットには付けない。

## フェーズ 3: 残りハブ、X Tips、広告

1. `/voice/` `/automations/` `/api/`（初期 `coverage: index`。目次 + 一次情報リンクのみ）
2. X Tips: **v1 では自動収集しない**（operations.md）。オーナーが手で書く場合に限り「引用 + リンク + 日付」で `/tips/` に。無人運用では存在しない機能として扱う
3. X コミュニティへの導線（静的リンク）
4. AdSense: **公開後に判断**（PV 基準は置かない。オーナー決定 2026-09-08）。導入時に CSP を `Report-Only` に落とす判断。それまで GTM の広告タグは空
5. 3 か月レビュー: Tier A 20 位以内が 0 件なら方針転換。コメント 30 件未満ならフォーム撤去
6. 任意: 月次 `wrangler d1 export`
7. 3 か月無事故で ingest が回っていれば、X Tips の自動化を再検討（operations.md の条件）

## テスト方針

| 層 | 方法 | いつ |
|---|---|---|
| 型 / テンプレート | `astro check` | 毎ビルド |
| frontmatter | `validate-frontmatter.mjs`（必須項目、日付形式、`coverage` 列挙、`source_url` の URL 形式） | 毎ビルド |
| 内部リンク | `check-links.mjs`（dist/ 内の `href` を走査） | 毎ビルド |
| 静的ファイル数 | `count-assets.mjs`（15,000 超で警告、20,000 で exit 1） | 毎ビルド |
| wrangler 設定 | `pnpm build` 内で `run_worker_first` が false であることを grep | 毎ビルド |
| ingest 検証 | `vitest` で `validate-frontmatter.mjs` の `auto: true` 分岐。翻訳化（要約 600 文字超）、引用 120 文字超 / 3 本以上、未来日付、禁止語「翻訳」で exit 1 になること。fixture は `auto: true` の Markdown 数本 | フェーズ 1.5 から |
| 運用経路 | `ops/grok-run.sh ingest` を手で 1 回、`launchctl kickstart` で 1 回。ログに `RESULT:` が出て commit → deploy まで通ること。deny ルールの確認: プロンプトに `git add -A` を書いた試験プロンプトで拒否されること | フェーズ 1.5 完了時 |
| Worker | `vitest` + `@cloudflare/vitest-pool-workers`。slug 検証、emoji 許可リスト、body 長、Turnstile 失敗時 403、D1 例外時 503、blocklist 400、3 通報で hidden、`COMMENTS_DISABLED=1` で 503 | フェーズ 2 から |
| 劣化 | `wrangler dev` で D1 binding を外して起動し、記事が表示されウィジェットが劣化表示になることを手動確認 | フェーズ 2 完了時 |
| ヘッダ | `curl -sI https://grok-fun.com/ \| grep -i content-security-policy` | デプロイ後 |
| 静的配信が Worker を通っていないこと | ダッシュボードの Worker request 数が `/api/*` 呼び出し数と一致することを確認 | フェーズ 2 完了時 |

E2E（Playwright）は v1 では持たない。ページ数が 50 を超えたら検討。

## リスク（実装フェーズ固有）

| リスク | フェーズ | 対策 |
|---|---|---|
| 9/11 に間に合わない | 1 | `/pricing/` と `/models/grok-4-6/` を最優先。ハブは `coverage: index` で先に置く |
| Workers Builds が pnpm を検出しない | 0 | `packageManager` フィールドを `package.json` に。`corepack` 不要の設定 |
| `astro check` が Node 25 で警告 | 0 | `.node-version` で LTS を指定。Workers Builds も同じ |
| Turnstile のテストキーを本番に置く | 2 | `.dev.vars` のみに置く。`wrangler secret put` は手で叩く |
| Worker のバンドルに Astro のコードが混ざる | 2 | `worker/` は `src/` を import しない。tsconfig を分ける |
| D1 migration を本番に当て忘れ | 2 | 503 が出たら最初に疑う。README に手順 |
| ingest が x.ai/news の構造変更で止まる | 1.5 | 抽出 0 件で `RESULT: failed`（無音で止まらない）。失敗通知が連日なら `.grok/ops/ingest.md` を直す。本番は壊れない |
| ingest の生成が翻訳になる | 1.5 | `validate-frontmatter.mjs` の要約長・引用長チェックで build を落とす。引用の実在はプロンプト依存（build では検査できない） |
| Grok の運用セッションが想定外のファイルを触る | 1.5 | deny ルール（worker、wrangler.jsonc、ops、.grok、force push、`git add -A`）。プロンプトの約束ではなく機械の制約 |
| bot の push とオーナーの push が衝突 | 1.5 | `git pull --rebase`。衝突したら失敗、次の起動で ops clone を `origin/main` に揃え直す |
| Mac がスリープ / 電源断 / ログアウト | 1.5 | launchd が復帰時にまとめて 1 回実行。SLA は Mac が起きている間だけ。常時稼働と自動ログインは一度きりの設定 |
| `grok` の更新で headless のフラグや exit code が変わる | 1.5 | `grok update` を自動化しない。失敗通知が続いたら wrapper を直す |
| 一人運用で SLA を割る | 1〜3 | `coverage` を下げる。落とすのは恥ではなく設計 |

## 未決定（着手前にオーナー）

- ブランド許諾メール（magi-verdict.md。**任意**。送らなくても公開してよい）
- ~~サイト名の副題構成~~ → 決定: Grok JP ／ ファンコミュニティ（非公式）
- ~~AdSense の PV 基準~~ → 決定: 公開後に判断
