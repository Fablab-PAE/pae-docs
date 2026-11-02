# CNC guide: lowering the head on the Z axis (wording)

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
4.6 caution box: "Faites attention lors de l'abaissement de la tête avec la mèche sur l'axe
des Z. Un contact trop brusque pourrait endommager la mèche ou la planche." (owner's text).
en: "Be careful when lowering the head with the bit on the Z axis. Too abrupt a contact could
damage the bit or the board."

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: that sentence only.

## Acceptance checks
- [ ] fr + en: new wording
- [ ] `scripts/test.sh` passes
