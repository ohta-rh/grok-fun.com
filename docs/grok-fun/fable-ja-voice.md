---
date: 2026-09-09
model: claude-fable-5-1
checkpoint: review
base: e79565c (main)
topic: ja-voice
---

# Fable: 公開日本語の全体書き直し

手をつける前に一言。レポは触らないわ。判断と原稿だけ、全部返す。読んで、自分で流し込んで。

正直、読んでて分かったのよ。一文ずつ直しても治らない理由が。全部同じところから壊れてる。

---

### 1. 病名（20 行以内）

**病名: 文を書いていない。**

この原稿は、英語の公式文や表の見出しから「公式」「上限」「契約」「最上位」「範囲」のような語を拾って、それを並べて、間に句点を打っている。誰も一度も、その文を口に出していない。だから主語と述語が無い電報になるか、英語の概念を漢字に押し込んだ、日本人が使わない熟語になる。

例は 3 つで足りる。

- 「上限は 1 週間で 1 つ」。日本人は「使える量は 1 週間ごとに決まっていて、チャットも Imagine も同じ量から減る」と言う。
- 「何枚出るかは公式で見る」。「公式」は形容の語で、場所ではない。「自分のプラン画面に書いてある」と言う。
- 「先に絵。動きは一つ。」。これは見出しの切れ端で、文ではない。「先に静止画を出して、動きは一つだけ書く」と言う。

砕けた語を並べても、この病気は治らない。崩した文は、また別の電報になるだけ。

治療は 1 つ。**友達が実際に打つ、主語と述語のある普通の文を先に書く。そのあとで、日付と数字と製品名を足す。** 直訳に気づいたら語を換えず、その段落を 1 から書き直す。

サイト全体をこの順で書き直した原稿が、下の 3 にある。

---

### 2. 声の見本（各 TIPS、友達への LINE 3 行）

**japanese-fix**
- Grok に日本語で聞いてるのに、英語で返ってくることあるよね。
- 会話の最初に「この会話は全部日本語で答えて。英語の資料を貼っても日本語で」って書いておくと、ほぼ直るよ。
- 途中でまた英語になったら「日本語で続けて」って 1 行送れば戻る。

**three-entrances**
- Grok って、grok.com と公式アプリと X の中の、3 か所から使えるの。
- 同じ Grok なんだけど、どこから入るかで出てくるメニューが違う。無いと思ったら別の入口を開いてみて。
- あと、X の有料に入っても grok.com は無料のままだから、そこは別だと思っておいて。

**free-vs-supergrok**
- Grok の有料って 1 つじゃなくて、何をしたいかで払う場所が変わるの。
- チャットと画像なら grok.com の SuperGrok で月 $30。X の中だけなら X Premium。Bot だけで、もう Cursor 使ってるなら Cursor でいい。
- Heavy っていう上のプランもあるけど、月いくらかは料金ページの先頭に出てないから、契約する画面で見て。

**imagine-quickstart**
- Imagine で絵を出すなら、何を、どこで、どんな絵で、の 3 つを 1 文に書けばいい。
- 日本語で通るよ。ただ「film photo」みたいな画風の名前は、英語のほうが狙ったとおりに出る。
- 1 回で決めないで、同じ文で 2、3 回出して、いちばん近いのを選んで。

**imagine-video**
- 動画は、いきなり動画から作らないで、まず静止画を出して、それを動かすほうがきれいに出るよ。
- 動きは一つだけ書くの。「雨が降る」とか「ゆっくり寄る」とか。いっぺんに三つ頼むと崩れる。
- 動画はチャットより早く使える量が減るから、絵が決まってから回して。

**bot-build-chat-map**
- Grok って名前が付いてるのが、チャットと Bot と Build の 3 つあって、検索すると混ざるの。
- 普通に質問したいだけならチャットで足りる。Bot は仕事を任せる別のアプリで、Build はプログラムを書く人用。
- プログラムを書かない人は、チャットだけ覚えておけば大丈夫。

---

### 3. 書き直した原稿（全文）

````path:src/content/tips/japanese-fix.md
---
title: 英語で返ってきたら、会話の最初に 3 行貼る
description: Grok が英語で答え始めたら、会話の最初に「全部日本語で答えて。英語の資料を貼っても日本語で」と書いておきます。途中で英語に戻ったら「日本語で続けて」と 1 行送れば足ります。
order: 1
product: chat
last_verified: "2026-09-08"
source_url:
  - https://grok.com
  - https://help.x.com/en/using-x/about-grok
related:
  - three-entrances
  - imagine-quickstart
  - bot-build-chat-map
image: /tips/japanese-fix.jpg
image_alt: 罫線のある紙に、蛍光ペンで 1 行だけ塗ってある。机の上に置かれている
image_caption: 質問を書く前に、この 3 行を先に貼っておくと、英語に戻りにくくなります。
---

## 困ること

日本語で聞いているのに、Grok が英語で答え始めることがあります。長い会話の途中で、急に英語に切り替わることもあります。英語の資料や URL を貼ったあとに起きやすいです。X の投稿について聞いたときも、元の投稿が英語なら英語で返ってくることがあります。

入口は grok.com、公式アプリ、X の 3 つありますが（<a href="/tips/three-entrances/">入口の使い分け</a>）、下の 3 行はどの入口でも同じように効きます。設定画面の場所は入口やバージョンで変わるので、設定を探すより先に、会話の中で決めてしまうのが確実です。

## 会話の最初に、この 3 行を貼る

新しい会話を開いたら、質問を書く前にこれを貼ります。

```
この会話では、回答をすべて日本語にしてください。英語の資料を貼っても日本語で答えてください。
この会話で扱うのは ○○ だけです（例: Grok Imagine の使い方）。
それ以外の話題を振ったら「その話はここでは扱いません」と 1 行だけ返して、深掘りしないでください。
```

- 1 行目で、答える言語を決めます。「日本語で」だけだと、英語の資料を貼った瞬間に崩れることがあります。「英語の資料を貼っても日本語で」まで書いておきます。
- 2 行目で、この会話で扱う話題を 1 つに絞ります。絞っておくと、関係ない機能の説明や一般論が減って、答えが短くなります。Imagine の絵のことなら「Grok Imagine のプロンプト」と書きます（<a href="/tips/imagine-quickstart/">Imagine で 1 枚目を出す</a>）。
- 途中で英語に戻ったら、「日本語で続けてください」と 1 行だけ送ります。前の答えを言い直させる必要はありません。

