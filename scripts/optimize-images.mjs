#!/usr/bin/env node
// `npm run images`: makes every original picture in src/assets/ follow the site's rules
// (scripts/images.mjs): at most 2000 px on the longest side and at most 500 KB.
// - too long: resized to 2000 px (EXIF orientation applied first);
// - still too heavy: converted to WebP (quality 88, then lower if needed; transparency kept),
//   the old file removed and every reference in the pages and components updated;
// - otherwise: re-saved only if that makes the file smaller.
// SVG files are not changed (the tests only check their weight). Safe to run again.
import sharp from 'sharp';
import { readFileSync, statSync, unlinkSync, writeFileSync, existsSync } from 'node:fs';
import { ASSETS, MAX_BYTES, MAX_SIDE, RASTER, refOf, userFiles, walk } from './images.mjs';

const kb = (n) => `${Math.round(n / 1024)} KB`;
const users = userFiles();
let changed = 0;
let failed = 0;

async function encode(file, format, quality) {
	const meta = await sharp(file).metadata();
	let img = sharp(file, { animated: meta.format === 'gif' || meta.format === 'webp' }).rotate();
	const w = meta.autoOrient?.width ?? meta.width;
	const h = meta.autoOrient?.height ?? meta.height;
	if (Math.max(w, h) > MAX_SIDE) {
		img = img.resize(w >= h ? { width: MAX_SIDE } : { height: MAX_SIDE });
	}
	if (format === 'jpeg') img = img.jpeg({ quality: quality ?? 85, mozjpeg: true });
	else if (format === 'png') img = img.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 });
	else if (format === 'gif') img = img.gif({ effort: 10 });
	else img = img.webp({ quality: quality ?? 88, effort: 6 });
	return { data: await img.toBuffer(), resized: Math.max(w, h) > MAX_SIDE };
}

for (const file of walk(ASSETS).filter((f) => RASTER.test(f))) {
	const before = statSync(file).size;
	const meta = await sharp(file).metadata();
	const tooLong = Math.max(meta.width, meta.height) > MAX_SIDE;
	const format = meta.format === 'jpeg' || meta.format === 'png' || meta.format === 'gif' ? meta.format : 'webp';

	// 1. Same format, resized if needed
	let { data } = await encode(file, format);
	if (data.length <= MAX_BYTES && (tooLong || data.length < before * 0.95)) {
		writeFileSync(file, data);
		console.log(`  ${file}: ${kb(before)} -> ${kb(data.length)}${tooLong ? ' (resized)' : ''}`);
		changed++;
		continue;
	}
	if (data.length <= MAX_BYTES || (before <= MAX_BYTES && !tooLong)) continue; // already fine

	// 2. Too heavy: WebP, lowering the quality step by step
	for (const quality of [88, 80, 72, 64]) {
		({ data } = await encode(file, 'webp', quality));
		if (data.length <= MAX_BYTES) break;
	}
	if (data.length > MAX_BYTES) {
		console.error(`  ${file}: still ${kb(data.length)} as WebP: crop or shrink it by hand`);
		failed++;
		continue;
	}
	const target = file.replace(RASTER, '.webp');
	if (target !== file && existsSync(target)) {
		console.error(`  ${file}: ${target} already exists, rename one of them first`);
		failed++;
		continue;
	}
	writeFileSync(target, data);
	if (target !== file) {
		unlinkSync(file);
		const from = refOf(file);
		const to = refOf(target);
		for (const user of users) {
			if (!user.text.includes(from)) continue;
			user.text = user.text.split(from).join(to);
			writeFileSync(user.path, user.text);
			console.log(`    reference updated in ${user.path}`);
		}
	}
	console.log(`  ${file}: ${kb(before)} -> ${target.slice(file.lastIndexOf('/') + 1)} ${kb(data.length)}`);
	changed++;
}

console.log(changed ? `${changed} picture(s) optimised.` : 'All pictures already follow the rules.');
if (failed) process.exit(1);
