#!/usr/bin/env node
// Site checks used by scripts/test.sh (no dependencies).
//   node scripts/check-site.mjs pages          -> every fr/ page has an en/ twin, and the reverse;
//                                                 every page has a description; no unfinished guide
//   node scripts/check-site.mjs links <dist>   -> every internal link/image in the built site exists
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const BASE = '/pae-docs'; // `base` in astro.config.mjs
const DOCS = 'src/content/docs';
const LANGS = ['fr', 'en'];
// The "guide being written" notice of an unfinished guide
const UNFINISHED = ['La rédaction de ce guide est actuellement en cours', 'This guide is currently being written'];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function checkPages() {
  // Page name without extension, so fr/index.mdx matches en/index.mdx
  const pages = Object.fromEntries(
    LANGS.map((l) => [
      l,
      new Set(walk(join(DOCS, l)).filter((f) => /\.mdx?$/.test(f)).map((f) => relative(join(DOCS, l), f).replace(/\.mdx?$/, ''))),
    ]),
  );
  const problems = [];
  for (const a of LANGS) for (const b of LANGS) {
    if (a === b) continue;
    for (const p of pages[a]) if (!pages[b].has(p)) problems.push(`${a}/${p} has no ${b}/ version`);
  }
  // The site has no changelog page any more (the owner asked to remove it)
  for (const l of LANGS) if (pages[l].has('changelog')) problems.push(`${l}/changelog should not exist (the changelog was removed)`);
  // Every page has a description (shown in search results), and no guide is left unfinished
  for (const l of LANGS) {
    for (const f of walk(join(DOCS, l)).filter((f) => /\.mdx?$/.test(f))) {
      const text = readFileSync(f, 'utf8');
      const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      if (!/^description:\s*\S/m.test(front)) problems.push(`${relative(DOCS, f)} has no description`);
      if (f.includes(`${l}/guides/`) && UNFINISHED.some((u) => text.includes(u))) {
        problems.push(`${relative(DOCS, f)} still says the guide is being written`);
      }
    }
  }
  return problems;
}

function exists(file) {
  try { return statSync(file).isFile(); } catch { return false; }
}

function checkLinks(dist) {
  const problems = [];
  const attr = /\s(?:href|src)=["']([^"']+)["']/g;
  for (const file of walk(dist).filter((f) => extname(f) === '.html')) {
    const html = readFileSync(file, 'utf8');
    for (const [, raw] of html.matchAll(attr)) {
      if (!raw.startsWith(BASE + '/') && raw !== BASE) continue; // outside links are not checked
      let path;
      try { path = decodeURIComponent(raw.slice(BASE.length).split(/[?#]/)[0]); } catch { path = raw; }
      const target = join(dist, path);
      if (![target, join(target, 'index.html'), target + '.html'].some(exists)) {
        problems.push(`${relative(dist, file)}: broken link ${raw}`);
      }
    }
  }
  return [...new Set(problems)];
}

const [mode, dist] = process.argv.slice(2);
let problems;
if (mode === 'pages') problems = checkPages();
else if (mode === 'links' && dist) problems = checkLinks(dist);
else { console.error('Usage: check-site.mjs pages | links <dist>'); process.exit(2); }

if (problems.length) {
  console.error(problems.map((p) => '  - ' + p).join('\n'));
  console.error(`${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log('  ok');