上の図の「これだと弱い」は、「日本語で教えて」の 1 行だけです。英語の資料を貼ったところで崩れます。「これで足りる」の側まで書いてください。

## 崩れやすいタイミング

- 英語の公式ドキュメントや GitHub の README を貼った直後
- 英語の X 投稿の URL や本文を貼った直後
- コードやエラーの文章が英語のとき
- 長い会話で、途中から別の機能の話にそれたとき

崩れたら、3 行を全部貼り直す必要はありません。この 2 行だけ送ります。

```
日本語で続けてください。
話題は ○○ だけです（例: Imagine のプロンプト）。
```

ファイルを貼るときも同じです。PDF や英語のスライドを付ける前に、先に 3 行を送っておくと崩れにくくなります。ファイルを貼れるのは grok.com と公式アプリです（<a href="/tips/three-entrances/">入口の使い分け</a>）。

## 機能の名前は、英語と日本語を並べて聞く

Grok の機能名は英語のままのものが多いです（Imagine、SuperGrok、Bot など）。質問するときは「Imagine（画像生成）」のように並べて書くと、別の機能と取り違えられにくくなります。日本語だけで「画像作成機能」と書くと、別の機能の話になることがあります。

## 設定で「いつも日本語」にできるか

grok.com と公式アプリには、答え方の好みをあらかじめ書いておく設定があります（カスタム指示、パーソナライズなど、名前は時期で変わります）。ここに「回答はいつも日本語で」と書いておくと、会話ごとに書かなくてすみます。

ただし、この設定の名前と場所はバージョンで変わります。2026-09-08 時点では、<a href="https://grok.com">grok.com</a> の設定を開いて自分で探すのが早いです。入口が変わっても効くのは会話の最初の 3 行なので、まずそちらを覚えておいてください。

## 毎回貼るのが面倒なら

同じ 3 行を何度も書くなら、grok.com やアプリの「答え方の好み」に書いておくか、メモに残して貼り付けます。<a href="/tips/bot-build-chat-map/">Grok Bot</a> は別のアプリで、チャットの前置きを保存する機能ではありません。プロンプトの文面集はこのサイトには置いていません。

## まとめ

<div class="table-scroll">

| やること | こうなる |
|---|---|
| 1 行目に「すべて日本語で」「英語の資料を貼っても日本語で」と書く | 英語に戻りにくくなる |
| 2 行目で話題を 1 つに絞る | 脱線と長文が減る |
| 英語に戻ったら「日本語で続けて」と送る | 1 行で戻る |
| 機能の名前は英語と日本語を並べる | 別の機能と取り違えない |

</div>
````

````path:src/content/tips/three-entrances.md
---
title: Grok は grok.com、公式アプリ、X の 3 か所から使える
description: Grok は grok.com、公式アプリ、X の中の 3 か所から使えます。同じ Grok でも、入る場所によって出てくるメニューが違います。無いと思ったら、別の入口を開いてみてください。似た名前の偽アプリには気をつけて。
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
  - imagine-video
image: /tips/three-entrances.jpg
image_alt: 机の上にノート PC とスマートフォンと新聞が並んでいる。画面に文字は無い
image_caption: 入口は 3 つあります。どこから入るかで、出てくるメニューが変わります。
---

## 入口は 3 つ

<div class="table-scroll">

| 入口 | どこにある | 向いていること |
|---|---|---|
| **grok.com** | ブラウザ | 長い文章を貼る、ファイルを読ませる、コピペが多い作業。PC で使うならここ |
| **公式アプリ** | iOS / Android | 移動中に使う、声で話す、写真を撮ってすぐ聞く |
| **X** | X アプリや x.com の Grok タブ、投稿の Grok ボタン | X の投稿やアカウントについて聞く。タイムラインを見ながら使う |

</div>

同じ Grok ですが、**画面と使える機能は入口ごとに違います。** 「アプリにはあるのに Web に無い」「X からだと出てこない」はよくあります。目当ての機能が見つからないときは、設定を探すより、別の入口を開くほうが早いです。Imagine も、入口によってメニューの場所が違います（<a href="/tips/imagine-quickstart/">Imagine で 1 枚目を出す</a>）。

Web は **grok.com** を使います。公式の FAQ によると、grok.x.ai のような別のアドレスから入ると、Projects などの機能が出ないことがあります。Companions（コンパニオン）は、確認した時点では iOS だけで、Web と Android に出す予定は無いと FAQ に書いてあります。

見つからないときは、この順で試します。

1. 今いる画面のメニューを全部開いてみる
2. 公式アプリと grok.com を入れ替えてみる
3. Imagine と、ターミナルで動く Grok Build は、X の中では探さない

## アカウント

- grok.com には、X のアカウントのほかに、Google、Apple、メールアドレスでも入れます。X を使っていなくても、grok.com と公式アプリは使えます。
- X の中の Grok は、X のアカウントと X のプランで動きます。
- 会話の履歴は、入口をまたいで見えるとは限りません。同じアカウントでも、X 側の会話と grok.com 側の会話は別に扱われることがあります。ここは変わるので、公式の FAQ を見てください。

「Web で話した内容がアプリに無い」は、たいてい故障ではなく、入口が別扱いになっているだけです。残したい会話は、どの入口で始めるかを先に決めてください。

ファイルを貼るなら grok.com か公式アプリです。FAQ では、Web はだいたい 100 個まで、1 ファイル 150 MB までとあります。数字は変わるので、画面に出るエラーのほうを信じてください。

X の中の Grok には、公開している投稿や Grok との会話が学習に使われる設定があります。使われたくないときは、X の「プライバシーと安全 → データ共有とパーソナライズ → Grok」で外せます（<a href="https://help.x.com/en/using-x/about-grok" rel="external">X の解説</a>）。grok.com 側の学習の設定とは別です。

## 払う場所も入口ごとに別

**X Premium に入っても、grok.com の SuperGrok は付いてきません。** 契約する場所が違います。Cursor のプランに入っていると Grok Bot が使えることがありますが、それも grok.com で使える量とは別です。何をしたいときにどこで払うかは、<a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a> に書きました。

