# CNC guide: Carbide Motion build 667 (updated 2 November 2026), then publish

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The CNC guide (fr + en) shows the Carbide Motion version now installed at the workshop:
V6 build 667, updated on 2 November 2026. Then the site is published: push `main` to
GitHub, which deploys https://fablab-pae.github.io/pae-docs/ (owner's request).

## Not doing
- No change to the guide's steps: no release notes for build 667 were found (searched
  2026-11-02; the Carbide 3D forum lists builds up to 664 beta), and the steps cannot be
  checked on the machine from here. The note under the table says what was checked.

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`, "Versions installées à l'atelier":
  - table: Carbide Motion **V6**, build **667** (mis à jour le 2 novembre 2026 / updated on
    2 November 2026);
  - note: per the owner's answer, either "this guide describes build 667" (steps checked by
    the owner) or "written with build 653; if a screen differs, tell the trainer".
- After the merge: `scripts/test.sh` on `main`, then `git push origin main` (owner's OK in
  the plan question). GitHub Actions (`deploy.yml`) then publishes the site in a few minutes.

## Acceptance checks
- [ ] fr + en: build 667, date, note
- [ ] `scripts/test.sh` passes
- [ ] `main` pushed; GitHub has the same last save as the real project
