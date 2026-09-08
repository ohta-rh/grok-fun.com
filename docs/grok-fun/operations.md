# 無人運用: grok-fun.com

- 日付: 2026-09-08
- 位置づけ: **オーナー決定（magi-verdict.md）に基づく運用の凍結事項**。MAGI 条件 5「人間マージのみ本番」と「手動削除のみ」を上書きする
- 関連: architecture.md（構成）、implementation-plan.md（フェーズ 1.5 に対応）、research-seo-content.md（frontmatter スキーマ、SLA）
- 2026-09-08 改訂: **GitHub Actions を使わない。** 運用エンジンは **この Mac 上の Grok Build（`grok` CLI）+ launchd**。deploy は従来どおり Workers Builds
- 2026-09-08 追記（content-strategy.md）: **ローンチ期間中、この文書の日次 ingest と週次 reverify は OFF。** 有効化条件は下記「ローンチ期間」節。この節がこの文書の他のすべてに優先する

## ローンチ期間: 取り込みは OFF（content-strategy.md による上書き）

新規ドメインに AI 生成ページを大量投下すると Google に bot 判定される。**ローンチは TIPS 4〜6 本の静的サイトで薄く始め、x.ai/news の自動取り込みは信頼が取れるまで動かさない。**

| 項目 | ローンチ期間中 |
|---|---|
| `com.grok-fun.ingest` / `com.grok-fun.reverify` | **bootstrap しない。** plist は `ops/` に置くだけ |
| `.grok/ops/ingest.md` / `reverify.md` | 書いてよいが走らせない |
| ニュース | オーナーが手で。大きなリリース日に **当日メモ 1 本** だけ（10 ページに分割しない） |
| 12 時間周期の 72 時間 SLA | **停止。** SLA はローンチ期間中は適用しない |

有効化の条件（**両方**を満たし、遅い方の日付で有効化）:

1. Search Console で、公開したページがスパム判定なしにインデックスされていることを確認できた
2. 公開（2026-09-08 予定）から **90 日** 経過

有効化の初週は `ingest.md` の上限を 5 本から 1 本に絞る。以降はこの文書の残りがそのまま有効になる。

## 原則: 毎日の人間はいない

このサイトは**無人で回る**。人間（オーナー）が現れるのは次の 4 場面だけ。

| 場面 | 頻度 | やること |
|---|---|---|
| ブランド法務 | 一度きり | x.ai/legal/brand-guidelines の確認と許諾メールの判断（magi-verdict.md 未決定項目） |
| 広告の申込 | 一度きり | AdSense 等の登録と CSP の判断（フェーズ 3） |
| 失敗が**続く**とき | 稀 | 失敗通知が連日出たら見る。1 回の失敗は見ない（次の起動が再試行する） |
| 違法 UGC / ブランド取り下げ要求 | 稀 | キルスイッチ（後述）を入れる。記事の削除は `git rm` + push |

それ以外に人が介在する工程を作らない。「人がマージする」「人が削除する」「人が確認する」が前提の設計は、この文書に反する。

設計上の帰結:

- **成功は無音。** 通知は失敗だけ（後述）。
- **失敗しても壊れない。** 取り込みが失敗したら何も commit しない。前回のサイトがそのまま残る。
- **人を待たない。** 品質ゲートは `pnpm build` の機械判定。通らなければ捨てる。
- **正直に古くなる。** 追随できなかったページは `coverage` を自動で落とし、`last_verified` のバナーで自己申告する。

## 実行基盤: この Mac が runtime host

