---
title: Grok の課金は 4 系統（grok.com・X・Cursor・API）で別々
description: grok.com の SuperGrok、X の Premium、Cursor の Grok Bot、console.x.ai の API は別契約。週間枠、追加クレジット、解約場所、円価格を公式に沿って整理。
order: 3
product: chat
last_verified: "2026-09-08"
source_url:
  - https://x.ai/pricing
  - https://docs.x.ai/grok/faq
  - https://x.ai/news/grok-bot-more-plans
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
image_alt: 机の上に封蝋の違う紙が 4 枚並んでいる。文字も数字も無い
image_caption: 契約する場所は grok.com、X、Cursor、API の 4 つ。
---

## 課金は 4 系統ある

「Grok の有料プラン」は 1 つではありません。契約する場所が 4 つあり、それぞれ請求元も、上限の数え方も違います。

| 系統 | 契約する場所 | 何に対して払うか | 請求元 |
|---|---|---|---|
| **SuperGrok 系** | grok.com / 公式アプリ | 週ごとの利用枠。Chat・Imagine・Voice・Build で共有 | xAI（Web）か Apple / Google（ストア） |
| **X Premium / Premium+** | X | X の中の Grok。Premium+ は Grok Build（ターミナル）も公式発表に含まれる | X |
| **Cursor** | cursor.com | エディタの利用に加えて、プランによっては Grok Bot | Cursor |
| **API** | console.x.ai | 使ったトークン量。前払いのクレジットから減る | xAI |

ここで押さえるのは 3 点です。

- **X Premium に入っても、grok.com の SuperGrok は付いてきません。** 別の契約です。どの入口で使うかで決めます（<a href="/tips/three-entrances/">入口は grok.com / 公式アプリ / X</a>）。
- **Cursor のプランに Grok Bot が付いていても、grok.com の週間枠は上がりません。** Imagine や Voice の上限は別です。
- **SuperGrok の週間の利用枠は、API のクレジットではありません。** SuperGrok に入っても API は使えませんし、API のクレジットを買っても grok.com の上限は上がりません。API のクレジットは返金されません。

チャットと Bot と Build の役割の違いは <a href="/tips/bot-build-chat-map/">チャット、Bot、Build は別物</a> に分けています。このページは「どこで払うか」だけです。

## x.ai/pricing に載っている個人向けプラン

<a href="https://x.ai/pricing" rel="external">x.ai/pricing</a> を 2026-09-08 に取得した時点で、個人向けのカードに金額が書かれているのは 3 つです。

| プラン | 月額（USD） | 主な内容 |
|---|---|---|
| **Free** | $0 | ゆるやかな上限。Web と X のリアルタイム検索、Voice、Connectors |
| **SuperGrok** | $30 | Grok 4.6、Grok Bot、Connectors、上限の引き上げ、Expert、画像と動画の生成 |
| **SuperGrok Plus** | $100 | SuperGrok の全部に加えて 1080p 動画、Chat / Imagine / Voice / Build の上限を大幅に引き上げ、返答の高速化、混雑時の優先、新機能の先行利用 |

同じページの比較表には **SuperGrok Lite、SuperGrok Heavy、Business、Enterprise** の列もあります。ただし取得時点では、これらのカードに金額は表示されていませんでした。Lite が $10、Heavy が $300 といった数字を載せている外部サイトがありますが、それは公式の表示ではありません。**比較表に名前はある。金額は契約画面で確認。** これがこのページの立場です。

金額は USD で、予告なく変わります。契約前に必ず公式ページと、使っている入口の料金画面を見てください。

## X の Premium と grok.com は同期しない

X 側の Grok は、X のプランに従います。grok.com 側は SuperGrok の契約に従います。片方が有料でも、もう片方は無料のまま、ということが普通に起きます。会話の履歴も入口をまたいで見えるとは限りません。

ターミナルの **Grok Build** は、2026-05-25 の公式発表では SuperGrok と **X Premium+** の加入者が使えるとあります。通常の X Premium では足りません。画面の中でサイトを作る Build Mode とも別物です。

## Cursor は 4 本目の入口（Grok Bot）

<a href="https://x.ai/news/grok-bot-more-plans" rel="external">2026-08-26 の公式発表</a>では、Grok Bot は次のプランに含まれるとされています。

- SuperGrok / SuperGrok Plus / SuperGrok Heavy
- Cursor Pro / Pro+ / Ultra
- Cursor Teams（Standard と Premium）

**Bot の利用量は Grok や Cursor のプランの利用量とは別に数える**、と公式に書いてあります。

