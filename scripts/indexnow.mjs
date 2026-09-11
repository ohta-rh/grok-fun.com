#!/usr/bin/env node
/** Map changed source files to canonical page URLs and POST them to IndexNow. */

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://grok-fun.com';
const HOST = 'grok-fun.com';
const KEY_FILE = '4b5ffb1695a64c1ca278bc90e0a1bbbb.txt';
const KEY = readFileSync(join(ROOT, 'public', KEY_FILE), 'utf8').trim();
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_URL = `${SITE}/${KEY_FILE}`;

/** fig-* / video filenames that are not the TIPS slug. */
const FIG_TO_SLUG = {
  'fig-bill-choose': 'free-vs-supergrok',
  'fig-bill-ladder': 'free-vs-supergrok',
  'fig-bot': 'bot-build-chat-map',
  'fig-grok-bot-arch': 'grok-bot-cloud-computer',
  'fig-entrances': 'three-entrances',
  'fig-imagine-formula': 'imagine-quickstart',
  'fig-imagine-video': 'imagine-video',
  'fig-jp-paste': 'japanese-fix',
  'vid-cat': 'imagine-video',
  'vid-lantern': 'imagine-video',
};

const SITE_WIDE = new Set([
  'src/layouts/Base.astro',
  'src/pages/tips/[slug].astro',
  'src/components/SiteHeader.astro',
  'src/components/SiteFooter.astro',
  'src/components/UnofficialBanner.astro',
  'src/components/Breadcrumbs.astro',
  'src/scripts/gtm.ts',
]);

const ALL_TIPS = new Set([
  'src/pages/tips/[slug].astro',
  'src/components/Infographic.astro',
  'src/components/CommentList.astro',
  'src/components/ReactionBar.astro',
  'src/components/RelatedTips.astro',
  'src/components/StaleBanner.astro',
  'src/scripts/widget.ts',
]);

function tipSlugs() {
  return readdirSync(join(ROOT, 'src/content/tips'))
    .filter((n) => n.endsWith('.md'))
    .map((n) => n.slice(0, -3));
}

function allPages() {
  return [`${SITE}/`, `${SITE}/tips/`, `${SITE}/about/`, ...tipSlugs().map((s) => `${SITE}/tips/${s}/`)];
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

function filesFromGit(since) {
  if (since) {
    return git(['diff', '--name-only', since]).split('\n').filter(Boolean);
  }
  const dirty = git(['diff', '--name-only', 'HEAD']).split('\n').filter(Boolean);
  if (dirty.length > 0) return dirty;
  return git(['diff-tree', '--no-commit-id', '--name-only', '-r', 'HEAD']).split('\n').filter(Boolean);
}

/**
 * @param {string[]} files
 * @returns {string[]}
 */
export function filesToUrls(files) {
  const urls = new Set();
  let siteWide = false;
  let allTips = false;
  const slugs = new Set(tipSlugs());

  for (const raw of files) {
    const f = raw.replaceAll('\\', '/');
    if (f.startsWith('src/content/tips/') && f.endsWith('.md')) {
      urls.add(`${SITE}/tips/${basename(f, '.md')}/`);
      continue;
    }
    if (f === 'src/pages/index.astro') {
      urls.add(`${SITE}/`);
      continue;
    }
    if (f === 'src/pages/about.astro') {
      urls.add(`${SITE}/about/`);
      continue;
    }
    if (f === 'src/pages/tips/index.astro') {
      urls.add(`${SITE}/tips/`);
      continue;
    }
    if (SITE_WIDE.has(f) || f.startsWith('src/styles/')) {
      siteWide = true;
      continue;
    }
    if (ALL_TIPS.has(f)) {
      allTips = true;
      continue;
    }
    if (f.startsWith('public/tips/')) {
      const stem = basename(f).replace(/\.[^.]+$/, '');
      const slug = FIG_TO_SLUG[stem] ?? (slugs.has(stem) ? stem : null);
      if (slug) urls.add(`${SITE}/tips/${slug}/`);
    }
  }

  if (siteWide) for (const u of allPages()) urls.add(u);
  else if (allTips) for (const s of slugs) urls.add(`${SITE}/tips/${s}/`);
  return [...urls].sort();
}

async function submit(urls) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_URL,
    urlList: urls,
  });
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8', 'user-agent': 'grok-fun.com-indexnow' },
    body,
  });
  const text = await res.text();
  return { status: res.status, text };
}

function parseArgs(argv) {
  const files = [];
  let dry = false;
  let since = null;
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--') continue;
    if (a === '--dry-run') dry = true;
    else if (a === '--from-git') continue;
    else if (a === '--since') {
      since = argv[i + 1];
      i += 1;
    } else if (a.startsWith('-')) {
      throw new Error(`unknown flag: ${a}`);
    } else files.push(a);
  }
  const fromGit = argv.includes('--from-git') || files.length === 0;
  return { files: fromGit ? filesFromGit(since) : files, dry, since };
}

async function main() {
  const { files, dry } = parseArgs(process.argv.slice(2));
  const urls = filesToUrls(files);
  if (urls.length === 0) {
    console.log('indexnow: no page URLs in the changed files; skip');
    process.exit(0);
  }
  console.log(`indexnow: ${urls.length} URL(s)`);
  for (const u of urls) console.log(`  ${u}`);
  if (dry) {
    console.log('indexnow: dry-run, not posted');
    return;
  }
  const { status, text } = await submit(urls);
  console.log(`indexnow: HTTP ${status}${text ? ` ${text}` : ''}`);
  if (status !== 200 && status !== 202) process.exit(1);
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isCli) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