| 項目 | 値 |
|---|---|
| 実行場所 | オーナーの Mac（この PC）。クラウドの cron は使わない |
| スケジューラ | launchd（LaunchAgent、ユーザーセッション） |
| 実行エンジン | **Grok Build**（`~/.grok/bin/grok`、headless）。x.ai/news の取得・要約生成・build・commit・push を Grok が 1 セッションで行う |
| 実行用チェックアウト | `~/ops/grok-fun.com`。**開発用チェックアウトとは別 clone**。開発中の作業ツリーに bot が commit する事故を構造で防ぐ |
| プロンプト | リポジトリ内 `.grok/ops/ingest.md` / `.grok/ops/reverify.md`。**`--prompt-file` で渡す。argv に本文を載せない**（`ps` に出る、クォート事故）。注: grok headless は stdin をプロンプトとして読まない（`~/.grok/docs/user-guide/14-headless-mode.md`）ので、stdin ではなく `--prompt-file` が「ファイルから読む」の正解 |
| deploy | **Workers Builds**（main への push を検知）。この PC からは `wrangler deploy` しない（happy path）。Cloudflare API トークンをこの PC の運用に置かない |
| GitHub Actions | **使わない。** `.github/workflows/` を作らない。ci.yml / ingest.yml / reverify.yml は存在しない |

### 起動系統

```
launchd (この Mac)
  com.grok-fun.ingest    10:00 / 22:00 JST + RunAtLoad  -> ops/grok-run.sh ingest
  com.grok-fun.reverify  月曜 11:00 JST                 -> ops/grok-run.sh reverify
        │
        v
ops/grok-run.sh <name>
  lock -> ops clone を origin/main に同期 -> grok --prompt-file .grok/ops/<name>.md -> 結果判定 -> 失敗なら通知
        │
        v
grok (headless, bypassPermissions + deny ルール)
  x.ai/news 取得 -> Markdown 書き出し -> pnpm build -> git add <paths> -> commit -> pull --rebase -> push origin main
        │
        v
Workers Builds: pnpm install --frozen-lockfile && pnpm build && wrangler deploy
```

### Mac がスリープしたら

- launchd の `StartCalendarInterval` は cron と違い、**スリープ中に過ぎた起動を復帰時に 1 回にまとめて実行する**。取り込みは冪等（新規 slug が無ければ何もしない）なので、まとめ実行で問題ない。
- `RunAtLoad: true` で再起動・再ログイン時にも 1 回走る。
- **SLA（72 時間）は Mac が起きている間だけ成立する。** 電源が落ちていれば止まる。それを承知の上での決定。
- 常時稼働は一度きりの設定: 電源アダプタ接続、システム設定「ディスプレイがオフのときに自動でスリープさせない」（または `sudo pmset -c sleep 0`）、自動ログイン ON（LaunchAgent はログインセッションが必要）。

## 日次ループ（取り込み）

```
launchd（1 日 2 回）-> ops/grok-run.sh ingest -> grok --prompt-file .grok/ops/ingest.md
  Grok が行うこと:
  1. https://x.ai/news を取得し /news/<slug> の一覧を抽出（0 件なら RESULT: failed で終了。セレクタ崩れの検知）
  2. src/content/news/** の source_url と突き合わせ、未取得の slug だけ残す。data/ingest-skip.txt にある slug は除外
  3. 上限 5 本。各 slug の原文を取得
  4. 「要約 + 短い引用 + 原文リンク + 日付」の Markdown を src/content/news/<year>/<slug>.md に書く（テンプレは後述）
  5. pnpm build（astro check + frontmatter/news 検証 + astro build + リンク検査 + アセット数）
     落ちたら: 書いたファイルを消して RESULT: failed。commit しない
  6. git add <書いたパス> -> git commit -m "ingest: <slug>[, ...]" -> git pull --rebase origin main -> git push origin main
  7. 最終行に RESULT: ok | nothing | failed
```

Workers Builds が push を検知して deploy する。**ローンチ期間中はこのループは動かない（上記）。** Grok 4.7（9/11〜12 想定）はオーナーの当日メモ 1 本で対応し、このループの初回テストは有効化後に回す。x.ai/news に載れば次の起動で取り込まれる。**人が当日に張り付く必要はない。** 72 時間 SLA（Fable must 4）は 12 時間周期で機械的に満たす。

### `.grok/ops/ingest.md`（プロンプト。趣旨、実装時に確定）

