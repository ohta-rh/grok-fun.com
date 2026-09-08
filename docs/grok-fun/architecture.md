# アーキテクチャ設計: grok-fun.com

- 日付: 2026-09-08
- 前提: magi-verdict.md の凍結事項とオーナー決定に従う
- 関連: research-cloudflare.md（制限値）、research-seo-content.md（スキーマ）、implementation-plan.md（手順）、operations.md（無人運用）、content-strategy.md（ローンチ戦略。**初回公開は assets-only の静的サイト。** Worker と D1 は次のスライス）
- 2026-09-08 追記: 分析を Cloudflare Web Analytics から **Google Tag Manager `GTM-NQMPJ2FS`** に変更。CSP を更新。サイト名は **Grok JP**

## 概要

Grok シリーズ 7 製品（chat / Bot / Build / Imagine / Voice / Automations / API）の**非公式日本語リファレンス**。記事は Astro で静的生成し、Cloudflare Workers Static Assets から配信する。記事ごとのリアクションとコメントだけを Worker + D1 で提供する。

設計原則:

1. **記事は静的で、Worker と DB が死んでも動く。** コミュニティ機能は付属品。
2. **Worker は `/api/comments` `/api/reactions` `/api/reports` にしか反応しない。** 静的配信は Worker を通さない。
3. **フォーラムではない。** スレッド、DM、プロフィール、アカウントを作らない。
4. **非公式。** 全ページに非公式バナー。xAI / Grok のロゴ・ワードマーク画像は使わない。
5. **PoC は $0。** Cloudflare Free プランで完結する。取り込みはオーナーの Mac 上の Grok Build（既存契約）で追加課金なし。
6. **無人で回る。** 毎日の人間はいない。取り込みも、モデレーションも、機械が判定する。**GitHub Actions は使わない。** 運用の実行場所はオーナーの Mac（launchd + `grok` CLI）。後述「無人運用」。

## システム全体構成

```
                       ┌──────────────────────────────────────────────┐
  GitHub main push ──> │ Workers Builds                               │
                       │  pnpm install --frozen-lockfile && pnpm build│
                       │  pnpm exec wrangler deploy                   │
                       └──────────────────┬───────────────────────────┘
                                          │ deploy
                                          v
  ┌──────────────────────────────────────────────────────────────────┐
  │ Cloudflare Worker "grok-fun"                                     │
  │                                                                  │
  │  ┌───────────────────────────┐   ┌─────────────────────────────┐ │
  │  │ Static Assets  (dist/)    │   │ worker/index.ts             │ │
  │  │  記事 HTML / CSS / JS      │   │  GET  /api/reactions?slug=  │ │
  │  │  OGP / sitemap / rss      │   │  POST /api/reactions        │ │
  │  │  _headers (CSP)           │   │  GET  /api/comments?slug=   │ │
  │  │  robots.txt / favicon     │   │  POST /api/comments         │ │
  │  │  404.html                 │   │  else -> env.ASSETS / 404   │ │
  │  └───────────▲───────────────┘   └──────┬──────────────┬───────┘ │
  │              │ 一致すれば Worker 起動なし   │              │         │
  └──────────────┼──────────────────────────┼──────────────┼─────────┘
                 │                          v              v
                 │                     ┌─────────┐   ┌────────────┐
                 │                     │ D1      │   │ Turnstile  │
                 │                     │ comments│   │ siteverify │
                 │                     │reactions│   └────────────┘
                 │                     └─────────┘
                 │
  ブラウザ ───────┘  記事を読む（静的）
      └── 記事下のウィジェット JS が /api/* を fetch。失敗したら「いま反応を受け付けていません」
```

配信順序: リクエストパスが `dist/` 内のファイルに一致すれば Static Assets が直接返す（Worker 起動なし、無料・無制限）。一致しなければ Worker の `fetch` が呼ばれ、`/api/*` なら処理、それ以外は `env.ASSETS.fetch()` に渡して 404 ページを返す。

## 技術スタック選定

