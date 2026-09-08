# docs/grok-fun

**Grok JP**（grok-fun.com、ファンコミュニティ・非公式）の企画・設計文書。一言: 日本語で Grok を追う、ファンのための場所。

| ファイル | 内容 | 読む順 |
|---|---|---|
| [fable-review.md](fable-review.md) | Fable 5.1 による企画レビュー。must / should / nit と凍結事項。**改訂しない** | 1 |
| [magi-verdict.md](magi-verdict.md) | MAGI 3-0 Conditional Approval + Fable の must + **オーナー決定**（記事は静的、v1 でリアクション + コメント、D1 使い捨て、フルシリーズ、**無人運用**、**サイト名 Grok JP**、**TIPS-first**、**GTM 初日から**、**AdSense は公開後**）。凍結事項の一覧 | 2 |
| [content-strategy.md](content-strategy.md) | **コンテンツ戦略（凍結）**。北極星「日本一 = 戻ってくる場所」、薄いローンチ（ホーム + About + TIPS 4〜6）、週 1 本、取り込みは信頼が取れるまで OFF、計測はリピート訪問・コメント密度・長尾クエリ | 3 |
| [research-competitors.md](research-competitors.md) | 競合調査。シリーズ横断の日本語ハブは無い。grokguide.jp は Bot プロンプトのみ | 4 |
| [research-cloudflare.md](research-cloudflare.md) | Cloudflare Free 制限（公式）。assets-first、Worker は `/api/*` のみ、D1、Turnstile | 5 |
| [research-seo-content.md](research-seo-content.md) | キーワード Tier A/B/C、要約 + 引用 + 原文リンク方針、frontmatter スキーマ、SLA | 6 |
| [architecture.md](architecture.md) | システム構成、スタック、コスト（$0）、データフロー、API 設計、D1 スキーマ、wrangler 設定、CSP（GTM 許可）、リスク、将来拡張 | 7 |
| [visual-design.md](visual-design.md) | ビジュアルアイデンティティ「参考書 × 索引カード」。トークン、タイポ、ワイヤーフレーム、コンポーネント、コピーの声 | 8 |
| [implementation-plan.md](implementation-plan.md) | フェーズ 0〜3 の手順（フェーズ 1 は TIPS-first、1.5 の無人取り込みは信頼条件後）、ファイル一覧、パッケージ、環境変数、テスト方針、リスク | 9 |
| [operations.md](operations.md) | **無人運用**。GitHub Actions なし。この Mac の launchd が 12 時間ごとに Grok Build（`grok --prompt-file .grok/ops/ingest.md`）を起動し、x.ai/news → 要約 Markdown → `pnpm build` → commit → push → Workers Builds が deploy。週次 reverify も同経路。コメント掃除は Worker Cron。キルスイッチ `COMMENTS_DISABLED`、失敗表、通知は失敗時のみ（macOS 通知 + ログ + Cloudflare メール）。**ローンチ期間中は ingest / reverify OFF** | 10 |

## 決定の優先順位

オーナー決定 > Fable レビュー > MAGI 判定。衝突は magi-verdict.md に記録する。

2026-09-08: オーナー決定「無人運用」が MAGI 条件 5（人間マージのみ本番）と「手動削除のみ」を上書きした。運用はこの Mac の launchd + Grok Build。GitHub Actions は使わない。人が触るのはキルスイッチと、ブランド法務・広告申込・連続失敗・違法 UGC の 4 場面だけ。

2026-09-08（同日、後）: content-strategy.md が operations.md の 12 時間取り込みを**ローンチ期間中に限って** OFF にした。有効化は Search Console でのインデックス確認 かつ 公開から 90 日、の遅い方。

## 凍結済み（2026-09-08）

- サイト名 **Grok JP**、タグライン **ファンコミュニティ（非公式）**、一言「日本語で Grok を追う、ファンのための場所」。ドメイン grok-fun.com。公式ロゴ不使用
- 分析は **Google Tag Manager `GTM-NQMPJ2FS`** を初日から。バンドル JS + noscript iframe。広告タグは公開後まで空
- AdSense は**公開後**に検討。PV 基準は事前に決めない
- ブランド許諾メールは**オーナー任意**。非公式バナーは必須

## 未決定（オーナー）

- ブランド許諾メールを送るか（任意。送らなくても公開してよい）

## 関連

- Grok から Fable にチェックポイントを外注するスキル: `~/.grok/skills/fable-consult/`