## 公式アプリの見分け方

ストアで「Grok」と検索すると、似た名前のアプリがいくつも並びます。入れる前に、この 2 つを見てください。

1. **開発元が xAI** になっているか（App Store も Google Play も表示されます）
2. <a href="https://x.ai/grok">x.ai/grok</a> か <a href="https://grok.com">grok.com</a> からストアへのリンクをたどったか

開発元が違うアプリは、Grok の名前を借りた別物です。そこで有料に入っても、Grok の SuperGrok にはなりません。評価やインストール数だけでは見分けられません。

## こんなときはここ

- 長い文章を貼って「日本語で要約して」と頼む: **grok.com**
- 外で写真を撮って「これ何」と聞く: **公式アプリ**
- 「この投稿の背景を教えて」と聞く: **X**。投稿の Grok ボタンから聞くと、その投稿を読んだうえで答えてくれます

どの入口でも、最初の 1 行で「日本語で」と話題を決めておくと安定します（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。
````

````path:src/content/tips/free-vs-supergrok.md
---
title: Grok の有料は 1 つじゃない。やりたいことで払う場所が決まる
description: Grok の有料は 1 つではありません。チャットと Imagine なら grok.com の SuperGrok、X の中だけなら X Premium、Grok Bot だけなら Cursor、自分のアプリから呼ぶなら API と、やりたいことで払う場所が変わります。X で払っても grok.com は無料のままです。
order: 3
product: chat
last_verified: "2026-09-08"
source_url:
  - https://x.ai/pricing
  - https://docs.x.ai/grok/faq
  - https://x.ai/news/grok-bot-more-plans
  - https://x.ai/news/grok-build-mode
  - https://x.ai/news/grok-build-cli
  - https://cursor.com/pricing
  - https://docs.x.ai/docs/models
  - https://docs.x.ai/grok-bot/get-started
  - https://help.x.com/en/using-x/x-premium
related:
  - three-entrances
  - bot-build-chat-map
  - imagine-quickstart
image: /tips/free-vs-supergrok.jpg
image_alt: 封蝋の色が違う 4 枚の紙が机に並んでいる
image_caption: 払う場所は 4 つあります。何をしたいかで、どこで払うかが決まります。
---

## 先に決めること

「Grok の有料」は 1 つではありません。何をしたいかを先に決めると、払う場所が決まります。

<div class="table-scroll">

| やりたいこと | 払う場所 | 2026-09-08 に確認したこと |
|---|---|---|
| grok.com や公式アプリで、チャット、Imagine、Voice を使う | grok.com の SuperGrok | Free $0、SuperGrok $30、Plus $100。Heavy も比較表と Get Heavy にあります |
| X の中だけで使う | X Premium か Premium+ | X に払います。SuperGrok は付きません。ターミナルの Grok Build は発表時点で Premium+ から |
| Grok Bot だけ使いたくて、もう Cursor を使っている | cursor.com の個人向け Pro | 月 $20 から。grok.com で使える量は増えません |
| 自分のアプリから呼びたい | console.x.ai の API | 使った分だけ払います。grok.com で使える量とは別です。返金はありません |

</div>

X Premium に入っても、grok.com は無料のままです。故障ではなく、そういう仕組みです。入口の違いは <a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a>。チャットと Bot と Build の違いは <a href="/tips/bot-build-chat-map/">別の道具</a> に書きました。

## grok.com のプラン（Free、SuperGrok、Plus、Heavy）

<figure class="article-hero">
  <img src="/tips/fig-bill-ladder.jpg" alt="grok.com のプランを下から順に並べた図。Free $0、SuperGrok $30、Plus $100、その上に Heavy。Heavy の月額は契約する画面で見る" width="1280" height="720" />
  <figcaption>Heavy はいちばん上にあります。月額は料金ページの先頭に出ていないので、契約する画面で見ます。</figcaption>
</figure>

<a href="https://x.ai/pricing" rel="external">x.ai/pricing</a> を 2026-09-08 に開くと、個人向けの値段は 3 つ並んでいます。同じページの比較表には、そのほかに **Lite** と **Heavy** の列もあります。

<div class="table-scroll">

| プラン | いくら | どんな人向け |
|---|---|---|
| Free | <span class="num">$0</span> | まず 1 週間使ってみる人。使える量は少なめです |
| SuperGrok Lite | 値段は先頭に出ていません。Get Lite のボタンはあります | 比較表に列があります。入るなら、契約する画面で金額を見てください |
| SuperGrok | <span class="num">$30 / 月</span> | いちばん選ばれているプランです。Grok 4.6、Imagine、Voice、Grok Bot が使えて、使える量が増えます |
| SuperGrok Plus | <span class="num">$100 / 月</span> | 動画が 1080p になります。Chat、Imagine、Voice、Build の使える量が大きくなり、返事が速くなり、混んでいるときに優先され、新しい機能を先に使えます |
| SuperGrok Heavy | 値段は先頭に出ていません。比較表と Get Heavy のボタンはあります | いちばん上のプランです。下に書きました |

</div>

値段は USD で、予告なく変わります。契約する前に、公式ページと、自分が使っている入口の料金画面を見てください。

## SuperGrok Heavy はある

「値段が出ていないから Heavy は無い」と書くのは間違いです。2026-09-08 の公式に、次のことが書いてあります。

- <a href="https://x.ai/pricing" rel="external">x.ai/pricing</a> の比較表に **SuperGrok Heavy** の列がある
- 同じページに **Get Heavy** のボタンがある。押すと grok.com の契約画面に行く
- <a href="https://x.ai/news/grok-build-mode" rel="external">2026-07-28 に発表された Build Mode</a> は、発表時点では **Heavy に入っている人向け**の試験機能。grok.com と公式アプリの画面の中でサイトやアプリを作る機能で、ターミナルで動く Grok Build とは別物
- <a href="https://x.ai/news/grok-bot-more-plans" rel="external">2026-08-26 の Grok Bot の発表</a>は、対象のプランに SuperGrok、Plus、**Heavy** を並べている
- FAQ には、身に覚えのない高額請求は **Heavy の年払い**であることが多い、と書いてある。API のせいだと思う前に、grok.com の請求画面でプランと支払いの周期を見てください

