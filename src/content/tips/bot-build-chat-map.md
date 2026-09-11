---
title: チャット、Grok Bot、Grok Build は別の道具
description: Grok の名前が付いたものは、チャット、Grok Bot、Grok Build の 3 つあって、それぞれ別の道具です。質問したいだけならチャットで足ります。Bot は仕事を任せる別のアプリで、Build はプログラムを書く人向けです。Bot のプロンプト集は grokguide.jp にあります。
order: 6
product: series
last_verified: "2026-09-08"
source_url:
  - https://x.ai/news/grok-build-cli
  - https://x.ai/news/grok-bot-more-plans
  - https://x.ai/news/grok-build-mode
  - https://docs.x.ai/grok-bot/get-started
  - https://grokguide.jp
related:
  - grok-bot-cloud-computer
  - japanese-fix
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
| **Grok Build** | 自分の PC のファイルを読み書きする。ターミナルで動く | 自分の PC のターミナル | プログラムを書く人 |

</div>

チャットの入口は 3 つあります（<a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a>）。Bot と Build は、入っているプランによって使える場所が違います。

プログラムを書かない人は、チャットで足ります。Build を入れる必要はありません。

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

対象のプランは、公式の中で書き方が揃っていません。2026-08-26 のニュースは SuperGrok と Cursor Pro を含めていますが、確認した時点の導入ページは SuperGrok Plus、Heavy と、Cursor の Pro+ 以上だけです。Cursor の個人向け Pro は、料金表に月 $20 で Grok Bot access とあります。**自分のプランで使えるかは、画面で確かめてください。** Bot の使用量は、Grok や Cursor で使える量とは別に数えます。grok.com のチャットや Imagine の使える量は増えません（<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>）。

Bot 用のプロンプトは、<a href="https://grokguide.jp" rel="external">grokguide.jp</a> にたくさんまとまっています。このサイトでは Bot のプロンプト集は作りません。作り方の形と、日本語で使うときの注意だけを書いています。

## Grok Build: プログラムを書く人向け

Grok Build は、ターミナル（黒い画面）で動く AI のコーディングアシスタントです。コードを読み、ファイルを書き換え、シェルのコマンドを実行します。2026-05-25 の発表では、**SuperGrok と X Premium+** の人が使えるとあります。普通の X Premium では使えません。入れるときは公式のスクリプトを使います。

```
curl -fsSL https://x.ai/cli/install.sh | bash
grok
```

Windows は PowerShell で `irm https://x.ai/cli/install.ps1 | iex` です。最初に起動するとブラウザが開いて、grok.com のアカウントでサインインします。

**チャットで「コードを書いて」と頼むのと違うのは、Build は自分の PC のファイルを直接書き換えることです。** 便利ですが、触ってよいフォルダの中で動かしてください。プログラムを書かない人は、チャットで足ります。

名前が似ている **Build Mode** は別物です。grok.com の画面の中でサイトやアプリを作る機能で、2026-07-28 の発表時点では SuperGrok Heavy の人向けの試験機能でした。ターミナルの Grok Build とは違います。

以前あった **Grok Studio** は、FAQ によるとサポートが終わっています。代わりに Grok Build を使います。ほかのサービス経由で Studio が残っている場合は、資格情報を取り消すように案内されています。

## 混ぜると起きること

- Bot 用のプロンプトをチャットに貼っても、会話が終われば消えます。繰り返し使うなら Bot にします
- 「Grok Build の使い方」を検索して、Bot の解説や Build Mode の解説を読んでしまいます。名前は似ていますが別物です
- Build にチャットのつもりで雑談すると、ファイルを触られることがあります。Build は作業用と割り切ってください

## どれを使うか

- 1 回きりの質問: **チャット**
- 同じ指示を何度も出す、または仕事を任せておきたい: **Grok Bot**（別のアプリです。チャットの前置きを保存するものではありません）
- 自分の PC のコードを書き換えたい: **Grok Build**（ターミナルで動きます。画面の中の Build Mode とは別です）
