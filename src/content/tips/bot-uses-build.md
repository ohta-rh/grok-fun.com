---
title: 重い仕事は Grok Build に渡す。Bot は号令と検品だけ
description: Grok Bot のコンピュータに Grok Build を入れて、調査も Imagine も制作も渡します。Bot は号令と検品だけです。Build が出したものを、そのまま合格にしないでください。
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
image_alt: 紙に「判断は Bot。制作は Build。」と大きく書いてある
image_caption: 判断と検品は Grok Bot、制作は Grok Build です。
---

## 困ること

Grok Bot に調査も、Imagine も、長い下書きも、全部やらせると、会話が膨らみます。Bot の使用量は、その会話から減ります。ノートを閉じても仕事は続きますが、会話が太いほど、残りは早く尽きます。

Grok Bot と Grok Build は別の道具です（<a href="/tips/bot-build-chat-map/">3 つは別</a>）。混ぜると、使用量も、誰が決めるかも、分かりにくくなります。

## 役割を分ける

判断は Bot。制作は Build。公式がこの組み合わせを推奨している、とは書いていません。Bot のコンピュータにターミナルがあることと、`grok` の入れ方は、一次情報にあります。

<div class="table-scroll">

| 道具 | やること |
|---|---|
| **Grok Bot** | 号令と検品。会話は短く保つ |
| **Grok Build** | 調査、Imagine、ファイルを触る作業。ターミナルで動く |

</div>

Bot は「何をやるか」と「通してよいか」を持つ。Build は、渡された仕事を実行する。同じ会話で両方をやると、使用量も、誰が決めるかも、混ざる。

## コンピュータに grok を入れる

Grok Bot はクラウドにコンピュータを持ちます。ブラウザも、ファイルも、ターミナルもあります（<a href="/tips/grok-bot-cloud-computer/">コンピュータは 1 台</a>）。そのターミナルに Grok Build を入れます。

2026-05-25 の発表では、入れるコマンドは次です。対象は発表時点で SuperGrok と X Premium+。**自分のプランで使えるかは、画面で確かめてください。**

```
curl -fsSL https://x.ai/cli/install.sh | bash
grok
```

サインインは grok.com のアカウントか、API キーです。Bot の会話の使用量とは別に減ります。どちらが減るかは、入れた認証で決まります。払う場所は <a href="/tips/free-vs-supergrok/">別</a> です。

公式は、手で入れたパッケージは、コンピュータの更新で消えることがある、と書いています。大事な成果は `/workspace` に置きます。消えたら、入れ直します。

同じアカウントの Bot は、その 1 台を共有します。`grok` のログインも共有です。

## 号令は Bot、実行は Build

号令する側は「やれ」だけです。調査も Imagine も、長い下書きも、`grok` に渡します。号令する人が自分で `grok` を叩くと、判断と制作が同じ場所に戻ります。

手順と禁止は、Bot の Skill に書きます。Skill はやり方、Routine はいつやるかです。`/` で Skill を付け、`grok` に渡す文まで Skill に入れておくと、毎回同じ指摘が減ります。Build を、何も決めずに回さない。

Build は headless で回せます。2026-05-25 の発表では `-p` です。スクリプトから叩くときの形です。

```
grok -p "このフォルダの調査結果を 5 行で。出典を付ける。ファイルは書き換えない。"
```

プロンプト集はこのサイトには置きません。<a href="https://grokguide.jp" rel="external">grokguide.jp</a> にあります。

## 出したものは検品する

Build が出した画像も文章も、出した瞬間は未完成です。Bot が読んで、直すか、通すか、やり直すかを決める。Skill があるだけでは、合格ではありません。

毎回同じ雰囲気の使い回しは、検品で落とす。手順と禁止は Skill に固定し、中身は毎回 Build に作らせる。

公開してよいかと、Build が終わったかは別です。Build が終わったことを、公開してよい、と数えない。

## 強みと事故

強みは次です。

- 重い生成を Build に寄せると、Bot の会話の使用量を削れる
- 手順と禁止を Skill に書ける
- 号令する人と、作る人と、通す人が分かれる

事故は次です。

- Build が速いので、「できた」だけの報告や、空の成果が通りやすい
- 「上がった」を「公開してよい」と取り違える
- 号令する人が Build に手を出すと、役割が壊れる

日本語で頼むときは、チャットと同じく最初に言語と話題を決めておくと安定します（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。Imagine の 1 枚目の書き方は <a href="/tips/imagine-quickstart/">何を、どこで、どんな絵で</a> です。

## 取り違え

- Bot の会話で Imagine も調査も全部やると、会話の使用量が早く減ります
- チャットに `grok` を入れても、会話が終われば消えます。入れる場所は Bot のコンピュータです
- Grok Build は自分の PC でも動きます。Bot のクラウドコンピュータに入れた `grok` とは、場所が違います。画面の中の Build Mode とも別です
- 手で入れた `grok` は、コンピュータの更新で消えることがあります。成果は `/workspace` です
- Build が出したものを、そのまま公開しない
- 使えるプランの書き方は、ニュースと導入ページで揃っていません。画面を見てください
