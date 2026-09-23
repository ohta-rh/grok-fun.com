- date: 2026-09-24
- model: claude-fable-5-1
- checkpoint: design
- base: c0d9f55 (main)

できたわ。前置きは 3 行で済ませる。

- 「努力」「effort」は全部消して、「考える量の設定」で書いた。high / max / xhigh は英語のまま。
- 単価の段の「キャッシュから読む入力 $0.20」と「速いモード $8 / $40」は、元の文でも誰の値段か書いてない。Grok のキャッシュは前日のメモで $0.50 だから Grok のものではないはず。事実は足せないので、そのまま持ち主を書かずに置いた。あんたが確認して。
- title と description は今のまま（20 字と 154 字）。frontmatter の published、last_verified、source_url はファイル側で維持して。

```markdown
---
title: 翌日の点では、Grok 4.7 は負けた
description: "2026-09-22 に Claude Opus 5.5 と GPT-6 Sol、GPT-6 Luna が出ました。Terminal-Bench 4.0 は、前日の Grok 4.7 が 37.6% で、Opus 5.5 は 66.4% です。測り方は別です。API の単価は、Grok の方がまだ安いです。"
---

## 翌日に、もっと高い点が並んだ

2026-09-21 に <mark>Grok 4.7</mark> が出ました。その翌日の 2026-09-22 に、Claude Opus 5.5 と GPT-6 Sol、GPT-6 Luna が出ました。前日のメモは <a href="/news/grok-4-7/">Grok 4.7 は一番ではない</a> です。前日の時点で、第三者の総合点はすでに Fable 5.1、GPT-6 Astra、Opus 5 の下でした。翌日に出た表で、その差はさらに広がりました。

いちばん上の図は Terminal-Bench 4.0 です。xAI が 9 月 21 日に出した Grok 4.7 は <span class="num">37.6%</span> で、Anthropic が 9 月 22 日に出した Opus 5.5 は <span class="num">66.4%</span> です。同じ名前のテストですが、動かし方は同じではありません。Anthropic の注によると、Opus 5.5 の点は、考える量を多めにする xhigh という設定で測ったものです。GPT-6 Astra の <span class="num">57.9%</span> は、OpenAI が high の設定で出した点です。Grok の 37.6% は、xAI 自身の表にある点です。ですから、一つのレースの順位表として読むことはできません。それでも、点の開きは大きいです。<strong>負けています。</strong>

## どこで会うか

<figure class="article-hero">
  <img src="/tips/fig-next-day-door.jpg" alt="ノートに、どこで会うかという問いと、Chat にはまだ無く Codex と Work と API に出る、という答えが 2026-09-22 の日付つきで書いてある" width="1280" height="720" />
  <figcaption>GPT-6 Sol と Luna は、2026-09-22 の発表の時点では Chat にはまだありません。使えるのは Codex と ChatGPT Work と API です。</figcaption>
</figure>

GPT-6 Sol と Luna は、OpenAI の発表では ChatGPT Work、Codex、API の三つで使えます。対象のプランは Plus、Pro、Business、Enterprise、Edu です。Free と Go の人は、デスクトップアプリで Luna を試せます。Chat にはまだ無い、と発表には書いてあります。API での名前は `gpt-6-sol` と `gpt-6-luna` です。いちばん賢いモデルは引き続き Astra だ、と OpenAI は書いています。Sol と Luna は、その賢さを安く使えるようにしたモデルです。

Opus 5.5 は、Anthropic が同じ日に出した Claude 5.5 の最初のモデルです。ふだんの仕事では Fable 5.1 と同じくらいの出来で、動かす費用は Opus 5 より 40% 安い、と書いてあります。出力の速さも Opus 5 より 30% 以上速い、とあります。

## 単価は、まだこっちが安い

<figure class="article-hero">
  <img src="/tips/fig-next-day-price.jpg" alt="ノートに、単価はまだ安い、と書いてあり、100万トークンあたりの単価として Grok 4.7 は $2 / $6、GPT-6 Sol は $2 / $10、Opus 5.5 は $4 / $20 と並んでいる" width="1280" height="720" />
  <figcaption>100 万トークンあたりの、入力と出力の単価です。点では負けていますが、単価は Grok 4.7 の方がまだ安いです。</figcaption>
</figure>

Grok 4.7 は、入力 <span class="num">$2</span>、出力 <span class="num">$6</span> です。GPT-6 Sol は入力 <span class="num">$2</span>、出力 <span class="num">$10</span> です。Opus 5.5 は入力 <span class="num">$4</span>、出力 <span class="num">$20</span> です。Luna は入力 <span class="num">$0.10</span>、出力 <span class="num">$0.50</span> で、この中ではいちばん安いです。Sol と Luna の単価は、GPT-5.6 のプロモーション価格から 50% 下げたものだ、と OpenAI は書いています。キャッシュから読む入力は <span class="num">$0.20</span> です。速いモードは入力 <span class="num">$8</span>、出力 <span class="num">$40</span> です。

点で上にいるのは Opus 5.5 で、単価は Grok より高いです。Sol は、入力は Grok と同じで、出力は Grok より高いです。ですから、安いから Grok に残る、という言い方はまだできます。ただ、点で選ぶなら、この日の表で選ぶ先は Grok ではありません。それに、1 件で払う額は単価だけでは決まりません。長く書かせるほど、払う額は増えます。その話は前日のメモに書きました。

## ほかの行も、先頭ではない

CursorBench 4.0 は、Anthropic の表では Opus 5.5 が <span class="num">57.8%</span>、Fable 5.1 が <span class="num">51.8%</span>、Opus 5 が <span class="num">46.6%</span>、GPT-5.6 Sol が <span class="num">41.7%</span> です。Astra のマスは空欄です。xAI が前日に出した Grok 4.7 は <span class="num">46.3%</span> です。並べると、Opus 5.5 と Fable 5.1 の下で、Opus 5 とほぼ同じで、GPT-5.6 Sol よりは上です。

DeepSWE は、考える量の設定が各社でそろっていません。xAI の表では、Grok 4.7 は high の設定で <span class="num">71.0%</span> です。OpenAI の発表では、GPT-6 Sol は max の設定で <span class="num">68.8%</span> で、Fable 5 が xhigh で出した <span class="num">69.9%</span> に近い、とあります。設定がそろっていないので、この行だけは勝ち負けを言いません。

Anthropic の表に、Grok の列はありません。Astra と Opus 5.5 の点は、下の図にあります。

<figure class="article-hero table-shot">
  <a href="/tips/fig-next-day-table.jpg">
    <img src="/tips/fig-next-day-table.jpg" alt="Anthropic の表の写真。Grok の列は無く、Astra と Opus 5.5 の点が並んでいる。黄色の 2 行は AutomationBench と科学で、そこだけ Astra が上" width="1280" height="720" />
  </a>
  <figcaption>2026-09-22 の Anthropic の表です。黄色の 2 行だけ Astra が上で、ほかの行は Opus 5.5 が上です。</figcaption>
</figure>

安全装置が働いた問題について、Anthropic は注でこう書いています。サイバーの問題は Opus 4.8 に、生物とフロンティアの開発の問題は Opus 5 に回した、と。その分、Opus 5.5 の点は下がりやすい、ともあります。そうして下がった後の 66.4% でも、Grok の 37.6% より上です。

## ファンとして、残る理由と、残らない理由

単価を見れば、残る理由はあります。点を見れば、一番だとは言えません。前日の第三者の総合点は 46 で、Fable 5.1 と Astra の 53、Opus 5 の 51 の下でした。翌日に出た公式の表では、先頭にいるのは Opus 5.5 です。

長いコードを Grok Build に書かせる使い方なら、前日のメモに書いたとおり、4.7 はまだ十分に使えます。点で先頭のモデルが要る仕事なら、この日の発表を見てください。どこにいくら払うかは、<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>に書きました。

## よくある取り違え

- 「同じ日の同じ表で 38% 対 66%」と読む: 37.6% は xAI が 9 月 21 日に出した表の点で、66.4% は Anthropic が 9 月 22 日に出した表の点です。考える量の設定も、動かし方も違います
- 「Sol は Chat で今すぐ使える」: 発表には、Chat にはまだ無い、と書いてあります。使えるのは Codex と ChatGPT Work と API です
- 「単価が安いから勝った」: 単価はたしかにまだ安いです。ただ、Terminal-Bench と CursorBench の点は、Opus 5.5 の方が上です
- 「DeepSWE の 71% が総合一位」: 71.0% は、xAI 自身が high の設定で出した点です。翌日の Sol は max の設定で 68.8% です。同じ条件で測った点ではありません
```

数字は維持


## Applied

本文は Fable の清書を載せた。title と description は維持。

## Owner overrides

キャッシュから読む入力 $0.20 と、速いモードの $8 / $40 は、Anthropic の発表では Opus 5.5 の値段。Fable は持ち主を空欄にしたので、文の主語だけ Opus 5.5 にした。
