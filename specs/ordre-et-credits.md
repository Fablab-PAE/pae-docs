# New machine order, and a photo credits page

Status: approved
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. Machines are listed in this order everywhere (side menu and homepage cards, fr + en):
   Impression 3D, Gravure laser, Découpe vinyle, Machine CNC.
2. Photo credits move to their own page, "Crédits photos" / "Photo credits", with one compact
   table per site page (which picture, where it comes from, licence). The page is not in the
   side menu: a "Crédits photos" link in the footer of every page opens it.

## Not doing
- No change to the guides' content or the order of their sections.
- The small captions under the BitSetter pictures in the CNC guide stay where they are.

## Current situation
- Sidebar order is set in `astro.config.mjs` (CNC, laser, vinyl, 3D). Homepage cards are in
  `src/content/docs/{fr,en}/index.mdx` (same order). Prev/next links at the bottom of guides
  follow the sidebar.
- Credits today: a `<small>` "Crédits photos" line at the bottom of both homepages; a credits
  bullet in "Pour aller plus loin" of the vinyl and 3D printing guides; captions
  "Photo : Carbide 3D" under the BitSetter pictures.
- Starlight's footer (`Footer.astro`: edit link, last updated, prev/next) shows on every
  page, the homepage included.

## Changes
- `astro.config.mjs`: Guides items reordered: 3D printing, laser, vinyl, CNC. Register
  `Footer: './src/components/Footer.astro'` in `components`.
- `src/content/docs/{fr,en}/index.mdx`: machine cards in the new order; the bottom credits
  line (and the `---` above it) removed.
- `src/components/Footer.astro` (new): Starlight's own footer, then a small centred link
  "Crédits photos" (fr) / "Photo credits" (en) to `/pae-docs/<lang>/credits-photos/`.
- `src/content/docs/{fr,en}/credits-photos.md` (new): intro sentence, then one `##` section
  per page (homepage, then the guides in the new order, then MILA), each with a table
  Image | Source | Licence:
  - Homepage: Shapeoko 3 (© Carbide 3D, published by All3DP), Graphtec CE6000-60
    (© Ace Makerspace), Prusa MK4 (Majkluss, Wikimedia Commons, CC BY-SA 4.0, cropped),
    laser in its enclosure + MILA + RoboTic logo (atelier RoboTic).
  - 3D printing: all pictures from the official Original Prusa MK4 handbook (© Prusa Research).
  - Laser: photos and screenshots (atelier RoboTic).
  - Vinyl: plotter photo (aaprintsupplyco.com); diagrams made for the guide (atelier RoboTic).
  - CNC: BitSetter pictures (© Carbide 3D, product photo and BitSetter installation guide);
    other photos and screenshots (atelier RoboTic).
  - MILA: photo (atelier RoboTic).
- `src/content/docs/{fr,en}/guides/{decoupe-vinyle,impression-3d}.md`: the credits bullet in
  "Pour aller plus loin" is replaced by a link to the credits page.

## Tests to add or update
- `scripts/check-site.mjs links`: every built page (except 404) has the footer link to its
  language's credits page (the existing check already makes sure the link works).
- `scripts/check-site.mjs pages`: `credits-photos` exists in fr and en (twin check) and the
  homepages no longer carry the credits line.
Static site: no database, no outside service.

## Acceptance checks
- [ ] Side menu and homepage cards: 3D printing, laser, vinyl, CNC (fr + en)
- [ ] Every page shows the "Crédits photos" / "Photo credits" link at the bottom
- [ ] The credits page lists each page's pictures in a table, fr + en, and is not in the menu
- [ ] `scripts/test.sh` passes

## Implementation notes
- Laser, CNC, MILA and logo pictures: assumed to be the atelier's own (no source recorded);
  the owner is told so they can correct it.
