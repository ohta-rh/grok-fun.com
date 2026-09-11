---
title: 動画は、先に絵を出してから動きを一つ書く（Imagine）
description: Imagine で動画を作るときは、いきなり動画にせず、先に静止画を出して、それに動きを一つだけ書き足します。動画はチャットより早く使える量が減ります。720p が 480p になるのは故障ではありません。
order: 5
product: imagine
last_verified: "2026-09-09"
source_url:
  - https://grok.com/imagine
  - https://x.ai/news/grok-imagine-video-1-5
  - https://docs.x.ai/grok/faq
  - https://x.ai/pricing
related:
  - imagine-quickstart
  - free-vs-supergrok
  - three-entrances
image: /tips/imagine-video.jpg
image_alt: 雨の京都の路地に白い猫が座っている。夕方のフィルム写真
image_caption: 下の動画は、この静止画をもとに動かしたものです。
---

## 困ること

絵は出た。でも動画にすると崩れる。すぐに使える量が尽きる。720p のはずが 480p で返ってくる。

原因はたいてい同じです。いきなり動画から作っている。動きをいくつも一度に書いている。動画はチャットより早く減ることを知らない。

## 手順

1. Imagine を開きます（grok.com は左のメニュー、公式アプリは下のタブにあります。X の中からは出ないことが多いです）
2. 先に静止画を出します。書き方は <a href="/tips/imagine-quickstart/">何を、どこで、どんな絵で、を 1 文に</a>
3. 動きを**一つだけ**書きます。雨が降る、ゆっくり寄る、提灯が揺れる、のどれか一つです
4. その静止画から動画にします

2026-06-16 の公式発表で、grok.com/imagine と公式アプリに **Video 1.5 Fast** が入りました。6 秒の 720p が、以前より短い時間で出ると書かれています。入口は <a href="/tips/three-entrances/">grok.com か公式アプリ</a>です。

## このページの作例

画像の TIPS と同じ文で出した猫を、動き一つ（雨が降り続ける、カメラがゆっくり寄る）で動かしました。2026-09-09 に出した 720p、6 秒です。

<figure class="article-hero">
  <video controls playsinline preload="none" poster="/tips/imagine-video-720.webp" width="1280" height="720">
    <source src="/tips/vid-cat.mp4" type="video/mp4" />
  </video>
  <figcaption>雨が降って、カメラがゆっくり寄ります。動きはそれだけです。</figcaption>
</figure>

書いた動きはこれです。

```
雨が降り続ける。カメラはゆっくり寄る。
```

提灯の夜の通りは、被写体を変えた 2 枚目です。静止画はこう書きました。

```
被写体: 赤い提灯が並ぶ通り
場面: 雨の夜、屋台から蒸気
画風: film photo
```

動きはこれです。

```
提灯がゆっくり揺れる。蒸気が流れる。
```

<figure class="article-hero">
  <video controls playsinline preload="none" poster="/tips/vid-lantern-720.webp" width="1280" height="720">
    <source src="/tips/vid-lantern.mp4" type="video/mp4" />
  </video>
  <figcaption>蒸気が流れて、提灯が揺れます。人は足していません。</figcaption>
</figure>

どちらもこのサイトで Imagine から出して、ファイルをそのまま置いています。YouTube には上げていません。

## 動きの書き方

- **一つだけ書きます。** 「雨、猫が走る、人が横切る、カメラが回る」を一度に頼まないでください
- **欲しい状態を書きます。** 「揺れないで」より「提灯がゆっくり揺れる」です
- **画風は静止画の段階で決めます。** 動画の文で画風を変えると、絵が別物になります
- **1 回で決めません。** 同じ動きで 2、3 本出して選びます

## 使える量と画質

2026 年 6 月から、使える量は 1 週間ごとに決まっていて、チャットと Imagine は同じ量から減ります（<a href="https://docs.x.ai/grok/faq" rel="external">FAQ</a>）。動画を出すと、チャットより早く尽きます。残りは設定の Usage で見ます。払う場所は <a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a> に書きました。

- **透かしは消せません。** 生成した画像と動画には Grok の透かしが入ります。消したり隠したりすることは利用規約で禁じられています（<a href="https://docs.x.ai/grok/faq" rel="external">FAQ</a>）
- **720p が 480p になるのは故障ではありません。** その解像度の分を使い切ると落ちます。Usage を見てください
- 1080p の動画は SuperGrok Plus からです（2026-09-08 の <a href="https://x.ai/pricing" rel="external">x.ai/pricing</a>）
- 無料と SuperGrok で何本出せるかは、時期で変わるのでこのページには書きません

## API は別

開発者向けの Imagine API（`grok-imagine-video-1.5`）は <a href="https://console.x.ai" rel="external">console.x.ai</a> で、使った分だけ払います。grok.com で使える量とは別で、返金はありません。チャットの Imagine と混ぜないでください。

## よくある取り違え

- 「いきなり動画から作る」: 先に絵を出します
- 「動きを三つ書く」: 一つにします
- 「透かしを消す」: 消えません。消してもいけません
- 「画質が落ちたから壊れた」: 使い切っただけです。Usage を見てください
- 「API に入れば grok.com の動画も増える」: 払う場所が別なので増えません