| 層 | 選定 | 理由 | 却下した案 |
|---|---|---|---|
| 静的生成 | **Astro 7.x** `output: 'static'`、adapter なし | Content Collections で frontmatter スキーマを型検証できる。Markdown 中心のサイトに最適。JS を出さない | Next.js（SSR 前提の重さ）、Hugo（スキーマ検証が弱い） |
| コンテンツ | Markdown + Content Collections（zod スキーマ） | `last_verified` / `coverage` をビルドで強制できる | CMS（運用コストと $0 制約） |
| ホスティング | **Cloudflare Workers Static Assets** | 静的 request 無料・無制限。Pages は維持モード | Pages（新規非推奨）、Vercel（無料枠の商用制限） |
| API | **Cloudflare Worker**（`worker/index.ts`、依存なし、素の `fetch` handler） | `/api/*` 2 本に Hono 等は不要。CPU 10 ms 内 | Hono（依存を増やす価値が無い）、Pages Functions（Pages 自体を使わない） |
| DB | **Cloudflare D1** | 読み 5M / 書き 100k per day。SQL で集計できる | KV（書き 1,000/day で不足）、Durable Objects（Free で使えるが過剰）、外部 DB（$0 と遅延） |
| ボット対策 | **Cloudflare Turnstile** | 無料。コメント POST のみ | reCAPTCHA（Google 依存）、なし（スパムで即死） |
| パッケージ | **pnpm** | 凍結事項。lockfile を commit | npm（Fable 指摘 6） |
| デプロイ | **Workers Builds**（main 自動）+ `wrangler` devDependency | オーナーの手元にも入っているが pin する。この Mac からは happy path で `wrangler deploy` しない | GitHub Actions からの deploy、この Mac からの deploy（Workers Builds で足りる） |
| 品質ゲート | **`pnpm build` 同梱の 3 ゲート**（`astro check`、frontmatter 検証、リンク検査）。この Mac で push 前に走り、Workers Builds でも同じコマンドが走る | 二重実行で十分。落ちたら commit されない / deploy されない | GitHub Actions `ci.yml`（オーナー決定で不使用） |
| 取り込み | **この Mac の launchd + Grok Build（`grok` CLI headless、1 日 2 回）** | Grok が x.ai/news を取得し要約 Markdown を書き、`pnpm build` → commit → push まで 1 セッションで行う。Worker の CPU 10 ms では不可能。既存の Grok ログインで動き、従量 API キー不要 | GitHub Actions cron（オーナー決定で不使用）、Worker Cron Trigger（CPU 制限）、xAI API 直叩き（Grok Build で足りる） |
| コメント掃除 | **Worker Cron Trigger**（1 日 1 回、Free 5 本中 1 本） | D1 の DELETE 1〜2 文。10 ms で足りる。Cloudflare 側で完結し、この Mac の稼働に依存しない | この Mac からの `wrangler d1 execute`（API トークンを運用経路に置きたくない） |
| 分析 | **Google Tag Manager `GTM-NQMPJ2FS`**（初日から。オーナー準備済み） | GA4 と将来の広告タグを 1 つのコンテナで管理。読み込みは `src/scripts/gtm.ts` を Astro がバンドルした**外部 JS**（インライン snippet なし。`vite.build.assetsInlineLimit: 0` で inline 化を禁止）+ `<noscript>` iframe。広告タグは公開後まで GTM 内で空 | Cloudflare Web Analytics（主計測にしない。補助で有効化してもよい） |
| フォント | Fontsource（self-host） | 有料 CDN 不要。visual-design.md 参照 | Google Fonts（外部 fetch と CSP） |

### バージョン pin（実装時に最新へ更新）

```
astro ^7
@astrojs/sitemap, @astrojs/rss
wrangler ^4 (devDependency)
@cloudflare/workers-types (devDependency)
typescript ^5
```

## コスト見積もり（PoC $0）

| 項目 | 月額 | 根拠 |
|---|---|---|
| ドメイン `grok-fun.com` | 取得済み（年額のみ） | オーナー負担、既存 |
| Workers Static Assets | $0 | 静的 request 無料・無制限 |
| Worker `/api/*` | $0 | Free 100k/day。PoC 期は 1 日 1,000 未満 |
| D1 | $0 | Free 5M 読み / 100k 書き per day、5 GB |
| Turnstile | $0 | 無料 |
| Workers Builds | $0 | 3,000 分/month。日 5 回ビルド × 3 分 = 450 分 |
| Google Tag Manager / GA4 | $0 | 無料 |
| Fontsource | $0 | npm パッケージ。self-host |
| **合計** | **$0** | |

超過シナリオ: `/api/*` が 100k/day を超えるのは、記事あたりの API 呼び出しが 2 本（reactions GET + comments GET）として **1 日 5 万 PV**。その時点で Workers Paid（$5/month）に上げる。到達したら喜ぶべき数字。

