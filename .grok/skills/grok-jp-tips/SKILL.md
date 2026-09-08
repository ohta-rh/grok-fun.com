---
name: grok-jp-tips
description: Write and revise Grok JP TIPS on grok-fun.com. Use when thickening TIPS, adding HTML infographics, generating header/metaphor stills, fact-checking billing or product copy, or the user says TIPS書いて / 記事を厚く / インフォグラフィック / ファクトチェック / ヘッダー画像 / /grok-jp-tips. Do not add TIPS pages unless asked.
---

# Grok JP TIPS

Rules live in `.grok/rules/writing.md`. Follow that file; do not copy it here.

## Do

1. Thicken the existing five TIPS. Do not add pages unless the owner asks.
2. Facts: HTML (`Infographic.astro` or `<figure class="infofig">`). Numbers only from dated primary sources (x.ai, FAQ, Cursor, X). Plans entangle — do not collapse grok.com / X / Cursor / API into one “Grok 有料”.
3. Imagine stills: 16:9, no readable letters/numbers/logos/real people. Inspect the file before shipping. Proof-of-prompt photos only on the Imagine TIPS. Metaphor stills get a caption that states the meaning.
4. Copy stills to `public/tips/{name}.jpg`. Header is `{slug}.jpg` on every TIPS page. Extra stills use another name.
5. Layout: 1 column on small screens, 2×2 max for four items (measure is 40rem). Never 4 columns.
6. After copy or images change, ship with **grok-jp-ship**.

## Do not

- Draw prices or Japanese labels with Imagine
- Call Grok Bot a saved chat prompt
- Treat Lite $10 / Heavy $300 as official card prices
- Translate English metaphors into kanji（地図 / ハブ / コーパス）
