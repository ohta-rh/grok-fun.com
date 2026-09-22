---
title: Grok 4.7 は一番ではない。単価を据えて長く働く
description: "2026-09-21 に Grok 4.7 が出ました。総合点は 46 点で、Fable 5.1 と GPT-6 Astra の 53、Opus 5 の 51 より下です。API は入力 100 万トークン $2、出力 $6 で、Grok 4.6 と同じ単価です。長く考えると出力が増え、請求は伸びます。"
published: "2026-09-21"
last_verified: "2026-09-22"
source_url:
  - https://x.ai/news/grok-4-7
  - https://docs.x.ai/developers/grok-4-7
  - https://docs.x.ai/developers/release-notes
  - https://docs.x.ai/developers/models
  - https://docs.x.ai/developers/model-capabilities/text/reasoning
  - https://artificialanalysis.ai/articles/benchmarking-grok-4-7
  - https://artificialanalysis.ai/models/releases/comparisons/grok-4-7-vs-gpt-6-astra
  - https://artificialanalysis.ai/ja/models/releases/comparisons/grok-4-7-vs-claude-opus-5
  - https://artificialanalysis.ai/evaluations/gdpval-aa
  - https://artificialanalysis.ai/models
  - https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-3
  - https://www.vals.ai/
  - https://www.vals.ai/models/grok_grok-4.7
  - https://x.com/ValsAI/status/2102086608476590432
  - https://x.com/ValsAI/status/2102217732238516253
  - https://x.com/elonmusk/status/2080724087593226311
  - https://x.com/elonmusk/status/2082123925283041545
  - https://x.com/elonmusk/status/2087604711767896527
  - https://x.com/elonmusk/status/2088735708693602427
  - https://x.com/elonmusk/status/2094983639780204846
  - https://x.com/elonmusk/status/2098462085973741960
  - https://x.com/elonmusk/status/2099458047408013751
  - https://x.com/elonmusk/status/2102071804495872374
  - https://x.com/elonmusk/status/2102082011233931762
  - https://x.com/elonmusk/status/2102102621037236699
---

## 何が変わったか

2026-09-21、x.ai は Grok 4.7 を出しました。発表ページに書いてある名前は SpaceXAI です。コーディングと、調べて文書にまとめる仕事向けで、4.6 より大きいモデルを、前より長く、難しい問題で鍛えた、と書いてあります。何時間もかかる問題を厚くした、とも書いてあります。鍛える手法は強化学習です。自分の出力を見直し、長い文脈を扱い、Grok Bot の進め方が分かるように訓練した、という説明です。

見出しは「同じクラスの半分の値段で、2 倍速い」です。本文は「4.6 と同じ値段、同じ速さ」です。表の入力は 100 万トークン <span class="num">$2</span> で、GPT-5.6 Sol の <span class="num">$4</span> の半分、Fable 5.1 の <span class="num">$10</span> の 5 分の 1 です。出力は <span class="num">$6</span> で、Sol の <span class="num">$20</span>、Fable の <span class="num">$50</span> より安いです。見出しの「半分」は、入力が Sol の半分である列に近い言い方です。出力の差はそれより大きいです。fast は、出力の速さが 2 倍で、単価も 2 倍、と本文にあります。

<blockquote>
  <p>It works longer on difficult tasks, checks its own work more carefully, and comes with our best-calibrated safeguards to date. Served at the same price and speed as Grok 4.6.</p>
</blockquote>

<p>2026-09-21 の発表です。<a href="https://x.ai/news/grok-4-7" rel="external noopener">x.ai/news/grok-4-7</a></p>

安全の点数も、同じ発表の自己申告です。断る力と、抜け道への耐性は、自分たちが測った中で一番強い、と書いてあります。LatchBio の、生物まわりの危ない依頼を断るテストでは <span class="num">62.4%</span> で首位、と書いてあります。HackerBench v0.3 では、危ない依頼の <span class="num">3.3%</span> だけが通り、ふつうのセキュリティの仕事はあまり止めない、と書いてあります。選んだ相手に、守る研究のため、招待制で検証用の機能を渡し始めた、とも書いてあります。この点数は断るテストの点です。診断や、生物の実験の判断に使ってよい、という意味ではありません。