## データフロー

### 記事の配信

```
git push main
  -> Workers Builds: pnpm build（astro check + frontmatter 検証 + リンク検査 + astro build）
  -> wrangler deploy（dist/ を Static Assets へ、worker/index.ts を Worker へ）
  -> GET /imagine/limits/  -> Static Assets が index.html を返す。Worker 起動なし
```

### リアクション

```
ページ読み込み
  -> widget.js: GET /api/reactions?slug=imagine/limits
  -> Worker: SELECT emoji, count FROM reactions WHERE slug=?
  -> 200 {"reactions":[{"emoji":"👍","count":12},...]}
  -> チップに数字を描画

クリック
  -> widget.js: POST /api/reactions {"slug":"imagine/limits","emoji":"👍"}
  -> Worker: emoji が許可リスト内か検証
           INSERT INTO reactions(slug,emoji,count) VALUES(?,?,1)
             ON CONFLICT(slug,emoji) DO UPDATE SET count=count+1
  -> 200 {"emoji":"👍","count":13}
  -> localStorage に「このスラッグでこの emoji は押した」を記録し、二度押しを UI で抑止（サーバ側の重複排除はしない。集計値なので厳密性不要）
```

### コメント

```
ページ読み込み
  -> widget.js: GET /api/comments?slug=imagine/limits
  -> Worker: SELECT id, nickname, body, created_at FROM comments WHERE slug=? AND hidden=0 ORDER BY created_at DESC LIMIT 50
  -> 200 {"comments":[...]}

投稿
  -> Turnstile ウィジェットがトークンを発行
  -> widget.js: POST /api/comments {"slug","nickname","body","turnstile_token"}
  -> Worker: 1. body 1〜500 文字、nickname 0〜24 文字、slug が ^[a-z0-9/-]+$ を検証
             2. Turnstile siteverify に POST（fetch）
             3. INSERT INTO comments(slug,nickname,body,created_at)
  -> 201 {"id":...,"nickname":...,"body":...,"created_at":...}
  -> 一覧の先頭に追加
```

### 劣化（D1 障害 / 割当超過 / Worker 障害）

```
GET /api/* が 5xx または fetch 失敗
  -> widget.js: リアクションチップは数字なしで無効化、コメントフォームを隠し、
                「いま反応を受け付けていません」を表示
  -> 記事本文は静的なので影響なし
```

D1 が wipe されたら: テーブルが無い → Worker の SELECT が例外 → 503 → 上記劣化。`wrangler d1 migrations apply` を叩けば復旧（データは空）。

## API 設計

共通:

- ベース: 同一オリジン `/api/`。CORS 不要（`Access-Control-Allow-Origin` は出さない）。
- 返却は JSON。`Cache-Control: no-store`。
- エラーは `{"error":"<code>","message":"<日本語>"}`。
- レート制限: Worker 内で `cf-connecting-ip` を鍵にした簡易カウンタは **持たない**（Free では状態を持つ場所が D1 しか無く、書き込みを増やすだけ）。Turnstile と Cloudflare の WAF レートリミット（Free で 1 ルール）に任せる。
- slug は `^[a-z0-9][a-z0-9/-]{0,120}$`。実在する記事かは検証しない（静的ビルドの slug 一覧を Worker に持ち込まない。存在しない slug への書き込みはゴミデータだが、使い捨て DB なので許容）。

### `GET /api/reactions?slug=<slug>`

| | |
|---|---|
| 200 | `{"slug":"...","reactions":[{"emoji":"👍","count":12},{"emoji":"🔥","count":3}]}`。許可リストの全 emoji を count 0 でも返す |
| 400 | slug 不正 |
| 503 | D1 失敗 |

### `POST /api/reactions`

| | |
|---|---|
| body | `{"slug":"...","emoji":"👍"}` |
| 200 | `{"emoji":"👍","count":13}` |
| 400 | slug 不正、emoji が許可リスト外 |
| 503 | D1 失敗 |

許可 emoji（v1、5 個で固定）: `👍` `🔥` `🤔` `📌` `😂`。visual-design.md のチップ仕様と一致させる。

### `GET /api/comments?slug=<slug>`

| | |
|---|---|
| 200 | `{"slug":"...","comments":[{"id":1,"nickname":"匿名","body":"...","created_at":"2026-09-08T04:00:00Z"}]}`。最新 50 件、降順 |
| 400 | slug 不正 |
| 503 | D1 失敗 |

