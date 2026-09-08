# MAGI 判定 + Fable レビュー + オーナー決定

- 日付: 2026-09-08
- 判定対象: grok-fun.com（Grok シリーズ非公式日本語リファレンス）
- 位置づけ: この文書が **凍結事項の一覧**。architecture.md と implementation-plan.md はここに従う
- 2026-09-08 追記: オーナー決定「無人運用」を追加。MAGI 条件 5 と「手動削除のみ」を上書き。運用の詳細は operations.md
- 2026-09-08 追記 2: オーナー決定「サイト名 Grok JP」「TIPS-first ローンチ」「取り込みは信頼が取れるまで OFF」「GTM を初日から」「AdSense は公開後」を追加。戦略の本文は content-strategy.md

## MAGI 判定: 3-0 Conditional Approval

| ユニット | 判定 | 要旨 |
|---|---|---|
| MELCHIOR-1 | 条件付き承認 | 静的 $0 の骨格は正しい。「grok {任意の日本語}」は要件として成立しない。非公式表示は必須 |
| BALTHASAR-2 | 条件付き承認 | フルシリーズ追随は一人では持たない。2 年後は「半信半疑の古い鏡」になる。test が無い |
| CASPAR-3 | 条件付き承認 | Giscus + X はコミュニティにならない。料金・制限の変更履歴がブックマーク価値の中核。Zenn/Qiita 連載案は不採用 |

### MAGI 条件

1. キーワードを有限にし、更新 SLA を数字で持つ
2. 非公式表示、ロゴ不使用
3. 「コミュニティ」を v1 の製品要件から外す（後述のオーナー決定で上書き）
4. 料金・制限の変更履歴を最初から差分形式で持つ
5. ~~編集フローは人間マージのみ本番~~ → **オーナー決定「無人運用」で上書き**（下記）。本番ゲートは人ではなく機械: この Mac の `pnpm build`（通らなければ commit しない）と Workers Builds の同じコマンド。GitHub Actions は使わない

## Fable レビューの must（fable-review.md より）

| # | must | 凍結内容 |
|---|---|---|
| 1 | ドメイン `grok-fun.com` のブランドガイドライン抵触 | オーナーが x.ai/legal/brand-guidelines をブラウザで全文読み、許諾メールを送るか決める。**ロゴ・ワードマーク画像は無条件で不使用**。favicon / OGP はオリジナル。サイト名は「Grok」を主語に置かない副題構成 |
| 2 | 全文翻訳は著作権と SEO で負ける | 「要約 + 短い引用 + 原文リンク + 日付」に固定。事実データ（料金、制限値、モデル ID、日付）のみ日本語化。title / URL に「翻訳」を入れない |
| 3 | 「grok {任意の日本語}」は成立しない | Tier A/B/C。3 か月で Tier A が 0 件なら方針転換。計測は Search Console のみ |
| 4 | 更新 SLA は初週に試される | chat/bot/build/imagine 72 時間、voice/automations/api 14 日、料金・制限 24 時間。Grok 4.7（9/11〜12）が初回テスト |

### Fable レビューの should（採用）

- 5: assets-first。Worker は `/api/*` のみ（**オーナー決定によりコミュニティ API のため `main` は書く。`run_worker_first: false` で静的は Worker を通さない**）
- 7 の 3 ゲートは採用。ただし同項の「GitHub Actions で」は**オーナー決定で不採用**（Actions を使わない。ゲートは `pnpm build` に同梱し、この Mac と Workers Builds で二重に走る）。同項の編集フロー「エージェント下書き → PR → 人間がマージ」も**オーナー決定「無人運用」で上書き**（下記）
- 6: wrangler は devDependency に pin。pnpm 凍結
- 7: 3 ゲート（`astro check`、frontmatter 検証、内部リンク検査）。ビルドコマンドに同梱。GitHub Actions は使わない
- 8: `coverage: full | tracking | index`。`last_verified` 60 日超で静的バナー
- 9: 料金は USD + ストア課金注記 + changelog
- 11: CSP は nonce/hash 前提。広告導入時に Report-Only へ落とす判断を予定に入れる
- 12: 構造化データ、sitemap、RSS、canonical、OGP。`/models/<id>/` 恒久 URL

### Fable レビューの should（オーナー決定で上書き）

- 10: 「コミュニティは v1 で作らない。Giscus はコメント欄としてだけ」→ **上書き**。下記参照

## オーナー決定（Fable / MAGI に優先）

