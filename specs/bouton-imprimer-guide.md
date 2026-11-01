# "Print the guide" button at the top of each guide

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Every guide page (fr + en) shows a "Imprimer le guide" / "Print the guide" button under its
title. It prints the whole guide, without the menus, ready for paper; the safety sheet at the
end starts on its own page. Future guides get the button automatically.

## Changes
- `src/components/PageTitle.astro` (new, registered in `astro.config.mjs` `components`):
  Starlight's own title, then on guide pages only (route id `fr/guides/...` or
  `en/guides/...`) a button `<button type="button" class="print-button guide-print"
  data-print-guide>` with the label in the page's language.
- `public/print-sheet.js` renamed `public/print.js` (head script in `astro.config.mjs`):
  also handles `[data-print-guide]`: `window.print()` of the whole page (the safety sheet
  button keeps printing only the sheet).
- `src/styles/custom.css`: the button shares the sheet button's look (pill, accent colour,
  printer icon); the guide button is not floated. Print (whole guide, Starlight already hides
  the side menu, table of contents and prev/next links and forces light colours): hide both
  print buttons, the small table of contents bar, the heading link icons and the footer
  credits link; pictures not cut across two pages; the safety sheet starts a new page and
  keeps its meter colours.
- `AGENTS.md`: mention the button and `public/print.js`.

## Tests to add or update
- `scripts/check-site.mjs links`: every built guide page has the `data-print-guide` button;
  no other page has it.

## Acceptance checks
- [ ] The 8 guide pages show the button under the title; other pages don't
- [ ] The button opens the browser's print window for the whole guide
- [ ] The safety sheet button still prints only the sheet
- [ ] `scripts/test.sh` passes