## どこで使えるか

2026-09-21 の発表と docs が案内した入口です。

<div class="table-scroll">

| 入口 | 案内 |
|---|---|
| Cursor | 全プランで使えます。fast は単価が 2 倍です |
| Grok Build | 既定のモデルです。無料で試せる枠に fast は入りません |
| API | モデル名は grok-4.7 です。fast は公開 API では配っていません |
| ルーター | OpenRouter、Vercel、Cloudflare の名前が docs にあります |

</div>

案内に名前があるのは、Cursor、Grok Build、API、ルーターです。grok.com のモデル名は、開いている画面で見てください。Imagine と Voice は別のモデルです。動画の枚数は Imagine のままです。動画の順番は <a href="/tips/imagine-video/">先に絵を出してから、動きを一つ書く</a> に書いています。

チャット、Grok Bot、Grok Build は <a href="/tips/bot-build-chat-map/">別の道具</a> です。入口が分かれている話は <a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a> です。Grok Build に仕事を渡すときの切り方は <a href="/tips/bot-uses-build/">重い仕事は Grok Build に渡す</a> に書いています。

## API の料金

2026-09-21 のリリースノートは、プロンプトが 20 万トークンを超えると単価が倍になります。単位は 100 万トークンあたりの USD です。円は書きません。

<figure class="article-hero table-shot">
  <a href="/tips/fig-grok-4-7-price.jpg">
    <img src="/tips/fig-grok-4-7-price.jpg" alt="API の単価。20万トークン未満は入力 $2、キャッシュ $0.50、出力 $6。20万以上は入力 $4、キャッシュ $1、出力 $12。単位は 100 万トークン" width="1280" height="278">
  </a>
  <figcaption>100 万トークンあたりの USD です。黄色い行が、ふだんの単価です。2026-09-21 のリリースノート。</figcaption>
</figure>

キャッシュは、同じ入力を再利用したときの入力単価です。考えているあいだのトークンも、使った分に入ります。努力は low、medium、high、xhigh から選べて、既定は high です。Artificial Analysis が総合点に使ったのは xhigh です。

fast は同じモデルを速い機材で配るもので、トークン単価は 2 倍です。配っているのは Cursor と Grok Build です。公開 API は通常の単価です。Grok Build の無料で試せる枠も、通常のモデルです。

モデル名は `grok-4.7`。文脈は 50 万トークンで、4.6 と同じです。知識の区切りは 2026 年 5 月です。入力はテキストと画像、出力はテキストです。docs はテキスト出力について “No text output limit” と書いています。grok.com で使える回数とは別の話です。

月額の SuperGrok と、この API は別の支払いです。払う場所は <a href="/tips/free-vs-supergrok/">やりたいことで決まります</a>。API の請求は <a href="https://console.x.ai" rel="external noopener">console.x.ai</a> で見てください。

## xAI が並べた点

これは出した本人の表です。第三者の点は、このあと Artificial Analysis と Vals に分けて書きます。2026-09-21 の発表の表です。列は Grok 4.7 が xHigh、Grok 4.6 が High、GPT-5.6 Sol が Max、Fable 5.1 が Max です。DeepSWE の 4.7 だけ、注記が high です。Astra と Opus 5 は次の節です。相手の単価は、xAI がこの表に置いた数字です。

列ごとの点は、<a href="https://x.ai/news/grok-4-7" rel="external noopener">発表のページ</a>で見てください。

CursorBench は長めのコーディング、DeepSWE はソフトウェアの課題、EEBench は電気回路、AA Briefcase は何時間もかかる事務、Terminal-Bench はターミナルで長く作業するテスト、Harvey は法律のエージェント、HealthBench は臨床の推論です。法律と臨床の行は、そのテストの点です。契約や診断を任せてよい、という意味ではありません。

