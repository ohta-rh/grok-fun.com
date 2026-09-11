---
title: チャット、Grok Bot、Grok Build は別の道具
description: Grok の名前が付いたものは、チャット、Grok Bot、Grok Build の 3 つあって、それぞれ別の道具です。質問したいだけならチャットで足ります。Bot は仕事を任せる別のアプリです。Build はターミナルと、画面の中とで場所が違います。
order: 6
product: series
last_verified: "2026-09-12"
source_url:
  - https://x.ai/news/grok-build-cli
  - https://x.ai/news/grok-bot-more-plans
  - https://x.ai/news/grok-build-mode
  - https://x.ai/news/grok-build-for-everyone
  - https://docs.x.ai/grok-bot/get-started
  - https://grokguide.jp
related:
  - grok-bot-cloud-computer
  - bot-uses-build
  - free-vs-supergrok
  - three-entrances
image: /tips/bot-build-chat-map.jpg
image_alt: 机の上にノートと判子とキーボードが並んでいる
image_caption: チャットと Grok Bot と Grok Build は、同じ机に載っていても別の道具です。
---

## 3 つは別の道具

「Grok」の名前が付くものが増えて、検索すると混ざって出てきます。まず 3 つを分けます。

<div class="table-scroll">

| 名前 | 何をする | どこで | 誰に |
|---|---|---|---|
| **チャット** | その場で質問して答えをもらう。会話が終われば終わり | grok.com、公式アプリ、X | 全員 |
| **Grok Bot** | クラウドに自分用のコンピュータを持っていて、仕事を任せられる相手。チャットの前置きを保存するものではない | Grok Bot のアプリ、Cursor | 仕事を任せておきたい人 |
| **Grok Build** | ファイルを触る、または画面の中でサイトやアプリを作る。場所によって別物 | ターミナル、または grok.com と公式アプリ | ファイルを触らせたい人、画面の中で作りたい人 |

</div>

チャットの入口は 3 つあります（<a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a>）。Bot と Build は、入っているプランによって使える場所が違います。

1 回きりの質問なら、チャットで足ります。画面の中でアプリを作りたいときと、ファイルを触らせたいときだけ、Build の場所を分けてください。

## チャット: まずはここ

日本語の質問、要約、翻訳、相談は、全部チャットで足ります。最初の 1 行で答える言語と話題を決めておくと安定します（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。

「毎回同じ前置きを書いている」と気づいたら、次の Bot に移る合図です。

## Grok Bot: 仕事を任せる別のアプリ

FAQ は、Grok Bot を grok.com のチャットや公式アプリとは別物だと書いています。クラウド上にコンピュータを持ち、アプリにログインして仕事を進めてくれる相手です。デスクトップアプリ（macOS、Windows、Linux）は <a href="https://x.ai/bot" rel="external">x.ai/bot</a> から入れます。チャットの前置きを保存する機能ではありません。

作るときは、名前と、主にやってもらう仕事と、進め方を書きます。指示が長くなるときは、この形が使いやすいです。

```
役割: あなたは○○（例: 日本語の校正者）
扱うこと: ○○だけ。それ以外を頼まれたら「それはここでは扱いません」と答える
出力の形: ○○（例: 直した箇所を表にして、理由は 1 行）
やらないこと: ○○（例: 文体を変えない。英語で答えない）
```

対象のプランは、公式の中で書き方が揃っていません。2026-08-26 のニュースは SuperGrok と Cursor Pro を含めています。2026-09-12 の <a href="https://x.ai/pricing" rel="external">x.ai/pricing</a> の SuperGrok（$30）にも Grok Bot access とあります。同じ日の導入ページは Plus、Heavy と、Cursor の Pro+ 以上だけです。Cursor の個人向け Pro は月 $20 で Grok Bot access とあります。**自分のプランで使えるかは、契約する画面で確かめてください。** Bot の使用量は、Grok や Cursor で使える量とは別に数えます。grok.com のチャットや Imagine の使える量は増えません（<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>）。重い調査や Imagine は、Bot の会話でやらずに grok へ渡す書き方もあります（<a href="/tips/bot-uses-build/">重い仕事は grok に渡す</a>）。

Bot 用のプロンプトは、<a href="https://grokguide.jp" rel="external">grokguide.jp</a> にたくさんまとまっています。このサイトでは Bot のプロンプト集は作りません。作り方の形と、日本語で使うときの注意だけを書いています。

## Grok Build: 場所が 2 つある

Grok Build という名前のものが、2 か所にあります。混ぜないでください。

**ターミナルの grok** は、黒い画面で動きます。コードを読み、ファイルを書き換え、コマンドを実行します。自分の PC でも、Grok Bot のコンピュータでも入れられます。2026-05-25 の発表では、**SuperGrok と X Premium+** の人が使えるとあります。普通の X Premium では使えません。入れるときは公式のスクリプトです。

```
curl -fsSL https://x.ai/cli/install.sh | bash
grok
```

Windows は PowerShell で `irm https://x.ai/cli/install.ps1 | iex` です。最初に起動するとブラウザが開いて、grok.com のアカウントでサインインします。チャットで「コードを書いて」と頼むのと違い、ファイルを直接書き換えます。触ってよいフォルダの中で動かしてください。

**画面の中の Build** は、grok.com と公式アプリの会話の中で、サイトやアプリを作る機能です。2026-07-28 の発表時点では SuperGrok Heavy 向けの試験機能でした。<a href="https://x.ai/news/grok-build-for-everyone" rel="external">2026-08-19 の発表</a>では、全プランの Web とスマホに出たとあります。ターミナルの grok とは別です。

以前あった **Grok Studio** は、FAQ によるとサポートが終わっています。代わりに Grok Build を使います。ほかのサービス経由で Studio が残っている場合は、資格情報を取り消すように案内されています。

## 混ぜると起きること

- Bot 用のプロンプトをチャットに貼っても、会話が終われば消えます。繰り返し使うなら Bot にします
- 「Grok Build の使い方」を検索して、Bot の解説や、画面の中の Build の解説を読んでしまいます。ターミナルの grok とは別です
- Build にチャットのつもりで雑談すると、ファイルを触られることがあります。Build は作業用と割り切ってください

## どれを使うか

- 1 回きりの質問: **チャット**
- 同じ指示を何度も出す、または仕事を任せておきたい: **Grok Bot**（別のアプリです。チャットの前置きを保存するものではありません）
- 画面の中でサイトやアプリを作りたい: **grok.com か公式アプリの Build**（2026-08-19 の発表では全プラン。ターミナルの grok とは別です）
- 自分の PC や Bot のコンピュータのファイルを触らせたい: **ターミナルの grok**
