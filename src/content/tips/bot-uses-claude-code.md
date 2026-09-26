---
title: Claude Code は、Bot のコンピュータで動かす
description: "Claude Code は、自分の Mac には入れません。Grok Bot のコンピュータに入れて、Bot には頼むだけにします。実行は claude -p です。ログインはそのコンピュータのブラウザです。払う先は Anthropic で、SuperGrok や Cursor とは別です。契約が先に要ります。"
order: 11
product: bot
last_verified: "2026-09-26"
source_url:
  - https://docs.x.ai/grok-bot/computer-and-apps
  - https://docs.x.ai/grok-bot/overview
  - https://docs.x.ai/grok-bot/computers
  - https://docs.x.ai/grok-bot/mobile
  - https://code.claude.com/docs/en/setup
  - https://code.claude.com/docs/en/authentication
  - https://code.claude.com/docs/en/headless
related:
  - grok-bot-cloud-computer
  - bot-uses-build
  - bot-build-chat-map
  - free-vs-supergrok
image: /tips/bot-uses-claude-code.jpg
image_alt: ノートに、Claude Code は Bot のコンピュータで動かす、と大きく書いてある
image_caption: Claude Code は、自分の Mac ではなく、Grok Bot のコンピュータに入れます。払う先は Anthropic です。
---

## 困ること

自分の Mac に Claude Code を入れても、Grok Bot はそれを使えません。Bot の仕事は、クラウドのコンピュータで動きます。ターミナルも、そこです。

これは、Grok Bot が使えて、Claude のアカウントもある人向けです。チャットだけで足りる人は、やらなくて大丈夫です。これは、xAI の公式の手順ではありません。公式にあるのは、Bot のコンピュータにターミナルがあることと、自分で入れたものは消えることがあること、の 2 つです。

## 入れる場所

コンピュータは <a href="/tips/grok-bot-cloud-computer/">アカウントにつき 1 台</a>で、そのアカウントの Bot が共有します。入れるのは、そのコンピュータです。手元の Mac や Windows ではありません。

Bot のコンピュータは Linux です。2026-09-26 の Claude Code の案内では、macOS と Linux は次のコマンドで入れます。Bot に、クラウドのコンピュータのターミナルで実行させてください。

```
curl -fsSL https://claude.ai/install.sh | bash
```

入れたあと、新しいターミナルで `claude --version` と打ちます。バージョンの番号と `(Claude Code)` が出れば、入っています。

Grok Bot の案内では、通常の更新のあと、ファイルは残ります。自分で入れたパッケージは、消えるものとして扱います。管理者がコンピュータを作り直すと、自分で入れたアプリは消え、ファイルとログインは残ります。`claude` が無くなっていたら、同じコマンドでもう一度入れます。

## ログイン

最初に `claude` を起動すると、ブラウザでログインします。ブラウザが開かないときは、ログイン用の URL をコピーして、そのコンピュータのブラウザに貼ります。パスワードと確認コードは、Bot に任せません。コンピュータの画面を自分で操作して、自分で入れます。

サブスクリプションではなく、Console の API 請求で払うなら、`claude auth login --console` です。

`ANTHROPIC_API_KEY` を置いたままだと、ログインしていても、その鍵が使われます。`claude -p` のときは、鍵があれば必ず鍵が使われます。サブスクリプションで払いたいなら、鍵は置かないでください。

同じアカウントの Bot は、コマンドのログインも共有します。だから、鍵をチャットに貼る必要はありません。

## Bot に使わせる

対話の画面は、人が続きを打つ前提です。Bot に渡すなら、人の手を待たない呼び方にします。Anthropic はそれを `claude -p` と書いています。使う道具は、必要なものだけ先に許可します。

```
claude -p "このフォルダのテストが落ちた原因を説明してください。ファイルは書き換えないでください。" --allowedTools "Read,Bash"
```

Grok は頼みます。ファイルを読んで説明するのは Claude Code です。Grok Build は別の道具です。渡す手順は <a href="/tips/bot-uses-build/">重い仕事は Grok Build に渡す</a> に書きました。チャット、Bot、Build の分け方は <a href="/tips/bot-build-chat-map/">3 つは別の道具</a> に書きました。

## 払う場所

Grok Bot を動かす分は、Cursor か SuperGrok です。Claude Code を動かす分は、Anthropic です。SuperGrok や Cursor に入っていても、Claude Code を使う分は入っていません。サブスクリプションにするか、Console の API にするかは、ログインのときに選びます。金額は、自分の Claude の画面で見てください。どこにいくら払うかの分け方は <a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a> に書きました。

<div class="table-scroll">

| やること | 答え |
| --- | --- |
| 入れる | Bot のコンピュータ。自分の Mac ではない |
| ログイン | そのコンピュータのブラウザ |
| 呼び出す | `claude -p`。対話の画面ではない |
| 払う | Anthropic。Grok のプランとは別 |

</div>

## よくある取り違え

- 「自分の Mac に入れれば、Bot も使える」: Bot がコマンドを打つのは、クラウドのコンピュータです
- 「SuperGrok に入っていれば、Claude もその中」: 払う先は Anthropic です
- 「Bot に claude を打たせても、考えているのは Grok」: `claude -p` で考えるのは Claude です。Grok は頼む側です
- 「鍵をチャットに貼れば済む」: 同じアカウントの Bot は、そのコンピュータのログインを共有します。チャットには貼りません