| 決定 | 内容 | 上書き対象 |
|---|---|---|
| **記事は静的** | Astro SSG。SSR なし。adapter なし | なし（Fable / MAGI と一致） |
| **v1 でファンコミュニティを入れる。ただし BBS ではない** | 記事ごとの **リアクション + コメント** のみ。スレッド、DM、プロフィール、アカウントは作らない | MAGI 条件 3、Fable should 10 |
| **DB は使い捨てでよい** | Cloudflare D1（Free）。データ消失は許容。バックアップ運用は組まない。**D1 が消えても、割当超過でも、静的サイトは動き続ける**こと | Fable should 5 の assets-only（`main` なし）→ `main` を書くが `/api/*` 限定 |
| **対象はフルシリーズ** | chat, Bot, Build, Imagine, Voice, Automations, API の 7 製品 | なし（BALTHASAR の懸念は `coverage` で吸収） |
| **wrangler は devDependency に pin** | オーナーのマシンには入っているが、pin する（Fable の観測では PATH に無かった。どちらにせよ pin） | なし |
| **Fable を再利用可能にする** | `~/.grok/skills/fable-consult` で Grok から Fable にチェックポイントを外注できるようにする | なし |
| **サイト名は Grok JP** | サイト名 **Grok JP**。タグライン **ファンコミュニティ（非公式）**。一言「日本語で Grok を追う、ファンのための場所」。ドメインは grok-fun.com のまま。公式 Grok / xAI のロゴ・ワードマーク画像は使わない。非公式バナーは全ページ必須。ブランド許諾メールは**オーナー任意のまま**（送らなくても公開してよい） | Fable must 1 の「Grok を主語に置かない副題構成」（サイト名に Grok を含めることを許容。ロゴ不使用と非公式表示で担保） |
| **TIPS-first ローンチ、取り込みは信頼が取れるまで OFF** | ローンチ時のコーパスはホーム + About + TIPS 4〜6 本。7 製品の空ハブとニュース firehose は作らない。ローンチ後 4 週は週 1 本、以後週 1〜2 本。大きなリリース日は当日メモ 1 本。launchd の ingest / reverify は Search Console でスパム判定なしのインデックスを確認 **かつ** 公開から 90 日、の遅い方まで OFF。コミュニティ（コメント / リアクション）は静的サイト公開後の次のスライス。詳細は content-strategy.md | operations.md の 12 時間 ingest と 72 時間 SLA（ローンチ期間に限る）、implementation-plan.md フェーズ 1 |
| **分析は Google Tag Manager を初日から** | `GTM-NQMPJ2FS`（オーナー準備済み）。Cloudflare Web Analytics は主計測にしない。GTM はバンドルした外部 JS で読み込む（インライン snippet なし）+ noscript iframe。CSP に googletagmanager.com / google-analytics.com を許可。広告タグは公開後まで GTM 内で空 | architecture.md の「分析 = Cloudflare Web Analytics」と CSP |
| **AdSense は公開後** | ローンチの前提条件ではない。PV 基準を事前に決めない。公開後に判断し、導入時に CSP を Report-Only へ落とす判断を併せて行う | 未決定項目「AdSense の PV 基準」 |
| **無人運用** | 人間はマージしない。**GitHub Actions は使わない。** 運用エンジンはオーナーの Mac（この PC）上の **Grok Build（`grok` CLI）+ launchd**。12 時間ごとに `grok --prompt-file .grok/ops/ingest.md` が x.ai/news を取り込み、要約 + 短い引用 + 原文リンク + 日付の Markdown を書き、この PC で `pnpm build` を通してから main に commit + push する。deploy は Workers Builds。週次の reverify も同じ経路。コメントは Cloudflare 側で自動モデレーション（Turnstile、レートリミット、blocklist、3 通報で自動 hidden、Worker Cron で 90 日削除）。Mac がスリープ中は止まり、復帰時に追いつく。人が触るのはキルスイッチ `COMMENTS_DISABLED` と、ブランド法務・広告申込・連続失敗・違法 UGC の 4 場面のみ。詳細は operations.md | MAGI 条件 5、Fable should 7 の編集フローと「GitHub Actions で」、下記「手動削除のみ」 |

### コミュニティ決定の補足

- Giscus は使わない（GitHub アカウント必須、日本の一般ユーザーの参加率が低い）。
- D1 + Worker + Turnstile で自前の最小実装。認証なし、ニックネーム任意。
- モデレーション: ~~手動削除のみ（`wrangler d1 execute` で DELETE）。通報機能は v1 に無い。~~ → **無人運用で上書き**。通報は v1 に入れ、3 つの異なる IP からの通報で自動 hidden。90 日で自動削除。`wrangler d1 execute` は違法 UGC の最終手段としてだけ残す（operations.md）。
- 「コミュニティが育たない」場合の撤退条件: フェーズ 2 完了から 3 か月でコメント総数が 30 件未満なら、コメントフォームを外してリアクションのみ残す。

## 未決定（オーナー待ち）

| 項目 | 現状 | 期限 |
|---|---|---|
| ブランド許諾メールを送るか | **オーナー任意。** 送らなくても公開してよい（2026-09-08 決定）。非公式バナーは必須 | 期限なし |
| ~~サイト名~~ | **決定: Grok JP ／ ファンコミュニティ（非公式）**（2026-09-08） | — |
| ~~AdSense の PV 基準~~ | **決定: 公開後に判断。PV 基準は事前に置かない**（2026-09-08） | — |
