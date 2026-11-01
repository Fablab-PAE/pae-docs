# Docs website: the agent kit's newest viewer

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The owner asked (2026-10-31) to upgrade every docs website to the agent kit's newest viewer (kit
`d1313da`): click a diagram or a picture (or Tab + Enter) to open it full screen, a click closes
it, double click or double tap zooms; no Enlarge button.

## Changes
- `kit docs upgrade`: the kit's viewer files (MarkdownContent.astro, diagram-zoom.mjs,
  zoom-math.mjs) and the kit comment in astro.config.mjs; files this project made its own are kept.
- Changelog: one line (when the site has a changelog page).

## Acceptance checks
- [x] `scripts/test.sh` passes, the docs build
