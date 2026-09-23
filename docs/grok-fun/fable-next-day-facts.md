- date: 2026-09-23
- model: claude-fable-5-1
- checkpoint: review
- base: 0419d9c (main)

一次情報、Anthropic と xAI は開いた。OpenAI は Cloudflare の検証ページで止まって、curl でも headless Chrome でも中身が取れなかった。だからそこは未確認。

## 判定表

| 主張 | 判定 |
|---|---|
| 日付: Grok 4.7 が 9/21、Opus 5.5 が 9/22 | 合う |
| Terminal-Bench 4.0: Grok 4.7 が xAI の表で 38.0% | **違う** |
| Terminal-Bench 4.0: Opus 5.5 が 66.4%、注で xhigh、Astra 57.9% は OpenAI が high | 合う |
| Opus 5.5 は Claude 5.5 の最初のモデル、Fable 5.1 と同じくらい、Opus 5 より 40% 安い、出力 30% 以上速い | 合う |
| 単価: Opus 5.5 $4/$20、キャッシュ読み $0.20、速いモード $8/$40 | 合う |
| 単価: Grok 4.7 $2/$6 | 合う |
| CursorBench 4.0: Opus 5.5 57.8%、Fable 5.1 51.8%、Opus 5 46.6%、GPT-5.6 Sol 41.7%、Astra 空欄 | 合う |
| CursorBench 4.0: Grok 4.7 46.3%（xAI） | 合う |
| DeepSWE: Grok 4.7 71.0%（high、xAI） | 合う |
| Anthropic の表の Astra 5 点と Opus 5.5 5 点、Astra が上なのは AutomationBench と科学だけ | 合う |
| 安全装置: サイバーは Opus 4.8、生物とフロンティア開発は Opus 5、その分点は下がりやすい | 合う |
| Sol と Luna の入口、対象プラン、Free と Go はデスクトップで Luna、Chat にはまだ無い、API 名、Astra はいちばん賢いまま | 未確認（OpenAI 403） |
| Sol $2/$10、Luna $0.10/$0.50、GPT-5.6 プロモ価格から 50% | 未確認（OpenAI 403） |
| DeepSWE: Sol 68.8%（max）、Fable 5 69.9%（xhigh） | 未確認（OpenAI 403） |
| 9/21 の AA 総合点（53/53/51/46） | 対象外。記事自身が source に入れてないと書いてる通り、今回の三つには無い |

## 違うもの

**[must] Grok 4.7 の Terminal-Bench 4.0 は 38.0% ではなく 37.6%。** xAI の表は「Terminal-Bench 4.0 | Grok 4.7 37.6% | Grok 4.6 20.3% | GPT-5.6 Sol 37.3% | Fable 5.1 57.9%」。ページ内の "38.0" は SVG の座標にしか出てこない。負けの立場は変わらない。むしろ差が広がるだけよ。

差し替え箇所は `src/content/news/opus-5-5-gpt-6.md` の 4 か所。

- 3行目 description: 「前日の Grok 4.7 が 38.0% で」→「前日の Grok 4.7 が 37.6% で」
- 16行目: `<span class="num">38.0%</span>` → `<span class="num">37.6%</span>`、同じ段落の「Grok の 38.0% は、xAI 自身の表です」→「Grok の 37.6% は、xAI 自身の表です」
- 48行目: 「Grok の 38.0% より上です」→「Grok の 37.6% より上です」
- 58行目: 見出し引用の「38% 対 66%」は丸めなら残していい。説明側の「38.0% は xAI の 9 月 21 日の表です」→「37.6% は xAI の 9 月 21 日の表です」

## それ以外

[should] は無し。Anthropic と xAI に関する条件書き（xhigh / high、safeguards の注、GPT-5.6 Sol が Anthropic 表の列名）は全部一次情報と一致してる。

OpenAI 由来の 3 行は、あたしの手じゃ開かなかっただけで、違うとは言ってない。ブラウザで人が開いて突き合わせるのが残り。

……前日のニュースで 0.4 ポイント盛ってたなんて。本当にバカね……。負けるなら、正確に負けなさいよ。


## Applied

[must] Terminal-Bench 4.0 の Grok 4.7 を 38.0% から 37.6% に直した。図も同じ。前日のメモの同じ数字も直した。x.ai/news/grok-4-7 の表で確認した。

## Owner overrides

OpenAI のページは Fable の環境では 403 だった。こちらでは 2026-09-23 に https://openai.com/index/introducing-gpt-6-sol-and-luna/ を開いて、Sol $2/$10、Luna $0.10/$0.50、Chat にはまだ無い、Codex と ChatGPT Work と API、DeepSWE の Sol 68.8%（max）と Fable 5 の 69.9%（xhigh）は、記事と合っていた。その 3 行は残す。
