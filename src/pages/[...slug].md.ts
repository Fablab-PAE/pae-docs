/**
 * A Markdown version of each guide, next to its page: /pae-docs/fr/guides/cnc-machine.md.
 * Used by the guides' page actions menu (src/components/PageActions.astro): "Copier la page"
 * copies it, "Voir en Markdown" opens it, and ChatGPT / Claude / Perplexity are given its
 * public address. Made for AI tools: the title and description on top, then the guide's
 * text, without pictures (their relative paths mean nothing outside the site) and comments.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

export const getStaticPaths = (async () => {
	const guides = await getCollection('docs', (entry) => /^(fr|en)\/guides\//.test(entry.id));
	return guides.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export function guideMarkdown(entry: CollectionEntry<'docs'>): string {
	const body = (entry.body ?? '')
		.replace(/<!--[\s\S]*?-->/g, '') // comments
		.replace(/^[ \t]*!\[[^\]]*\]\([^)]*\)[ \t]*\n?/gm, '') // lines holding only a picture
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '') // pictures inside a line
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	const { title, description } = entry.data;
	return `# ${title}\n\n${description ? `> ${description}\n\n` : ''}${body}\n`;
}

export const GET: APIRoute = ({ props }) =>
	new Response(guideMarkdown(props.entry as CollectionEntry<'docs'>), {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
