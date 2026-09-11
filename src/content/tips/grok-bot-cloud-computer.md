---
title: Grok Bot はチャットの続きではない。クラウドにコンピュータを持つ
description: Grok Bot は、クラウドに自分用のコンピュータを持つ別のアプリです。ノート PC を閉じても仕事は続きます。同じアカウントの Bot は 1 台を共有します。チャットの前置きを保存するものではありません。
order: 7
product: bot
last_verified: "2026-09-11"
source_url:
  - https://x.ai/news/introducing-grok-bot
  - https://x.ai/news/grok-bot-more-plans
  - https://docs.x.ai/grok-bot/overview
  - https://docs.x.ai/grok-bot/get-started
  - https://docs.x.ai/grok-bot/computer-and-apps
  - https://docs.x.ai/grok-bot/faq
  - https://docs.x.ai/grok-bot/security-faq
  - https://x.ai/bot
related:
  - bot-build-chat-map
  - free-vs-supergrok
  - three-entrances
  - japanese-fix
image: /tips/grok-bot-cloud-computer.jpg
image_alt: 紙に「チャットは会話が終わる。Grok Bot はコンピュータを持つ。」と大きく書いてある
image_caption: チャットは会話が終われば終わりです。Grok Bot はクラウドにコンピュータを持ちます。
---

## 困ること

チャットに長い仕事を頼むと、会話が切れたら続きがありません。ノート PC を閉じたら止まります。毎回、同じ説明から書き直します。

Grok Bot は、そのために出た別のアプリです。クラウドに自分用のコンピュータを持ちます。チャットの前置きを保存するものではありません。チャット、Bot、Build の分け方は <a href="/tips/bot-build-chat-map/">別の道具</a> に書きました。

## 何が違うか

<div class="table-scroll">

| 名前 | 仕事の場所 | 閉じたら |
|---|---|---|
| チャット | grok.com、公式アプリ、X | 会話はそこで終わります |
| **Grok Bot** | クラウドのコンピュータ | 仕事は続きます |
| Grok Build | 自分の PC のターミナル | 自分の PC が止まれば止まります |

</div>

Bot はデスクトップアプリ（macOS、Windows、Linux）と、スマホのアプリから使います。入れる場所は <a href="https://x.ai/bot" rel="external">x.ai/bot</a> です。サインインは Cursor のアカウントです。grok.com のタブを増やす話ではありません。入口の話は <a href="/tips/three-entrances/">3 か所</a> です。

## 何がすごいのか

公式が繰り返し書いていることは、次の 4 つです。2026-09-11 に docs.x.ai と発表を開いて確かめました。

1. **コンピュータがある。** ブラウザ、ファイル、ターミナルがあります。API が無いサイトでも、画面を操作して仕事を進めます
2. **ノートを閉じても続く。** 仕事はクラウド側で動きます。アプリを閉じても、バックグラウンドの仕事と定期の仕事は止まりません
3. **複数の Bot を同時に動かせる。** それぞれ画面を持ちます。1 つの Bot が、画面の操作を同時にいくつもはできません
4. **一度見せると、あとで繰り返せる。** 手順を一緒にやると、定期の仕事として残せます

使用量は、Grok のチャットや Cursor で使える量とは別に数えます。grok.com の Imagine の枚数は増えません（<a href="/tips/free-vs-supergrok/">払う場所は別</a>）。

「何でも勝手に終わらせる」ではありません。ログイン、二要素認証、CAPTCHA、本番の設定を変えるところは、人が画面を借りて入れます。

## コンピュータは 1 台

同じアカウントの Bot は、**コンピュータを 1 台だけ**共有します。ファイルも、ブラウザのログインも、コマンドの認証情報も共有です。ある Bot が保存した続きを、別の Bot が拾えます。公式は、これをセキュリティの境界にしないでください、と書いています。ログインを分けたい仕事は、Cursor のユーザーを分けます。

コンピュータはユーザーごとに分かれた仮想マシンです。公式のセキュリティ FAQ は Firecracker microVM と書いています。今のところ米国で動きます。自分の会社の中に置くことはできません。ホストは Cursor です。

目の前の Mac や Windows は、別物です。ローカルのファイルを触らせるには、設定で許可が要ります。許可しなければ、仕事はクラウド側だけです。

日本語で頼むときは、チャットと同じく最初に言語と話題を決めておくと安定します（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。

## 始め方

2026-09-11 に開いた導入ページは、次を条件にしています。SuperGrok Plus、SuperGrok Heavy、Cursor の Pro+、Ultra、Teams の Standard か Premium。2026-08-26 のニュースは SuperGrok と Cursor Pro も含めています。**自分のプランで使えるかは、契約する画面で確かめてください。**

1. <a href="https://x.ai/bot" rel="external">x.ai/bot</a> からアプリを入れる
2. Cursor のアカウントでサインインする
3. Bot に、短い名前と、主にやってもらう仕事と、進め方を書く
4. 最初の仕事は、成果、見る場所、やってはいけないこと、戻してほしい形、人に聞くタイミング、を書く

公式の例を、日本語の語順に直すとこうなります。コネクタもログインも要らない最初の 1 件です。

```
この PDF を 5 行で要約してください。日付と、決まったことと、まだ決まっていないことを、別の節に分けてください。出典のページを付けてください。元のファイルは書き換えないでください。
```

長い指示は、この形が使いやすいです。プロンプト集はこのサイトには置きません。<a href="https://grokguide.jp" rel="external">grokguide.jp</a> にあります。

```
役割: あなたは○○（例: 日本語の週次メモ係）
扱うこと: ○○だけ
出力の形: ○○
やらないこと: 本番の設定を変えない。英語で答えない。送る前に私に確認する
```

スマホは iPhone（iOS 18 以降）と Android 9 以降です。公式は今のところ iPad 向けではない、と書いています。クラウド側のコンピュータは、デスクトップと同じ 1 台です。

## 取り違え

- チャットに Bot 用の長い指示を貼っても、会話が終われば消えます
- Grok Build は自分の PC のファイルを触ります。Bot のクラウドコンピュータとは別です。画面の中の Build Mode とも別です
- Bot をいくつ作っても、ログインは共有です。「この Bot だけがこのパスワードを知っている」にはなりません
- 使えるプランの書き方は、ニュースと導入ページで揃っていません。画面を見てください
