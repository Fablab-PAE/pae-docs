# CNC safety sheet: extraction system "recommended"

Status: approved
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The CNC safety sheet matches step 4.8 (now optional): the chip/dust extraction line says
RECOMMANDÉ instead of ACTIVATION OBLIGATOIRE (owner's answer), in the same style as the dust
mask line.
fr: "**Système d'aspiration des copeaux/poussières : RECOMMANDÉ** avant et pendant toute la
durée de l'usinage."
en: "**Chip/dust extraction system: RECOMMENDED** before and during the whole job."

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: that safety sheet line only (the laser's
  fume extraction stays mandatory).

## Acceptance checks
- [ ] fr + en: new wording in the CNC safety sheet
- [ ] `scripts/test.sh` passes
