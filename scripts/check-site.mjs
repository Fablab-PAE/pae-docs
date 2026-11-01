#!/usr/bin/env node
// Site checks used by scripts/test.sh (no dependencies).
//   node scripts/check-site.mjs pages          -> every fr/ page has an en/ twin, and the reverse;
//                                                 every page has a description; no unfinished guide;
//                                                 every guide has its safety sheet; the photo
//                                                 credits page exists (not on the homepage)
//   node scripts/check-site.mjs links <dist>   -> every internal link/image in the built site exists;
//                                                 every page has the footer's photo credits link;
//                                                 guide pages (only) have the print button
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

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
  // Photo credits live on their own page (linked from every page's footer), not on the homepage
  for (const l of LANGS) {
    if (!pages[l].has('credits-photos')) problems.push(`${l}/credits-photos (photo credits page) is missing`);
    if (/<small>(Crédits photos|Photo credits)/.test(readFileSync(join(DOCS, l, 'index.mdx'), 'utf8'))) {
      problems.push(`${l}/index.mdx still has the photo credits line (they are on credits-photos now)`);
    }
    // The homepage's "before using a machine" rules sit in an info box
    if (!readFileSync(join(DOCS, l, 'index.mdx'), 'utf8').includes(':::note[')) {
      problems.push(`${l}/index.mdx: the "before using a machine" rules are not in an info box (:::note)`);
    }
  }
  // Every page has a description (shown in search results), and no guide is left unfinished
  for (const l of LANGS) {
    for (const f of walk(join(DOCS, l)).filter((f) => /\.mdx?$/.test(f))) {
      const text = readFileSync(f, 'utf8');
      const front = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      if (!/^description:\s*\S/m.test(front)) problems.push(`${relative(DOCS, f)} has no description`);
      if (f.includes(`${l}/guides/`) && UNFINISHED.some((u) => text.includes(u))) {
        problems.push(`${relative(DOCS, f)} still says the guide is being written`);
      }
      // Every guide ends with its printable safety sheet (public/print.js)
      if (f.includes(`${l}/guides/`) && !(text.includes('class="safety-sheet"') && text.includes('data-print-sheet'))) {
        problems.push(`${relative(DOCS, f)} has no safety sheet with a print button`);
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
    // Every page has the footer link to its language's photo credits page (src/components/Footer.astro)
    const lang = relative(dist, file).split(/[\\/]/)[0];
    if (LANGS.includes(lang) && !html.includes(`href="${BASE}/${lang}/credits-photos/"`)) {
      problems.push(`${relative(dist, file)}: no "photo credits" link in the footer`);
    }
    // Guide pages, and only them, have the "print the guide" button (src/components/PageTitle.astro)
    const isGuide = LANGS.some((l) => relative(dist, file).startsWith(join(l, 'guides') + sep));
    if (isGuide !== html.includes('data-print-guide')) {
      problems.push(`${relative(dist, file)}: ${isGuide ? 'no' : 'unexpected'} "print the guide" button`);
    }
    // Homepages: the links to a section of the page (hero button) point to a real heading
    if (LANGS.some((l) => relative(dist, file) === join(l, 'index.html'))) {
      for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
        if (id !== '_top' && !html.includes(`id="${id}"`)) problems.push(`${relative(dist, file)}: no section #${id}`);
      }
    }
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