ただし、料金ページの先頭に並ぶ 3 つの値段には、Heavy の月額は出ていません。ほかのサイトが月 $300 と書いているのは、2025-07 の発表時の報道をもとにしていることが多いです。**今の値段だと断定はしません。** 金額は契約する画面で見てください。

Heavy を考えるのは、次のどちらかが分かってからで足ります。

- 画面の中の **Build Mode** が要る
- SuperGrok（$30）や Plus（$100）では足りないと、Usage の画面で分かった

チャットと Imagine だけなら、まず $30 を使い切ってみてください。

## 使える量は 1 週間ごと。チャットも Imagine も同じ量から減る

2026 年 6 月から、使える量は 1 週間ごとに決まっています。1 日ごとの回数ではありません。しかも、チャットと Imagine は同じ量から減っていきます（<a href="https://docs.x.ai/grok/faq" rel="external">FAQ</a>）。

- チャットをたくさん使うと、同じ週の Imagine の残りも減ります
- 動画と長いコーディングは、チャットより早く減ります
- 残りは **設定 → Usage** で見られます。使った割合、製品ごとの内訳（FAQ 上は API、Build、Chat、Imagine、Voice）、次にリセットされる日時、追加クレジットの残高が出ます
- 使い切ると、有料の機能はリセットまで止まります。**無料の Chat と Voice は、別の回数で残ります**
- 続けたいときは、追加クレジットを買う、上のプランに変える、Auto Top Up を付ける、のどれかです

「昨日は画像が出たのに今日は出ない」は、たいてい同じ週の残りを別の作業で使ってしまったのが原因です。

## 払っても付いてこないもの（ここでいちばん間違える）

<div class="table-scroll">

| 払ったもの | 付いてこないもの |
|---|---|
| X Premium / Premium+ | grok.com の SuperGrok。Imagine や Voice の使える量も、grok.com 側では増えません |
| Cursor の個人向け Pro | grok.com で使える量。Imagine の枚数は増えません |
| SuperGrok / Plus / Heavy | console.x.ai の API クレジット。API は別に払います。返金はありません |

</div>

3 つとも「Grok の有料」に見えますが、払っている先が違います。

## 追加クレジット（Extra Usage Credits）

1 週間分を使い切ったあとに、前払いで買い足すものです。FAQ に書いてある条件は次です。

- **Web からしか買えません。** アプリのストア課金では買えません
- **$5 から**買えます
- プランに入っている 1 週間分を使い切ってから減り始めます。使い切るまでは減りません
- 期限は**およそ 1 年**です
- 1 回あたりの単価は、プランに入っている分より高いです
- **Auto Top Up** を付けると、残高が減ったときに決めた額を自動で足します。1 か月の上限も決められます

FAQ は、**毎週のように使い切るなら、クレジットを買い続けるより上のプランに変えたほうが安い**、と案内しています。たまに足りない月の穴埋め、と考えてください。

## X の Premium と grok.com はつながっていない

X の中の Grok は X のプランで動きます。grok.com は SuperGrok の契約で動きます。片方が有料でも、もう片方は無料のまま、が普通です。会話の履歴も、入口をまたいで見えるとは限りません。

ターミナルで動く **Grok Build** は、2026-05-25 の発表では SuperGrok と **X Premium+** の人が使えるとあります。普通の X Premium では使えません。画面の中の Build Mode（Heavy）とも別物です。

## Cursor から Grok Bot を使う

<a href="https://x.ai/news/grok-bot-more-plans" rel="external">2026-08-26 の発表</a>では、Grok Bot は SuperGrok、Plus、Heavy と、Cursor の Pro、Pro+、Ultra、Teams に含まれる、とあります。Bot の使用量は Grok や Cursor で使える量とは別に数える、とも書いてあります。

<a href="https://cursor.com/pricing" rel="external">cursor.com/pricing</a>（2026-09-08）の個人向け Pro は月 <span class="num">$20</span> で、**Grok Bot access** と書いてあります。無料の Hobby には Grok Bot の記載がありません。

公式の書き方は揃っていません。ニュースは SuperGrok と Cursor Pro を含めていますが、確認した時点の<a href="https://docs.x.ai/grok-bot/get-started" rel="external">導入ページ</a>は Plus、Heavy と、Cursor の Pro+ 以上だけを挙げています。**自分のプランで Bot が使えるかは、プランの画面で確かめてください。**

Grok Bot だけが目的で、もう Cursor を使っているなら、Cursor の個人向け Pro（確認した時点で <span class="num">$20</span>）のほうが SuperGrok（$30）より安くすみます。ただし grok.com で使える量も、API のクレジットも付いてきません。

## API は別に払う

<a href="https://console.x.ai" rel="external">console.x.ai</a> は、使ったトークンの分だけ払います。<a href="https://docs.x.ai/docs/models" rel="external">公式のモデル表</a>（2026-09-08）では、grok-4.6 は 100 万トークンあたり次の値段です。1 回のプロンプトが 20 万トークンに達すると、その回は全部が右の単価になります。

<div class="table-scroll">

| 種類 | 20 万トークンまで | 20 万を超えたとき |
|---|---|---|
| 入力 | <span class="num">$2</span> | <span class="num">$4</span> |
| 入力（キャッシュ済み） | <span class="num">$0.50</span> | <span class="num">$1</span> |
| 出力 | <span class="num">$6</span> | <span class="num">$12</span> |

</div>

API のクレジットは返金されません。SuperGrok に入っても API は使えません。「API に使えると思って SuperGrok に入った」は、よくある取り違えです。

## やめるときは、払った場所で

<div class="table-scroll">

| 払った場所 | やめる場所 |
|---|---|
| grok.com（Web） | grok.com の請求画面。広告ブロッカーが入っているとボタンが開かないことがあります |
| iPhone / iPad | Apple の定期購入 |
| Android | Google Play。返金は FAQ 上 xAI の申請フォームから |
| X Premium | X の設定。返金も X |
| Cursor | Cursor の請求画面 |

</div>

Web とアプリで別のアカウントに入っていると、片方だけ有料に見えます。Apple の「メールを非公開」を使っていて起きることが多いです。両方を同じアカウントで入り直してから、公式に問い合わせてください。

## 円の値段

