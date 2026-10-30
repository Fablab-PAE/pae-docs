# Graphtec plotter photo

Status: approved
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Use the owner's photo of the Graphtec CE6000-60 instead of the example photo of another brand.

## Changes
- `src/assets/img/decoupe-vinyle/graphtec_ce6000_60.png`: the owner's image (800×800 PNG,
  from aaprintsupplyco.com, link given by the owner). `plotter_exemple.jpg` deleted.
- `src/content/docs/{fr,en}/guides/decoupe-vinyle.md`: image path and caption ("Le plotter
  Graphtec CE6000-60 Plus" / "The Graphtec CE6000-60 Plus plotter"); credits line: photo
  source = aaprintsupplyco.com, diagrams made for this guide (the Wikimedia credit goes).

## Acceptance checks
- [ ] Both vinyl pages show the Graphtec photo; the old photo and its credit are gone
- [ ] `scripts/test.sh` passes