```
あなたは grok-fun.com の取り込みオペレータ。cwd はこのリポジトリ。人は見ていない。

やること: https://x.ai/news の未取得記事を最大 5 本、src/content/news/<year>/<slug>.md に書き、
pnpm build が通ったら commit して push する。

禁止:
- 全文翻訳。要約（300〜600 文字）と、原文からそのまま切り出した英語の引用（各 120 文字以内、最大 2 本）だけ
- 引用の改変・要約・意訳。原文の部分文字列として一致するものだけ
- 数値・モデル名・日付・料金を推測で補うこと
- title / description / ファイル名に「翻訳」を入れること
- git add -A / git add . / force push / wrangler / rm -rf / git reset / ブランチ作成
- src/content/news/ 以外への書き込み（data/ingest-skip.txt を除く）

手順:
1. https://x.ai/news から /news/<slug> を列挙。0 件なら何もせず RESULT: failed
2. grep で src/content/news の source_url と突き合わせ、未取得だけ残す。data/ingest-skip.txt の slug は除外
3. 各記事の原文を取得し、テンプレどおりの Markdown を書く（frontmatter は必須項目すべて）
4. 本文が取れない・動画のみ・テンプレに収まらない記事は書かず、slug を data/ingest-skip.txt に追記
5. pnpm build。失敗したら書いたファイルを削除して RESULT: failed（skip.txt の変更も戻す）
6. git add <書いたファイルのパス> data/ingest-skip.txt; git commit -m "ingest: <slug>..."; git pull --rebase origin main; git push origin main
7. push まで成功したら RESULT: ok。新規 0 件なら RESULT: nothing。それ以外は RESULT: failed
最終行は必ず RESULT: <ok|nothing|failed> だけ。
```

### 記事テンプレ（`pnpm validate` が検査する）

```markdown
---
title: 日本語タイトル（60 文字以内。原題の直訳ではなく要点）
description: 120 文字前後
product: chat | bot | build | imagine | voice | automations | api | series
last_verified: <run 日>
source_url: ["https://x.ai/news/<slug>"]
coverage: full
published_at: <原文の日付 YYYY-MM-DD>
auto: true
---

## 要約

（300〜600 文字。事実: 料金、制限値、モデル ID、日付を優先）

## 引用

> （原文そのまま、英語、120 文字以内）

## 原文

https://x.ai/news/<slug>（<published_at>）
```

`auto: true` は隠さない。「正直な鏡」の一部。ページに「この要約は自動生成です。原文を確認してください」を出す。人が手で直したら `auto` を外してよい。

### 機械チェック（`pnpm build` に同梱。落ちたら commit なし）

| チェック | 基準 | 落ちたときの意味 |
|---|---|---|
| frontmatter | 必須項目、日付形式、`coverage` / `product` 列挙、`source_url` の URL 形式 | スキーマ違反 |
| 要約の長さ | `## 要約` 節が 600 文字以下 | 翻訳になりかけている |
| 引用の長さ・本数 | `## 引用` の blockquote が各 120 文字以下、2 本以下 | 引用の範囲を超えている |
| 日付 | `published_at` が run 日より未来でない | 日付の捏造 |
| 禁止語 | title / description / ファイル名に「翻訳」を含まない | Fable must 2 違反 |
| ビルド | `astro check`、`astro build`、リンク検査、アセット数、`run_worker_first: false` の grep | サイトが壊れる |

`auto: true` の記事にだけ要約・引用・日付・禁止語のチェックを掛ける（`scripts/validate-frontmatter.mjs` 内）。**引用が原文に実在するかは build では検査できない**（原文はビルド時に持たない）。これはプロンプトの「部分文字列として一致するものだけ」に依存する。reverify が原文 URL の生存は毎週見る。

### commit と push

