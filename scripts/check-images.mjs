#!/usr/bin/env node
// Picture checks used by scripts/test.sh (rules in scripts/images.mjs). Fails when:
// - an original picture in src/assets/ is longer than 2000 px or heavier than 500 KB
//   (SVG: 200 KB) -> `npm run images` fixes it;
// - two pictures are the same file;
// - a picture is used nowhere (a picture only named in a comment counts as unused);
// - a picture is in public/ (Astro does not optimise those; only favicon.svg is allowed).
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFileSync, statSync } from 'node:fs';
import { ASSETS, MAX_BYTES, MAX_SIDE, MAX_SVG_BYTES, PICTURE, RASTER, refOf, userFiles, walk, withoutComments } from './images.mjs';

const problems = [];
const kb = (n) => `${Math.round(n / 1024)} KB`;
const pictures = walk(ASSETS).filter((f) => PICTURE.test(f));
const used = userFiles().map((u) => withoutComments(u.text)).join('\n');
const seen = new Map();

for (const file of pictures) {
	const bytes = statSync(file).size;
	if (RASTER.test(file)) {
		const { width, height } = await sharp(file).metadata();
		if (Math.max(width, height) > MAX_SIDE) problems.push(`${file}: ${width}x${height} px (max ${MAX_SIDE} px) -> run: npm run images`);
		if (bytes > MAX_BYTES) problems.push(`${file}: ${kb(bytes)} (max ${kb(MAX_BYTES)}) -> run: npm run images`);
	} else if (bytes > MAX_SVG_BYTES) {
		problems.push(`${file}: ${kb(bytes)} SVG (max ${kb(MAX_SVG_BYTES)}): simplify the drawing`);
	}
	const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
	if (seen.has(hash)) problems.push(`${file}: same picture as ${seen.get(hash)}: use that one and delete this file`);
	else seen.set(hash, file);
	if (!used.includes(refOf(file))) problems.push(`${file}: used nowhere: delete it (git history keeps it)`);
}

for (const file of walk('public').filter((f) => PICTURE.test(f) && f !== 'public/favicon.svg')) {
	problems.push(`${file}: pictures go in src/assets/img/ (Astro optimises them there, not in public/)`);
}

if (problems.length) {
	console.error(problems.map((p) => '  - ' + p).join('\n'));
	console.error(`${problems.length} picture problem(s) found.`);
	process.exit(1);
}
console.log(`  ok (${pictures.length} pictures)`);
