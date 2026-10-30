# CNC guide: horizontal BitSetter diagram

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The owner wants the BitSetter flow diagram of the CNC guide horizontal instead of vertical.

## Changes
`src/content/docs/fr/guides/cnc-machine.md` and the same in `en/` (the ```mermaid block only):
- `flowchart TD` -> `flowchart LR`: the 4 phases go left to right, the decision sits between
  phase 2 and phases 3 / 4.
- Steps inside each phase stay stacked (`direction TB` in each subgraph). For that, the links
  between phases go from group to group (prep --> run, run --> decision, decision --> change /
  fin, change --> run labelled "retour au message vitesse" / "back to the speed message"):
  Mermaid ignores a group's own direction when its boxes are linked to the outside.
- Same boxes, texts and colours as today. A fully single-line LR version was tried: ~3500 px
  wide, unreadable in the page column.

## Acceptance checks
- [ ] Diagram drawn horizontally in both languages, same steps and colours
- [ ] `scripts/test.sh` passes
