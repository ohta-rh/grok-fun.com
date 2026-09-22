---
title: 時刻の予約は誰でも。メールなら SuperGrok
description: "Grok の Automations は、一度書いた仕事を、決めた時刻か届いたメールで走らせる機能です。場所は grok.com と公式アプリです。時刻の予約は誰でも使えます。メールで動かせるのは、SuperGrok の人だけです。Grok Bot が、Bot 自身のコンピュータで繰り返す仕事とは、別の道具です。"
order: 9
product: automations
last_verified: "2026-09-22"
source_url:
  - https://x.ai/news/grok-automations
  - https://grok.com/automations
  - https://docs.x.ai/grok-bot/skills-routines-and-automations
related:
  - bot-build-chat-map
  - free-vs-supergrok
  - grok-bot-cloud-computer
  - three-entrances
image: /tips/grok-automations.jpg
image_alt: ノートに、時刻の予約は誰でも、メールで動かすなら SuperGrok、Grok Bot の定期実行とは別、と書いてある
image_caption: 時刻で回すなら誰でも使えます。メールが届いたら動かすなら SuperGrok です。
---

## 毎朝、同じ質問を貼りたくない

チャットに「今日のニュースをまとめて」と、毎朝自分で書いていませんか。一度書いて、決めた時刻に走らせる機能が、Grok の Automations です。2026-07-16 に出ました。作る場所は [grok.com/automations](https://grok.com/automations) と、iOS と Android の公式アプリです。

時刻の予約は、誰でも使えます。メールで動かせるのは、SuperGrok の人だけです。クラウドのコンピュータを持つ [Grok Bot の定期実行](/tips/grok-bot-cloud-computer/) とは、別の道具です。

## 一度書いて、きっかけを選ぶ

指示は、ふつうのチャットと同じ文です。やってほしいこと、できあがりの形、見てほしい場所を書きます。ファイルを付けられます。コネクタとスキルも足せます。`@` でコネクタの名前を書くと、毎回それを使います。名前を付けて保存します。

きっかけは 2 つです。

<div class="table-scroll">

| きっかけ | 誰が使える | 何が起きるか |
|---|---|---|
| 時刻 | 誰でも | 1 回、毎日、平日、毎週、毎月、毎年。自分のタイムゾーンの時刻 |
| メール | SuperGrok | 届いたメールが、送信者、宛先、件名の条件に合うと動く。そのメールが材料になる |

</div>

この分け方は、2026-07-16 の [発表](https://x.ai/news/grok-automations) に書いてあります。どこにいくら払うかは、<a href="/tips/free-vs-supergrok/">やりたいことで決まります</a>。

保存したあとは、走るたびに新しい会話です。指示は同じで、中身はそのときのデータです。昔の返事を、そのまま読み上げるのではありません。終わると履歴に残ります。開いて、続きを話せます。知らせ方は、メール、アプリ、両方、自分で見に行く、から選びます。

作った直後は、Run now で一度走らせます。履歴の会話を読んで中身を確かめてから、予約に任せます。チャットで「毎朝、料金のニュースを見て」と頼んでも、Automations を作れます。ページには見本もあります。止める、再開する、直す、消す、はいつでもできます。

## Grok Bot の定期実行とは別

Grok Bot にも、決めた時刻や出来事で仕事を繰り返す機能があります。2026-09-22 に [docs の Skills and routines](https://docs.x.ai/grok-bot/skills-routines-and-automations) を開くと、動かすのはその Bot 自身で、パソコンを閉じていても走る、と書いてあります。Slack のメッセージや GitHub の通知でも起動できます。ファイルを触ったり、ブラウザの手順を覚えたりするのは、こちらの仕事です。

grok.com の Automations は、チャットの仕事を予約するものです。Bot のコンピュータは使いません。混ぜると、開くアプリを間違えます。3 つの道具の違いは、<a href="/tips/bot-build-chat-map/">チャット、Grok Bot、Grok Build</a> に書きました。

## よくある取り違え

- 「Automations は Grok Bot」: grok.com と公式アプリの予約です。Bot が、Bot 自身のコンピュータで繰り返す仕事は、別のアプリの機能です
- 「メールの起動も誰でも」: 時刻の予約は誰でもです。メールで動かせるのは、SuperGrok の人だけです
- 「一度の返事が、毎朝再利用される」: 毎回、新しい会話です。指示は同じで、材料はそのときのデータです

## 関連する TIPS

- <a href="/tips/bot-build-chat-map/">チャット、Grok Bot、Grok Build は別の道具</a>
- <a href="/tips/free-vs-supergrok/">やりたいことで、払う場所が決まる</a>
- <a href="/tips/grok-bot-cloud-computer/">Grok Bot は、クラウドにコンピュータを持つ</a>
- <a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a>
