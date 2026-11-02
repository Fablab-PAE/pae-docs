# CNC guide: paper gauge note (wording)

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
4.6 note: "Utilisez une feuille de papier standard comme jauge d'épaisseur. La mèche doit tout
juste pincer le papier sans le déchirer et le papier doit pouvoir bouger légèrement même sous
la pression de la mèche." (owner's text).
en: "Use a standard sheet of paper as a thickness gauge. The bit should just pinch the paper
without tearing it, and the paper should still be able to move slightly under the pressure of
the bit."

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: that note only.

## Acceptance checks
- [x] fr + en: new wording
- [x] `scripts/test.sh` passes
