# CNC guide: why metal is not machined

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
"Matériaux usinables" > Métal says why metal is not machined (owner's text, reworded):
fr: "**Non usinable** : nous ne mélangeons pas l'usinage du bois et du métal sur cette
machine, pour éviter les risques d'incendie (des copeaux de métal chauds peuvent enflammer la
sciure de bois)." The text in brackets only if the owner wants it.
en: "**Non-machinable**: we do not mix wood and metal machining on this machine, to avoid
fire risks (hot metal chips can set wood dust on fire)."

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: the Métal / Metal sub-bullet only.

## Acceptance checks
- [ ] fr + en: new wording
- [ ] `scripts/test.sh` passes