<a href="https://cursor.com/pricing" rel="external">cursor.com/pricing</a> を 2026-09-08 に取得した時点で、個人向け（Individual）のカードは月 $20（Pro）で、**Grok Bot access** と明記されています。同じカードに Pro+ と Ultra のタブもあります。金額はタブで変わるので、契約画面で確認してください。Hobby（無料）には Grok Bot と書かれていません。

Grok Bot だけが目的で、すでに Cursor を使っているなら、Cursor の個人向け Pro（取得時点 $20）の方が SuperGrok（$30）より安い、という比較になります。ただし grok.com の週間枠（Chat / Imagine / Voice）も、API クレジットも付きません。

公式の書き方が揃っていません。2026-08-26 のニュースは SuperGrok と Cursor Pro を含む一方、取得時点の <a href="https://docs.x.ai/grok-bot/get-started" rel="external">導入ページ</a> は SuperGrok Plus / Heavy と Cursor Pro+ 以上だけを挙げています。**自分のプランで Bot が使えるかは、プラン画面で確認**してください。

## 週間の利用枠の仕組み

2026 年 6 月から、grok.com とアプリの上限は「製品ごとの 1 日の回数」ではなく、**1 週間ぶんの利用枠を Chat・Imagine・Voice・Build で共有する**方式になりました（<a href="https://docs.x.ai/grok/faq" rel="external">docs.x.ai の FAQ</a>）。

- 製品ごとに消費する計算資源が違います。動画生成や長いコーディング作業は、チャットより枠を多く使います。Imagine の枚数が急に減ったと感じたら、同じ週にチャットや Voice を使っていないかを見ます（<a href="/tips/imagine-quickstart/">Imagine の手順と上限</a>）。
- 残りは **設定 → Usage** で確認できます。使った割合、製品ごとの内訳（FAQ 上は API / Build / Chat / Imagine / Voice）、次のリセット時刻、追加クレジットの残高が出ます。
- 週の枠を使い切ると、有料の機能は次のリセットまで止まります。**無料枠の Chat と Voice は、それとは別のスケジュールで引き続き使えます。** 追加クレジットを買う、上のプランに変える、Auto Top Up を付ける、の 3 つが公式の抜け道です。

「昨日は画像を何枚出せたのに今日は出ない」と感じるのは、画像の上限が変わったのではなく、週の枠を別の作業で使ったからです。まず Usage の内訳を見ます。

<figure class="infofig" aria-label="週間の共有枠">
  <figcaption class="infofig-title">週の枠は 1 本。どれを使っても同じから減る</figcaption>
  <div class="infofig-pool">
    <div class="infofig-pool-track" aria-hidden="true">
      <span>Chat</span><span>Imagine</span><span>Voice</span><span>Build</span>
    </div>
    <p>動画と長いコーディングは、チャットより多く使う。確認は 設定 → Usage（内訳と次のリセット）。</p>
  </div>
</figure>

## 追加クレジット（Extra Usage Credits）

週の枠を使い切ったあとに使う、前払いのクレジットです。FAQ に書かれている条件は次のとおりです。

- 今のところ **Web からのみ**購入できます。アプリのストア課金では買えません。
- **$5 から**買えます。
- プランに含まれる週の枠を使い切ったあとで消費されます。枠が残っているうちは減りません。
- 有効期限は **約 1 年**です。
- **含まれる枠より、1 回あたりの単価は高く**なります。
- **Auto Top Up**（自動チャージ）を有効にすると、残高が減ったときに指定額を自動で買い足します。1 か月の上限額も設定できます。

公式の FAQ は、**毎週のように上限に当たるなら、クレジットを買い続けるより上のプランに変えるほうが安い**と案内しています。追加クレジットは、たまに超える月の穴埋めに使うものと考えてください。

## API はまったく別の会計

開発者向けの <a href="https://console.x.ai" rel="external">console.x.ai</a> は、使ったトークン量に対する従量課金です。<a href="https://docs.x.ai/docs/models" rel="external">公式のモデル表</a>（2026-09-08）の grok-4.6 は、100 万トークンあたり次のとおりです。プロンプトが 20 万トークンに達したリクエストは、その回の全トークンが上の単価になります。

| 種類 | プロンプトが 20 万トークン以下 | 20 万トークン超 |
|---|---|---|
| 入力 | $2 | $4 |
| 入力（キャッシュ済み） | $0.50 | $1 |
| 出力 | $6 | $12 |

繰り返しますが、**SuperGrok の週の枠は API のクレジットではなく、API のクレジットは返金されません。** 「API に使えると思って SuperGrok に入った」は、よくある取り違えです。

