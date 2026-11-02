# CNC guide: firmware update moved to the appendices (C)

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The "Utilisateurs avancés" firmware update text leaves "Référence matérielle" and becomes
appendix C, after A and B (fr + en). Same text and link; small typography fixes only
("avancés :", one double space).

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`:
  - remove the "Utilisateurs avancés" bullet and its sub-bullet from "Référence matérielle";
  - add after appendix B: `### C. Mettre à jour le firmware (utilisateurs avancés)` /
    `### C. Updating the firmware (advanced users)` with the same sentence and the "GRBL 1.1h
    (mise à jour depuis la version 1.1f)" line and its "Lien Firmware" link (new tab).

## Acceptance checks
- [x] fr + en: no firmware bullet left in "Référence matérielle"; appendix C with the text and link
- [x] `scripts/test.sh` passes