4.6 より上がった行がほとんどです。Fable 5.1 より上なのは、DeepSWE、EEBench、Harvey です。CursorBench、AA Briefcase、Terminal-Bench、HealthBench は Fable が上です。Sol より下なのは DeepSWE と HealthBench で、ほかの行は Sol 以上です。Terminal-Bench は 4.6 の <span class="num">20.3%</span> から <span class="num">38.0%</span> まで上がり、それでも Fable の <span class="num">57.9%</span> とは離れています。

## Astra と Fable と Opus

Artificial Analysis は、自分で測る第三者です。Astra と Opus 5 は、<a href="https://artificialanalysis.ai/articles/benchmarking-grok-4-7" rel="external noopener">2026-09-21 の記事</a>と、2026-09-22 に開いた比較ページで比べます。モデル一覧の総合 1 位は Fable 5.1（max、fallback あり）の <span class="num">53</span> です。GPT-6 Astra（max）も <span class="num">53</span>、Opus 5（max）は <span class="num">51</span>、Grok 4.7（xhigh）は <span class="num">46</span> です。4.7 の high も総合は <span class="num">46</span> です。xAI の表は Max と書き、Artificial Analysis は max（fallback あり）と書いています。努力の名前は別です。

Elo は勝ち抜きの点数で、大きいほど上です。GDPval-AA は、弁護士や看護師や金融の実務を模した仕事です。2026-09-22 の順位表では、Fable 5.1（max）が <span class="num">1,735</span>、Opus 5（max）が <span class="num">1,708</span>、Grok 4.7（xhigh）が <span class="num">1,695</span>、Grok 4.7（high）が <span class="num">1,694</span>、GPT-6 Astra（max）が <span class="num">1,542</span> です。4.6（high）は <span class="num">1,605</span> でした。

ページ上部の図は、この総合を日本語で要約したものです。元のチャートは、下の投稿の中にあります。コーディングでも Astra の下です。

<figure class="x-embed">
  <iframe title="Artificial Analysis の投稿。総合とコーディングのチャート" src="https://platform.twitter.com/embed/Tweet.html?id=2102074898327932987&amp;theme=light&amp;dnt=true&amp;hideThread=true" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption><a href="https://x.com/ArtificialAnlys/status/2102074898327932987" rel="external noopener">Artificial Analysis の投稿</a>（2026-09-21）。チャートは X 上の投稿です。</figcaption>
</figure>

書類や表やスライドを作る GDPval では Astra の上で、Opus 5 のすぐ下です。努力を high から xhigh に上げても、総合は 46 のまま、GDPval は 1,694 と 1,695 で、ほとんど動きません。

コーディングは、Grok 4.7（xhigh）を Grok Build で動かした Coding Agent Index が <span class="num">56</span> です。4.6（xhigh）の <span class="num">47</span> から 9 点上がり、GPT-5.6 Sol を超えました。同じ指標で、自社の開発ツール同士の順位は 4 番目です。上位は Fable 5.1、GPT-6 Astra、Opus 5 です。内訳は、DeepSWE が <span class="num">65%</span> から <span class="num">73%</span>、Terminal-Bench 4.0 が <span class="num">18%</span> から <span class="num">33%</span>、SWE-Atlas-QnA が <span class="num">58%</span> から <span class="num">63%</span> です。

xAI の表は DeepSWE <span class="num">71.0%</span>（high）、Terminal-Bench <span class="num">38.0%</span> です。同じ名前でも、努力と、動かし方が違えば点は違います。Artificial Analysis は、総合点の方の Terminal-Bench 4.0 は 4.5 点上がった、とも書いています。38% とは別の測り方です。

事務仕事の AA-Briefcase は <span class="num">1,657</span> Elo で、4.6（high）から 111 上がり、Opus 5 と Fable 5.1 のすぐ後ろ、と書いてあります。棒の並びは、この投稿です。

<figure class="x-embed">
  <iframe title="Artificial Analysis の投稿。AA-Briefcase のチャート" src="https://platform.twitter.com/embed/Tweet.html?id=2102170392924492207&amp;theme=light&amp;dnt=true&amp;hideThread=true" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption><a href="https://x.com/ArtificialAnlys/status/2102170392924492207" rel="external noopener">Artificial Analysis の投稿</a>（2026-09-21）。</figcaption>