- コミッタはこの Mac の git 設定（オーナー名義）。メッセージは `ingest: <slug>[, <slug>...]`。
- ステージは書いたファイルのパスを明示。`git add -A` / `.` は deny ルールで物理的に打てない。
- push 前に `git pull --rebase origin main`。オーナーが開発用チェックアウトから同日に push していても別ファイルなので衝突しない。衝突したら RESULT: failed、次の起動で ops clone を `origin/main` に同期し直してやり直す。
- rebase で他の変更が乗った場合、この PC では再 build しない。Workers Builds が同じ `pnpm build` を走らせるので、そこで止まる。
- push 後は Workers Builds が deploy する。**この PC からは deploy しない。**

### 失敗時

- **何も commit しない。** 前回の状態が本番に残る。
- 失敗通知（後述）が出る。次の起動で最初からやり直す。同じ slug が再び対象になる。
- 処理できない記事（本文なし等）は Grok が `data/ingest-skip.txt` に追記して commit する。skip 追記は成功扱い（通知なし）。人が気になれば見る。

## 週次ループ（再検証）

```
launchd（月曜 11:00 JST）-> ops/grok-run.sh reverify -> grok --prompt-file .grok/ops/reverify.md
  Grok が行うこと:
  1. node scripts/reverify.mjs を実行（判定はスクリプト。Grok は実行と commit 役）
     - src/content/**/*.md の source_url を全件 HEAD（失敗したら GET）。同一ホストへは 1 秒間隔
     - 404 / 410 -> coverage を 1 段下げる（full -> tracking -> index）。index はそのまま
     - 5xx / タイムアウト / 接続失敗 -> 何もしない（来週再試行）
     - 200 でリダイレクト先が同一ホスト -> source_url を書き換える
     - data/reverified-at.txt に run 日を書く（変更が無くても）
     - 降格一覧を data/demoted.json に追記
  2. pnpm build
  3. git add <変更ファイル> -> commit "reverify: <n> checked, <m> demoted" -> pull --rebase -> push origin main
  4. RESULT: ok | failed
```

### 60 日バナーは毎週焼き直す

`last_verified` から 60 日超のバナーは**ビルド時に静的に焼く**（research-seo-content.md）。ビルドは push が無いと走らないので、reverify は変更が無くても `data/reverified-at.txt` を更新して push し、週 1 回は必ず再ビルドされる。**バナーの誤差は最大 7 日。** 許容する。

### coverage の自動降格

- 降格は「一次情報が消えた」ことの自己申告。**人が復帰させるまで戻らない。** 自動で上げることはしない。
- `last_verified` は reverify では**更新しない**。URL が生きていることと、内容を確認したことは別。

## launchd と wrapper

### `~/Library/LaunchAgents/com.grok-fun.ingest.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.grok-fun.ingest</string>
  <key>ProgramArguments</key><array>
    <string>/Users/tetsuyaohta/ops/grok-fun.com/ops/grok-run.sh</string>
    <string>ingest</string>
  </array>
  <key>StartCalendarInterval</key><array>
    <dict><key>Hour</key><integer>10</integer><key>Minute</key><integer>0</integer></dict>
    <dict><key>Hour</key><integer>22</integer><key>Minute</key><integer>0</integer></dict>
  </array>
  <key>RunAtLoad</key><true/>
  <key>EnvironmentVariables</key><dict>
    <key>PATH</key><string>/Users/tetsuyaohta/.grok/bin:/opt/homebrew/bin:/usr/bin:/bin</string>
    <key>GROK_MODEL</key><string><!-- grok models で確認して固定 --></string>
  </dict>
  <key>StandardOutPath</key><string>/Users/tetsuyaohta/Library/Logs/grok-fun/ingest.launchd.log</string>
  <key>StandardErrorPath</key><string>/Users/tetsuyaohta/Library/Logs/grok-fun/ingest.launchd.log</string>
