---
name: grok-jp-ship
description: Build, deploy, ping IndexNow for changed pages, visually check, and push grok-fun.com. Use when the user says デプロイ, wrangler, 公開, pushまで, IndexNow, ブラウザで見て, 肉眼テスト, /grok-jp-ship, or after TIPS/CSS/Worker changes that should go live.
---

# Ship grok-fun.com

No GitHub Actions. Live site is Cloudflare Workers Static Assets from this Mac.

## Sequence

1. `pnpm build`
2. `pnpm run deploy` (do not set `run_worker_first` true)
3. Check live HTML with `curl -A 'Mozilla/5.0'` — Python urllib gets 403
4. IndexNow for **changed pages only**: `node scripts/indexnow.mjs --from-git` (or `--since <rev>`). Maps TIPS/md, pages, and `public/tips/*` figures to canonical URLs with a trailing slash. Shared chrome (`Base.astro`, header/footer, `src/styles/`) fans out to every indexable page. Worker, docs, skills, and 404 are not submitted. HTTP 200 or 202 is success. The key file is `public/4b5ffb1695a64c1ca278bc90e0a1bbbb.txt` at `https://grok-fun.com/4b5ffb1695a64c1ca278bc90e0a1bbbb.txt` — it must already be live (this deploy) before the POST
5. Visual check at ~1280px and ~390px (see below)
6. `git add` **explicit paths** (never `git add -A` / `.`)
7. Commit on `main`, `git push origin main`. No force-push. No feature branch unless asked

## Visual check when chrome-devtools MCP is locked

`list_pages` often fails with “browser already running for chrome-profile” (Claude Code holds `~/.cache/chrome-devtools-mcp/chrome-profile`). Do not kill that browser.

Follow **chrome-isolated-shots**: unique `--user-data-dir` under `/tmp`, wait until the PNG size is stable, then kill the process group (Chrome writes the file then hangs). Do not kill the MCP profile browser.

Look for: judgment written inside the figure, titles wrapping, Imagine proof photo only, no metaphor stills, no overflow, no squeezed table columns.

If `public/tips/fig-*` or `Infographic.astro` changed: open **grok-jp-infographic** and compare the live figure to `fig-bill-choose.jpg` / `fig-bill-ladder.jpg`. Beige HTML cards, empty boxes, kicker + heading → do not ship. Tone, not layout.

On 390px, table rows are cards. Read the whole article, not the diff. If a sentence is English in Japanese clothes, rewrite that section from a LINE 3-liner. Do not search-replace one word. Then rebuild.

## Do not

- Add TIPS pages as part of a ship
- Turn news ingest on
- Install a second gtag.js (GTM-NQMPJ2FS is already on the site)
- Ship a new or replaced body figure without **grok-jp-infographic** having been opened in that turn
