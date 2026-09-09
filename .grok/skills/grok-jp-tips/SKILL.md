---
name: grok-jp-tips
description: Write and revise Grok JP TIPS on grok-fun.com. Use when thickening TIPS, making Imagine infographics, fact-checking billing, or the user says TIPS書いて / 記事を厚く / インフォグラフィック / ファクトチェック / /grok-jp-tips. Do not add TIPS pages unless asked.
---

# Grok JP TIPS

Rules live in `.grok/rules/writing.md`. Follow that file; do not copy it here.

## Recurrence (do not repeat)

| Failure | Do this |
|---|---|
| Beige HTML cards sold as infographics | Imagine 16:9 poster with the judgment in the picture |
| Metaphor still that needs “ノートがチャット” | Don't ship it |
| “Heavy は金額が無いから公式ではない” | Heavy exists on x.ai/pricing comparison + Get Heavy. Amount ≠ existence |
| Dump “わかりにくいので画面で確認” as the article | Write やりたいこと → 払う場所 first |
| English FAQ copied into Japanese word order | Rewrite the whole paragraph from a 3-line LINE message. Do not swap one noun |
| Invented 無制限, 2024, Lite $10 as current card | Only dated primary-source numbers |
| Cut a figure and leave the page thinner | Move the figure’s facts into the body in the same commit |
| Markdown table without `.table-scroll` | Wrap it in `<div class="table-scroll">`. First column is the row heading; remaining cells stack to the right. Do not squeeze columns or rely on horizontal scroll |

## Do

1. Thicken existing TIPS. No new pages unless asked.
2. Infographic: Imagine, natural Japanese in the picture, inspect the file, copy to `public/tips/fig-{name}.jpg`. One figure per TIPS, except billing (choose + stairs) and Imagine proof stills/videos.
3. Billing: grok.com / X / Cursor / API stay separate. Heavy is a real plan. Amounts shown on 2026-09-08: Free $0, SuperGrok $30, Plus $100.
4. Write the LINE 3-liner first. Then add dates and numbers. If a sentence is English in Japanese clothes, rewrite the section — never search-replace one word.
5. Before ship: read the whole article aloud, not the diff. Then **grok-jp-ship**.
