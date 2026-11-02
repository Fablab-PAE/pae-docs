# CNC guide: no more "mains hors de la machine" mentions

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Owner's request: remove the "mains hors de la machine" / "hands out of the machine" mentions
(CNC guide, fr + en); the Zero All box reads "Gardez la toupie éteinte."
Kept: the "keep hands away from moving parts" rules (safety sheets, vinyl, 3D printing).

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`:
  1. diagram legend: "Rouge : la machine bouge toute seule" (no bracket);
  2. 4.6 Zero All box: "Gardez la toupie éteinte." / "Keep the router off.";
  3. 4.9 OK box: "Toupie éteinte !" / "Router off!";
  4. appendix A step 4: "(toupie toujours éteinte)" / "(router still off)";
  5. if the owner agrees: appendix D, "Avant chacune de ces actions" list, the item
     "retirez vos mains de la machine ;" / "take your hands out of the machine;" removed.

## Acceptance checks
- [ ] fr + en: no "mains hors de la machine" / "hands out of the machine" left
- [ ] `scripts/test.sh` passes