ストアに出る円の値段は、公式の USD をそのまま為替で換算したものではありません。ストアの価格帯に丸められて、手数料の分だけ Web より高くなることがあります。PC で使うなら grok.com、スマホで使うならストア、と先に決めてから比べてください。追加クレジットは Web でしか買えないので、すぐ使い切る人は Web で契約したほうが融通が利きます。

## 決め方

1. 無料で 1 週間使います。足りなくなった曜日と、そのとき何をしていたか（長文、画像、動画、Voice）をメモしておきます
2. Usage の内訳を見ます。動画が主な原因なら Plus、チャットだけなら SuperGrok で足りることが多いです
3. 入口を決めます。X の中だけなら X。grok.com なら SuperGrok。Bot だけで Cursor を使っているなら Cursor
4. **Heavy は最後です。** Build Mode が要る、または $30 や $100 では足りないと Usage で分かってから。金額は契約する画面で見ます

## よくある取り違え

- 「X Premium なのに grok.com が無料のまま」: 払う場所が違うので、これで正常です
- 「Cursor Pro なのに Imagine の枚数が変わらない」: Cursor で払っているのは Grok Bot の分です
- 「SuperGrok なのに API が使えない」: API は console.x.ai で別に払います
- 「X Premium なのにターミナルの Build が使えない」: 発表時点では Premium+ か SuperGrok です
- 「画像の残りが急に減った」: 同じ週の分を、別の作業で使っています。Usage を見てください
- 「円の値段が公式の USD と合わない」: ストアの値段が正しいです
- 「身に覚えのない高額請求が来た」: FAQ は Heavy の年払いが多いと書いています。請求画面を見てください
- 「Web で解約のボタンが開かない」: 広告ブロッカーを疑ってください。シークレットウィンドウで <a href="https://grok.com/?_s=billing" rel="external">grok.com の請求画面</a>を開きます
- 「Heavy は公式に無い」: 比較表と Get Heavy と Build Mode の対象にあります。金額は契約する画面で見ます
````

````path:src/content/tips/imagine-quickstart.md
---
title: Imagine で 1 枚目を出すなら、何を、どこで、どんな絵で、を 1 文に
description: Imagine で絵を出すときは、何を（被写体）、どこで（場面）、どんな絵で（画風）、の 3 つを 1 文に書きます。日本語で通ります。画風の名前だけは英語のほうが安定します。何枚出せるかは、自分のプラン画面に書いてあります。
order: 4
product: imagine
last_verified: "2026-09-08"
source_url:
  - https://grok.com
  - https://x.ai/news
  - https://docs.x.ai/grok/faq
related:
  - three-entrances
  - free-vs-supergrok
  - japanese-fix
  - imagine-video
image: /tips/imagine-quickstart.jpg
image_alt: 雨の京都の路地に白い猫が座っている。夕方のフィルム写真
image_caption: このページの書き方（白い猫、雨の京都の路地、film photo）で出した 1 枚です。「文字を入れないで」と頼むより、「文字の無い看板」と書いたほうが、そのとおりに出ます。
---

## 手順は 4 つ

1. Imagine を開きます（grok.com は左のメニュー、公式アプリは下のタブにあります。X の中からは出ないことが多いです）
2. 何を、どこで、どんな絵で、の 3 つを 1 文に書きます
3. 同じ文で 2〜3 回出して、いちばん近いものを選びます
4. 絵が決まってから動画にします（<a href="/tips/imagine-video/">動画は、先に絵を出してから動きを一つ</a>）

見つからないときは別の入口を開いてください（<a href="/tips/three-entrances/">grok.com、公式アプリ、X の 3 か所</a>）。使い方をチャットで聞くなら、最初の 1 行で日本語と話題を決めておきます（<a href="/tips/japanese-fix/">会話の最初に 3 行貼る</a>）。

## 日本語で書く型

下の作例は、この書き方で出しました。

```
被写体: 白い猫
場面: 雨の日の京都の路地、夕方
画風: film photo、浅い被写界深度
```

- **日本語で通ります。** 日本の地名や季節の言葉は、日本語のままのほうが意図が伝わります。
- **画風の名前は英語のほうが安定します。** 「film photo」「watercolor」「isometric」のような言葉は、英語で書いたほうが狙ったとおりに出やすいです。
- **「〜しないで」は効きにくいです。** 「文字を入れないで」より「文字の無い看板」のように、欲しい状態をそのまま書きます。
- **1 回で決めません。** 同じ文で 2〜3 回出して、いちばん近いものを選んでから直します。直すときは文を全部書き換えず、被写体、場面、画風のどれか 1 つだけ変えます。

数字や料金や画面の文字が正確でないと困る図は、Imagine より HTML の表のほうが向いています。人の顔と日本語の文字は苦手なことがあるので、回数を多めに見てください。

## 無料で何枚出せるか

無料で出せる枚数と本数には上限があります。2026 年 6 月から、使える量は 1 週間ごとに決まっていて、チャットと Imagine は同じ量から減っていきます。画像をたくさん出すと、その週のチャットの残りも減ります。内訳は設定の Usage で見られます。仕組みは <a href="/tips/free-vs-supergrok/">やりたいことで払う場所が決まる</a> に書きました。

枚数の上限は時期や混雑で変わり、日本語の公式ページにはまとまっていません。上限に当たったときに画面に出る表示のほうを信じて、このページには数字を書きません。何枚出せるかは、自分のプラン画面と、<a href="https://grok.com">grok.com</a>、<a href="https://x.ai/news">x.ai/news</a> で見てください。すぐ上限に当たるなら、SuperGrok を考えます。

## 気をつけること

- **透かしは消せません。** FAQ によると、生成した画像と動画には Grok の透かしが入り、設定では外せません。消したり隠したりすることは利用規約で禁じられています。
- **720p の動画が 480p で返ってくることがあります。** その解像度の分を使い切ると落ちます。「画質の設定を変えたのに 480p」は故障ではないので、Usage を見てください。
- **実在の人物、未成年、性的な内容には制限があります。** 中身はポリシーで決まり、変わります。出ないときは、プロンプトのせいではなくポリシー側の理由であることが多いです。
- **生成した画像の権利と使える範囲は、公式の規約で決まります。** 商用で使う前に規約を読んでください。
- **人の顔と文字は苦手なことがあります。** 顔や日本語の文字を入れたいときは、回数を多めに見込んでください。
````

