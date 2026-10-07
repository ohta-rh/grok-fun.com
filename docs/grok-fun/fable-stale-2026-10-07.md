- date: 2026-10-07
- model: claude-fable-5-1
- checkpoint: review
- base: 1ec4a4a (main)

# review — 2026-10-07 の陳腐化修正の日本語

差分、全部読んだわ。直した文だけ見る。

**grok-bot-cloud-computer**

- 「Bot はデスクトップアプリ…iPad は iPadOS 18 以降で、iPhone と同じアプリです。」 この文はそのまま。
- 「使用量は 1 週間ごとです。macOS と iOS（iPhone と iPad）は…同じ残りです。」 この文はそのまま。
- [should] 「2026-10-07 の導入ページは、個人の有料 Cursor の全部か…です。」 ページが主語で述語がプラン名。ページ＝プラン、と読める。
  → 「2026-10-07 の導入ページでは、対象は個人の有料 Cursor の全部か Cursor Teams、または Cursor のアカウントにつないだ個人の SuperGrok、Plus、Heavy です。」
  同じ形が free-vs-supergrok と bot-build-chat-map にもある。三つとも同じ直しで。
- [should] 「2026-09-17 に開いたときは、導入ページが Plus、Heavy と Cursor の Pro+ 以上だけ、と書いていて」 何が「だけ」なのか文の中に無い。
  → 「2026-09-17 に開いたときは、導入ページが対象を Plus、Heavy と、Cursor の Pro+ 以上だけ、と書いていて、同じ日の料金ページとは揃っていませんでした。」
- [should] 「スマホは iPhone（iOS 18 以降）、iPad（iPadOS 18 以降）、Android 9 以降です。」 iPad はスマホじゃない。音読で引っかかる。
  → 「アプリは iPhone（iOS 18 以降）、iPad（iPadOS 18 以降）、Android 9 以降で動きます。」
- [should] 「定期の仕事の時刻や指示を直すときと、試すとき、画面の操作を見せて覚えさせる手順は、デスクトップアプリです。」 「とき、とき、手順は…アプリです」で並びが揃ってないし、「試す」の目的語が無い。一次情報は定期の仕事を試す操作。
  → 「定期の仕事の時刻や指示を直すとき、定期の仕事を試しに動かすとき、画面の操作を見せて覚えさせるときは、デスクトップアプリを使います。」
- [nit] 表の行「つないだ個人の SuperGrok、Plus、Heavy」 何につないだか行だけでは分からない。本文で補っているので、このままでも通る。

**free-vs-supergrok**

- [should] 「cursor.com/pricing（2026-10-07）の個人向けは、月 $20 です。同じ場所で、Pro、Pro+、Ultra を切り替えられます。Grok Bot access と書いてあります。」 個人向け全部が $20 に読める。Hobby は無料、Pro+ と Ultra は別の額。三文目は主語が無い。$20 が Pro なのは同じ記事の次の段落と bot-build-chat-map に既にある。
  → 「cursor.com/pricing（2026-10-07）の個人向けは、まず Pro が月 $20 で出ています。同じカードで Pro+、Ultra に切り替えられます。そのカードに Grok Bot access と書いてあります。」 金額は $20 以外足さない。
- [should] 「2026-09-17 の料金ページの SuperGrok（$30）にも…」 直前が cursor.com/pricing なので、「料金ページ」が Cursor のに読める。
  → 「2026-09-17 の x.ai/pricing の SuperGrok（$30）にも Grok Bot access とあり、2026-10-07 に開いても同じです。」
- 「2026-09-17 の導入ページは Plus、Heavy と、Cursor の Pro+ 以上だけ、と書いていました。」 この文はそのまま。
- 「Pro+ と Ultra の金額は、切り替えると出ます。」「無料の Hobby には Grok Bot の記載がありません。」 この文はそのまま。

**bot-build-chat-map**

- [should] 段落の頭。前は「対象のプランは、公式の中で書き方が揃っていません。」が立っていたのを消したので、いきなり「2026-08-26 のニュースは」で始まる。何の話か一行欲しい。
  → 先頭に「Grok Bot が付くプランは、公式の書き方が日付で変わっています。」 これは後ろの文から読める事実の要約で、新しい事実は無い。
- 「2026-08-26 のニュースは SuperGrok と Cursor Pro を含めています。」「Cursor の個人向け Pro は月 $20 で Grok Bot access とあります。」 この文はそのまま。
- 導入ページの 2 文は上と同じ直し。

[must] は無し。金額、日付、iPad、導入ページの対象、FAQ と Cursor の 2 文、どれも動かしてない。……まあ、文の形で三箇所同じ癖が出てるだけ。直すのは機械作業よ。

## Owner overrides

[nit] 表の行「つないだ個人の SuperGrok、Plus、Heavy」は、セルを伸ばさなかった。直前の本文が「Cursor のアカウントにつないだ」と書いてあり、Fable も「このままでも通る」としている。スマホではこのセルがラベルになる。
