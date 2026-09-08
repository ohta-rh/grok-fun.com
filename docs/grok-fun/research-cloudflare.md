# Cloudflare 調査: 無料枠で静的サイト + 最小 API を運用する

- 日付: 2026-09-08
- 目的: PoC を $0 で回すために、公式の Free プラン制限と構成の前提を固定する
- 出典: Cloudflare 公式ドキュメント（developers.cloudflare.com の Limits / Pricing ページ）。数値は 2026-09 時点。変更され得るので、実装時に再確認する

## 結論

- **静的アセットは無料・無制限。** Worker を呼ばない限り、記事の配信は Free プランの request 上限を消費しない。
- **Worker は `/api/*` だけ。** コメントとリアクションの API のみ Worker を通す。1 日 100k request の枠はこの用途なら十分。
- **DB は D1。** 読み 500 万 / 書き 10 万 per day、5 GB。KV は書き 1,000 / day で UGC には足りない。
- **Pages は使わない。** 公式が「新規プロジェクトは Workers で」と明記。Static Assets + Worker が正。
- **Turnstile は無料。** コメント POST のボット対策に使う。

## Free プラン制限（公式）

| サービス | 項目 | Free 上限 | このサイトでの見込み |
|---|---|---|---|
| Workers | request | 100,000 / day（**静的アセットへの request は除外**） | `/api/*` のみ。PoC 期は 1 日数百 |
| Workers | CPU 時間 | 10 ms / invocation | D1 の 1〜2 クエリ + JSON 返却で余裕 |
| Workers | Static Assets | **request 無料・無制限**。ファイル数 20,000、1 ファイル 25 MiB | 記事 + OGP 画像。ファイル数は CI で数える |
| Workers | Cron Triggers | 5 | 使わない（将来: `last_verified` 警告の再ビルド） |
| Workers Builds | ビルド時間 | 3,000 分 / month、同時 1、タイムアウト 20 分 | Astro ビルド 1〜3 分 × 日数回で余裕 |
| D1 | 読み | 5,000,000 rows / day | コメント一覧 + リアクション集計。記事ごとの GET で数十 rows |
| D1 | 書き | 100,000 rows / day | コメント + リアクション increment。PoC で 1 日 1,000 に届かない |
| D1 | 容量 | 5 GB 合計、1 DB あたり 500 MB（Free） | テキストのみ。数年分入る |
| KV | 読み | 100,000 / day | 使わない |
| KV | 書き | **1,000 / day** | UGC には不足。リアクションの連打で当日中に枯れる |
| R2 | ストレージ | 10 GB / month | 使わない（画像はリポジトリ内の静的アセット） |
| R2 | egress | 無料 | 同上 |
| Turnstile | 全機能 | 無料（ウィジェット数の上限あり、個人サイトには十分） | コメント POST に必須 |
| Web Analytics | 全機能 | 無料 | 使う。CSP に `static.cloudflareinsights.com` を追加 |

## Pages と Workers の関係

- Cloudflare Pages のドキュメントに「Start new projects with Workers」の案内がある。Pages は維持モードで、新機能は Workers Static Assets 側に入る。
- 移行の手間を避けるため、**最初から Workers Static Assets で始める。** Pages の `_headers` / `_redirects` は Static Assets でも同じ書式で読まれる。

## 配信順序（assets-first）

Workers Static Assets の既定は **静的アセット優先**。リクエストパスが `assets.directory` 配下のファイルに一致すれば Worker は起動しない。一致しないパスのみ Worker の `fetch` に渡る。

```
GET /grok/pricing/        -> dist/grok/pricing/index.html を返す。Worker 起動なし。無料
GET /api/comments?slug=x  -> dist に無い。Worker 起動。100k/day を 1 消費
GET /nonexistent          -> dist に無い。Worker 起動。Worker が 404 を返す（後述）
```

### `run_worker_first` は false

- `run_worker_first: true` にすると全リクエストが Worker を通り、静的配信も request 上限を消費する。**絶対に true にしない。**
- fable-review の指摘 5 では `main` を書かない assets-only を推奨していた。オーナー決定でコミュニティ API を v1 に入れるため、`main` は書く。ただし Worker のコードは `/api/*` 以外を受け取ったら `env.ASSETS.fetch(request)` に渡すか 404 を返すだけにする。

### `not_found_handling`

- `main` がある場合、アセット不一致は Worker に渡る。Worker 側で `/api/*` 以外は `env.ASSETS.fetch(request)` を呼び、Static Assets の `not_found_handling: "404-page"` に `404.html` を返させる。
- これで 404 も静的ページで返るが、**request カウントは 1 消費する**。存在しない URL へのクローラ試行が多い場合、100k/day には遠く及ばないが、`_redirects` で旧 URL を静的に転送して Worker 起動を減らす。

## wrangler 設定の骨子（architecture.md で確定）

```jsonc
{
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
    { "binding": "DB", "database_name": "grok-fun-community", "database_id": "<set after create>" }
  ],
  "observability": { "enabled": true }
}
```

## Turnstile

- サイトキー（公開、HTML に埋める）とシークレットキー（Worker のみ）の 2 つ。
- 検証は Worker から `https://challenges.cloudflare.com/turnstile/v0/siteverify` に POST。外部 fetch 1 回。CPU 10 ms には影響しない（待ち時間は CPU 時間に含まれない）。
- CSP: `script-src https://challenges.cloudflare.com`、`frame-src https://challenges.cloudflare.com`。
- 無効化モード（Managed / Non-interactive / Invisible）は Managed で開始。日本語 UI は自動。

## D1 の使い捨て前提

- オーナー決定: **データ消失は許容。** バックアップ運用は組まない。
- ただし `wrangler d1 export` は無料で叩けるので、フェーズ 3 で月 1 の手動 export を「やってもよい」項目として残す。
- 割当超過時（書き 100k/day）は D1 が例外を返す。Worker は 503 を返し、フロントは「いま反応を受け付けていません」を表示する。静的記事は影響を受けない。

## Workers Builds（自動デプロイ）

- GitHub `ohta-rh/grok-fun.com` を接続。本番ブランチ `main` への push で自動ビルド + デプロイ。非本番ブランチはプレビュー URL。
- ビルドコマンド: `pnpm install --frozen-lockfile && pnpm build`。`pnpm` は Workers Builds が lockfile から検出する。
- デプロイコマンド: `pnpm exec wrangler deploy`。
- 品質ゲート（`astro check`、frontmatter 検証、リンク検査）は `pnpm build` の中に入れ、落ちたらデプロイも止まるようにする。

## カスタムドメイン

- `grok-fun.com` を Cloudflare DNS に置く（レジストラは問わない）。
- Worker の `routes` に `{ "pattern": "grok-fun.com", "custom_domain": true }` を追加。`www` は `_redirects` または DNS 側でルート宛に 301。

## 未確認・要再確認

- D1 Free の「1 DB あたり 500 MB」は Paid では 10 GB。Free の数値は実装時に Limits ページで再確認する。
- Turnstile のウィジェット上限（Free で 10 個前後とされる）は変更され得る。使うのは 1 個。
- Workers Static Assets の 20,000 ファイル上限は Free / Paid 共通。OGP 画像を記事ごとに生成し始めたら効く。
