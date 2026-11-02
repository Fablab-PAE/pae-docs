# Docs website: the agent kit's page actions, "On this page" style, theme button, picture checks

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The owner asked (2026-11-01) to give every docs website the agent kit's new docs features (kit
`53574eb`): a "Copy page" button next to each page title (copies the page as Markdown; its menu
also prints the page, and opens it in Claude / ChatGPT only on a site with a public address), a
Markdown version of every page, the "On this page" list style, a moon / sun theme button, and
pictures in several widths, checked on each build (`npm run images` fixes too-big ones).

## Changes
- `kit docs upgrade`: the kit's new files in `./src/`, the new components and `images()` in
  `astro.config.mjs`, the `images` script in `package.json`; files this project made its own
  are kept. Pages are not changed.
- Changelog: one line (when the site has a changelog page).

## Acceptance checks
- [x] `scripts/test.sh` passes, the docs build