### `POST /api/comments`

| | |
|---|---|
| body | `{"slug":"...","nickname":"...","body":"...","turnstile_token":"..."}` |
| 201 | 作成したコメント 1 件 |
| 400 | slug 不正、body 空 / 500 文字超、nickname 24 文字超 |
| 403 | Turnstile 検証失敗 |
| 503 | D1 失敗、Turnstile siteverify 到達不能 |

nickname が空なら `匿名`。HTML はサーバ側でエスケープせず生で保存し、**描画側で必ず textContent に入れる**（innerHTML 禁止）。URL の自動リンク化はしない。

### D1 スキーマ

```sql
-- migrations/0001_init.sql
CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT    NOT NULL,
  nickname   TEXT    NOT NULL DEFAULT '匿名',
  body       TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  hidden     INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_comments_slug_created ON comments(slug, created_at DESC);

CREATE TABLE IF NOT EXISTS reactions (
  slug  TEXT NOT NULL,
  emoji TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (slug, emoji)
);
```

`hidden` は自動モデレーション用。3 つの異なる IP ハッシュから通報が来ると Worker が `hidden=1` にする（手動 `UPDATE` は最終手段）。オーナー指定の 4 列（slug, nickname, body, created_at）に `id` と `hidden` を足しただけ。無人運用で `comments.ip_hash` と `reports` テーブルを `0002_moderation.sql` で追加する（operations.md）。

### Worker の骨子

```ts
// worker/index.ts
export interface Env { DB: D1Database; ASSETS: Fetcher; TURNSTILE_SECRET_KEY: string }

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (url.pathname === '/api/reactions') return handleReactions(req, env)
    if (url.pathname === '/api/comments')  return handleComments(req, env)
    if (url.pathname.startsWith('/api/'))  return json({ error: 'not_found' }, 404)
    return env.ASSETS.fetch(req)  // 静的に無かったパス -> 404.html
  },
}
```

## wrangler 設定

```jsonc
// wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "grok-fun",
  "main": "worker/index.ts",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "404-page",
    "html_handling": "auto-trailing-slash",
    "run_worker_first": false
  },
  "d1_databases": [
    { "binding": "DB", "database_name": "grok-fun-community", "database_id": "<wrangler d1 create の出力>", "migrations_dir": "migrations" }
  ],
  "routes": [{ "pattern": "grok-fun.com", "custom_domain": true }],
  "observability": { "enabled": true }
}
```

`run_worker_first` は **false 固定**。true にすると全 request が Worker を通り、静的配信が Free 枠を食う。レビューで必ず見る項目。

## セキュリティヘッダ（`public/_headers`）

```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com; frame-src https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self'; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/api/*
  Cache-Control: no-store
```

インライン script を出さない（Astro の `<script>` は外部ファイルにバンドルされる。**小さな script が inline 化されないよう `vite.build.assetsInlineLimit: 0`、CSS は `build.inlineStylesheets: 'never'`、Markdown の Shiki は `style` 属性を吐くので `syntaxHighlight: false`**）。GTM は `googletagmanager.com` を script-src / frame-src / img-src に、GA4 の送信先を connect-src に許可する。GTM の「カスタム HTML」タグはインライン script になり CSP に落ちるので使わない（GA4 タグと将来の広告タグは GTM 組み込みタグで足りる）。`challenges.cloudflare.com` は Turnstile（フェーズ 2）用で、初回公開の `_headers` には入れなくてよい。AdSense 導入時は CSP を `Report-Only` に落とす判断を公開後に予定。

## 非公式表示

- 全ページ上部に固定バナー: 「このサイトは Grok の非公式ファンコミュニティです。xAI とは関係ありません。」
- フッターにも同文 + 「Grok は xAI の商標です」。
- ロゴ・ワードマーク画像は使わない。favicon / OGP はオリジナル（visual-design.md）。
- サイト名は **Grok JP**、タグライン **ファンコミュニティ（非公式）**（magi-verdict.md オーナー決定）。ヘッダは文字組みのみ。

## 無人運用

毎日の人間はいない。運用の凍結事項は **operations.md** にある。ここでは構成への影響だけ書く。

