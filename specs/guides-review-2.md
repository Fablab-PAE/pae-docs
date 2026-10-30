# Guides review 2 (vinyl link, 3D printing edits and images)

Status: approved
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Apply the owner's second review, in French and English.

## Changes
- `src/content/docs/{fr,en}/guides/decoupe-vinyle.md`: in "Référence matérielle", link to the
  machine's presentation page (archived Graphtec page on web.archive.org).
- `src/content/docs/{fr,en}/guides/impression-3d.md`: the owner's list of replacements and
  removals (safety, hardware, glossary, print area, materials, step 1, PrusaSlicer title without
  version, USB key location, print sheet, emergency aside, tidying up, maintenance). Links to
  https://help.prusa3d.com/downloads/mk4 for the latest PrusaSlicer and the latest firmware.
  Frontmatter description without the PrusaSlicer version.
- Images from the official Prusa MK4 handbook 1.03 (no reproduction ban in it), credited to
  Prusa Research, in `src/assets/img/impression-3d/`:
  - `prusa_mk4_vue_ensemble.jpg` (printer overview, numbered, with the 15-item legend)
  - `prusaslicer_interface.jpg` (PrusaSlicer window, numbered, with the 14-item legend)
  - `filament_coupe.jpg`, `filament_insertion.jpg` (loading filament)
  - `retrait_piece.jpg` (removing the part)
- Changelog (fr + en): one line.

## Acceptance checks
- [ ] Every requested replacement/removal done in both languages, nothing else removed
- [ ] Images show on both language pages (link check covers them)
- [ ] `scripts/test.sh` passes