````path:src/content/tips/imagine-video.md
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
  <video controls playsinline preload="metadata" poster="/tips/imagine-video.jpg" width="1280" height="720">
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
  <video controls playsinline preload="metadata" poster="/tips/vid-lantern.jpg" width="1280" height="720">
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
````

````path:src/content/tips/bot-build-chat-map.md
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

| 名前 | 何をするもの | 使う場所 | 向いている人 |
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
````

````path:src/pages/index.astro
---
import Base from '../layouts/Base.astro';
import { getCollection } from 'astro:content';

const tips = (await getCollection('tips')).sort((a, b) => a.data.order - b.data.order);
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Grok JP',
  alternateName: 'Grok JP ファンコミュニティ（非公式）',
  url: 'https://grok-fun.com/',
  inLanguage: 'ja',
  description: '日本語で Grok を使う人のための、非公式のファンサイトです。',
};
---
<Base title="Grok JP" description="Grok を日本語で使うときに困ることを、実際に試して、日付と一次情報のリンクを付けて書いています。xAI とは関係のない、ファンの非公式サイトです。" jsonLd={jsonLd}>
  <p class="card-head"><span class="tag">series</span> <span>最終確認 <time datetime="2026-09-08">2026-09-08</time></span></p>
  <h1>日本語で Grok を使う人のための場所</h1>
  <p class="lead">Grok を日本語で使うときに困ること、公式ページを読んでも分からないことを、実際に試してから、日付と一次情報のリンクを付けて書いています。記事の数は増やしません。しばらくぶりに戻ってきたとき、ここを見れば足りる状態にしておきます。</p>
  <p>このサイトは <strong>xAI とは関係のない、ファンの非公式サイト</strong>です。公式のロゴは使っていません。料金や制限は変わるので、数字は<a href="https://x.ai/grok">公式ページ</a>で確かめてください。</p>

  <h2>どこから読むか</h2>
  <ul class="read-paths">
    <li>
      <a href="/tips/japanese-fix/">英語で返ってきたら、会話の最初に 3 行貼る</a>
      <p>Grok が英語で答え始めたり、途中で英語に戻ったりするときの直し方です。</p>
    </li>
    <li>
      <a href="/tips/free-vs-supergrok/">Grok の有料は 1 つじゃない。やりたいことで払う場所が決まる</a>
      <p>チャットなら grok.com、X の中だけなら X、Bot だけなら Cursor。X で払っても grok.com は無料のままです。</p>
    </li>
    <li>
      <a href="/tips/imagine-video/">動画は、先に絵を出してから動きを一つ書く</a>
      <p>動画が崩れる、すぐ使える量が尽きる、というときの順番です。</p>
    </li>
    <li>
      <a href="/tips/bot-build-chat-map/">チャット、Grok Bot、Grok Build は別の道具</a>
      <p>名前が似ていて検索結果が混ざるとき、どれを開けばいいかが分かります。</p>
    </li>
  </ul>

  <h2>TIPS</h2>
  <ol class="tips-list">
    {tips.map((t) => (
      <li>
        <span class="num">TIPS {String(t.data.order).padStart(2, '0')} · {t.data.product}</span><br />
        <a href={`/tips/${t.id}/`}>{t.data.title}</a>
        <p>{t.data.description}</p>
        <p class="meta">最終確認 <time datetime={t.data.last_verified}>{t.data.last_verified}</time></p>
      </li>
    ))}
  </ol>

  <h2>このサイトの約束</h2>
  <ul>
    <li>どの TIPS にも、最後に確かめた日と、一次情報のリンクを付けます。確かめられないことは「公式ページを見てください」と書きます。</li>
    <li>公式ニュースの全文は翻訳しません。Bot 用のプロンプト集は <a href="https://grokguide.jp" rel="external">grokguide.jp</a> にあります。ここには載せません。</li>
    <li>記事の数は増やしません。大きな発表の日に、その日のメモを 1 本だけ足すことがあります。</li>
  </ul>
</Base>
````

````path:src/pages/about.astro
---
import Base from '../layouts/Base.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
---
<Base title="About" description="Grok JP は、Grok を日本語で使う人のための非公式ファンサイトです。xAI とは関係ありません。商標、ロゴ、引用、アクセス解析について書いています。">
  <Breadcrumbs items={[{ href: '/', label: 'ホーム' }, { label: 'About' }]} />
  <p class="card-head"><span class="tag">series</span> <span>最終確認 <time datetime="2026-09-08">2026-09-08</time></span></p>
  <h1>About</h1>
  <p class="lead">Grok JP は、日本語で Grok を使う人のための場所です。<strong>xAI と Grok の公式サイトではありません。</strong></p>

  <h2>非公式であること</h2>
  <ul>
    <li>このサイトは xAI Corp. と提携も承認も後援もされていません。</li>
    <li>運営しているのは日本の個人です。書いてあることは運営者が実際に試して確かめたものですが、公式の見解ではありません。</li>
    <li>問い合わせや不具合の報告は、公式（<a href="https://grok.com">grok.com</a> / <a href="https://x.ai">x.ai</a>）にお願いします。ここでは受け付けられません。</li>
  </ul>

  <h2>商標とロゴ</h2>
  <ul>
    <li>Grok と xAI は xAI Corp. の商標です。X は X Corp. の商標です。</li>
    <li>このサイトは <strong>Grok と xAI のロゴ画像を使っていません。</strong> 上の「非公式」の判子と favicon は、このサイトで作ったものです。</li>
    <li>権利者から要請があれば、そのページをすぐに取り下げます。</li>
  </ul>

  <h2>書き方</h2>
  <ul>
    <li>どのページにも、最後に確かめた日と、確かめるのに使った一次情報の URL を付けます。</li>
    <li>料金や制限の数字は変わります。確かめられない数字は書かず、「公式ページを見てください」と書きます。</li>
    <li>公式ニュースの全文は翻訳しません。要約と短い引用と原文のリンクにとどめます。</li>
    <li>Bot 用のプロンプト集は作りません。<a href="https://grokguide.jp" rel="external">grokguide.jp</a> を案内します。</li>
  </ul>

  <h2>アクセス解析</h2>
  <p>アクセスの傾向を知るために Google Tag Manager を使っています。広告は出していません。</p>

  <h2>サイト名とドメイン</h2>
  <p>サイト名は「Grok JP」、ドメインは grok-fun.com です。名前に Grok が入っていますが、公式サイトではありません。</p>

  <h2>いま読めるもの</h2>
  <ul>
    <li><a href="/tips/">TIPS の一覧</a></li>
    <li><a href="/tips/japanese-fix/">英語で返ってきたら、会話の最初に 3 行貼る</a></li>
    <li><a href="/tips/three-entrances/">Grok は grok.com、公式アプリ、X の 3 か所から使える</a></li>
    <li><a href="/tips/free-vs-supergrok/">Grok の有料は 1 つじゃない。やりたいことで払う場所が決まる</a></li>
    <li><a href="/tips/imagine-quickstart/">Imagine で 1 枚目を出すなら、何を、どこで、どんな絵で、を 1 文に</a></li>
    <li><a href="/tips/imagine-video/">動画は、先に絵を出してから動きを一つ書く</a></li>
    <li><a href="/tips/bot-build-chat-map/">チャット、Grok Bot、Grok Build は別の道具</a></li>
  </ul>
