---
name: grok-jp-tips
description: Write and revise Grok JP TIPS on grok-fun.com. Use when thickening TIPS, adding HTML infographics, fact-checking billing or product copy, or the user says TIPS書いて / 記事を厚く / インフォグラフィック / ファクトチェック / /grok-jp-tips. Do not add TIPS pages unless asked.
---

# Grok JP TIPS

Rules live in `.grok/rules/writing.md`. Follow that file; do not copy it here.

## Do

1. Thicken the existing five TIPS. Do not add pages unless the owner asks.
2. Facts: HTML (`Infographic.astro` or `<figure class="infofig">`). The judgment is written *inside* the figure (paste text, prices, 出る/出ない, 払った→止める). Numbers only from dated primary sources.
3. Plans entangle — do not collapse grok.com / X / Cursor / API into one “Grok 有料”.
4. Article photos: Imagine proof-of-prompt only. OGP jpgs stay in frontmatter; do not render metaphor stills in the article.
5. Layout: 1 column on small screens, 2×2 max for four items (measure is 40rem). Never 4 columns.
6. After copy or figures change, ship with **grok-jp-ship**.

## Do not

- Draw prices or Japanese labels with Imagine
- Put a still that needs “ノートがチャット、判子が Bot” to be understood
- Call Grok Bot a saved chat prompt
- Treat Lite $10 / Heavy $300 as official card prices
- Translate English metaphors into kanji（地図 / ハブ / コーパス）