```
  オーナーの Mac（runtime host）
  ┌────────────────────────────────────────────────────────────────────────────────┐
  │ launchd com.grok-fun.ingest (10:00 / 22:00 JST + RunAtLoad)                    │
  │   └> ops/grok-run.sh ingest                                                    │
  │        └> grok --prompt-file .grok/ops/ingest.md  (headless, deny ルール付き)   │
  │             x.ai/news ──> 要約 + 引用 + リンク + 日付の Markdown                 │
  │             ──> pnpm build（3 ゲート）──> git add <paths> ──> commit            │
  │             ──> pull --rebase ──> push origin main                             │
  │        失敗: commit しない。macOS 通知 + ログ。次の起動                          │
  │ launchd com.grok-fun.reverify (月曜 11:00 JST)                                 │
  │   └> grok --prompt-file .grok/ops/reverify.md                                  │
  │        node scripts/reverify.mjs（source_url HEAD、coverage 降格、再ビルドスタンプ）│
  │        ──> pnpm build ──> commit ──> push                                      │
  └──────────────────────────────────────┬─────────────────────────────────────────┘
                                         │ push
                                         v
  Workers Builds: pnpm install --frozen-lockfile && pnpm build && wrangler deploy（失敗はメール）

  Cloudflare（この Mac が寝ていても動く）
  Worker Cron Trigger (daily) ── DELETE comments/reports WHERE created_at < now-90d
  Worker secret COMMENTS_DISABLED=1 ── POST /api/comments, /api/reports を 503。GET は空。リアクションは継続
```

- **GitHub Actions は使わない。** `.github/workflows/` を作らない。品質ゲートは `pnpm build` に同梱し、この Mac（push 前）と Workers Builds（deploy 前）で二重に走る。
- **取り込みは Worker に置かない。** x.ai/news の取得 + LLM 生成は Worker の CPU 10 ms / invocation に収まらないし、Worker に LLM の鍵を置く理由もない。この Mac の Grok Build が走らせ、main に push するだけ。deploy は従来どおり Workers Builds。
- **実行用チェックアウトは別 clone**（`~/ops/grok-fun.com`）。開発中の作業ツリーに bot が commit しない。
- **Mac がスリープしたら止まる。** launchd が復帰時に 1 回まとめて実行する。SLA は Mac が起きている間だけ成立する（オーナー決定）。
- **コメント掃除は Worker Cron Trigger。** `wrangler.jsonc` に `"triggers": { "crons": ["0 18 * * *"] }` と `scheduled` ハンドラを足す。Free 5 本のうち 1 本。
- **Worker に追加する API は `POST /api/reports` の 1 本。** 3 つの異なる IP ハッシュで `hidden=1`。IP は HMAC でハッシュし生値は保存しない。
- **レートリミットの緩和。** 上記 API 設計の「Worker 内にカウンタを持たない」は維持しつつ、同一 IP ハッシュの同一 slug への 60 秒以内再投稿は既存行の SELECT 1 回で 429 にする。書き込みは増えない。
- **キルスイッチは secret。** `vars` は deploy で上書きされるが secret は残る。`wrangler secret put COMMENTS_DISABLED` で入れ、`secret delete` で戻す。
- **記事は無人運用でも静的のまま。** ingest が壊れても、D1 が消えても、前回のサイトが配信され続ける。

## ローカル開発

```
pnpm install
pnpm dev                       # astro dev（記事の執筆・確認。API はモック応答）
pnpm build                     # check + validate + astro build -> dist/
pnpm preview                   # wrangler dev（dist/ + Worker + ローカル D1）
pnpm exec wrangler d1 migrations apply grok-fun-community --local
```

- `pnpm dev` 中は `/api/*` が無いので、widget.js は fetch 失敗 → 劣化表示になる。これは正常。コミュニティ機能を触るときは `pnpm preview`。
- `.dev.vars` に `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA`（Cloudflare 公式のテスト用シークレット、常に成功）。サイトキーは `1x00000000000000000000AA`（常に通過）。
- `.dev.vars` と `.tmp_*/` は gitignore。

ディレクトリ:

