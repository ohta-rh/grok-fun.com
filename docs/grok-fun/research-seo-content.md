# SEO とコンテンツ方針

- 日付: 2026-09-08
- 前提: fable-review.md の指摘 2（翻訳方針）、指摘 3（キーワード層別）、指摘 8（coverage）、指摘 12（技術 SEO）を凍結事項として引き継ぐ

## キーワード層別

| Tier | 目標 | 例 | 判定 |
|---|---|---|---|
| **A** | 3 か月以内に 20 位以内 | `grok 4.7 料金` `grok imagine 動画 制限` `grok bot 日本語 設定` `grok api 料金 円` `grok build 使い方` `grok voice 日本語` `grok automations 使い方` `supergrok 違い` | **3 か月後に Tier A の 20 位以内が 0 件なら方針転換**。Search Console のみで計測 |
| **B** | 6 か月以内に 30 位以内 | `grok 料金` `grok 無料` `grok 日本語` `grok プラン` | 到達しなくても継続。A が取れていれば B は後から付いてくる |
| **C** | 観測のみ | `grok 使い方` `grok とは` `grok ai` | 狙わない。grok.com / X / 大手メディアが占有。ハブページの title に入れるだけ |

### Tier A の作り方

「製品名 × 具体属性」の組み合わせを製品ごとに 3〜5 本。属性は「料金」「制限」「日本語」「使い方」「違い」「できない」の 6 種。

| 製品 | Tier A 候補 |
|---|---|
| chat（Grok 本体） | `grok 4.7 料金` `grok 4.6 4.7 違い` `grok 無料 回数 制限` |
| Bot | `grok bot 日本語 設定` `grok bot 作り方` `grok bot 共有` |
| Build | `grok build 使い方` `grok build 料金` `grok build できること` |
| Imagine | `grok imagine 動画 制限` `grok imagine 無料 回数` `grok imagine 日本語 プロンプト` |
| Voice | `grok voice 日本語` `grok voice 使えない` |
| Automations | `grok automations 使い方` `grok automations 料金` |
| API | `grok api 料金 円` `grok api 無料枠` `grok api モデル 一覧` |

## コンテンツ方針: 要約 + 引用 + 原文リンク

**全文翻訳はしない。** x.ai/news、docs.x.ai は著作物。翻訳は二次的著作物で、許諾なしの全文掲載は法務で負け、Google にも薄いコンテンツとして扱われる。

やること:

- **要約**: 日本語で「何が変わったか」を 3〜10 行。
- **引用**: 原文から必要最小限（数十語まで）を引用符付きで。出典 URL と日付を添える。
- **原文リンク**: `source_url[]` に一次情報 URL。本文末に「原文を読む」。
- **日本のユーザーにどう効くか**: これがサイトの付加価値。全文翻訳では出せない。

翻訳してよいもの（事実データ、著作物ではない）:

- 料金表（USD）
- 利用制限の数値（回数、レート、コンテキスト長）
- モデル ID、リリース日
- 機能の有無（対応 / 非対応）

ニュース記事の固定構成:

```
1. 何が変わったか（要約）
2. 日本のユーザーにどう効くか（注意点、料金への影響、日本で使えるか）
3. 原文（引用 + リンク + 日付）
```

`title` と URL に「翻訳」を入れない。`/news/grok-4-7` であって `/news/grok-4-7-翻訳` ではない。

## frontmatter スキーマ

全ページ必須。ビルド時に検証し、欠けていればビルド失敗。

```yaml
title: string
description: string          # 120 文字前後。meta description と OGP に流用
product: chat | bot | build | imagine | voice | automations | api | series
last_verified: YYYY-MM-DD    # 一次情報を最後に確認した日
source_url: string[]         # 一次情報 URL。ニュース・料金・制限ページは 1 本以上必須
coverage: full | tracking | index
```

### `last_verified` の扱い

- 60 日超過: ビルド時に「情報が古い可能性があります（最終確認: YYYY-MM-DD）」バナーを静的に焼き込む。
- 180 日超過: バナーを強調し、`description` の先頭に `[要確認]` を付けない（検索結果に出るため）。代わりにページ内で明示。
- 古さを自己申告するページは「半信半疑の鏡」ではなく「正直な鏡」になる。

### `coverage` の意味

| 値 | 意味 | 表示 |
|---|---|---|
| `full` | 公式発表を SLA 内に追随している | 表示なし |
| `tracking` | 主要な変更は追うが、細部は遅れる | ページ上部に「主要な更新のみ追跡中」 |
| `index` | 目次と一次情報リンクのみ。解説は無い | ページ上部に「このハブは目次と一次情報リンクのみです」 |

v1 の初期値: chat / bot / build / imagine は `tracking`（SLA 72 時間）。voice / automations / api は `index`（SLA 14 日）。料金・制限は `full`（SLA 24 時間）。守れない週は `coverage` を落とす。

## URL 設計

- 製品ハブ: `/grok/` `/bot/` `/build/` `/imagine/` `/voice/` `/automations/` `/api/`
- 恒久ページ: `/pricing/`（料金 + 変更履歴）、`/models/grok-4-6/`（バージョン語は減衰するので恒久 URL）、`/getting-started/`
- ニュース: `/news/YYYY/slug/`。`/models/*` と `/pricing/` へ内部リンク。
- 末尾スラッシュ統一（`html_handling: auto-trailing-slash`）。

## 技術 SEO

| 項目 | 実装 |
|---|---|
| 構造化データ | `Article`（ニュース・解説）、`FAQPage`（各ハブの FAQ 節）。JSON-LD をレイアウトで出力 |
| sitemap | `@astrojs/sitemap` |
| RSS | `@astrojs/rss`。`/rss.xml`。ニュースと料金変更履歴 |
| canonical | レイアウトで自動。末尾スラッシュ付き |
| OGP | `og:title` `og:description` `og:image`。画像は初期は共通 1 枚。記事ごと生成は 20,000 ファイル上限を見てから |
| hreflang | 不要（日本語のみ） |
| robots | 全許可。`/api/` は `Disallow` |

## 更新 SLA（凍結）

| 対象 | SLA |
|---|---|
| chat / bot / build / imagine の公式発表 | 72 時間以内に日本語要約 |
| voice / automations / api | 14 日以内 |
| 料金・制限の変更 | 24 時間以内に `/pricing/` の changelog に追記 |

初回テスト: Grok 4.7（9/11〜12 想定）。当日に `/news/2026/grok-4-7/` と `/pricing/` の差分を出す。

## 書かないこと

- Bot プロンプト集（grokguide.jp に外部リンク）
- 「grok とは」の一般解説記事（Tier C）
- xAI / Grok のロゴ・ワードマーク画像
- 翻訳全文
