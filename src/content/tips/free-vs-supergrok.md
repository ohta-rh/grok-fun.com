---
title: やりたいことから払う場所を決める（Grok の料金）
description: SuperGrok Heavy は公式の最上位。金額カードに出ているのは Free、$30、Plus $100。X と Cursor と API は別契約。週の枠は 1 本。
order: 3
product: chat
last_verified: "2026-09-08"
source_url:
  - https://x.ai/pricing
  - https://docs.x.ai/grok/faq
  - https://x.ai/news/grok-bot-more-plans
  - https://x.ai/news/grok-build-mode
  - https://x.ai/news/grok-build-cli
  - https://cursor.com/pricing
  - https://docs.x.ai/docs/models
  - https://docs.x.ai/grok-bot/get-started
  - https://help.x.com/en/using-x/x-premium
related:
  - three-entrances
  - bot-build-chat-map
  - imagine-quickstart
image: /tips/free-vs-supergrok.jpg
image_alt: 封蝋の違う紙が 4 枚並んでいる
image_caption: やりたいことから、払う場所を決める。
---

## 先に決めること

「Grok の有料」は 1 本ではありません。やりたいことを先に決めると、払う場所が決まります。

| やりたいこと | 払う場所 | 2026-09-08 に公式カードへ出ていた金額 |
|---|---|---|
| grok.com / 公式アプリでチャット、Imagine、Voice | grok.com の SuperGrok 系 | Free $0 / SuperGrok $30 / Plus $100。Heavy は比較表にあり、金額は契約画面 |
| X の中だけで使う | X Premium / Premium+ | X 側。SuperGrok は付かない |
| Grok Bot だけ（すでに Cursor） | cursor.com の個人 Pro | $20〜。grok.com の週間枠は上がらない |
| 自分のアプリから呼ぶ | console.x.ai の API | 従量。SuperGrok の週の枠ではない |

X Premium に入っても grok.com は無料のまま、が普通です。入口の違いは <a href="/tips/three-entrances/">grok.com / 公式アプリ / X</a>。チャットと Bot と Build の違いは <a href="/tips/bot-build-chat-map/">別の道具</a>。

## grok.com の階段

<a href="https://x.ai/pricing" rel="external">x.ai/pricing</a> の個人向けカード（2026-09-08）に金額が書いてあるのは次です。

- **Free $0** — まずここで 1 週間使う
- **SuperGrok $30** — いちばん多い選択。Grok 4.6、Imagine、Voice、Grok Bot、枠の引き上げ
- **SuperGrok Plus $100** — 1080p 動画。Chat / Imagine / Voice / Build の枠を大きくする

**SuperGrok Heavy は公式プランです。** 同じページの比較表に列があり、Get Heavy から入れます。画面の中でサイトを作る <a href="https://x.ai/news/grok-build-mode" rel="external">Build Mode</a>（2026-07-28）は、発表時点で Heavy 向けです。FAQ は、身に覚えのない高額請求が Heavy の年払いであることが多い、と書いています。トップの 3 枚カードには Heavy の金額は出ていません。金額は契約画面で見てください。

Lite も比較表に名前と Get Lite があります。金額はトップカードに出ていません。

## 週の枠は 1 本

2026 年 6 月から、grok.com とアプリの上限は製品ごとの日次回数ではなく、**1 週間の枠を Chat・Imagine・Voice・Build で共有**します（<a href="https://docs.x.ai/grok/faq" rel="external">FAQ</a>）。

<figure class="article-hero">
  <img src="/tips/fig-bill-pool.jpg" alt="週の枠は Chat Imagine Voice Build で 1 本" width="1280" height="720" />
  <figcaption>枠は 1 本。動画と長いコーディングの方が、チャットより多く使う。</figcaption>
</figure>

残りは **設定 → Usage**。内訳と次のリセットを見ます。使い切ると有料機能はリセットまで止まります。無料枠の Chat と Voice は別スケジュールで残ります。抜け道は追加クレジット、上のプラン、Auto Top Up です。

「昨日は画像が出たのに今日は出ない」は、画像の上限が変わったのではなく、同じ週の枠を別の作業で使った、が多いです。

<figure class="article-hero">
  <img src="/tips/fig-bill-not.jpg" alt="X Premium でも Cursor でも SuperGrok でも、欲しいものが付かない" width="1280" height="720" />
  <figcaption>X に入っても grok.com の SuperGrok は付かない。Cursor でも Imagine の枠は上がらない。SuperGrok でも API は付かない。</figcaption>
</figure>

## 追加クレジット

週の枠を使い切ったあとの前払いです。FAQ 上、**Web からだけ**、$5 から。約 1 年で切れる。含まれる枠より 1 回あたり高い。毎週当たるなら、クレジットを積み増すより上のプランの方が安い、と公式は書いています。

## API は別会計

<a href="https://console.x.ai" rel="external">console.x.ai</a> はトークンの従量です。<a href="https://docs.x.ai/docs/models" rel="external">公式のモデル表</a>（2026-09-08）の grok-4.6 は、100 万トークンあたり次です。プロンプトが 20 万に達した回は、その回の全トークンが上の単価です。

| 種類 | 20 万トークン以下 | 20 万超 |
|---|---|---|
| 入力 | $2 | $4 |
| 入力（キャッシュ済み） | $0.50 | $1 |
| 出力 | $6 | $12 |

API クレジットは返金されません。SuperGrok に入っても API は使えません。

## 解約は払った場所で

<figure class="article-hero">
  <img src="/tips/fig-bill-cancel.jpg" alt="払った場所で解約する" width="1280" height="720" />
  <figcaption>grok.com で払った分は grok.com の請求。アプリならストア。X と Cursor はそれぞれの設定。</figcaption>
</figure>

| 払った場所 | 止める場所 |
|---|---|
| grok.com（Web） | grok.com の請求。広告ブロッカーでボタンが開かないことがある |
| iPhone / iPad | Apple の定期購入 |
| Android | Google Play。返金は FAQ 上 xAI の申請フォーム |
| X Premium | X の設定 |
| Cursor | Cursor の請求 |

Web とアプリで別アカウントに入っていると、片方だけ有料に見えます。Apple の「メールを非公開」が原因のことが多いです。

## 円の価格

ストアの円は、公式 USD の為替換算ではありません。PC 中心なら grok.com、スマホ中心ならストア、と先に決めてから比べてください。追加クレジットは Web だけなので、枠を超えがちな人は Web 契約の方が融通が利きます。

## 決め方

1. 無料で 1 週間使う。当たった曜日と、そのとき何をしていたかをメモする
2. Usage の内訳を見る。動画が主因なら Plus、チャットだけなら SuperGrok で足りることが多い
3. 入口を決める。X の中だけなら X。grok.com なら SuperGrok。Bot だけで Cursor なら Cursor
4. Heavy は、Build Mode が要る、または枠が SuperGrok / Plus では足りない、と分かってから

## よくある取り違え

- 「X Premium なのに grok.com が無料」: 別契約なので正常
- 「Cursor Pro なのに Imagine の枠が同じ」: Cursor は Grok Bot 側
- 「SuperGrok なのに API が使えない」: API は console.x.ai
- 「X Premium なのにターミナルの Build が使えない」: 発表時点では Premium+ か SuperGrok
- 「身に覚えのない高額請求」: FAQ は Heavy の年払いが多いと書く。請求画面を見る
- 「Heavy は公式に無い」: 比較表と Get Heavy にある。金額は契約画面