</dict></plist>
```

`com.grok-fun.reverify.plist` は `StartCalendarInterval` を `Weekday 1, Hour 11` にし、引数を `reverify` に変えるだけ。`RunAtLoad` は付けない（週 1 で十分）。読み込みは `launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.grok-fun.ingest.plist`。PATH に `pnpm` / `node` の実体（Homebrew か Volta か）を実装時に確認して入れる。

### `ops/grok-run.sh`（骨子。リポジトリに commit）

```sh
#!/bin/sh
# usage: grok-run.sh ingest|reverify
set -eu
NAME="$1"
REPO="$HOME/ops/grok-fun.com"
LOGDIR="$HOME/Library/Logs/grok-fun"; LOG="$LOGDIR/$NAME.log"; mkdir -p "$LOGDIR"
LOCK="/tmp/grok-fun-$NAME.lock"
MODEL="${GROK_MODEL:?GROK_MODEL unset}"
log()    { printf '%s %s\n' "$(date -u +%FT%TZ)" "$*" >>"$LOG"; }
notify() { log "FAIL $*"; osascript -e "display notification \"$*\" with title \"grok-fun $NAME failed\""; }

mkdir "$LOCK" 2>/dev/null || { log "skip: locked"; exit 0; }
trap 'rmdir "$LOCK"' EXIT

cd "$REPO"
git fetch origin main
git reset --hard origin/main          # ops clone は使い捨て。前回の失敗 commit を捨てて origin に揃える
[ -z "$(git status --porcelain)" ] || { notify "dirty tree"; exit 1; }
pnpm install --frozen-lockfile >>"$LOG" 2>&1

( sleep 1800; pkill -f "prompt-file .grok/ops/$NAME.md" ) & WATCHDOG=$!
set +e
OUT=$(grok --prompt-file ".grok/ops/$NAME.md" --cwd "$REPO" -m "$MODEL" \
  --permission-mode bypassPermissions --no-subagents --max-turns 80 \
  --deny 'Bash(git push --force*)' --deny 'Bash(git push -f*)' \
  --deny 'Bash(git add -A*)'  --deny 'Bash(git add .*)' \
  --deny 'Bash(*wrangler*)'   --deny 'Bash(rm -rf*)' \
  --deny 'Bash(git reset*)'   --deny 'Bash(git checkout*)' --deny 'Bash(git switch*)' \
  --deny 'Edit(worker/**)'    --deny 'Edit(wrangler.jsonc)' --deny 'Edit(ops/**)' --deny 'Edit(.grok/**)' \
  --output-format json 2>>"$LOG")
RC=$?
set -e
kill "$WATCHDOG" 2>/dev/null || true
[ "$RC" -eq 0 ] || { notify "grok exit $RC"; exit 1; }

RESULT=$(printf '%s' "$OUT" | jq -r '.text' | grep -o 'RESULT: [a-z]*' | tail -1)
log "$RESULT"
case "$RESULT" in
  "RESULT: ok"|"RESULT: nothing") exit 0 ;;
  *) notify "$RESULT"; exit 1 ;;
esac
```

要点:

- **同時実行しない。** lock ディレクトリで排他。重複起動は skip（待たない）。
- **タイムアウト 30 分。** watchdog が grok を kill。grok は SIGTERM で 143 を返し、commit 前なら何も残らない。
- **判定は 2 段。** grok の exit code（1 = 認証・ネットワーク・ランタイム）と、最終行の `RESULT:`（Grok 自身の判定）。どちらか落ちたら失敗。
- **deny ルールは bypassPermissions でも効く**（headless doc「Deny rules, hooks, and admin locks still apply」）。Grok が worker / wrangler / ops / 自分のプロンプトを触れないのは、プロンプトの約束ではなく機械の制約。
- **モデルは `GROK_MODEL` で固定。** CLI の既定が変わっても勝手に変わらない。
- `pnpm install` を毎回走らせるのは、開発側で lockfile を更新した直後の run が古い node_modules で build に失敗しないため。

## コメント / リアクションの無人運用

magi-verdict.md の「手動削除のみ」を上書きする。人は削除しない。仕組みが隠して、消す。**この節は Cloudflare 側で完結する。この Mac は関与しない。**

### 防御の層

| 層 | 内容 | 場所 |
|---|---|---|
| Turnstile | コメント POST に必須。siteverify 失敗は 403 | Worker（既存） |
| レートリミット | WAF ルール 1 本（`/api/comments` POST、IP あたり 10 req / 10 分）。加えて Worker 内で「同一 IP ハッシュが同一 slug に 60 秒以内に再投稿」を 429 で拒否（`comments.ip_hash` を 1 回 SELECT） | WAF + Worker |
| ブロックリスト | `moderation/blocklist.txt`（1 行 1 パターン、`#` はコメント）。body / nickname に部分一致で 400。ビルド時に Worker へバンドル | リポジトリ + Worker |
| 通報 | `POST /api/reports {comment_id}`。同一コメントに **3 つの異なる IP ハッシュ**から通報が来たら `hidden=1`。通報自体にも Turnstile | Worker + D1 |
| 90 日削除 | **Worker Cron Trigger**（1 日 1 回）で `created_at` が 90 日より古いコメントと通報を DELETE。hidden も同様。リアクションは集計値なので残す。DELETE 1〜2 文で CPU 10 ms に収まる | Worker cron（Free 5 本中 1 本） |
| キルスイッチ | 後述 | Worker secret |