</figure>

xAI の表の Fable は <span class="num">1,678</span> で、差は 21 です。中身の Elo は 1,690 から 1,994 に上がり、見た目の Elo は 1,519 から 1,499 に下がりました。分析は良くなって、スライドの体裁は少し落ちています。

総合点のほかの科目は、4.6（high）とおおむね同じです。上がったのは Terminal-Bench 4.0 が 4.5 点、書類を読む GDP.pdf が 3.0 点です。下がったのは長い文脈の AA-LCR が 3.7 点、作業手順の AutomationBench-AA が 1.1 点です。幻覚の割合は <span class="num">34%</span> から <span class="num">29%</span> です。当たっている割合は <span class="num">48%</span> と <span class="num">47%</span> で、ほとんど変わっていません。

トークンは増えています。総合点の 1 問で、4.7（xhigh）の出力は約 <span class="num">81,000</span> トークンです。4.6（high）は約 <span class="num">36,000</span>、4.6（xhigh）は約 <span class="num">38,000</span>、Astra（max）は約 <span class="num">27,000</span> です。単価が安くても、1 問で書く量は Astra の約 3 倍です。長いプロンプトの出力速度は約 <span class="num">188</span> トークン/秒、総合点の 1 問に約 <span class="num">7.1</span> 分、と書いてあります。これは fast の宣伝文句とは別の計測です。

## Vals の実務テスト

Vals も、自分で課題を回す第三者です。2026-09-22 に <a href="https://www.vals.ai/" rel="external noopener">vals.ai</a> を開くと、各社の一番高い点で Grok 4.7 は <span class="num">60.20%</span> です。上は Fable 5.1 の <span class="num">68.83%</span>、GPT-6 Astra の <span class="num">66.61%</span>、Muse Spark 1.3 Max の <span class="num">64.53%</span>、Gemini 3.8 Flash の <span class="num">62.25%</span> です。全モデルの Vals Index では 59 中 10 位で、誤差は ±1.08 です。1 回 <span class="num">$11.90</span>、待ち時間は 32 分 54 秒、と <a href="https://www.vals.ai/models/grok_grok-4.7" rel="external noopener">モデルページ</a>にあります。4.6 は <span class="num">59.17%</span>、4.5 は <span class="num">51.53%</span> です。測ったのは公式 API の xhigh です。上位 3 つの 1 回は <span class="num">$18.81</span> から <span class="num">$28.92</span> で、総合の 1 回だけ見ると Grok は安いです。

出荷の直後は、別の数字でした。<a href="https://x.com/ValsAI/status/2102086608476590432" rel="external noopener">2026-09-21 の投稿</a>は 54.2% で 24 位、4.6 の 59.2%（14 位）より下、4.5 の 51.5% より上、と書いています。同じスレッドで、考えたトークンが 4.6 の半分未満だったこと、1 回が <span class="num">$4.78</span> で 4.6 の <span class="num">$4.34</span> より少し高かったこと、Harvey が <span class="num">19.6%</span> で 5 位だったこと、を書いています。この 19.6% は xAI の表と同じ点です。

<figure class="x-embed">
  <iframe title="Vals の投稿。出荷直後の順位" src="https://platform.twitter.com/embed/Tweet.html?id=2102086608476590432&amp;theme=light&amp;dnt=true&amp;hideThread=true" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption><a href="https://x.com/ValsAI/status/2102086608476590432" rel="external noopener">Vals の投稿</a>（2026-09-21）。出荷直後のチャートです。</figcaption>
</figure>

<a href="https://x.com/ValsAI/status/2102217732238516253" rel="external noopener">2026-09-22 の投稿</a>は、xAI が SDK を直したあとに 10 位になった、と書いています。今の 60.20% と、Harvey の 12.08% は、そのあとの表です。

<figure class="x-embed">
  <iframe title="Vals の投稿。SDK を直したあとの成績表" src="https://platform.twitter.com/embed/Tweet.html?id=2102217732238516253&amp;theme=light&amp;dnt=true&amp;hideThread=true" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption><a href="https://x.com/ValsAI/status/2102217732238516253" rel="external noopener">Vals の投稿</a>（2026-09-22）。直したあとの成績表は、この投稿の中にあります。</figcaption>
