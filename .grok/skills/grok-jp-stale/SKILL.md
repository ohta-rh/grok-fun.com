---
name: grok-jp-stale
description: >
  Check grok-fun.com TIPS and news for stale facts and update only the claims a primary source now contradicts.
  Use when the user says 陳腐化, 古くなってないか, 最終確認を更新, TIPS を確かめて, or /grok-jp-stale.
---

# Grok JP stale check

Check existing TIPS and news against their primary sources. Do not add pages. Writing rules stay in `.grok/rules/writing.md`. Do not copy them here.

## Stale

A page is stale when a primary source now contradicts a claim the page presents as current: a price, a plan name, the model name on the pricing card, who can use a feature, a limit, or an entrance.

These are not stale:

- `last_verified` is old, by itself. The 60-day banner is separate. Do not bump the date just to clear it.
- A sentence that already names the day it was checked, when that source still says the same thing.
- A historical announcement the article already dates.

If two official pages disagree, keep the sentence tied to the page it cites. Name the other page in the report. Do not pick a winner.

## Steps

1. List every file in `src/content/tips` and `src/content/news`: slug, `last_verified`, `source_url`. Oldest first.
2. Pull the claims that can rot. Skip how-to steps that do not depend on a number.
3. Open the primary URLs in this run. A previous session is not a source. The check date is today in Asia/Tokyo.
4. Mark each page 変わっていない, 陳腐化, or 開けなかった. For 陳腐化, quote the old sentence and the current source sentence.
5. Edit only the stale sentences, in place. Permalinks stay. If a number leaves the public page, write 契約画面. Do not invent a replacement price.
6. If a figure states the stale number, open **grok-jp-infographic** and replace that figure in the same change. Otherwise leave the figure.
7. Set `last_verified` to the check date only on pages whose current claims you re-opened. Leave the others.
8. Reader-facing Japanese goes through Fable, then **grok-jp-ship**.

The home date is the newest `last_verified` across tips and news (`src/pages/index.astro`). Do not hardcode it.

## Report

One table: page, `last_verified`, verdict, source. Say what you did not open.
