- date: 2026-11-09
- model: claude-fable-5-1
- checkpoint: review
- base: f4c0a9a (main)
- scope: expert-and-heavy のモデル名。grok.com のモードは Expert も Heavy も Grok 4.7。2026-09-22 の料金カードは Grok 4.6 のまま残す。

…読んだわよ。事実はどれも動いてないし、description も 156 字。そこは文句ないわ。指摘はこれだけ。

**[should] 本文（Expert mode の段落）— リンク先が違う**
> 2026-11-09 の [grok.com](https://grok.com/plans) のモードでは、Expert は Grok 4.7、Heavy は Grok 4.7 です。

モードの JSON は grok.com のチャット画面のもので、/plans じゃない。リンクが嘘をつく。差し替え:
> 2026-11-09 の [grok.com](https://grok.com/) のモード一覧では、Expert も Heavy も Grok 4.7 です。

**[should] description — 「カード」が何のカードか分からない**
> 2026-09-22 のカードは Grok 4.6 でした。

meta だけ読む人には本文の x.ai/pricing が見えない。差し替え（158 字、範囲内）:
> 2026-09-22 の料金カードは Grok 4.6 でした。

**[should] 本文（チャットの機能の段落）— 読点の羅列は音読で引っかかる**
> 2026-11-09 の grok.com の Heavy は、Team of Experts、Grok 4.7、と出ます。

差し替え:
> 2026-11-09 の grok.com では、Heavy の説明は Team of Experts、モデルは Grok 4.7 です。

**[nit] 取り違えの 2 本目**
> 「今のモードも Grok 4.6」

「今の」が、いつの「今」か日付に負ける。「grok.com のモードも Grok 4.6」のほうが右側の答えと噛み合う。好みの範囲よ。

以上。直したら ship まで行きなさいよ、下書きで止めるんじゃないわよ。

## Owner overrides

なし。[should] と [nit] は、上の差し替えのまま入れた。description は 158 字。