</figure>

診療記録の MedScribe と、アプリを組む Vibe Code が強いです。証明の ProofBench と、教育の SAGE は弱いです。LegalBench は 84.39% でも 146 中 31 位で、点の高さはそのまま順位になりません。表の Harvey 12.08% は、出荷直後の 19.6% から動いたあとの点です。Terminal-Bench 2.1 の 73.41% は、xAI の Terminal-Bench 4.0 の 38.0% とは版が違います。

長い仕事は高くなります。コードの移植は 1 回 <span class="num">$36.55</span>、Vibe Code は <span class="num">$15.83</span>、IOI は <span class="num">$12.71</span>、Harvey は <span class="num">$11.01</span> です。単価が安くても、課題が長いと 1 回の請求は上がります。

## イーロンの投稿

投稿の日付は UTC です。9/21 16:25 UTC は、日本時間の 9/22 1:25 です。x.ai が書いた発表日は 2026-09-21 です。

- <time datetime="2026-07-24">2026-07-24</time> 「4.6 は 2 週間、4.7 は 4 週間」。<a href="https://x.com/elonmusk/status/2080724087593226311" rel="external noopener">投稿</a>
- <time datetime="2026-07-28">2026-07-28</time> 4.6 は 1.5 兆で 8/7 ごろ。4.7 は 2.1 兆で、その数週間後。すべての面で 4.6 より良く、配る速さだけ少し遅く、トークン効率はさらに良い。<a href="https://x.com/elonmusk/status/2082123925283041545" rel="external noopener">投稿</a>
- <time datetime="2026-08-12">2026-08-12</time> 4.6 よりかなり良く、3〜4 週間で出る。SpaceX の社内データを追加で学習している。<a href="https://x.com/elonmusk/status/2087604711767896527" rel="external noopener">投稿</a>
- <time datetime="2026-08-15">2026-08-15</time> 今のモデル全部を、賢さで超える可能性が高い。<a href="https://x.com/elonmusk/status/2088735708693602427" rel="external noopener">投稿</a>
- <time datetime="2026-09-02">2026-09-02</time> 10 日で出る。<a href="https://x.com/elonmusk/status/2094983639780204846" rel="external noopener">投稿</a>
- <time datetime="2026-09-11">2026-09-11</time> あと数日。難しい問題を、できるのに早く投げ出す。見直しが足りない。<a href="https://x.com/elonmusk/status/2098462085973741960" rel="external noopener">投稿</a>
- <time datetime="2026-09-14">2026-09-14</time> Opus 5.0 相当で、5.1 ではない。得意不得意がある。マルチモーダルは直す必要がある。4.8 ははっきり良くなる。4.9 が Astra と Fable の級かもしれない。<a href="https://x.com/elonmusk/status/2099458047408013751" rel="external noopener">投稿</a>
- <time datetime="2026-09-21">2026-09-21</time> 賢さ、速さ、安さの組み合わせ。エージェントのコーディングでは Anthropic と OpenAI の次。毎日の仕事に回すなら良い。一番良い結果は Build と一緒に。<a href="https://x.com/elonmusk/status/2102071804495872374" rel="external noopener">賢さと安さ</a>、<a href="https://x.com/elonmusk/status/2102082011233931762" rel="external noopener">3 番という投稿</a>、<a href="https://x.com/elonmusk/status/2102102621037236699" rel="external noopener">Build</a>

<blockquote>
  <p>Grok 4.7 should be roughly on par with Opus 5.0, not 5.1. Better in some ways, worse in others. We need to fix multimodal performance. Grok 4.9 is probably Astra/Fable class.</p>
</blockquote>

<p>2026-09-14 の投稿です。出荷した docs の入出力は、テキストと画像を入れて、テキストが出ます。Imagine は別のモデルのままです。</p>

<blockquote>
  <p>it still gives up on hard tasks (that it can do!) too early and isn’t yet sufficiently rigorous in checking its work.</p>
</blockquote>

