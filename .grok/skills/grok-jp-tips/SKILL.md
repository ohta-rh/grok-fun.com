---
name: grok-jp-tips
description: Write and revise Grok JP TIPS on grok-fun.com. Use when thickening TIPS, fact-checking billing, or the user says TIPS書いて / 記事を厚く / ファクトチェック / /grok-jp-tips. Any body figure requires opening grok-jp-infographic first — not optional. Do not add TIPS pages unless asked.
---

# Grok JP TIPS

Rules live in `.grok/rules/writing.md`. Follow that file; do not copy it here.

## Recurrence (do not repeat)

| Failure | Do this |
|---|---|
| Beige HTML cards, or a figure shipped without opening grok-jp-infographic | Open **grok-jp-infographic** first. Required. Imagine with the billing JPGs as tone refs |
| Garbled Japanese in a figure | Discard. Regenerate. Never crop around the garbage |
| 出荷伝票 / 工場 / 経営 as the lesson | Plain 音読 judgment. Bot は号令と検品、Build は制作 |
| Metaphor still that needs “ノートがチャット” | Don't ship it |
| “Heavy は金額が無いから公式ではない” | Heavy exists on x.ai/pricing comparison + Get Heavy. Amount ≠ existence |
| Dump “わかりにくいので画面で確認” as the article | Write やりたいこと → 払う場所 first |
| English FAQ copied into Japanese word order | Rewrite the whole paragraph from a 3-line LINE message. Do not swap one noun |
| 直訳の骨格が残る（A は B を持つ / A を B と数えない / 公式が推奨しているとは書いていない / X する側は Y だけ） | Throw the section away. LINE 3-liner, then dates. Noun-swap is the same defect |
| Invented 無制限, 2024, Lite $10 as current card | Only dated primary-source numbers |
| Cut a figure and leave the page thinner | Move the figure’s facts into the body in the same commit |
| Markdown table without `.table-scroll` | Wrap it in `<div class="table-scroll">`. First column is the row heading; remaining cells stack to the right. Do not squeeze columns or rely on horizontal scroll |
| 取り違えが事実ダンプ、困ることの再掲、禁止の命令文 | Quoted mix-up then the judgment. Canonical: `free-vs-supergrok` and `imagine-video` |

## Do

1. Thicken existing TIPS. No new pages unless asked.
2. **Before any figure:** open **grok-jp-infographic** and follow it. Required. Do not generate, raster, or replace a body figure with that file closed.
3. Billing: grok.com / X / Cursor / API stay separate. Heavy is a real plan. Amounts shown on 2026-09-12: Free $0, SuperGrok $30, Plus $100. Cursor Pro $20, Pro+ $60, Ultra $200. Screen Build is on every plan as of 2026-08-19; terminal grok is not the same thing.
4. Write the LINE 3-liner first. Then add dates and numbers. If a sentence is English in Japanese clothes, rewrite the section — never search-replace one word.
5. After the draft exists, read the **whole article** aloud, not the diff. Calque → rewrite that section from the 3-liner before touching figures. Then **grok-jp-ship**.
