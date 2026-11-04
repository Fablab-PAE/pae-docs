# CNC guide: Carbide Motion and Carbide Create release dates, then publish

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The version table of the CNC guide (fr + en) says when Carbide Motion build 667 was released
(1 August 2026) and that the FabLab uses Carbide Create build 876, released on 12 October 2026.
Then the site is published (owner's request).

Dates from the owner: 8-1-2026 and 10-12-2026, month first. The official list
(https://files.carbide3d.com/builds.json, stable builds) gives the same numbers and dates.

## Not doing
- No change to the guide's steps or screenshots. The Carbide Create section was written for
  V7 build 778 and cannot be checked against V8 from here: flag this to the owner.
- No change to the date Carbide Motion was updated at the FabLab (2 November 2026): it is a
  different fact from the release date, so both are shown.

## Changes
- `src/content/docs/fr/guides/cnc-machine.md`, "Versions installées à l'atelier":
  - Carbide Motion: **V6**, build **667** (sorti le 1er août 2026, mis à jour à l'atelier le 2 novembre 2026)
  - Carbide Create: **V8**, build **876** (sorti le 12 octobre 2026)
- `src/content/docs/en/guides/cnc-machine.md`, "Versions installed at the FabLab":
  - Carbide Motion: **V6**, build **667** (released on 1 August 2026, updated at the FabLab on 2 November 2026)
  - Carbide Create: **V8**, build **876** (released on 12 October 2026)
- V7 becomes V8 because build 876 is a V8 build (Carbide 3D's download page for the current
  stable build is titled "Download Carbide Create V8"). Leaving V7 would make the table wrong.
- After the merge: `kit test` on `main`, then `git push origin main` (owner's OK in the request).

## Acceptance checks
- [ ] fr + en: Carbide Motion release date, Carbide Create V8 build 876 and its release date
- [ ] No mention of build 778 left in the guide pages
- [ ] `scripts/test.sh` passes
- [ ] `main` pushed; the GitHub Pages build for that save succeeds
