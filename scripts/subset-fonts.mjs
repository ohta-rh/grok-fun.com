#!/usr/bin/env node
/** Subset BIZ UDPGothic 400/700 from the characters used in src/. */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CACHE = join(ROOT, '.tmp_fonts');
const OUT = join(ROOT, 'src', 'fonts');
const REG = join(CACHE, 'BIZUDPGothic-Regular.ttf');
const BOLD = join(CACHE, 'BIZUDPGothic-Bold.ttf');
const VENV_SUBSET = join(CACHE, 'venv', 'bin', 'pyftsubset');

function walk(dir, acc = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(md|astro|ts|css)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function requiredChars() {
  const set = new Set();
  for (let i = 0x20; i <= 0x7e; i += 1) set.add(String.fromCodePoint(i));
  for (let i = 0x3041; i <= 0x3096; i += 1) set.add(String.fromCodePoint(i));
  for (let i = 0x30a1; i <= 0x30f6; i += 1) set.add(String.fromCodePoint(i));
  for (const ch of 'ー、。・「」『』（）【】…％〜○×→←↑↓') set.add(ch);
  for (const file of walk(join(ROOT, 'src'))) {
    for (const ch of readFileSync(file, 'utf8')) {
      if (ch !== '\n' && ch !== '\r' && ch !== '\t') set.add(ch);
    }
  }
  return [...set].join('');
}

function pyftsubset() {
  if (existsSync(VENV_SUBSET)) return VENV_SUBSET;
  return 'pyftsubset';
}

function ensureTtf() {
  mkdirSync(CACHE, { recursive: true });
  const files = [
    [REG, 'https://github.com/google/fonts/raw/main/ofl/bizudpgothic/BIZUDPGothic-Regular.ttf'],
    [BOLD, 'https://github.com/google/fonts/raw/main/ofl/bizudpgothic/BIZUDPGothic-Bold.ttf'],
  ];
  for (const [dest, url] of files) {
    if (existsSync(dest) && dest.endsWith('.ttf')) continue;
    execFileSync('curl', ['-fsSL', '-o', dest, url], { stdio: 'inherit' });
  }
}

const text = requiredChars();
mkdirSync(OUT, { recursive: true });
ensureTtf();
writeFileSync(join(CACHE, 'chars.txt'), text);

const bin = pyftsubset();
for (const [src, name] of [
  [REG, 'biz-udpgothic-400.woff2'],
  [BOLD, 'biz-udpgothic-700.woff2'],
]) {
  const dest = join(OUT, name);
  execFileSync(
    bin,
    [
      src,
      `--text-file=${join(CACHE, 'chars.txt')}`,
      '--flavor=woff2',
      '--layout-features=ccmp,locl',
      '--no-hinting',
      `--output-file=${dest}`,
    ],
    { stdio: 'inherit' },
  );
}

console.log(
  `subset-fonts: ${[...text].length} chars -> src/fonts/biz-udpgothic-400.woff2 + 700.woff2`,
);