```
grok-fun.com/
  astro.config.mjs
  wrangler.jsonc
  package.json  pnpm-lock.yaml
  src/
    content.config.ts          # zod スキーマ（frontmatter 必須項目）
    content/
      products/                # ハブ: chat.md bot.md build.md ...
      guides/                  # getting-started, 各製品の使い方
      news/2026/               # ニュース要約
      models/                  # grok-4-6.md ...
      pricing.md
    layouts/Base.astro         # 非公式バナー、JSON-LD、OGP、canonical
    components/
      UnofficialBanner.astro
      StaleBanner.astro        # last_verified 60 日超
      CoverageBadge.astro
      ReactionBar.astro        # チップの静的 HTML。JS は widget.ts
      CommentList.astro        # フォーム + 一覧の静的 HTML
    scripts/widget.ts          # /api/* を叩く唯一のクライアント JS
    pages/                     # ルーティング
    styles/                    # tokens.css, base.css
  public/
    _headers  robots.txt  404.html(ビルドで生成)  favicon.svg  og-default.png
    # _redirects は置かない: Workers Static Assets は相対パスのみで、www → apex の絶対 URL 行は deploy が拒否する（Cloudflare の Redirect Rule で行う）
  worker/index.ts
  migrations/0001_init.sql
  scripts/
    validate-frontmatter.mjs   # build 前
    check-links.mjs            # build 後
    count-assets.mjs           # 20,000 ファイル上限の監視
    reverify.mjs               # 週次の source_url 再検証
  .grok/ops/                   # Grok Build に --prompt-file で渡す運用プロンプト（ingest.md, reverify.md）
  ops/                         # launchd wrapper（grok-run.sh）と plist 雛形
  .githooks/pre-push           # オーナーの手 push にも pnpm build を掛ける
  docs/grok-fun/               # この設計群
```

`.github/workflows/` は無い。

## リスク

| リスク | 影響 | 対策 |
|---|---|---|
| ドメインがブランドガイドライン抵触で取り下げ要求 | サイト消滅 | magi-verdict.md 未決定項目。Markdown を git に持つのでドメイン移転は低コスト |
| `run_worker_first: true` を誰かが入れる | 静的配信が Free 枠を消費し 100k/day で停止 | wrangler.jsonc のレビュー項目。`pnpm build` 内で `grep run_worker_first.*false` を強制。Grok の運用セッションは `wrangler.jsonc` を deny |
| D1 割当超過 / wipe | コミュニティ機能停止 | 劣化表示。記事は無傷。使い捨て前提 |
| コメントスパム | 品質低下 | Turnstile、WAF レートリミット、blocklist、3 通報で自動 `hidden`、90 日削除。止まらなければ `COMMENTS_DISABLED`。3 か月で 30 件未満ならフォーム撤去 |
| XSS | ユーザー被害 | 描画は textContent のみ。CSP で inline script 禁止 |
| 静的ファイル 20,000 超 | デプロイ失敗 | `count-assets.mjs` で 15,000 超で警告 |
| Grok 4.7 に間に合わない | 「初回ニュースを逃したサイト」 | implementation-plan.md フェーズ 1 の期限を 9/11 に置く |
| 一人運用で SLA を割る | 信頼低下 | news はこの Mac の launchd + Grok が 12 時間周期で自動取り込み。手で書くページは `coverage` を落として自己申告。頑張らない設計 |
| 取り込みが壊れる（x.ai/news の構造変更、Grok ログイン失効、`grok` のフラグ変更） | 新着が止まる。既存記事は無傷 | commit しないので本番は壊れない。失敗通知が連日出たら見る（operations.md 失敗表） |
| Mac が長期停止（電源断、ログアウト） | 新着が止まる。コメント掃除は Cloudflare 側なので継続 | launchd が復帰時に追いつく。常時稼働と自動ログインは一度きりの設定。承知の上の決定 |
| AdSense 導入で CSP が崩れる | 広告不表示 or セキュリティ低下 | フェーズ 3 で Report-Only に落とす判断を予定 |

## 将来拡張

| 拡張 | 条件 | 変更点 |
|---|---|---|
| 月次 D1 export | 任意 | `wrangler d1 export` を月 1 で手動 |
| 記事ごとの OGP 画像 | 20,000 ファイル上限に余裕があるとき | ビルド時に satori 等で生成。`count-assets.mjs` を先に |
| Workers Paid | `/api/*` が 100k/day 超（1 日 5 万 PV 相当） | $5/month。設定変更なし |
| ニュースレター | Tier B 到達後 | 外部サービス（Buttondown 等）。CSP 追加 |
| X コミュニティ導線 | フェーズ 3 | 静的リンクのみ |
| フォーラム | **PV 月 5 万超 + オーナー再判断** | v1 の設計対象外。D1 スキーマも共有しない前提で別プロジェクト |
