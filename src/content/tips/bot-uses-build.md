---
title: Grok Bot に全部やらせない。重い仕事は grok に渡す
description: SuperGrok の人向けです。とくに Heavy。Bot に調査も絵も全部頼むと会話の残りがすぐ減るので、コンピュータの grok に渡してください。出てきたものは読んでから使います。
order: 8
product: bot
last_verified: "2026-09-12"
source_url:
  - https://docs.x.ai/grok-bot/computer-and-apps
  - https://x.ai/news/grok-build-cli
  - https://docs.x.ai/grok-bot/skills-routines-and-automations
  - https://docs.x.ai/grok-bot/faq
  - https://x.ai/news/introducing-grok-bot
related:
  - grok-bot-cloud-computer
  - bot-build-chat-map
  - free-vs-supergrok
  - imagine-quickstart
image: /tips/bot-uses-build.jpg
image_alt: 紙に「重い仕事は grok に渡す。」と大きく書いてある
image_caption: 調査も Imagine も、Bot のコンピュータに入れた grok に渡します。出てきたものは、そのまま使いません。
---

## 困ること

Grok Bot に長い調査を頼むと、会話が長くなります。Imagine で絵も出させて、下書きも書かせると、もっと長くなります。使える量は、その会話から減っていきます。ノートを閉じても仕事は続きます。続きがあるのに、残りだけ先に尽きます。

この書き方は、**SuperGrok に入っている人向け**です。とくに Heavy で、調査も Imagine も長い仕事を Bot の会話に全部載せている人です。チャットだけで足りる人は、やらなくて大丈夫です。

チャットと Bot と Build は、別の道具です。分け方は <a href="/tips/bot-build-chat-map/">3 つは別</a> に書きました。プランの話は <a href="/tips/free-vs-supergrok/">払う場所は 4 つ</a> です。

## 何を分けるか

Bot には「やってください」「これを通していいですか」だけ頼みます。調べること、絵を出すこと、ファイルを触ることは、Bot のコンピュータに入れた grok にやらせます。

公式が「そう使え」と書いてあるわけではありません。書いてあるのは、Bot のコンピュータにターミナルがあることと、grok の入れ方です。

<div class="table-scroll">

| 道具 | 頼むこと |
|---|---|
| **Grok Bot** | 短く頼んで、出てきたものを読んで、通すか決めます |
| **Grok Build** | 調べて、Imagine で絵を出して、ファイルを触ります |

</div>

同じ会話で両方やると、残りがどこから減っているのか分からなくなります。誰が「出してよい」と決めたのかも分からなくなります。

## grok を入れる

Grok Bot はクラウドにコンピュータを持ちます。ブラウザも、ファイルも、ターミナルもあります（<a href="/tips/grok-bot-cloud-computer/">コンピュータは 1 台</a>）。そのターミナルに Grok Build を入れます。

2026-05-25 の発表では、入れるコマンドは次です。発表時点の対象は SuperGrok と X Premium+。**自分のプランで使えるかは、契約する画面で確かめてください。**

```
curl -fsSL https://x.ai/cli/install.sh | bash
grok
```

入り方は、grok.com のアカウントか、API キーです。Bot の会話の残りとは別に減ります。どっちが減るかは、どちらで入ったかで決まります。払う場所は <a href="/tips/free-vs-supergrok/">4 つ</a> あります。

公式は、手で入れたものは、コンピュータを更新すると消えることがある、と書いています。残したい成果は `/workspace` に置きます。消えたら、入れ直します。

同じアカウントの Bot は、その 1 台を共有します。grok のログインも共有です。

## 短く頼んで、grok にやらせる

頼む人は「やってください」だけ言います。調査も Imagine も長い下書きも、grok に渡します。頼む人が自分で grok を叩くと、また会話が長くなります。

やり方と、やってはいけないことは、Bot の Skill に書いておきます。Skill はやり方、Routine はいつやるかです。`/` で Skill を付けて、grok に渡す文まで入れておくと、「こう書いて」を毎回言わなくて済みます。何も決めずに grok を回さないでください。

スクリプトから叩くときは、2026-05-25 の発表にある `-p` です。

```
grok -p "このフォルダを 5 行でまとめてください。出典を付けてください。ファイルは書き換えないでください。"
```

プロンプト集はこのサイトには置きません。<a href="https://grokguide.jp" rel="external">grokguide.jp</a> にあります。

## 出てきたものは、まだ使わない

<figure class="article-hero">
  <img src="/tips/fig-bot-uses-build-arch.jpg" alt="Bot のコンピュータで grok を動かす、と書いたノート。コンピュータは 1 台。Bot が短く頼む。grok が調べて絵も出す。Bot が読んでから通す。成果は /workspace。会話の残りと grok の残りは別" width="1280" height="720" />
  <figcaption>Bot のコンピュータに grok を入れます。短く頼んで、出てきたものを読んでから通します。</figcaption>
</figure>

grok が絵を出しても、文章を出しても、その時点ではまだ使いません。Bot が読んで、直すか、通すか、もう一度やらせるかを決めます。Skill を付けただけでは終わりません。

同じ絵や、同じ言い回しの使い回しは通しません。やり方は Skill に残して、中身は毎回 grok に作らせます。

grok が終わっても、公開してよいわけではありません。

## うまくいくところ、壊れるところ

うまくいくのは、次です。

- 会話が短くなります。Bot の残りが減りにくくなります
- やり方を Skill に残せます
- 頼む人と、作る人と、通す人が分かれます

壊れるのは、次です。

- grok が速いので、「できた」とだけ返ってきて、中身が空のことがある
- ファイルが上がっただけで、公開してよいと思ってしまう
- 頼む人が自分で grok を叩くと、また会話が長くなる

日本語で頼むときは、最初に言語と話題を決めておくと安定します（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。Imagine の 1 枚目は <a href="/tips/imagine-quickstart/">何を、どこで、どんな絵で</a> です。

## 取り違え

- Bot の会話で Imagine も調査も全部やると、会話の残りが早く減ります
- チャットに grok を入れても、会話が終われば消えます。入れる場所は Bot のコンピュータです
- ターミナルの grok は、自分の PC でも Bot のコンピュータでも動きます。grok.com の画面の中の Build とは別です。画面の中の Build は、2026-08-19 の発表では全プランです
- 手で入れた grok は、コンピュータの更新で消えることがあります。残したいものは `/workspace` です
- grok が出したものを、そのまま公開しないでください
- 使えるプランの書き方は、ニュースと導入ページで揃っていません。画面を見てください