<p>2026-09-11 の投稿です。9/21 の発表が「長く働き、自分の出力を見直す」と書いたのは、この不満のあとです。</p>

<blockquote>
  <p>Grok 4.7 places @SpaceXAI as third, after Anthropic &amp; OpenAI, for agentic coding. When factoring in that Grok is significantly faster &amp; lower cost, it’s a great choice for your everyday workhorse.</p>
</blockquote>

<p>2026-09-21 の投稿です。イーロンが書いたのは、Anthropic と OpenAI の次、という順位です。Artificial Analysis が書いた 4 番目は、Fable 5.1、Astra、Opus 5 の次です。</p>

2.1 兆は、2026-07-28 の投稿の数字です。2026-09-21 に docs で確かめた仕様は、文脈 50 万トークン、入力 $2、出力 $6 です。7/28 は「トークン効率はさらに良い」とも書いています。9/21 の測り方では、総合点の 1 問の出力が増えています。社内データの話は 8/12 の投稿にあります。9/21 の発表が説明したのは、モデルを大きくしたこと、学習を長くしたこと、Grok Bot の進め方を覚えたことです。

9/14 の見通しは、総合点では近い結果です。4.7 は Opus 5 の 51 より下の 46 です。GDPval では Opus 5 の 1,708 のすぐ下で、Astra の 1,542 より上です。得意不得意がある、という文に近い並びです。8/15 の「全部を超える」は、この総合点では起きていません。

## 日本で使うなら

長いコードを Grok Build に書かせるなら、docs では 4.7 が既定です。イーロンも、Build と一緒に使うと一番良い、と書いています。単価は 4.6 と同じで、Fable の表の単価より安いです。ただし xhigh で長く考えると、1 問の出力は約 81,000 トークンまで増えます。安いのは 1 トークンの値段です。1 件の請求は、出力の量で伸びます。

プロンプトが 20 万トークンを超えると、単価が倍です。長いログを全部貼る前に、要る部分だけにします。知識の区切りは 2026 年 5 月です。それより新しいことは、API なら web search を付けるか、自分で資料を貼ります。

日本語の試験は、この発表の点数とは別です。英語で返ってきたら、今まで通り <a href="/tips/japanese-fix/">会話の最初に 3 行貼ります</a>。動画の枚数は、Imagine のままです。

Harvey と HealthBench はテストの点です。契約書や診断の判断には使いません。

## よくある取り違え

- 「4.7 は全部のモデルに勝った」: 2026-08-15 の見通しです。2026-09-21 の総合は 46 で、Fable と Astra の 53、Opus 5 の 51 の下です
- 「チャットも今日から 4.7」: 案内されたのは Cursor、Grok Build、API です。grok.com は、開いている画面のモデル名を見てください
- 「Terminal-Bench は 38%」: それは xAI の表の 4.0 です。Artificial Analysis が Grok Build で測った 4.0 は 33%、Vals の 2.1 は 73.41% です
- 「Harvey は 19.6%」: 出荷直後は、xAI の表も Vals の投稿もその点でした。SDK を直したあとの Vals の掲載は 12.08% です
- 「Vals では 4.6 より下がった」: 出荷直後は 54.2% で 24 位、4.6 の 59.2% より下でした。SDK を直したあとの掲載は 60.20% で 10 位、4.6 の 59.17% の上です
- 「単価が同じなら請求も同じ」: 単価は同じです。総合点の 1 問で出力が約 81,000 トークンになり、4.6 の high の約 36,000 より多いです
- 「2.1 兆が仕様」: 2026-07-28 の投稿の数字です。出荷日に docs で確かめた仕様は、文脈 50 万、入力 $2、出力 $6 です

## 関連する TIPS

- <a href="/tips/free-vs-supergrok/">やりたいことで、払う場所が決まる</a>
- <a href="/tips/bot-build-chat-map/">チャット、Grok Bot、Grok Build は別の道具</a>
- <a href="/tips/bot-uses-build/">重い仕事は Grok Build に渡す</a>
- <a href="/tips/japanese-fix/">英語で返ってきたら、会話の最初に 3 行貼る</a>
