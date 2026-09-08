---
name: grok-jp-ship
description: Build, deploy, visually check, and push grok-fun.com. Use when the user says デプロイ, wrangler, 公開, pushまで, ブラウザで見て, 肉眼テスト, /grok-jp-ship, or after TIPS/CSS/Worker changes that should go live.
---

# Ship grok-fun.com

No GitHub Actions. Live site is Cloudflare Workers Static Assets from this Mac.

## Sequence

1. `pnpm build`
2. `wrangler deploy` (do not set `run_worker_first` true)
3. Check live HTML with `curl -A 'Mozilla/5.0'` — Python urllib gets 403
4. Visual check at ~1280px and ~390px (see below)
5. `git add` **explicit paths** (never `git add -A` / `.`)
6. Commit on `main`, `git push origin main`. No force-push. No feature branch unless asked

## Visual check when chrome-devtools MCP is locked

`list_pages` often fails with “browser already running for chrome-profile” (Claude Code holds `~/.cache/chrome-devtools-mcp/chrome-profile`). Do not kill that browser.

Follow **chrome-isolated-shots**: unique `--user-data-dir` under `/tmp`, wait until the PNG size is stable, then kill the process group (Chrome writes the file then hangs). Do not kill the MCP profile browser.

Look for: judgment written inside the figure, titles wrapping, Imagine proof photo only, no metaphor stills, no overflow, no squeezed table columns.

On 390px, table rows are cards. Read every visible label aloud. If a label names a UI widget or sounds translated, do not ship — rewrite in `.grok/rules/writing.md` terms (いくら、何ができる、どこで払う) and rebuild.

## Do not

- Add TIPS pages as part of a ship
- Turn news ingest on
- Install a second gtag.js (GTM-NQMPJ2FS is already on the site)