</Base>
````

````path:src/pages/tips/index.astro
---
import Base from '../../layouts/Base.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import { getCollection } from 'astro:content';

const tips = (await getCollection('tips')).sort((a, b) => a.data.order - b.data.order);
---
<Base title="TIPS" description="Grok を日本語で使うときの TIPS です。実際に試して、日付と一次情報のリンクを付けています。数は少なく、戻ってきたときにここだけで足りるようにしています。">
  <Breadcrumbs items={[{ href: '/', label: 'ホーム' }, { label: 'TIPS' }]} />
  <p class="card-head"><span class="tag">series</span> <span>{tips.length} 本</span></p>
  <h1>TIPS</h1>
  <p class="lead">Grok を日本語で使うときの、短い実用メモです。番号の順に読むと、はじめての人でも一通りつながるようにしています。</p>
  <ol class="tips-list">
    {tips.map((t) => (
      <li>
        <span class="num">TIPS {String(t.data.order).padStart(2, '0')} · {t.data.product}</span><br />
        <a href={`/tips/${t.id}/`}>{t.data.title}</a>
        <p>{t.data.description}</p>
        <p class="meta">最終確認 <time datetime={t.data.last_verified}>{t.data.last_verified}</time></p>
      </li>
    ))}
  </ol>
</Base>
````

````path:src/pages/404.astro
---
import Base from '../layouts/Base.astro';
---
<Base title="ページが見つかりません" description="このアドレスのページはありません。TIPS の一覧から探してください。">
  <p class="card-head"><span class="mono">404</span></p>
  <h1>ページが見つかりません</h1>
  <p>アドレスが変わったか、まだ書いていないページです。<a href="/tips/">TIPS の一覧</a>から探してください。</p>
</Base>
````

````path:src/components/Infographic.astro
---
interface Props {
  slug: string;
}
const { slug } = Astro.props;

const figures: Record<string, { src: string; alt: string; caption: string }[]> = {
  'japanese-fix': [
    {
      src: '/tips/fig-jp-paste.jpg',
      alt: '「質問を書く前に、この 3 行を貼る」と書いた紙。貼る 3 行のほかに、「日本語で教えて」だけの弱い例と、英語の資料を貼っても日本語で、と書いた足りる例が並んでいる',
      caption: '質問を書く前に、この 3 行を貼ります。「日本語で教えて」だけでは足りません。',
    },
  ],
  'three-entrances': [
    {
      src: '/tips/fig-entrances.jpg',
      alt: 'grok.com、公式アプリ、X の 3 つの入口を並べて、それぞれで出てくるものが違うことを示した図',
      caption: '同じ Grok でも、どこから入るかで出てくるメニューが違います。',
    },
  ],
  'free-vs-supergrok': [
    {
      src: '/tips/fig-bill-choose.jpg',
      alt: 'やりたいこと 4 つと、それぞれ払う場所を線で結んだ図。チャットと Imagine と Voice は grok.com の SuperGrok $30、X の中だけなら X Premium、Grok Bot だけなら Cursor Pro $20、自分のアプリから呼ぶなら console.x.ai',
      caption: '何をしたいかを先に決めると、払う場所が決まります。',
    },
  ],
  'imagine-quickstart': [
    {
      src: '/tips/fig-imagine-formula.jpg',
      alt: '被写体と場面と画風の 3 つを足して、1 文にする図',
      caption: '何を、どこで、どんな絵で、の 3 つを 1 文に書きます。',
    },
  ],
  'imagine-video': [
    {
      src: '/tips/fig-imagine-video.jpg',
      alt: '先に静止画を出して、動きを一つ書き足して、動画にする順番を示した図',
      caption: '先に絵を出して、動きは一つだけ書きます。',
    },
  ],
  'bot-build-chat-map': [
    {
      src: '/tips/fig-bot.jpg',
      alt: 'チャット、Grok Bot、Grok Build を 3 つ並べて、それぞれ別の道具だと示した図',
      caption: 'チャットと Grok Bot と Grok Build は別の道具です。',
    },
  ],
};
const set = figures[slug] ?? [];
---
{set.map((fig) => (
  <figure class="article-hero">
    <img src={fig.src} alt={fig.alt} width="1280" height="720" />
    <figcaption>{fig.caption}</figcaption>
  </figure>
))}
````

````path:src/components/SiteFooter.astro
---
---
<footer class="site-footer">
  <div class="wrap">
    <p>このサイトは非公式のファンサイトです。Grok は xAI の商標で、ロゴは使っていません。</p>
    <p><a href="/">ホーム</a> / <a href="/tips/">TIPS</a> / <a href="/about/">About</a> / <a href="/sitemap-index.xml">Sitemap</a></p>
  </div>
</footer>
````

````path:src/components/UnofficialBanner.astro
---
---
<div class="unofficial" role="note">
  <div class="wrap">
    <span>このサイトは Grok のファンが作った非公式サイトです。xAI とは関係ありません。</span>
    <span class="stamp" aria-label="非公式サイト">非公式</span>
  </div>
