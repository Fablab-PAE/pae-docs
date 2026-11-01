# Guide print button: right of the title, label "Imprimer"

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On guide pages, the print button sits on the right of the page title (same line), and its
label is "Imprimer" (en: "Print").

## Changes
- `src/components/PageTitle.astro`: on guide pages, the title and the button are wrapped in
  `<div class="guide-title-row">`; labels "Imprimer" / "Print". Other pages: title only, as now.
- `src/styles/custom.css`: `.guide-title-row` is a flex row (title left, button right,
  vertically centred, wraps under the title on a narrow screen); the button's `margin-top`
  matches the title's so they line up; the button never shrinks or breaks its label.

## Acceptance checks
- [x] Guide pages: button on the title's line, at the right, label "Imprimer" / "Print"
- [x] Other pages unchanged
- [x] `scripts/test.sh` passes
