---
title: 先に絵を出して、動きは一つ（Imagine の動画）
description: 静止画を出してから、動きを一つ書いて動画にする。動画は枠を多く使う。720p が 480p になるのは故障ではない。
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
image_caption: 下の動画は、この静止画から動かしたものです。
---

## 困ること

静止画は出たのに、動画にすると形が崩れる。枠が急に減る。720p にしたのに 480p で返ってくる。

原因はだいたい次です。**動画を先に書いている**、**動きを一度にたくさん書いている**、**動画はチャットより枠を多く使う**。

## 手順

1. Imagine を開く（grok.com の左、公式アプリの下タブ。X からは出ないことが多い）
2. 先に静止画を出す。型は <a href="/tips/imagine-quickstart/">被写体、場面、画風</a>
3. 動きを **一つ** 書く。雨が降る、ゆっくり寄る、提灯が揺れる、のどれか一つ
4. その静止画から動画にする

2026-06-16 の公式では、grok.com/imagine と公式アプリに **Video 1.5 Fast** が入っています。6 秒の 720p が、以前より短時間で出ると発表されています。入口は <a href="/tips/three-entrances/">grok.com / 公式アプリ</a>。

## このページの作例

画像の TIPS と同じ文で出した猫を、動き一つ（雨と、ゆっくり寄る）で動かしました。2026-09-09。720p、6 秒。

<figure class="article-hero">
  <video controls playsinline preload="metadata" poster="/tips/imagine-video.jpg" width="1280" height="720">
    <source src="/tips/vid-cat.mp4" type="video/mp4" />
  </video>
  <figcaption>雨が降り、ゆっくり寄る。動きはそれだけ。</figcaption>
</figure>

書いた動き:

```
雨が降り続ける。猫がゆっくり顔を向ける。提灯がまたたく。カメラはゆっくり寄る。
```

提灯の夜の通りは、被写体を変えた二枚目です。動きは蒸気と、提灯が少し揺れること。

<figure class="article-hero">
  <video controls playsinline preload="metadata" poster="/tips/vid-lantern.jpg" width="1280" height="720">
    <source src="/tips/vid-lantern.mp4" type="video/mp4" />
  </video>
  <figcaption>蒸気が流れ、提灯が揺れる。人も足さない。</figcaption>
</figure>

どちらもこのサイトで Imagine から出して、ファイルを置いてあります。YouTube には上げていません。

## 動きの書き方

- **一つ。** 「雨、猫が走る、人が横切る、カメラが回る」は一度に頼まない
- **欲しい状態で書く。** 「揺れないで」より「提灯がゆっくり揺れる」
- **画風は静止画で決める。** 動画の文で画風を変えると、絵が別物になる
- **1 回で決めない。** 同じ動きで 2、3 本出して選ぶ

## 枠と画質

2026 年 6 月以降、grok.com とアプリの上限は、Chat・Imagine・Voice・Build で共有する **1 週間の枠**です。FAQ は、高画質の動画はチャットより多く使う、と書いています。残りは設定の Usage。払う場所は <a href="/tips/free-vs-supergrok/">別の TIPS</a>。

- **透かしは消せません。** 生成した画像と動画に Grok の透かしが入ります。消す・隠すことは利用規約で禁止です（<a href="https://docs.x.ai/grok/faq" rel="external">FAQ</a>）
- **720p が 480p になるのは故障ではない。** その解像度の上限に当たると落ちます。Usage を見る
- SuperGrok Plus の公式の値段は、1080p の動画です（2026-09-08 の <a href="https://x.ai/pricing" rel="external">x.ai/pricing</a>）
- 無料や SuperGrok の本数は、時期で変わるのでこのページには書きません

## API は別

開発者向けの Imagine API（`grok-imagine-video-1.5`）は <a href="https://console.x.ai" rel="external">console.x.ai</a> の従量です。grok.com の週の枠ではありません。返金なし。取り違えやすいので、チャット用の Imagine と混ぜないでください。

## よくある取り違え

- 「動画の文から始める」: 先に絵
- 「動きを三つ書く」: 一つ
- 「透かしを消す」: 消えない。消してはいけない
- 「画質が落ちたので壊れている」: 枠。Usage
- 「API に入れれば grok.com の動画も増える」: 別契約
