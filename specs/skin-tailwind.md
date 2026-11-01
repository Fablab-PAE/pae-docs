# Test switch: Tailwind / Flowbite look vs Starlight's own look

Status: ready to merge
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
A small floating button (bottom right) switches the whole site between today's look
(Starlight / Astro) and a Tailwind / Flowbite look, so the owner can compare. The choice is
remembered in the browser. The button shows only on the local preview: on the public site
(fablab-pae.github.io) there is no button and the site always has its normal look.

## Not doing
- No Tailwind install (owner's choice): the look is copied in plain CSS with Tailwind's
  colour values and Flowbite's component shapes.
- Print is not changed.

## Current situation
Site styles: `src/styles/custom.css` (`customCss` in `astro.config.mjs`). Head scripts in
`public/` (`sidebar-open.js`, `print.js`). Starlight's colours are CSS variables
(`--sl-color-*`), most components read them.

## Changes
- `public/skin.js` (new, loaded first in `head`): if the host is not `fablab-pae.github.io`
  and the saved choice (localStorage `pae-skin`, read in try/catch) is `tailwind`, sets
  `data-skin="tailwind"` on `<html>` before the page shows (no flash). On non-public hosts,
  adds the floating button "Style : Astro" / "Style : Tailwind" (current look); a click
  switches, saves and updates the label.
- `src/styles/skin-tailwind.css` (new, in `customCss` after `custom.css`): every rule under
  `:root[data-skin='tailwind']`, so nothing changes without the switch:
  - colours: Tailwind gray scale and blue accent (blue-700 / blue-600, blue-100 light;
    blue-500 / blue-300 / blue-900 dark), light and dark mode;
  - top bar: white / gray-800, gray-200 bottom border; search box rounded-lg with border;
  - side menu: links rounded-lg, hover gray-100, current page gray-100 + bold dark text
    (Flowbite sidebar) instead of the filled accent;
  - buttons (hero button, print buttons): Flowbite button: rounded-lg, blue-700, hover
    blue-800, font-medium, focus ring;
  - homepage cards and safety sheet: rounded-lg, gray-200 border, shadow-sm, hover shadow-md;
  - info / warning boxes: Flowbite alerts: rounded-lg, no side bar, pale background,
    coloured text;
  - tables: Flowbite table: small text, uppercase grey header row, rows with bottom border;
  - headings bold and tight; inline code rounded on gray-100; version pill as Flowbite blue badge.
- `astro.config.mjs`: add `skin.js` (first head script) and `skin-tailwind.css`.
- `AGENTS.md`: mention the test switch (how to remove it: delete the 2 files and their
  2 lines in the config).

## Tests to add or update
- `scripts/check-site.mjs pages`: `public/skin.js` keeps the public-site guard
  (mentions `fablab-pae.github.io`), and every rule of `skin-tailwind.css` is under
  `[data-skin='tailwind']`.
- Link check already covers `skin.js` being in the build.

## Acceptance checks
- [ ] Local preview: button bottom right; click switches the look, remembered after reload
- [x] Public host: no button, normal look (guard in the script)
- [x] Without the switch, the site looks exactly as before
- [x] `scripts/test.sh` passes