IP ハッシュ: `HMAC-SHA256(IP_HASH_SALT, cf-connecting-ip)` の先頭 16 バイトを hex。生 IP は保存しない。salt は Worker secret。

### 変更点（architecture.md との差分）

- `comments` に `ip_hash TEXT NOT NULL` を追加。
- `reports(comment_id, ip_hash, created_at)`、`UNIQUE(comment_id, ip_hash)` を追加。
- `worker/index.ts` に `POST /api/reports` を追加。
- `wrangler.jsonc` に `triggers.crons: ["0 18 * * *"]` と `scheduled` ハンドラを追加。
- architecture.md の「Worker 内にレートカウンタを持たない」は、**D1 の既存行を 1 回読むだけ**の重複投稿チェックに緩める。書き込みは増えない。

### 作らないもの

- アカウント、ログイン、プロフィール、DM、スレッド。
- 管理画面。モデレーションは上記の自動処理と `wrangler d1 execute` だけ。
- 通報の人間レビュー。3 通報で隠す、以上。誤爆は 90 日で消えるので放置。

### D1 は使い捨て

- D1 が消えても、割当を超えても、記事は静的に配信され続ける（architecture.md 劣化フロー）。
- 復旧は `pnpm d1:migrate`（開発用チェックアウトから手で）。データは戻らない。戻さない。
- バックアップは組まない。

## X Tips は v1 で自動収集しない

- X 上の投稿の自動取得・自動要約は **v1 でやらない**。理由: 引用元の削除・非公開が頻繁で reverify の降格が常態化する、投稿者の権利関係が x.ai/news より複雑、Tier A/B のキーワードに直結しない。
- implementation-plan.md フェーズ 3 の「X Tips」は、オーナーが手で書く場合にのみ存在する。無人運用では**存在しない機能**として扱う。`.grok/ops/ingest.md` に X を見に行く指示を入れない。
- 再検討条件: Tier A キーワードが 20 位以内に 3 件以上入り、かつ news の自動取り込みが 3 か月無事故で回ったとき。

## キルスイッチ

| 項目 | 値 |
|---|---|
| 変数 | Worker env `COMMENTS_DISABLED` |
| 入れ方 | 開発用チェックアウトから `pnpm exec wrangler secret put COMMENTS_DISABLED` → 値 `1`。**secret にする理由: deploy で上書きされない**（`vars` は wrangler.jsonc に無いと deploy で消える） |
| 効果 | `POST /api/comments` と `POST /api/reports` が 503 `{"error":"comments_disabled"}`。`GET /api/comments` は空配列。ウィジェットは「コメントは現在停止中です」を表示。**リアクションは動き続ける** |
| 反映 | 次の request から。deploy 不要 |
| 戻し方 | `pnpm exec wrangler secret delete COMMENTS_DISABLED` |
| 全消し | `pnpm exec wrangler d1 execute grok-fun-community --remote --command "DELETE FROM comments"`。違法 UGC で即時消去が必要なときの最終手段 |

