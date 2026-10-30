# Vinyl guide edits

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Apply the owner's review of the vinyl cutter guide, in French and English.

## Changes
`src/content/docs/{fr,en}/guides/decoupe-vinyle.md`:
- Remove: blade/plunger handling bullet (safety); the two tool holders list (hardware);
  half cut and cut-through glossary entries; media sensor bullet (work area); "thin paper"
  (allowed); "high-intensity reflective film" (forbidden); "('|' side)"; the 20-second note;
  the weeding "Advice" note; the change-origin bullet; the pen bullet (going further).
- Media type step: tell users to choose **[2] ROLL-2 CURRENT POSITION** only.
- Software: Graphtec Studio 2, with the download link https://www.graphteccorp.com/download/gs2_w/
- Follow-on fix: the blade step said "tool holder 1 (back)", which no longer exists in the
  guide: say "put the blade holder back in its place" instead.
- Changelog (fr + en): one line.

## Acceptance checks
- [ ] Every removed sentence is gone from both languages, nothing else removed
- [ ] Option 2 and the Graphtec Studio 2 link appear in both languages
- [ ] `scripts/test.sh` passes
