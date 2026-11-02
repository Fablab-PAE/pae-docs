# Docs website: Claude / ChatGPT in the page actions on every page (agent kit update)

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The owner asked (2026-11-01) for "Open in Claude" / "Open in ChatGPT" in the page actions of every
docs website (kit `0943666`): on a site with no public address, the item copies the page and opens
the service with a prompt; the reader pastes the page (Ctrl+V). Also the kit's picture check fix
(sharp loaded with the config, for Astro 5).

## Changes
- `kit docs upgrade`: the kit's new files in `./src/`, the new components and `images()` in
  `astro.config.mjs`, the `images` script in `package.json`; files this project made its own
  are kept. Pages are not changed.
- Changelog: one line (when the site has a changelog page).

## Acceptance checks
- [x] `scripts/test.sh` passes, the docs build
