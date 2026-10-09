---
title: Grok Bot の本体は、Claude Opus 5.5 で動く
description: "2026-10-07、Grok Bot の開発者は、本体が Claude Opus 5.5 で動く、と書きました。Musk は、仕事に合うモデルを使う、と書き、Midjourney と Suno も挙げました。いつから、いくらはありません。翌日の Video 1.5 Lite は、480p が秒 $0.02 です。"
published: "2026-10-07"
last_verified: "2026-10-09"
source_url:
  - https://x.com/elonmusk/status/2107724314451878104
  - https://x.com/poteto/status/2107733029879943391
  - https://x.com/poteto/status/2107734770990133319
  - https://x.com/imagine/status/2108280250673352929
  - https://x.com/imagine/status/2108280254733467908
  - https://x.com/elonmusk/status/2108294618597216470
  - https://docs.x.ai/developers/models/grok-imagine-video-1.5-lite
  - https://docs.x.ai/grok-bot/faq
  - https://x.ai/news/introducing-grok-bot
  - https://x.ai/news/grok-4-7
---

## 何が変わったか

2026-10-07、Elon Musk は Grok Bot について、こう書きました。「Going forward, @SpaceX will use the best back end model for any given task, including Claude Opus 5.5, MidJourney, Suno and other leading APIs.」これからは、仕事ごとに、結果がいちばん出そうなモデルを使う。Claude Opus 5.5 も、Midjourney も、Suno も、その中に入る、という書き方です。全文は [2026-10-07 の投稿](https://x.com/elonmusk/status/2107724314451878104) です。

同じ日、Grok Bot の開発者 lauren（@poteto）は、「bot itself will run on a different model, opus 5.5 is rolling out right now」と書きました。本体は別のモデルで動き、Opus 5.5 は今広がっている、という書き方です。続けて「yes, bot itself will run on opus 5.5」とも書きました。投稿は [本体は別のモデル、と書いた投稿](https://x.com/poteto/status/2107733029879943391) と [本体は Opus 5.5、と書いた投稿](https://x.com/poteto/status/2107734770990133319) です。

<strong>本体は Claude Opus 5.5 です。</strong>いちばん上の図に書いたのは、そのことです。全員に届く日は、その投稿にありません。

2026-10-09 に開いた [FAQ](https://docs.x.ai/grok-bot/faq) に並んでいるのは、対象のプランと、週ごとの使用量です。モデルの名前は、そのページにありません。

## どこで使えて、いくら払うか

使う場所は、Grok Bot のアプリです。入口は [x.ai/bot](https://x.ai/bot) です。grok.com のチャットで、モデルの名前を選ぶ話ではありません。

2026-10-09 に開いた FAQ では、Grok Bot は Cursor の有料の個人プランと、Cursor Teams に入っています。個人の SuperGrok、SuperGrok Plus、SuperGrok Heavy を繋いでも使えます。使用量は週ごとです。週の分を使い切ったあとは、オンデマンドにすると、モデルとトークンの費用から請求されます。

Opus だけの金額は、この FAQ にも、2026-10-07 の投稿にもありません。

払う場所の整理は、<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>です。コンピュータが 1 台ある話は、<a href="/tips/grok-bot-cloud-computer/">クラウドのコンピュータ</a>です。

## 軽い動画の単価は、解像度で変わる

<figure class="article-hero">
  <img src="/tips/fig-video-15-lite.jpg" alt="ノートに、軽い動画の単価は、解像度で変わる、と書いてある。Video 1.5 Lite。2026-10-08 の公式。480p は秒 $0.02、720p は秒 $0.03、1080p は秒 $0.14。Bot が自動で使う、と Musk は書いた" width="1280" height="720" />
  <figcaption>480p は秒 $0.02、720p は秒 $0.03、1080p は秒 $0.14 です。Bot が自動で使う、と書いたのは 2026-10-08 の Musk の返信です。</figcaption>
</figure>

翌日の 2026-10-08、Grok Imagine の公式アカウントは、Video 1.5 Lite が API で使える、と書きました。「$0.02/sec at 480p」「$0.03/sec at 720p」「$0.14/sec at 1080p」です。全文は [2026-10-08 の投稿](https://x.com/imagine/status/2108280250673352929) です。続きの投稿に、[モデルのページ](https://docs.x.ai/developers/models/grok-imagine-video-1.5-lite) へのリンクがあります。

2026-10-09 にそのページを開くと、解像度の表は同じ数字でした。モデル名は `grok-imagine-video-1.5-lite` です。

<div class="table-scroll">

| 解像度 | 1 秒 |
|---|---|
| 480p | <span class="num">$0.02</span> |
| 720p | <span class="num">$0.03</span> |
| 1080p | <span class="num">$0.14</span> |

</div>

そのページの料金表には、出力は秒 <span class="num">$0.02</span>、とあります。解像度の表の 480p と同じ金額です。画像の入力は <span class="num">$0.01</span> です。出した動画は秒ごとに課金する、とページにあります。動画や画像を入力に渡したときも課金する、とあります。使える地域は us-east-1 と us-west-2 です。

Musk は同じ日、その投稿へ「Automatically used by Grok @Bot.」と返信しました。Bot が自動で使う、という書き方です。返信は [Bot が自動で使う、と書いた返信](https://x.com/elonmusk/status/2108294618597216470) です。モデルのページの表に、Bot の行はありません。

grok.com で出す動画の長さと枠は、この API の秒単価とは別です。整理は <a href="/tips/imagine-video/">先に絵を出してから、動きを一つ書く</a> に書いてあります。

## 前に書いてあったこと

xAI が自分で作ったモデルは、2026-09-21 に出た Grok 4.7 です。メモは <a href="/news/grok-4-7/">Grok 4.7 は一番ではない</a> です。翌日に点を並べたメモは <a href="/news/opus-5-5-gpt-6/">翌日の点では、Grok 4.7 は負けた</a> です。今回の投稿は、その点数を更新するものではありません。

Grok Bot のアプリは、2026-08-11 に出ています。原文は [Introducing Grok Bot](https://x.ai/news/introducing-grok-bot) です。

コンピュータに Claude Code を入れる話は、別です。<a href="/tips/bot-uses-claude-code/">Bot のコンピュータで動かす</a>に書いてあります。入れるのは自分で、呼び出すのは `claude -p`、払う先は Anthropic です。今回の投稿は、Bot の本体が Opus 5.5 で動く、という話です。

## どうするか

すでに Grok Bot を使っている人は、アプリのままです。切り替える操作は、2026-10-07 の投稿にありません。

Imagine の API で Video 1.5 Lite を呼ぶ人は、解像度を先に決めます。480p は秒 <span class="num">$0.02</span> です。1080p は秒 <span class="num">$0.14</span> で、480p の 7 倍です。同じ長さでも、1080p の方が払う額は大きいです。

Midjourney と Suno は、Musk が名前を挙げたところまでです。始める日は、その投稿にありません。

## 関連する TIPS

払う場所は、<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a>です。コンピュータが 1 台ある話は、<a href="/tips/grok-bot-cloud-computer/">クラウドのコンピュータ</a>です。Claude Code を入れる話は、<a href="/tips/bot-uses-claude-code/">Bot のコンピュータで動かす</a>です。Imagine の動画は、<a href="/tips/imagine-video/">先に絵を出してから、動きを一つ書く</a>です。

## よくある取り違え

- 「コンピュータに Claude Code を入れたら、本体が Opus になる」: 入れる話と、本体の話は別です。Claude Code は自分で入れて、払う先は Anthropic です。本体が Opus 5.5 で動く、と書いたのは、2026-10-07 の開発者の投稿です
- 「Midjourney と Suno も、もう Bot で動いている」: Musk は名前を挙げました。始める日と金額は、その投稿にありません
- 「grok.com のチャットが Opus 5.5 になった」: 投稿が名前を挙げたのは Grok Bot です。grok.com のチャットの話は、その投稿にありません
- 「Opus にすると、追加の月額がある」: Opus だけの金額は、2026-10-07 の投稿にも、2026-10-09 の FAQ にもありません。使用量は週ごとのままです
- 「秒 $0.02 は、どの解像度でも同じ」: 料金表の出力は秒 $0.02 です。解像度の表では 480p が秒 $0.02、720p が秒 $0.03、1080p が秒 $0.14 です
- 「モデルのページに、Bot が自動で使うとある」: そう書いたのは、2026-10-08 の Musk の返信です。モデルのページの表に、Bot の行はありません
