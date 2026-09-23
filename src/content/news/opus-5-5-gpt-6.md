---
title: 翌日の点では、Grok 4.7 は負けた
description: "2026-09-22 に Claude Opus 5.5 と GPT-6 Sol、GPT-6 Luna が出ました。Terminal-Bench 4.0 は、前日の Grok 4.7 が 38.0% で、Opus 5.5 は 66.4% です。測り方は別です。API の単価は、Grok の方がまだ安いです。"
published: "2026-09-22"
last_verified: "2026-09-23"
source_url:
  - https://www.anthropic.com/claude-opus-5-5
  - https://openai.com/index/introducing-gpt-6-sol-and-luna/
  - https://x.ai/news/grok-4-7
---

## 翌日に、もっと高い点が並んだ

2026-09-21 に <mark>Grok 4.7</mark> が出ました。その翌日、2026-09-22 に Claude Opus 5.5 と、GPT-6 Sol、GPT-6 Luna が出ました。前日のメモは <a href="/news/grok-4-7/">Grok 4.7 は一番ではない</a> です。その日の総合点も、すでに Fable 5.1 と GPT-6 Astra と Opus 5 の下でした。翌日の表は、その差をさらに広げました。

いちばん上の図は、Terminal-Bench 4.0 です。xAI が 9 月 21 日に出した Grok 4.7 は <span class="num">38.0%</span> です。Anthropic が 9 月 22 日に出した Opus 5.5 は <span class="num">66.4%</span> です。同じ名前のテストでも、動かし方は別です。Anthropic の注では、Opus 5.5 は xhigh、GPT-6 Astra の <span class="num">57.9%</span> は OpenAI が high で出した点です。Grok の 38.0% は、xAI 自身の表です。一つのレースの順位表ではありません。それでも、点の開きは大きいです。<strong>負けています。</strong>

## どこで会うか

<figure class="article-hero">
  <img src="/tips/fig-next-day-door.jpg" alt="ノートに、どこで会うか、Chat にはまだ無い、Codex と Work と API、2026-09-22 と書いてある" width="1280" height="720" />
  <figcaption>GPT-6 Sol と Luna は、2026-09-22 の発表では Chat にはまだありません。Codex と ChatGPT Work と API です。</figcaption>
</figure>

GPT-6 Sol と Luna は、OpenAI の発表では ChatGPT Work と Codex と API に出ます。対象は Plus、Pro、Business、Enterprise、Edu です。Free と Go は、デスクトップアプリで Luna を試せます。Chat には、まだ無い、と書いてあります。API の名前は `gpt-6-sol` と `gpt-6-luna` です。Astra は、いちばん賢いモデルのまま、と OpenAI は書いています。Sol と Luna は、その賢さを安く出す方です。

Opus 5.5 は、Anthropic が同じ日に出した Claude 5.5 の最初のモデルです。いつもの仕事では Fable 5.1 と同じくらいで、Opus 5 より動かす費用が 40% 安い、と書いてあります。出力は Opus 5 より 30% 以上速い、ともあります。

## 単価は、まだこっちが安い

<figure class="article-hero">
  <img src="/tips/fig-next-day-price.jpg" alt="ノートに、単価はまだ安い、100万トークン、Grok 4.7 は $2 / $6、GPT-6 Sol は $2 / $10、Opus 5.5 は $4 / $20 と書いてある" width="1280" height="720" />
  <figcaption>100 万トークンの入力と出力です。点では負けて、単価は Grok 4.7 の方がまだ安いです。</figcaption>
</figure>

Grok 4.7 は入力 <span class="num">$2</span>、出力 <span class="num">$6</span> です。GPT-6 Sol は <span class="num">$2</span> と <span class="num">$10</span> です。Opus 5.5 は <span class="num">$4</span> と <span class="num">$20</span> です。Luna は <span class="num">$0.10</span> と <span class="num">$0.50</span> で、この中ではいちばん安いです。Sol と Luna は、GPT-5.6 のプロモーション価格から 50% 下げた、と OpenAI は書いています。Opus 5.5 のキャッシュ読みは <span class="num">$0.20</span> です。速いモードは入力 <span class="num">$8</span>、出力 <span class="num">$40</span> です。

点で上なのは Opus 5.5 で、単価は Grok より高いです。Sol は入力が Grok と同じで、出力は高いです。安いから Grok に残る、はまだ言えます。点で選ぶなら、この日の表は Grok ではありません。1 件で払う額は、単価だけでは決まりません。長く書くと、払う額は増えます。前日のメモに、その話があります。

## ほかの行も、先頭ではない

CursorBench 4.0 は、Anthropic の表では Opus 5.5 が <span class="num">57.8%</span>、Fable 5.1 が <span class="num">51.8%</span>、Opus 5 が <span class="num">46.6%</span>、GPT-5.6 Sol が <span class="num">41.7%</span> です。Astra のマスは空欄です。xAI が前日に出した Grok 4.7 は <span class="num">46.3%</span> です。Opus 5.5 と Fable 5.1 の下で、Opus 5 とほぼ同じ、GPT-5.6 Sol より上です。

DeepSWE は、努力が揃っていません。xAI の表は Grok 4.7 が <span class="num">71.0%</span>（high）です。OpenAI は GPT-6 Sol が <span class="num">68.8%</span>（max）で、Fable 5 の <span class="num">69.9%</span>（xhigh）に近い、と書いています。この行を、Grok の勝ちとは書きません。

Anthropic の表に、Grok の列はありません。そこに並ぶ GPT-6 Astra は、Terminal-Bench 4.0 が <span class="num">57.9%</span>、FrontierCode が <span class="num">53.3%</span>、GDPval-AA が <span class="num">1542</span>、AutomationBench が <span class="num">41.4%</span>、科学の Terminal-Bench-Science が <span class="num">64.6%</span> です。Opus 5.5 は Terminal-Bench <span class="num">66.4%</span>、FrontierCode <span class="num">54.4%</span>、GDPval-AA <span class="num">1846</span>、AutomationBench <span class="num">40.0%</span>、科学は <span class="num">58.7%</span> です。Astra が上なのは、この表では AutomationBench と科学の行です。ほかは Opus 5.5 が上です。

安全装置が働いたとき、Anthropic はサイバーの課題を Opus 4.8 に、生物とフロンティアの開発課題を Opus 5 に回した、と注に書いています。その分、Opus 5.5 の点は下がりやすい、とも書いています。下がったあとの 66.4% でも、Grok の 38.0% より上です。

## ファンとして、残る理由と、残らない理由

単価を見て残る理由はあります。点を見て、一番だとは言えません。前日の第三者の総合点も 46 で、Fable と Astra の 53、Opus 5 の 51 の下でした。翌日、公式の表の先頭は Opus 5.5 です。

長いコードを Grok Build に書かせるなら、前日のメモどおり 4.7 はまだ使えます。点の先頭が要る仕事は、この日の発表を見てください。どこにいくら払うかは、<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>に書きました。

## よくある取り違え

- 「同じ日の同じ表で 38% 対 66%」: 38.0% は xAI の 9 月 21 日の表です。66.4% は Anthropic の 9 月 22 日の表です。努力も動かし方も違います
- 「Sol は Chat で今すぐ使える」: Chat には、まだ無い、と発表に書いてあります。Codex と ChatGPT Work と API です
- 「単価が安いから勝った」: 単価はまだ安いです。Terminal-Bench と CursorBench の点は、Opus 5.5 の方が上です
- 「DeepSWE の 71% が総合一位」: high の自社の点です。翌日の Sol は max で 68.8% です。同じ条件ではありません
