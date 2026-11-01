# Fiches de sécurité imprimables à la fin des guides

Status: approved
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Each machine guide (CNC, laser, vinyl, 3D printing) ends with that machine's safety sheet
("Fiche de sécurité"), using the text the owner provided. A button above each sheet prints
only the sheet, laid out to fit one A4 page, so it can be posted next to the machine. FR and EN.

## Not doing
- Not changing or removing the existing "Sécurité personnelle" sections at the top of the guides.
- Not changing the sheet texts, apart from the machine names and translating them into English.
- No separate page per sheet, no PDF files.

## Current situation
Guides are plain `.md` files in `src/content/docs/{fr,en}/guides/`, each ending with
"## Pour aller plus loin" / "## Going further". Site scripts go in `public/` and are loaded
from `head` in `astro.config.mjs` (like `sidebar-open.js`). Site styles are in
`src/styles/custom.css`. The sheets contain a "risk meter" HTML block
(`<div class="risk-assessment level-N">`) that has no styles yet.

## Changes
- Machine names on the sheets match the guides (owner's request): laser "Graveuse Laser
  (diode NEJE 5 W)" instead of "XTool F1", and its description says a 450 nm blue diode
  (the guide's laser) instead of "455 nm + 1064 nm infrared"; vinyl "Graphtec CE6000-60 Plus"
  instead of "CE7000"; CNC "Fraiseuse CNC (Shapeoko 3)"; 3D printer "Original Prusa MK4".
  The goggles rule (455 nm and 1064 nm goggles) is kept: those goggles also protect at 450 nm.
- `src/content/docs/{fr,en}/guides/{cnc-machine,gravure-laser,decoupe-vinyle,impression-3d}.md`:
  new last section `## Fiche de sécurité` / `## Safety sheet`: one short sentence, a print
  button `<button type="button" class="safety-print" data-print-sheet>`, then
  `<div class="safety-sheet">` holding the sheet. The sheet's titles become a sheet header
  (not page headings) and its sections become `####` headings, so they stay out of the
  page's table of contents. Markdown lists inside the div (blank lines around them).
  Mapping: CNC = routeur, laser = laser, vinyle = vinyle, impression 3D = imprimante.
- `public/print-sheet.js`: on a click on `[data-print-sheet]`, mark the sheet that follows
  the button (`.safety-sheet.is-printing`) and the page (`html.printing-sheet`), call
  `window.print()`, and remove both marks after printing (`afterprint`). Without the
  button (Ctrl+P), the whole page prints as before.
- `astro.config.mjs`: load `/pae-docs/print-sheet.js` in `head` (with a comment).
- `src/styles/custom.css`:
  - sheet on screen: framed box, header with "FICHE SÉCURITÉ MACHINE" + machine name;
  - risk meter: bar filled to N × 20 %, colour from green (1) to red (5), label next to it;
  - print button styled like the site's buttons, hidden when printing;
  - `@media print` with `html.printing-sheet`: only the marked sheet is visible (everything
    else hidden), black text on white, smaller font, `@page` A4 with small margins, colours
    of the meter kept (`print-color-adjust: exact`), so the sheet fits one page.

## Tests to add or update
- `scripts/check-site.mjs pages`: every guide in `fr/guides/` and `en/guides/` has a
  safety sheet (`class="safety-sheet"`) and a print button (`data-print-sheet`).
- `scripts/check-site.mjs links`: unchanged; it checks that `/pae-docs/print-sheet.js` exists in the build.
No database or outside service involved (static site).

## Acceptance checks
- [ ] The 4 French and 4 English guides end with the matching safety sheet
- [ ] The risk meter shows 5/5 (CNC, laser), 3/5 (3D printer), 2/5 (vinyl) in the right colours
- [ ] "Imprimer la fiche" prints only the sheet, on one A4 page (checked with a PDF made by the browser)
- [ ] The sheet sections are not added to the page's table of contents
- [ ] Reads well in light and dark mode
- [ ] `scripts/test.sh` passes

## Implementation notes
- Keep the owner's wording. English: faithful translation; keep phone numbers as they are.
- The 911 / poison centre numbers and the contact name come from the owner's sheets.
