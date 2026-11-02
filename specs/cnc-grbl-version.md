# CNC guide: firmware version GRBL 1.1h in the versions table, then publish

Status: approved
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The "Versions installées à l'atelier" table says GRBL **1.1h** (was "1.1"), matching
appendix C. Then publish everything waiting (owner's request): push `main` to GitHub.

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: table row "Firmware | GRBL **1.1h**".
- After the merge: tests on `main`, `git push origin main`, check the public site.

## Acceptance checks
- [ ] fr + en: GRBL 1.1h in the table
- [ ] `scripts/test.sh` passes
- [ ] `main` pushed; public site shows the change
