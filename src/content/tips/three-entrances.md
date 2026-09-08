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
related:
  - japanese-fix
  - free-vs-supergrok
  - imagine-quickstart
---

## 入口は 3 つ

| 入口 | 場所 | 向いている使い方 |
|---|---|---|
| **grok.com** | ブラウザ | 長い文章、ファイルの読み込み、コピペが多い作業。PC で使うならここ |
| **公式アプリ** | iOS / Android | 移動中、音声で話す、写真を撮ってすぐ聞く |
| **X** | X アプリ / x.com の Grok タブ、投稿のボタン | X の投稿やアカウントについて聞く。タイムラインを見ながら使う |

同じ Grok ですが、**画面と入れる機能が入口ごとに違います。** 「アプリにはあるのに Web に無い」「X からだと出ない」は珍しくありません。目当ての機能が見つからないときは、別の入口を試すのが最短です。Imagine も、入口によってメニューの場所が違います（<a href="/tips/imagine-quickstart/">Imagine で 1 枚目を出す</a>）。

## アカウント

- grok.com は、X のアカウントのほか、Google や Apple、メールアドレスでのサインインが用意されています。X を使っていなくても grok.com と公式アプリは使えます。
- X の中の Grok は、X のアカウントとプランに従います。
- 会話の履歴は入口をまたいで見えるとは限りません。同じアカウントでも、X 側の会話と grok.com 側の会話は別に扱われることがあります。仕様は変わるので、履歴の扱いは公式で確認してください。

## 課金も入口ごとに別

**X Premium に入っても、grok.com の SuperGrok は付いてきません。** 契約する場所が違います。Cursor のプランに入っていると Grok Bot が使えることもありますが、それも grok.com の週間枠とは別です。どこで払うかは <a href="/tips/free-vs-supergrok/">課金の 4 系統</a> に整理しています。

## 公式アプリの見分け方

ストアで「Grok」を検索すると、似た名前のアプリが並びます。入れる前に次の 2 点を見ます。

1. **開発元が xAI**（Apple の App Store、Google Play とも表示されます）
2. <a href="https://x.ai/grok">x.ai/grok</a> または <a href="https://grok.com">grok.com</a> からストアへのリンクをたどる

開発元が違うアプリは、Grok の名前を借りた別のものです。有料プランを買っても Grok の SuperGrok にはなりません。

## 使い分けの目安

- 「これを日本語で要約して」と長文を貼る: **grok.com**
- 外で写真を撮って「これ何」と聞く: **公式アプリ**
- 「この投稿の背景を教えて」: **X**（投稿の Grok ボタンから聞くと、その投稿が文脈に入ります）

どの入口でも、最初の 1 行で「日本語で」と範囲を指定すると安定します（<a href="/tips/japanese-fix/">会話の冒頭で日本語に固定する</a>）。
