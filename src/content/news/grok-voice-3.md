---
title: 声の API は Voice 3.0。分 $0.08 のまま
description: "2026-10-14、Grok Voice 3.0 が API に出ました。分あたり $0.08 で、前の Voice 2.0 と同じ値段です。grok-voice-latest は、すでに 3.0 です。Bot の音声モードでも動きます。2026-10-13 の音声指標は 86.9 で 1 位です。"
published: "2026-10-14"
last_verified: "2026-10-16"
source_url:
  - https://x.ai/news/grok-voice-3
  - https://docs.x.ai/developers/pricing
  - https://docs.x.ai/developers/model-capabilities/audio/voice
  - https://x.ai/pricing
---

## 何が変わったか

2026-10-14、SpaceXSI は Grok Voice 3.0 を出しました。声の会話を、そのまま扱うモデルです。発表は [Introducing Grok Voice 3.0](https://x.ai/news/grok-voice-3) です。

2026-10-14 から、API で使えます。モデル名を `grok-voice-latest` にしているエージェントは、すでに 3.0 で動いています。モデル名を自分で書き換える手順は要りません。

<strong>声の API は Voice 3.0 です。分あたり $0.08 のままです。</strong>いちばん上の図に書いたのは、そのことです。

## どこで使えて、いくら払うか

使う場所は、Voice Agent の API です。使い方は、[docs の音声](https://docs.x.ai/developers/model-capabilities/audio/voice) に書いてあります。grok.com の会話で Voice を押す話ではありません。

2026-10-16 の [API の料金](https://docs.x.ai/developers/pricing) では、Grok Voice 3.0 は分 <span class="num">$0.08</span>（1 時間 $4.80）です。テキストの入力は $0.004 です。前の Voice 2.0 も同じ金額で、その行は Deprecated です。

Bot の音声モードでも、このモデルが動きます。Tesla の車と、Starlink の電話でも使っている、と発表にあります。Starlink の電話は 1 日 20,000 件です。およそ 70% は人が入らずに終わり、販売の電話では 4 件に 1 件が、切る前に購入まで行きます。これも発表にある数字です。

grok.com の Voice は、週の分から減ります。この API の分あたり $0.08 は、その週の分とは別で、使った分だけ払います。払う場所は <a href="/tips/free-vs-supergrok/">Heavy を解約して入り直した</a> に書きました。

## 発表が引いた数字

発表は、Artificial Analysis の 2026-10-13 の音声指標で、Grok Voice 3.0 を <span class="num">86.9</span> の 1 位としています。同じ発表では、Full Duplex Bench は 97%、τ-Voice は 71.6% で、GPT-Live-1（Astra）と同じくらいです。返事までの時間は、40% 短いとしています。ServiceNow の EVA-Bench では、正確さ 74% でいちばん高い、としています。

## 前のモデル

2026-07-29 に出たのが Grok Voice 2.0 です。2026-10-16 の料金表では、2.0 は Deprecated で、金額は 3.0 と同じです。

## どうするか

声のエージェントを API で作る人は、`grok-voice-latest` のままにしておけば 3.0 です。分あたり $0.08 は、2026-10-16 の料金表の数字です。

grok.com の会話で Voice を使う人が、この発表でやることはありません。

## 関連する TIPS

API と週の分の分け方は、<a href="/tips/free-vs-supergrok/">Heavy を解約して入り直した</a>です。Grok Bot のコンピュータは、<a href="/tips/grok-bot-cloud-computer/">クラウドにコンピュータがある</a>です。

## よくある取り違え

- 「grok.com の会話の Voice も、今日から 3.0」: 発表にあるのは、API と、Bot の音声モードと、Tesla と Starlink です
- 「3.0 は 2.0 より高い」: 2026-10-16 の料金表では、どちらも分 $0.08 です
- 「この API も、週の分から減る」: grok.com の Voice は週の分です。この API は、分あたり $0.08 で別に払います
