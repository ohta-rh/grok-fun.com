---
title: チャット、Bot、Build は別物
description: チャット、Grok Bot、Grok Build は別のもの。それぞれ何をする道具か、どれを選ぶべきかを一枚で整理。Bot プロンプト集は grokguide.jp へ。
order: 5
product: series
last_verified: "2026-09-08"
source_url:
  - https://x.ai/news/grok-build-cli
  - https://x.ai/news/grok-bot-more-plans
  - https://x.ai/news/grok-build-mode
  - https://docs.x.ai/grok-bot/get-started
  - https://grokguide.jp
related:
  - japanese-fix
  - free-vs-supergrok
  - three-entrances
image: /tips/bot-build-chat-map.jpg
image_alt: ノートと判子とキーボードが同じ机に並んでいる
image_caption: ノートがチャット、判子が Bot、キーボードが Build。名前が似ていても道具は別です。
---

## 3 つは別の道具

「Grok」の名前が付くものが増えて、検索すると混ざって出てきます。まず 3 つを分けます。

| 名前 | 何をするもの | 使う場所 | 向いている人 |
|---|---|---|---|
| **チャット** | その場で質問して答えをもらう。使い捨ての会話 | grok.com / 公式アプリ / X | 全員 |
| **Grok Bot** | 役割と指示をあらかじめ保存した、自分用のエージェント。チャットの前置き保存から、仕事を任せる同僚まで幅がある | grok.com / アプリ / Cursor | 同じ作業を繰り返す人、任せておきたい人 |
| **Grok Build** | ターミナルで動くコーディングエージェント。ファイルを編集し、コマンドを実行する | 自分の PC のターミナル | 開発者 |

チャットの入口は 3 つあります（<a href="/tips/three-entrances/">grok.com / 公式アプリ / X</a>）。Bot と Build は、入っているプランによって使える入口が違います。

プログラムを書かない人は、チャットで足ります。Build を入れる必要はありません。

## チャット: まずここ

日本語の質問、要約、翻訳、相談はすべてチャットで足ります。会話の 1 行目で言語と範囲を固定すると安定します（<a href="/tips/japanese-fix/">会話の冒頭で日本語に固定する</a>）。

「毎回同じ前置きを書いている」と気づいたら、次の Bot に移る合図です。

## Grok Bot: 前置きを保存する、あるいは仕事を任せる

Bot は、チャットに毎回貼っていた指示を保存して名前を付けたものです。作るときに書くのは 4 つだけです。

```
役割: あなたは○○（例: 日本語の校正者）
範囲: 扱うのは○○だけ。それ以外は「範囲外です」と答える
出力形式: ○○（例: 修正箇所を表で、理由は 1 行）
禁止: ○○（例: 文体を変えない。英語で答えない）
```

FAQ は、Grok Bot を grok.com のチャットや公式アプリとは別物だと書いています。デスクトップアプリ（macOS / Windows / Linux）は <a href="https://x.ai/bot" rel="external">x.ai/bot</a> から入れます。

対象プランは公式内で食い違っています。2026-08-26 のニュースは SuperGrok と Cursor Pro を含む一方、取得時点の導入ページは SuperGrok Plus / Heavy と Cursor Pro+ 以上だけです。Cursor の個人向け Pro は、料金表に月 $20 と Grok Bot access とあります。**画面で確認してください。** Bot の利用量は Grok や Cursor の枠とは別に数えます。grok.com の週間枠（Chat / Imagine / Voice）は付きません（<a href="/tips/free-vs-supergrok/">課金の 4 系統</a>）。

Bot 用のプロンプトは、<a href="https://grokguide.jp" rel="external">grokguide.jp</a> に多数まとまっています。このサイトでは Bot のプロンプト集は作りません。作り方の型と、日本語で使うときの注意だけを書きます。

## Grok Build: 開発者向け。非エンジニアには不要

Grok Build は、ターミナル（黒い画面）で動く AI コーディングアシスタントです。コードを読み、ファイルを書き換え、シェルコマンドを実行します。2026-05-25 の公式発表では、**SuperGrok と X Premium+** の加入者が使えるとあります。通常の X Premium では足りません。インストールは公式のスクリプトで行います。

```
curl -fsSL https://x.ai/cli/install.sh | bash
grok
```

Windows は PowerShell で `irm https://x.ai/cli/install.ps1 | iex` です。初回起動でブラウザが開き、grok.com のアカウントでサインインします。

**チャットで「コードを書いて」と頼むのと違うのは、Build は自分の PC のファイルを直接触ることです。** 便利ですが、触ってよいフォルダで動かしてください。プログラムを書かない人は、チャットで足ります。

名前が似ている **Build Mode**（grok.com の画面の中でサイトやアプリを作る機能）は別物です。2026-07-28 の発表時点では SuperGrok Heavy 向けの試験機能でした。ターミナルの Grok Build とは違います。

以前あった **Grok Studio** は、FAQ によるとサポート終了です。代わりに Grok Build を使います。サードパーティ経由で Studio に残っている場合は、資格情報を取り消すよう案内されています。

## 混ぜると起きること

- Bot 用のプロンプトをチャットに貼っても、会話が終われば消えます。繰り返すなら Bot にします。
- 「Grok Build の使い方」を検索して、Bot の解説や Build Mode の解説を読んでしまう。名前が似ていますが別物です。
- Build にチャットのつもりで雑談すると、ファイルを触られることがあります。Build は作業用と割り切ります。

## どれを使うか（1 行で）

- 1 回きりの質問: **チャット**
- 同じ指示を何度も、または仕事を任せておきたい: **Grok Bot**
- 自分の PC のコードを書き換えたい: **Grok Build**