FAQ には、**身に覚えのない高額の請求は、API ではなく SuperGrok Heavy の年払いであることが多い**とも書かれています。請求額に驚いたら、まず grok.com の請求画面でプランと支払い周期を見てください。

## 解約は契約した場所で

契約した場所でしか解約できません。

| 契約した場所 | 解約する場所 |
|---|---|
| grok.com（Web） | grok.com の請求（Billing）画面。広告ブロッカーでボタンが開かないことがある |
| iPhone / iPad のアプリ | Apple のサブスクリプション管理 |
| Android のアプリ | Google Play の定期購入。返金は FAQ 上 xAI の申請フォーム |
| X Premium | X の設定。返金も X に申請します |
| Cursor | Cursor の請求画面 |

「アプリで払ったのに Web で無料のまま」「Web で払ったのにアプリで反映されない」は、**Web とアプリで違うアカウントにサインインしている**ことがほとんどです。特に Apple の「メールを非公開」でサインインすると、見た目が別のアドレスになり、別アカウントになりがちです。両方のサインイン方法を揃えてから、公式に問い合わせてください。

<figure class="infofig" aria-label="解約する場所">
  <figcaption class="infofig-title">解約は、払った場所でしかできない</figcaption>
  <div class="infofig-pairs">
    <div>
      <div class="infofig-from"><p class="infofig-kicker">払った</p><p>grok.com（Web）</p></div>
      <span class="arr" aria-hidden="true">→</span>
      <div class="infofig-to"><p class="infofig-kicker">止める</p><p>grok.com の請求画面</p></div>
    </div>
    <div>
      <div class="infofig-from"><p class="infofig-kicker">払った</p><p>iPhone / Android アプリ</p></div>
      <span class="arr" aria-hidden="true">→</span>
      <div class="infofig-to"><p class="infofig-kicker">止める</p><p>Apple か Google の定期購入</p></div>
    </div>
    <div>
      <div class="infofig-from"><p class="infofig-kicker">払った</p><p>X / Cursor</p></div>
      <span class="arr" aria-hidden="true">→</span>
      <div class="infofig-to"><p class="infofig-kicker">止める</p><p>X の設定 / Cursor の請求</p></div>
    </div>
  </div>
</figure>

## ストアの円価格は USD 価格と一致しない

App Store や Google Play で契約すると、円で請求されます。この額は公式の USD 価格を為替換算した数字にはなりません。

- ストアの価格帯は、各ストアが決めた円の段階に丸められます。
- ストア手数料の分だけ、Web 決済より高く設定されることがあります。
- 同じプランでも、Web で契約した場合とストアで契約した場合で額が違います。

**PC で使うのが中心なら grok.com で契約、スマホ中心ならストア**、と先に決めてから金額を比べてください。追加クレジットは Web からしか買えないので、上限を超えがちな人は Web 契約のほうが融通が利きます。

## 決め方の順番

1. **無料で 1 週間使う。** 上限に当たった曜日と、当たったときに何をしていたか（長文、画像、動画、Voice）をメモします。
2. **Usage の内訳を見る。** どの製品が枠を食っているかで、必要なプランが違います。動画が主因なら Plus、チャットだけなら SuperGrok で足りることが多いです。
3. **入口を決める。** X の中で使うことが多ければ X Premium、grok.com やアプリが中心なら SuperGrok。Grok Bot だけが目的で Cursor を使うなら Cursor の個人プラン。
4. **上のプランは最後。** 毎週上限に当たるようになってから考えます。たまに超えるだけなら追加クレジットで足ります。

## よくある取り違え

- 「X Premium に入ったのに grok.com で無料のまま」: 契約が別なので正常です。
- 「Cursor Pro に入ったのに Imagine の上限が同じ」: Cursor は Grok Bot 側です。grok.com の週間枠は別です。
- 「SuperGrok に入ったのに API が使えない」: API は console.x.ai で別に払います。
- 「X Premium なのに Grok Build（ターミナル）が使えない」: 公式発表時点では Premium+ か SuperGrok が必要です。
- 「画像の上限が急に減った」: 週の共有枠を別の作業で使っています。Usage を見ます。
- 「円の価格が公式の USD と合わない」: 上記の理由で合いません。ストア価格が正です。
- 「身に覚えのない高額請求」: FAQ は API より SuperGrok Heavy の年払いが多いと書いています。grok.com の請求画面で確認します。
- 「Web で解約ボタンが開かない」: 広告ブロッカーを疑います。シークレットウィンドウで <a href="https://grok.com/?_s=billing" rel="external">grok.com の請求</a> を開きます。
