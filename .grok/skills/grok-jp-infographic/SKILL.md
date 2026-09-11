---
name: grok-jp-infographic
description: >
  Required for every grok-fun.com TIPS body figure. Open this before image_gen,
  image_edit, HTML→JPG, Infographic.astro art, or thickening a TIPS that has a
  figure. Use when the user says インフォグラフィック, 図を作れ, 図を直して,
  トーン, /grok-jp-infographic, or a figure looks like beige HTML cards.
  Canonical examples are the two billing figures, not their layout. Skipping
  this skill is a ship-blocker.
---

# Grok JP infographic tone

Writing rules stay in `.grok/rules/writing.md`. This file is the tone bar.

## Required

Open this file before any TIPS body figure. Do not call `image_gen` / `image_edit`, raster HTML, or swap `Infographic.astro` art until it is open. The global imagine default “exact text → HTML” does **not** apply to TIPS body figures, except the 3-line paste card. This file wins. Skipping it is a ship-blocker.

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
| Language | Complete 音読 Japanese sentences. Product names English. Garbled kanji is a discard — never ship. Write only the strings you listed; extra invented Japanese is a discard |
| Density | Every region is a judgment or a dated fact. No empty boxes |
| Composition | Free. New subject → new layout |
| Metaphor | No decoding required. No 出荷伝票 / 工場 / 経営. The judgment in plain Japanese |

## Method

1. Write the LINE 3-liner for the figure. List every string that will appear, in 音読 Japanese.
2. `image_edit` with the two billing JPGs as style refs. 16:9. Prompt the tone and the exact Japanese. Say the layout is new.
3. Read the output file. Garbled kanji, extra invented Japanese, 出荷伝票-style metaphor, invented numbers, 無制限, official-looking fake prices → discard and regenerate. Do not ship a figure you have not opened. If a pass adds filler sentences, throw it away — do not crop around the garbage.
4. Copy to `public/tips/fig-{name}.jpg`. Make `*-720.webp` (720×405) and `*-1280.webp` (1280×720). Wire `Infographic.astro` and `scripts/indexnow.mjs`.

HTML→JPG only when Imagine would garble an exact paste (the 3-line Japanese-fix card). The HTML must still hit this tone. Kicker + heading + three empty boxes is not a figure.

OGP (`public/tips/{slug}.jpg`) may be a one-line judgment card. Body figures may not.

## Counts

One body figure per TIPS. Exceptions: billing (choose + stairs) and Grok Bot (judgment + architecture). If you drop a figure, move its facts into the article in the same commit.
