- date: 2026-11-09
- model: claude-fable-5-1
- checkpoint: review
- base: f4c0a9a (main)
- scope: claude-duet, bot-opus, bot-uses-claude-code の陳腐化直し。expert-and-heavy は別レビュー。

ふう……見たわよ。事実は全部一次情報と合ってる。直すのは言い回しだけ。数は少ないから、さっさと片付けなさい。

## review — 陳腐化の直しの日本語（2026-11-09）

### /news/claude-duet/

- **[should]** 「戻す場所は、ウェブか Claude Desktop の Settings、Usage です。」
  画面の部品名を読点で並べた電報。どこを開くのか、音読で分からない。
  → 「戻すのは、ウェブか Claude Desktop の Settings にある Usage からです。」

- **[nit]** 「試験のあいだ、5 時間の分と週の分を最初の状態に戻す回数が付きます。」
  "you get N limit resets" の語順。「回数が付く」は日本語では特典の言い方で、ここでは重い。
  → 「試験のあいだは、5 時間の分と週の分を一度に戻せる回数が決まっています。」

- **[nit]** 「朝の確認は分に入り、資金計画の表やスライドのような大きな仕事は、使う分が大きくなります。」
  「分に入り」だけ主語の受けが無い。
  → 「朝の確認も使う分に数えます。資金計画の表やスライドのような大きな仕事は、使う分がさらに増えます。」

### /news/bot-opus/

- **[should]** 「<strong>2026-11-09 の FAQ では、仕事ごとにモデルを選びます。名前は出ません。</strong>」
  選ぶ主語が無い。音読すると FAQ が選んでいるように聞こえる。本文の先頭なので title に頼らない。
  → 「<strong>2026-11-09 の FAQ では、Grok Bot が仕事ごとにモデルを選びます。名前は出ません。</strong>」

- **[should]** 「2026-10-07 の投稿に、全員へ届く日はありません。」
  "the post has no rollout date" を「A に B はありません」に載せた形。
  → 「2026-10-07 の投稿を読んでも、全員に届く日は分かりません。」

- **[nit]** 図のキャプション「仕事ごとに選ぶ。名前は出ません。2026-11-09 の FAQ です。Midjourney と Suno は、名前を挙げたところまでです。」
  先頭が主語の無い電報。図の判断（仕事ごとに選ぶ・名前は出ない・FAQ の日付・Midjourney と Suno は名前まで）は動かさない。
  → 「Grok Bot は仕事ごとにモデルを選び、名前は出しません。2026-11-09 の FAQ です。Midjourney と Suno は、名前が挙がったところまでです。」

### /tips/bot-uses-claude-code/

- **[should]** 「Claude Code を動かす分は、Anthropic です。」
  主語「分」と述語「Anthropic です」が噛み合わない。一次情報は「払う先は Anthropic のまま」。
  → 「Claude Code を動かす分は、Anthropic に払います。」

### 指摘なしの箇所
description 3 本、取り違えの全項目、claude-duet のキャプション、2026-10-07 の引用と「2026-10-17 の設定は Cursor が選ぶ、と書いていました」の歴史の文。日付はすべて見たものに付いていて、「開く」で運ぶ文は無い。

……これだけよ。[should] 4 つ直したら、`.grok/skills/grok-jp-ship` の通りに build して deploy して push まで。下書きで止めないでよね。

## Owner overrides

なし。[should] と [nit] は、上の差し替え文のまま入れた。
