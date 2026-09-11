---
name: grok-jp-infographic
description: >
  Make grok-fun.com TIPS infographics at the billing-page tone. Use when
  drawing or replacing a TIPS figure, the user says インフォグラフィック,
  図を作れ, トーン, /grok-jp-infographic, or a figure looks like beige HTML
  cards. Canonical examples are the two billing figures, not their layout.
---

# Grok JP infographic tone

Writing rules stay in `.grok/rules/writing.md`. This file is the tone bar.

## Canonical examples (tone, not layout)

Open these files and match **paper / ink / highlighter / density**. Do not copy the stairs or the four arrow rows.

- `public/tips/fig-bill-choose.jpg`
- `public/tips/fig-bill-ladder.jpg`

Live bar: https://grok-fun.com/tips/free-vs-supergrok/

## Tone

| Token | Do |
|---|---|
| Paper | Aged cream or lined notebook. Not white UI. Not beige cards |
| Ink | Navy handwriting mixed with print |
| Highlighter | Yellow on the one decision |
| Language | Complete 音読 Japanese sentences. Product names English |
| Density | Every region is a judgment or a dated fact. No empty boxes |
| Composition | Free. New subject → new layout |

## Method

1. Write the LINE 3-liner for the figure. List every string that will appear, in 音読 Japanese.
2. `image_edit` with the two billing JPGs as style refs. 16:9. Prompt the tone and the exact Japanese. Say the layout is new.
3. Read the output file. Garbled kanji, invented numbers, 無制限, official-looking fake prices → discard and regenerate. Do not ship a figure you have not opened.
4. Copy to `public/tips/fig-{name}.jpg`. Make `*-720.webp` (720×405) and `*-1280.webp` (1280×720). Wire `Infographic.astro` and `scripts/indexnow.mjs`.

HTML→JPG only when Imagine would garble an exact paste (the 3-line Japanese-fix card). The HTML must still hit this tone. Kicker + heading + three empty boxes is not a figure.

OGP (`public/tips/{slug}.jpg`) may be a one-line judgment card. Body figures may not.

## Counts

One body figure per TIPS. Exceptions: billing (choose + stairs) and Grok Bot (judgment + architecture). If you drop a figure, move its facts into the article in the same commit.
