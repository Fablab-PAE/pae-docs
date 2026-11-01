# Page actions menu on the guides (like fal.ai's "Copy page")

Status: ready to merge
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On each guide (fr + en), the "Imprimer" button on the right of the title becomes a split
button like https://fal.ai/docs: the main part "Copier la page" copies the guide as Markdown
(for AI tools); the arrow part opens a menu:
1. Copier la page - Copier la page en Markdown pour les IA
2. Voir en Markdown - Voir cette page en texte brut (opens the .md file)
3. Imprimer la page - Imprimer le guide sans les menus
4. Ouvrir dans ChatGPT - Poser des questions sur cette page
5. Ouvrir dans Claude - Poser des questions sur cette page
6. Ouvrir dans Perplexity - Poser des questions sur cette page
English: Copy page, View as Markdown, Print page, Open in ChatGPT / Claude / Perplexity.

## Not doing
- No MCP / Cursor / VS Code items (the site has no MCP server).
- Other pages (homepage, MILA, credits) get no menu.

## Changes
- `src/pages/[...slug].md.ts` (new): at build time, one Markdown file per guide next to its
  page (`/pae-docs/fr/guides/cnc-machine.md`): `# title`, the description, then the guide's
  text; pictures and HTML comments removed (an AI can't use the relative picture paths).
- `src/components/PageActions.astro` (new), used by `PageTitle.astro` on guide pages instead
  of the print button: split button + menu (look of fal.ai: rounded, thin border, icon in a
  small box, title + grey subtitle, small "external" arrow on items that open a new tab).
  - Copy: fetches the page's .md once (on first hover/focus of the button) and copies it;
    `navigator.clipboard` on HTTPS, a hidden-textarea copy on the local preview (plain HTTP).
    Feedback: the label becomes "Copié !" / "Copied!" with a check for 2 s.
  - Print: the item carries `data-print-guide`, so `public/print.js` prints as today.
  - ChatGPT / Claude / Perplexity: links opening in a new tab, prompt "Lis cette page de la
    documentation de l'atelier RoboTic pour que je puisse te poser des questions : <URL>",
    with the PUBLIC .md URL (https://fablab-pae.github.io/pae-docs/...): those services can't
    reach the local preview. URLs: `https://chatgpt.com/?q=`, `https://claude.ai/new?q=`,
    `https://www.perplexity.ai/search?q=`.
  - Menu: opens under the arrow, aligned right; closes on Esc, outside click, or after a
    choice; up/down arrows move between items; `aria-haspopup`, `aria-expanded`, `role=menu`.
  - Styles follow Starlight's colours (light / dark); the Tailwind test look also covers it.
- `src/styles/custom.css`: print hides the whole widget; the old `.guide-print` rules go.
- `src/styles/skin-tailwind.css`: `.guide-print` replaced by the new buttons.
- `AGENTS.md`: describe the menu and the .md files.

## Tests to add or update
- `scripts/check-site.mjs links`: guide pages (only) have the menu (`data-page-actions`) and
  its print item (`data-print-guide`, existing check); every guide has its built `.md` file
  (the "Voir en Markdown" link is checked by the link check).

## Acceptance checks
- [x] 8 guide pages: split button right of the title; menu with the 6 items, fr / en labels
- [ ] Copy works on the local preview (HTTP) and the public site (HTTPS)
- [x] .md file per guide, without pictures
- [ ] Print still prints the whole guide; the widget is not printed
- [x] `scripts/test.sh` passes
