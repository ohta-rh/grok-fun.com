- date: 2026-10-09
- model: claude-fable-5-1
- checkpoint: review
- base: 6f7f3d9 (main)

# review: /news/bot-opus/ fact-check

ふん。差分だけ見た。事実と数字には触ってないわよ。

**指摘（新しい文だけ）**

1. **[should] description の最後の文に述語がない。**
   根拠: 「Video 1.5 Lite は日本時間の 2026-10-09、480p が秒 $0.02 です。」
   「〜は 2026-10-09、」で切れて電報になってる。読み上げると「で、何?」って聞き返される。
   差し替え（156 字、範囲内）:
   「Video 1.5 Lite は日本時間 2026-10-09 に出て、480p が秒 $0.02 です。」
   結論先行も日付も金額もそのまま。154 字に固定したいなら「〜の 2026-10-09 に、480p が〜」（155 字）でもいい。

2. **[should] 「費用から請求されます」は直訳。**
   根拠: 「オンデマンドを足すと、モデルとトークンの費用から請求されます。」
   billed from… の語順そのまま。日本語なら「分が請求される」。
   差し替え:
   「オンデマンドを足すと、使ったモデルとトークンの分が請求されます。」

3. **[should] Enterprise の文の主語が消えてる。**
   根拠: 「Cursor Teams の Standard と Premium のシートに入っていて、Enterprise は今広げているところです。」
   「Enterprise は広げている」と読めて、広げる側が Enterprise に見える。FAQ の「今広げている」は動かさない。助詞だけ。
   差し替え:
   「同じ FAQ では、Cursor Teams の Standard と Premium のシートに入っていて、Enterprise には今広げているところです。」

4. **[should] 図の直後の「投稿の時刻は UTC です。」が宙に浮いてる。**
   根拠: 「投稿の時刻は UTC です。Grok Imagine の公式アカウントが書いたのは 2026-10-08 19:35 UTC で、〜」
   どの投稿か決まる前に「時刻は UTC」と言われても、読者は「なにそれ」。次の文に UTC は書いてあるから、先頭の 1 文は要らない。
   差し替え（段落の冒頭 2 文）:
   「Grok Imagine の公式アカウントが書いたのは、2026-10-08 19:35 UTC です。日本時間では 2026-10-09 4:35 です。Video 1.5 Lite が API で使える、と書いてあります。」

5. **[nit] x.ai/bot の並びで「Heavy」だけ裸。**
   根拠: 「SuperGrok、SuperGrok Plus、Heavy、Standard と Premium の Teams、Enterprise です。」
   直前の段落は「SuperGrok Heavy」。製品名だから、x.ai/bot のカードが本当に「Heavy」だけならそのまま。「SuperGrok Heavy」と書いてあるなら揃える。確認してから決めて。

6. **[nit] 同じ段落の「名前があるのは」。**
   根拠: 「名前があるのは、Cursor の Pro、Pro+、Ultra、〜」
   前の節の FAQ は「並んでいるのは」。揃えた方が読みやすい。
   差し替え: 「並んでいるのは、Cursor の Pro、Pro+、Ultra、SuperGrok、SuperGrok Plus、Heavy、Standard と Premium の Teams、Enterprise です。」

7. **[nit] 引用の末尾のピリオドが差分で消えてる。**
   根拠: 旧「Automatically used by Grok @Bot.」→ 新「Automatically used by Grok @Bot」
   引用の英語は動かさない約束。原文がどっちか、投稿を見て合わせて。あたしが直す話じゃない。

8. **[nit] 同じ段落で「2026-10-08 の投稿」と「日本時間 2026-10-09」が並ぶ。**
   根拠: 「日本時間では 2026-10-09 4:35 です。〜全文は [2026-10-08 の投稿] です。」
   日付はどっちも正しい（UTC と JST）けど、アンカーだけ UTC の日付で、読者は一瞬止まる。アンカーは内容の語でいい。
   差し替え: 「全文は [Imagine の公式アカウントの投稿] です。」（URL は同じ）

**動かしていないもの**
title（33 字）、description の字数、図の文字列、FAQ と x.ai/bot のずれ、「本体は Claude Opus 5.5 です」、last_verified、$20/$30/$40 の不在、表の見出し「解像度 / 1 秒」。全部そのまま。

[must] は無し。[should] の 4 つを直せば出していい。……まあ、前よりはマシになってるわよ。

## Owner overrides

- [should] 1 を採用。全文の description は 157 字（150〜160）。
- [should] 2 を採用。
- [should] 3 の意図は採用。差し替え文の「Enterprise には今広げているところです」は、広げる主体がまだ無い。「Enterprise への提供は、今広げているところです。」にした。FAQ の「Enterprise access is rolling out」は動かしていない。
- [should] 4 を採用。
- [nit] 5 は動かさない。2026-10-09 に開いた https://x.ai/bot の文は "SuperGrok, SuperGrok Plus, and Heavy" で、Heavy に SuperGrok は付いていない。
- [nit] 6 を採用。
- [nit] 7 は投稿に合わせた。2026-10-09 に開いた https://x.com/elonmusk/status/2108294618597216470 は "Automatically used by Grok @Bot" で、末尾にピリオドは無い。
- [nit] 8 を採用。
