# Homepage pictures, projects section, shop link, no changelog

Status: ready to merge
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Make the homepage more visual (a picture on each machine card), update three homepage
sentences, hide the changelog, add a "Nos projets" section to the menu (first project: the
MILA robot assistant) and add a link to the FabLab's shop (Boutique Chouette et Cie).
French and English, as always.

## Not doing
- No carousel (needs JavaScript; big cards with a picture are simpler and work everywhere).
- No new photos taken: the card pictures reuse photos already in the guides. The vinyl
  cutter has no photo yet, so its card shows a simple drawn icon until one is provided.
- No change to the guides themselves.

## Current situation
- `src/content/docs/{fr,en}/index.mdx`: homepage, hero + `CardGrid` of 4 `LinkCard`s (no
  pictures), rules list, guide outline. Hero button "Choisir une machine" links to
  `#les-machines` / `#the-machines`.
- `src/content/docs/{fr,en}/changelog.md`: changelog page, in the sidebar
  (`astro.config.mjs`) and linked from the version pill (`src/components/SiteTitle.astro`).
- `astro.config.mjs` sidebar: group "Guides" (4 machines), then "Changelog".

## Changes
- `src/components/MachineCard.astro` (new): a big link card = picture on top (fixed height,
  `object-fit: cover`, optimised by `astro:assets` `<Image>`), then title and description.
  Props: `title`, `description`, `href`, `image?` (imported image), `alt?`, `icon?`
  (Starlight icon name used when there is no picture), `external?` (opens in a new tab with
  `rel="noopener noreferrer"`). Uses Starlight colour variables so light and dark themes
  both work. Used inside Starlight's `CardGrid`.
- `src/content/docs/fr/index.mdx`:
  - tagline -> "Des guides pas à pas pour utiliser chaque machine du FabLab en toute sécurité."
  - "## Les machines" -> "## Les machines disponibles dans notre local"; hero button link ->
    `#les-machines-disponibles-dans-notre-local`.
  - The 4 `LinkCard`s become `MachineCard`s with pictures: CNC `guide-cnc/cnc_03.png`
    (Shapeoko work area), laser `laser/laser_03_2.png` (laser in its enclosure), 3D
    `impression-3d/prusa_mk4_vue_ensemble.jpg`, vinyl: icon (no photo yet).
  - rule "En cas de doute, demandez de l'aide…" -> "En tout temps, veuillez valider avec le
    formateur de l'atelier RoboTic avant de démarrer une machine."
  - New section "## Nos projets et notre boutique" after the machines: a `MachineCard` for
    MILA (picture `design_v1.png` from the MILA repository, saved in
    `src/assets/img/projets/mila.png`) and one for the shop (external link, heart icon).
- `src/content/docs/en/index.mdx`: the same in English ("The machines available in our
  workshop", "At all times, please check with the RoboTic workshop trainer before starting
  a machine.", "Our projects and our shop").
- `src/content/docs/{fr,en}/projets/mila.md` (new): short page on MILA: what it is (3D-printed
  robot head that follows a face with a mini camera, two servomotors, eyes on two LCD
  screens), why (RoboTic workshop of Place à l'emploi, Longueuil, to discover robotics),
  what is in progress (voice activation, lighting), and a link to the GitHub project.
- `astro.config.mjs` sidebar: new group after "Guides": "Nos projets" / "Our projects" with
  "MILA, robot assistant" (`/projets/mila/`); then an external link "Boutique" / "Shop" ->
  `https://online.forms.app/boutique-chouette-et-cie/formulaire-de-commerce?formsRef=qrcode`
  (opens in a new tab). Remove the "Changelog" entry.
- Changelog removed: delete `src/content/docs/{fr,en}/changelog.md`. `SiteTitle.astro`: the
  version pill stays (shows which version is online) but is no longer a link; hover text
  keeps version + date without "click for the changelog".
- `AGENTS.md`: remove the changelog line from "Where things are" and the "Visible changes get
  a line in both changelog pages" rule; mention `projets/` and `MachineCard.astro`.

## Tests to add or update
- `scripts/check-site.mjs pages`: new check that no `changelog` page exists any more (so it
  is not added back by mistake), and that `projets/` pages have twins (already covered by the
  existing fr/en check).
- Existing checks already cover: every card picture and internal link (incl. `/projets/mila/`)
  points to a real file in the built site; any leftover link to `/changelog/` fails the build
  check. No database or outside service: the shop and GitHub links are not visited.

## Acceptance checks
- [x] Both homepages show a picture (or icon for vinyl) on each machine card, in light and dark mode
- [x] The three sentences read exactly as the owner asked (fr), with matching English
- [x] "Choisir une machine" / "Choose a machine" buttons jump to the renamed section
- [x] No changelog page, no menu entry, no link to it (version pill is plain text)
- [x] Menu shows "Nos projets" > MILA under "Guides", and a "Boutique" link opening the shop in a new tab
- [x] `/pae-docs/fr/projets/mila/` and `/pae-docs/en/projets/mila/` exist
- [x] `scripts/test.sh` passes

## Implementation notes
- Internal links include base and language (`/pae-docs/fr/...`).
- `MachineCard` must keep the whole card clickable and readable on a phone.
- MILA page has `next: false`: otherwise its "next page" button pointed to the outside shop.
- Not checked in a real browser (none on this machine): the built HTML was checked instead
  (pictures, links, new-tab attributes, renamed anchors, plain-text version pill).
