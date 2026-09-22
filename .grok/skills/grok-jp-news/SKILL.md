---
name: grok-jp-news
description: Write or revise one grok-fun.com news memo. Use when the user says ニュース書いて, /news, 発表メモ, 当日メモ, ベンチマーク記事, or a model ships and the page should be /news/{slug}/. Open grok-jp-infographic before any body figure. Japanese is not done until Fable reviews it.
---

# Grok JP news

One memo per release. Do not split it into ten pages. Do not start a news firehose.

Japanese rules live in `.grok/rules/writing.md`. Do not copy that file here. Figures: open **grok-jp-infographic** first. Ship: **grok-jp-ship**, and only after the Fable step in writing.md 「公開前に Fable」.

## Shape

- URL is `/news/{slug}/`. The slug is the name (`grok-4-7`), not `/news/2026/grok-4-7/`. The date lives in `published`, `last_verified`, and the sitemap. The memo is updated in place.
- `/news/` is the list. One article is enough. Do not invent empty hubs.
- The header already links ニュース. That is the home link. Do not add a second one, and do not paste every memo onto the home. One latest title is enough when a list is wanted. The archive stays at `/news/`.
- Title is the judgment left after reading, ≤60 characters. Description is 150–160 characters, conclusion first. No HTML in the description.
- Body order: what changed → where a Japanese user meets it and what they pay → the vendor’s own numbers → third parties, named and dated → what was said beforehand → what to do → 取り違え. Short quote plus the original link. Do not translate the announcement.
- Link TIPS by what they decide, in the sentence and again at the end.

## Recurrence (do not repeat)

| Failure | Do this |
|---|---|
| 「請求は伸びる」「請求が縮む」 | Money does not 伸びる. 単価は同じでも、払う額は増える. 1件で払う額は、書いた量で増える. 伸びる is for a score, a rank, or a length of text |
| Vendor table and a third party blended into one number | Say who measured, the date, and the effort. Terminal-Bench 4.0 and 2.1 are different tests. A score the night of launch and the score after an SDK fix are both real. Write both |
| A pre-launch post treated as the shipped spec | 2.1兆は投稿の数字. The spec is what docs listed that day: context, input, output |
| An X embed iframe for a benchmark chart | The iframe is a narrow column and does not match the article. Save the chart, show it at the article width (`article-hero`, not a 550px frame), and write only the source under it: 引用元は [誰のいつ の投稿](url) です。 Do not add Twitter’s script |
| A 5-column markdown table | This site stacks every column after the first. A comparison becomes unreadable. Two columns of one sentence, or a table image in the site’s type. Not a beige card, not a copied chart |
| One infographic at the top, then a wall of paragraphs | A long memo needs a judgment figure at the section where the decision happens (入口, 払う額, 順位の前後). Open grok-jp-infographic. If a phrase on the figure is wrong, regenerate the file. Do not leave the bad sentence in the JPG |
| Yellow `<mark>` on a whole sentence or a number | `<mark>` is only the name Grok 4.7, once, at the first mention. A marked phrase that wraps becomes two bars. Other emphasis is `<strong>`. Inline `code` keeps the site’s pale marker wash; do not also wrap it in `<mark>` |
| Fable told “the figure is not at the top” | The ranking figure is injected above the markdown. Say 記事のいちばん上の図. Tell Fable that when the brief is frozen |

## Third parties and X

Name the measurer in the sentence. Artificial Analysis and Vals are not xAI’s table.

A benchmark chart from a post is an image in the article, full column width, with the source under it:

`引用元は [Artificial Analysis の 2026-09-21 の投稿](url) です。`

Do not iframe the post. Do not load Twitter’s script. Do not redraw their bars as if they were ours. Our own figure is separate: it states our judgment in our words (総合は 46 で下、単価はここで選ぶ).

## Table image, when a matrix must be ours

Only for numbers we are typesetting ourselves, such as the API price grid. Paper `#F3F4F0`, ink `#1C2230`, horizontal rules only, BIZ UDPGothic for Japanese, Menlo for figures. Highlight one column or one row with the marker wash. Render at 1280 wide so it is 15px type at 40rem. On a phone the figure is `40rem` inside `.table-shot` and scrolls. Do not shrink a five-column grid until the type is illegible.

## Do

1. Write the LINE 3-liner first. Then dates and numbers.
2. Open **grok-jp-infographic** before any body figure.
3. Freeze the article into the Fable brief. Apply [must] and [should]. Record `docs/grok-fun/fable-*.md`.
4. Then **grok-jp-ship**.
