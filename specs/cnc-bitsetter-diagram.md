# CNC guide: diagram of the BitSetter machining flow

Status: docs
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Add a diagram (a ```mermaid block, drawn by pele at build time) to the CNC guide, fr + en, that
shows the whole machining flow with the BitSetter, for one bit or for two bits (bit-change loop).

## Changes
`src/content/docs/fr/guides/cnc-machine.md` and the same in `en/`:
- New `### Le déroulement en un coup d'œil` / `### The process at a glance` in the BitSetter
  section, after "Où se trouve-t-il ?" / "Where is it?":
  - a `flowchart TD` with 4 groups: 1. prepare and set the zero, 2. start the job,
    3. change the bit, 4. end; a decision "does the file need another bit?" with a "yes" loop
    (stop, insert tool, measure, back to the speed message) and a "no" exit (end of job);
  - colours from the site theme classes: default blue = what you do, `queue` orange = a Carbide
    Motion message waits for you, `risk` red = the machine moves on its own, `new` green =
    machining (router on);
  - a short legend of the colours and one sentence on 1 bit vs 2 bits.
- Section 4 (Carbide Motion): one line at the top pointing to the diagram.

## Acceptance checks
- [ ] Diagram drawn in both languages (build has no diagram error), readable in light and dark
- [ ] The diagram matches the steps written in section 4
- [ ] `scripts/test.sh` passes