</div>
````

````path:src/components/StaleBanner.astro
---
interface Props { lastVerified: string }
const { lastVerified } = Astro.props;
const days = Math.floor((Date.now() - new Date(`${lastVerified}T00:00:00+09:00`).getTime()) / 86400000);
---
{days > 60 && (
  <p class="stale">このページは <time datetime={lastVerified}>{lastVerified}</time> に確かめたものです。そのあとで変わっているかもしれません。</p>
)}
````

````path:src/components/CommentList.astro
---
// コメント一覧 + フォーム。初期表示は劣化状態（「いまはコメントを受け付けていません」）。
// widget.ts が GET /api/comments に成功したら一覧とフォームを出す。
// Turnstile サイトキーは公開値（HTML に出る）。secret は Worker の TURNSTILE_SECRET_KEY。
const siteKey: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAEsxJhZPYnoRS04f';
---
<section class="comments" data-comments data-sitekey={siteKey} aria-labelledby="comments-heading">
  <h2 id="comments-heading" data-comments-heading>コメント</h2>
  <p class="comments-status" data-comments-status>いまはコメントを受け付けていません。記事はそのまま読めます。</p>
  <ol class="comment-list" data-comment-list></ol>
  {siteKey ? (
    <form class="comment-form" data-comment-form hidden novalidate>
      <div class="field">
        <label for="comment-nickname">ニックネーム（書かなくても大丈夫です。24 文字まで）</label>
        <input id="comment-nickname" name="nickname" type="text" maxlength="24" placeholder="匿名" autocomplete="nickname" />
      </div>
      <div class="field">
        <div class="field-head">
          <label for="comment-body">本文（500 文字まで）</label>
          <span class="comment-counter" data-counter aria-live="polite">0 / 500</span>
        </div>
        <textarea id="comment-body" name="body" maxlength="500" rows="3" required></textarea>
      </div>
      <div class="comment-actions">
        <div class="turnstile" data-turnstile></div>
        <button type="submit" class="btn" data-submit>書き込む</button>
      </div>
      <p class="comment-error" data-error role="alert" hidden></p>
      <p class="comment-note">アカウントは要りません。書いた内容はそのまま公開されます。運営が消すことがあります。</p>
    </form>
    <script is:inline src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onloadTurnstileCallback" defer></script>
  ) : (
    <p class="comment-note" data-comments-pending hidden>コメントはまだ準備中です。リアクションは使えます。</p>
  )}
</section>
````

**src/pages/tips/[slug].astro** は構造をそのまま残して、読者に見える文字列だけ 3 か所を置き換える。

| 現行 | 置き換え |
|---|---|
| `<p>一次情報の URL はありません。運営者の操作確認に基づきます。</p>` | `<p>一次情報の URL はありません。運営者が実際に操作して確かめました。</p>` |
| `<p>{entry.data.last_verified} に確認しました。料金・制限・画面は変わります。数字は公式で確認してください。</p>` | `<p>{entry.data.last_verified} に確かめました。料金や制限や画面は変わります。数字は公式ページで確かめてください。</p>` |
| `<h2>確認に使った一次情報</h2>` | `<h2>確かめるのに使った一次情報</h2>` |

`getStaticPaths` の Error 文は開発者向けなので触らない。`aria-label="前後の TIPS"` と「ホーム」「TIPS」はそのままでいい。

---

### 4. 図に書く日本語

**fig-bill-choose.jpg**
- タイトル: やりたいことから、払う場所を決める
- チャットと Imagine と Voice を使う → grok.com で SuperGrok $30
- X の中だけで使う → X Premium
- Grok Bot だけ使う（もう Cursor がある）→ Cursor Pro $20
- 自分のアプリから呼ぶ → console.x.ai で使った分だけ払う

**fig-bill-ladder.jpg**
- タイトル: grok.com で選べるプラン
- Free $0 — まず使ってみるならここです
- SuperGrok $30 / 月 — いちばん選ばれています
- SuperGrok Plus $100 / 月 — 動画が 1080p になります
- SuperGrok Heavy — いちばん上です。月額は契約する画面で見ます（Get Heavy）
- 脚注: Lite と Heavy は比較表に列があります。値段は料金ページの先頭に出ていません（2026-09-08）

**fig-jp-paste.jpg**
- タイトル: 質問を書く前に、この 3 行を貼る
- 貼る 3 行: 本文の 3 行をそのまま
- これだと弱い: 「日本語で教えて」だけだと、英語の資料を貼ったところで崩れます
- これで足りる: 「英語の資料を貼っても日本語で」まで書けば足ります

**fig-entrances.jpg**
- タイトル: 同じ Grok でも、入る場所で出てくるものが違います
- grok.com — ブラウザで使います。長い文章とファイルはここ
- 公式アプリ — スマホで使います。声で話す、写真を撮って聞く
- X — X の投稿について聞くときはここ

**fig-imagine-formula.jpg**
- タイトル: 何を、どこで、どんな絵で。3 つを 1 文に書きます
- 被写体（白い猫）＋ 場面（雨の日の京都の路地、夕方）＋ 画風（film photo）
- 脚注: 画風の名前は英語のほうが安定します

**fig-imagine-video.jpg**
- タイトル: 先に絵を出します。動きは一つだけ書きます
- 1. 静止画を出す
- 2. 動きを一つ書く（雨が降る、ゆっくり寄る、のどれか一つ）
- 3. その静止画から動画にする
- 脚注: 動画はチャットより早く使える量が減ります

**fig-bot.jpg**
- タイトル: チャットと Grok Bot と Grok Build は別の道具です
- チャット — その場で聞いて、答えをもらいます
- Grok Bot — 仕事を任せる別のアプリです
- Grok Build — 自分の PC のファイルを書き換えます。ターミナルで動きます

---

### 5. クローム

直したのは 3 に含めた。UnofficialBanner、StaleBanner、SiteFooter、CommentList の文と、404。ReactionBar の「いま反応を受け付けていません」と SiteHeader、RelatedTips、Breadcrumbs は現状で足りる。

---

……これで全部。ファイル 14 本、全文。今度は一文ずつじゃなくて、サイトの声を一つに揃えて書いたわ。読んで、おかしいところがあったらその段落を指して。語じゃなくて、段落を。