記事側の取り下げ（ブランド要求など）はキルスイッチではなく `git rm` + push。Workers Builds が数分で反映する。

取り込みの停止: `launchctl bootout gui/$(id -u)/com.grok-fun.ingest`。再開は `bootstrap`。

## 通知

| 発生源 | 通知 | 設定場所 |
|---|---|---|
| ingest / reverify 失敗（grok exit ≠ 0、`RESULT: failed`、タイムアウト、dirty tree） | macOS 通知（`osascript`）+ `~/Library/Logs/grok-fun/<name>.log` | `ops/grok-run.sh` |
| Grok の API エラー / 中断 | 上と同じ経路（exit 1 / 143 を wrapper が拾う）。任意で `~/.grok/config.toml` の `StopFailure` / `StopCancelled` hook から同じ通知スクリプトを叩く | grok hooks（任意） |
| Workers Builds 失敗 | メール | Cloudflare Notifications「Workers Builds: Build Failed」 |
| 成功 | **なし** | |
| コメント投稿、通報、自動 hidden、90 日削除 | **なし** | |
| D1 割当超過 | なし（劣化表示で吸収） | |

Slack / Discord / X への投稿はしない。GitHub からのメールは無い（Actions が無い）。通知先を増やすと「見なければならないもの」が増える。

## 失敗表

| 失敗 | 本番に残るもの | 自動対応 | 人が必要か |
|---|---|---|---|
| x.ai/news の構造が変わり slug を抽出できない | 前回のサイト全体 | `RESULT: failed`（抽出 0 の検知）、通知、次の起動で再試行 | **連日出たら** `.grok/ops/ingest.md` の抽出指示を直す。1〜2 日なら放置 |
| x.ai/news が一時的にダウン | 同上 | 失敗、次の起動 | 不要 |
| Grok の API が 5xx / レート制限 | 同上 | grok exit 1、次の起動 | 不要 |
| Grok のログインが失効 | 同上 | grok exit 1 が続く | **必要。** `grok login` |
| 生成が機械チェックに落ちる（翻訳化、引用超過） | 同上 | 書いたファイルを消して失敗。次の起動 | 不要。続くならプロンプトを直す |
| 記事の本文が取れない | 同上 | `data/ingest-skip.txt` に追記して commit | 不要。手で書きたければ書く |
| `pnpm build` 失敗（astro check、リンク切れ） | 同上 | commit しない、通知 | ingest 由来なら不要。人の push 由来なら**必要** |
| push が rebase 衝突 | 同上 | 失敗、次の起動で ops clone を `origin/main` に揃え直す | 不要 |
| Workers Builds 失敗（依存解決、タイムアウト） | 前回の deploy | メール。次の push で再ビルド | **連続したら必要** |
| Mac がスリープ / 電源断 | 同上 | 復帰時に launchd がまとめて 1 回実行 | 不要。長期停止は SLA を割る（承知の上） |
| ログアウト状態（LaunchAgent が動かない） | 同上 | なし | 自動ログインを設定（一度きり） |
| ssh 鍵のパスフレーズ待ちで push が止まる | 同上 | watchdog が 30 分で kill、失敗通知 | **必要。** 鍵を Keychain に入れる（`UseKeychain yes`、一度きり） |
| `grok` の更新でフラグが変わる | 同上 | grok exit 1 が続く | **必要。** wrapper を直す。`grok update` は自動にしない |
| lock が残る（前回 kill -9 等） | 同上 | 毎回 skip、通知なし | ログに `skip: locked` が続いたら `rmdir /tmp/grok-fun-ingest.lock` |
| reverify で source_url が 404 | ページは残る。`coverage` が下がる | 降格 commit | 不要。復帰させたければ手で |
| Worker が 5xx | 記事は全部表示。ウィジェットは劣化表示 | なし（静的は Worker を通らない） | 連続したら見る |
| D1 割当超過 / wipe | 記事は全部表示。コメント・リアクション停止 | 劣化表示。翌日 or `d1:migrate` で復帰 | 不要 |
| コメントスパム大量 | 記事は無傷 | Turnstile、WAF、blocklist、3 通報 hidden、90 日削除 | 止まらなければ**キルスイッチ**。blocklist に追記して push |
| 違法 UGC | — | 3 通報で hidden | **必要。** キルスイッチ + `DELETE` |
| ブランド取り下げ要求 | — | なし | **必要。** 記事 `git rm`、必要ならドメイン移転（Markdown は git にある） |
| Turnstile のサイトキー失効 | 記事は無傷。コメント投稿不可（403） | なし | 気づいたら更新。急がない |

