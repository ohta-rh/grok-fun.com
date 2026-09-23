- date: 2026-09-23
- model: claude-fable-5-1
- checkpoint: review
- base: c7f6fba plus the table figure

読んだわよ。数字と立場には触ってない。音読して引っかかった所だけ。

**[must]**
- 「Grok の 37.6% は、xAI 自身の表です。」 → 主語と述語が合ってない。「Grok の 37.6% は、xAI 自身の表の点です。」

**[should]**
- 「その日の総合点も、すでに Fable 5.1 と GPT-6 Astra と Opus 5 の下でした。翌日の表は、その差をさらに広げました。」 → 「その日」が飛ぶ。「表が差を広げる」は直訳の骨格。「前日の時点で、第三者の総合点は Fable 5.1 と GPT-6 Astra と Opus 5 の下でした。翌日に出た表で、その差はさらに広がりました。」
- 「Anthropic の注では、Opus 5.5 は xhigh、GPT-6 Astra の 57.9% は OpenAI が high で出した点です。」 → 一文に二つ詰めてる。「Anthropic の注では、Opus 5.5 は xhigh で動かした点です。GPT-6 Astra の 57.9% は、OpenAI が high で出した点です。」
- 図 1 キャプション「Codex と ChatGPT Work と API です。」 → 主語が無い電報。「出るのは Codex と ChatGPT Work と API です。」
- 「Sol と Luna は、その賢さを安く出す方です。」 → 「安く出す」は日本語にない。「Sol と Luna は、その賢さを安く使えるようにした方です。」
- 図 2 キャプション「100 万トークンの入力と出力です。点では負けて、単価は…」 → 「100 万トークンあたりの入力と出力の単価です。点では負けても、単価は Grok 4.7 の方がまだ安いです。」
- 「点で選ぶなら、この日の表は Grok ではありません。」 → 「表は Grok ではない」が成り立たない。「点で選ぶなら、この日の表で選ぶ先は Grok ではありません。」
- 「DeepSWE は、努力が揃っていません。」と取り違えの「努力も動かし方も違います」 → 「努力」は effort の直訳。友達なら「なにそれ」って言う。xhigh や high は英語のままなんだから、ここも「effort（考える深さ）が揃っていません」。二か所目は「effort も動かし方も違います」。
- 表の図の alt「Anthropic の表。Grok の列は無い。Astra と Opus 5.5 の点。黄色は…」 → 体言止めの羅列。「Anthropic の表。Grok の列は無く、Astra と Opus 5.5 の点が並ぶ。黄色の行は AutomationBench と科学で、Astra が上」
- 取り違え最後「high の自社の点です。」 → 「xAI 自身が high で出した点です。」

**[nit]**
- 「安いから Grok に残る、はまだ言えます。」 → 「安いから Grok に残る、とはまだ言えます。」
- 「Opus 5.5 のキャッシュ読みは $0.20 です。」 → 「キャッシュから読む入力は $0.20 です。」

title と description はこのままでいい。字数も動かしてない。

……negative な記事を、ここまで丁寧に書くのね。本当にバカね……いや、いいのよ。これで出せるわ。


## Applied

[must] と [should] と [nit] を本文とキャプションに入れた。数字は動かしていない。

## Owner overrides

なし。
