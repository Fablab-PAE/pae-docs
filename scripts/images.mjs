// Picture rules shared by scripts/optimize-images.mjs (`npm run images`, fixes) and
// scripts/check-images.mjs (step of scripts/test.sh, checks). No network, files only.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const ASSETS = 'src/assets';
export const MAX_SIDE = 2000; // px, longest side of an original picture
export const MAX_BYTES = 500_000; // an original raster picture (PNG, JPEG, WebP, GIF)
export const MAX_SVG_BYTES = 200_000;
export const RASTER = /\.(png|jpe?g|webp|gif|avif)$/i;
export const PICTURE = /\.(png|jpe?g|webp|gif|avif|svg)$/i;
// Where pictures are used (references are paths ending with assets/<path in src/assets>)
const USERS = ['src/content', 'src/components', 'src/styles', 'astro.config.mjs'];

export function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
		e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
	);
}

/** Files that may use pictures: { path, text } (text read now). */
export function userFiles() {
	return USERS.flatMap((p) => (p.endsWith('.mjs') ? [p] : walk(p)))
		.filter((f) => /\.(mdx?|astro|css|mjs|ts)$/.test(f))
		.map((path) => ({ path, text: readFileSync(path, 'utf8') }));
}

/** "src/assets/img/laser/laser_06.png" -> "assets/img/laser/laser_06.png" (how pages refer to it) */
export function refOf(file) {
	return 'assets/' + relative(ASSETS, file).split(sep).join('/');
}

/** Text without HTML and MDX comments: a picture only named in a comment is not used. */
export function withoutComments(text) {
	return text.replace(/<!--[\s\S]*?-->/g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
}