「人が必要」の行は上の 4 場面か、一度きりの Mac 設定に収まる。収まらない行が増えたら設計の失敗として扱う。

## 成果物と配置

```
.grok/
  ops/
    ingest.md                  # 取り込みプロンプト。--prompt-file で渡す
    reverify.md                # 再検証プロンプト
ops/
  grok-run.sh                  # launchd から呼ぶ wrapper（lock、同期、grok 起動、判定、通知）
  com.grok-fun.ingest.plist    # ~/Library/LaunchAgents/ へコピーする雛形
  com.grok-fun.reverify.plist
scripts/
  reverify.mjs                 # source_url の HEAD、coverage 降格、redirect 追随（判定はここ、Grok は実行役）
  validate-frontmatter.mjs     # 既存 + auto: true 記事の要約長・引用長・日付・禁止語
  check-links.mjs              # 既存
  count-assets.mjs             # 既存
moderation/
  blocklist.txt                # 1 行 1 パターン。Worker にバンドル
data/
  ingest-skip.txt              # 処理できなかった slug
  reverified-at.txt            # 週次の再ビルド用スタンプ
  demoted.json                 # 降格履歴
worker/
  index.ts                     # /api/reports と scheduled を追加
  reports.ts
  blocklist.ts                 # ビルド時に moderation/blocklist.txt から生成
migrations/
  0002_moderation.sql          # comments.ip_hash, reports
```

`.github/workflows/` は**存在しない**。

### secrets / 認証情報

| 名前 | 場所 | 用途 |
|---|---|---|
| Grok ログイン | この Mac `~/.grok/auth.json`（`grok login`） | 取り込み・再検証の実行。従量の `XAI_API_KEY` は使わない |
| git / ssh 鍵 | この Mac（Keychain、パスフレーズ入力なし） | `push origin main` |
| `GROK_MODEL` | launchd plist の `EnvironmentVariables` | モデル固定 |
| `TURNSTILE_SECRET_KEY` | Worker secret | 既存 |
| `IP_HASH_SALT` | Worker secret | 通報・重複投稿の IP ハッシュ |
| `COMMENTS_DISABLED` | Worker secret（通常は**存在しない**） | キルスイッチ |

GitHub Actions secret は**存在しない**。Cloudflare API トークンをこの Mac の運用経路に置かない（`wrangler` は deny）。

GitHub の Branch protection は **main に付けない**（bot 経路が push できなくなる）。品質ゲートは protection ではなく「この PC の `pnpm build` が通らなければ commit しない」+「Workers Builds の同じ `pnpm build`」の二重で担保する。オーナーの手 push にも同じゲートを掛けるため、開発用チェックアウトに `git config core.hooksPath .githooks` を一度設定し、`.githooks/pre-push` で `pnpm build` を走らせる。

## コスト

| 項目 | 月額 | 根拠 |
|---|---|---|
| 既存のすべて（architecture.md） | $0 | 変更なし |
| Grok Build | $0 追加 | この Mac の Grok ログイン（既存契約）で動く。従量 API キーは使わない。1 run あたり数十ターン × 1 日 2 回 |
| Workers Cron Trigger | $0 | Free 5 本のうち 1 本 |
| この Mac の電気代 | 既存 | 常時稼働の分だけ |
| **合計** | **$0 追加** | |

Grok の契約上限に当たったら run が exit 1 で落ちて通知が出る。次の起動で回復する。連日続くなら契約か頻度を見直す。
