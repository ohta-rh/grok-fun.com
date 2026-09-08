---
title: 入口は 3 つ（grok.com / 公式アプリ / X）
description: Grok を使う入口は grok.com、公式アプリ、X の 3 つ。用途ごとの使い分けと、偽アプリを避ける確認点。
order: 2
product: chat
last_verified: "2026-09-08"
source_url:
  - https://grok.com
  - https://x.ai/grok
  - https://help.x.com/en/using-x/about-grok
  - https://docs.x.ai/grok/faq
related:
  - japanese-fix
  - free-vs-supergrok
  - imagine-quickstart
image: /tips/three-entrances.jpg
image_alt: 机の上にノート PC、スマートフォン、新聞が並んでいる。画面に文字は無い
image_caption: 入口は grok.com、公式アプリ、X の 3 つ。
---

## 入口は 3 つ

| 入口 | 場所 | 向いている使い方 |
|---|---|---|
| **grok.com** | ブラウザ | 長い文章、ファイルの読み込み、コピペが多い作業。PC で使うならここ |
| **公式アプリ** | iOS / Android | 移動中、音声で話す、写真を撮ってすぐ聞く |
| **X** | X アプリ / x.com の Grok タブ、投稿のボタン | X の投稿やアカウントについて聞く。タイムラインを見ながら使う |

同じ Grok ですが、**画面と入れる機能が入口ごとに違います。** 「アプリにはあるのに Web に無い」「X からだと出ない」は珍しくありません。目当ての機能が見つからないときは、別の入口を試すのが最短です。Imagine も、入口によってメニューの場所が違います（<a href="/tips/imagine-quickstart/">Imagine で 1 枚目を出す</a>）。

Web は **grok.com** を使います。FAQ によると grok.x.ai など別ホストだと Projects などの機能が欠けることがあります。Companions（コンパニオン）は取得時点で iOS のみで、Web と Android には出す予定が無いと FAQ にあります。

見当たらないときの順番です。

無いときは、設定を疑う前に入口を変えます。今のメニューを全部見る。公式アプリと grok.com を入れ替える。Imagine とターミナルの Build は、X の中からは探さない。

## アカウント

- grok.com は、X のアカウントのほか、Google や Apple、メールアドレスでのサインインが用意されています。X を使っていなくても grok.com と公式アプリは使えます。
- X の中の Grok は、X のアカウントとプランに従います。
- 会話の履歴は入口をまたいで見えるとは限りません。同じアカウントでも、X 側の会話と grok.com 側の会話は別に扱われることがあります。仕様は変わるので、履歴の扱いは公式で確認してください。

「Web で話した内容がアプリに無い」は故障ではなく、入口が別扱いのことが多いです。残したい会話は、使う入口を先に決めてから始めます。

ファイルを貼るなら grok.com か公式アプリです。FAQ では Web でおおよそ 100 個、1 ファイル 150 MB までとあります。数字は変わるので、エラー表示を優先してください。

X の中の Grok は、公開投稿や会話が学習に使われる設定があります。使いたくない場合は、X の「プライバシーと安全 → データ共有とパーソナライズ → Grok」から外せます（<a href="https://help.x.com/en/using-x/about-grok" rel="external">X の解説</a>）。grok.com 側の学習設定とは別です。

## 課金も入口ごとに別

**X Premium に入っても、grok.com の SuperGrok は付いてきません。** 契約する場所が違います。Cursor のプランに入っていると Grok Bot が使えることもありますが、それも grok.com の週間枠とは別です。どこで払うかは <a href="/tips/free-vs-supergrok/">払う場所</a> に書いています。

## 公式アプリの見分け方

ストアで「Grok」を検索すると、似た名前のアプリが並びます。入れる前に次の 2 点を見ます。

1. **開発元が xAI**（Apple の App Store、Google Play とも表示されます）
2. <a href="https://x.ai/grok">x.ai/grok</a> または <a href="https://grok.com">grok.com</a> からストアへのリンクをたどる

開発元が違うアプリは、Grok の名前を借りた別のものです。有料プランを買っても Grok の SuperGrok にはなりません。評価やインストール数だけでは判断しません。

## 使い分けの目安

- 「これを日本語で要約して」と長文を貼る: **grok.com**
- 外で写真を撮って「これ何」と聞く: **公式アプリ**
- 「この投稿の背景を教えて」: **X**（投稿の Grok ボタンから聞くと、その投稿が文脈に入ります）

どの入口でも、最初の 1 行で「日本語で」と範囲を指定すると安定します（<a href="/tips/japanese-fix/">会話の冒頭で日本語に固定する</a>）。
