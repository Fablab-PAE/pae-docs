# CNC guide: BitSetter module (several bits in one job)

Status: docs
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The FabLab bought a BitSetter for the Shapeoko 3 XXL. Update the CNC guide (fr + en) so members
can run a job that uses several bits: what the BitSetter is, when the machine moves on its own,
the new Carbide Motion steps (Zero All, Start, "insert tool" and speed prompts, mid-job bit
change, end of job, re-run), with danger warnings and official Carbide 3D illustrations.

## Not doing
- No new page, no sidebar change: everything stays in `guides/cnc-machine.md`.
- No new screenshots of our own Carbide Motion (build 653): we can't take them from here.
  Existing screenshots (build 566) stay; official manual figures are added where useful.
- No change to the other guides, homepage or styles.

## Current situation
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: one long guide. Section 4 (Carbide Motion)
  tells members to switch the router ON before START JOB, then START, START, Resume. It sets
  zero with "Set Zero" then "Done", and on RUN selects "Set current location as zero".
- Images live in `src/assets/img/guide-cnc/` (`cnc_NN.png`).

## Checked against official sources
- BitSetter Installation and Setup Guide v2.0 (my.carbide3d.com/pdf/bitsetter-v2.pdf):
  mounts on the FRONT endplate, ~114 mm (4.5") from the right (Y2) edge for belt-drive Z;
  plugs into the "Reserved" port of a v2.4d/e board; Settings > BitSetter > Enabled +
  "Use Current Location"; bit must stick out at least 0.5" (12.7 mm) from the collet;
  re-run the setup if the BitSetter is moved; Carbide Create posts tool numbers by default.
- Carbide 3D blog "BitSetter changes in Carbide Motion" (from build 623, Feb 2024) + staff post:
  the tool is measured when a Z zero is set (Zero All / Zero Z / BitZero), then the spindle
  returns to the previous X/Y, retracted to the top; also measured when a job starts; no
  measurement at Initialize any more. Staff: "any time you do anything to affect a Z zero,
  the machine will take off moving." -> matches the owner's notes for build 653.
- Community/staff: change bits only when Carbide Motion asks; switch the router off at its
  switch before a tool change.
- Shop: variant 39303096893501 in the owner's notes is the **Shapeoko 4** BitSetter (long bar);
  the square Shapeoko 3 version is variant 39303096860733 -> the guide uses the latter.

## Changes
- `src/assets/img/guide-cnc/`: add official Carbide 3D pictures (credited under each image):
  - `bitsetter_01.jpg` product photo (square Shapeoko 3 BitSetter, shop.carbide3d.com)
  - `bitsetter_02.jpg` manual fig. 2: BitSetter on the front endplate
  - `bitsetter_03.jpg` manual fig. 4: side view, slid over the endplate (installation)
  - `bitsetter_04.jpg` manual fig. 5: bit above the BitSetter (measurement)
  - `bitsetter_05.jpg` manual fig. 22: Carbide Motion Settings > BitSetter
  - `bitsetter_06.jpg` manual fig. 23: "Tool Change Required / Please insert a tool" prompt
- `src/content/docs/fr/guides/cnc-machine.md` (and the same in `en/`):
  - Personal safety: add "switch the router off before touching the bit".
  - Hardware reference: add a BitSetter bullet pointing to the new section.
  - New `## Module BitSetter (changement de mèches)` after "Logiciels à utiliser":
    what it does (benefit vs. one file per bit before), where it is (photos), when the machine
    moves by itself (danger box), golden rules (router off during measurement, change bits only
    on a prompt, bit sticks out >= 12.7 mm, keep the button clean, don't move it), prerequisites
    table (Shapeoko 3 XXL belt-drive Z, board v2.4e, GRBL 1.1, Carbide Motion V6 build 653,
    Carbide Create V7 build 778), documentation and purchase links, and an "advanced users"
    install & calibration summary (114 mm, Reserved port, Enabled + Use Current Location).
  - Section 3 (Carbide Create): multi-bit tips (one bit per toolpath, group toolpaths by bit,
    list order = cutting order, note the bits in order); save the `.c2d` (Carbide Motion V6
    opens it directly; G-code export still possible).
  - Section 4 (Carbide Motion), rewritten where the BitSetter changes things:
    - check the BitSetter area is clear and the button clean; install the FIRST bit of the file,
      router off;
    - clamps placed AFTER Initialize (kept), nothing near the BitSetter;
    - zero: Set Zero -> **Zero All** (danger: the machine goes to the BitSetter at once, measures,
      comes back raised; Z shows e.g. +30, this is normal, don't zero again) -> Done;
    - RUN -> Load New File -> `.c2d` -> Done (remove "Set current location as zero");
    - remove "switch the router ON before START" -> danger box: router stays OFF;
    - START JOB -> START (machine goes next to the BitSetter even if the bit is in place) ->
      "Please insert tool" -> check bit, OK (measurement, router off) -> speed prompt -> set dial,
      switch router ON -> OK = cutting starts (danger boxes);
    - new "Changement de mèche pendant l'usinage" steps (router OFF and stopped before opening
      the cover, bit may be hot, OK = measurement, speed prompt, router ON, OK);
    - new "Fin de l'usinage" (machine returns back-right by itself, path must be clear, router OFF);
    - new "Refaire le même usinage" (RUN > Quick Actions > Move cutter above current XY zero > YES,
      then START JOB again; redo the zero if the board moved).
  - Section 5 (cleaning): vacuum around the BitSetter button; remove the duplicate
    "Éteindre le système de ventilation" line.

## Tests to add or update
None new: `scripts/test.sh` already checks fr/en twins, astro check, the build, and that every
image and internal link points to a real file (covers the 6 new images). No database, no
outside service.

## Acceptance checks
- [ ] fr and en pages have the same sections and the same 6 new images
- [ ] No step tells members to switch the router on before the bit is measured
- [ ] Every automatic movement (Zero All, Start, OK after insert, end of job, Quick Action YES)
      has a caution/danger box
- [ ] Shop link uses the Shapeoko 3 variant (39303096860733)
- [ ] Official images are credited to Carbide 3D
- [ ] `scripts/test.sh` passes

## Implementation notes
- Keep the guide's style: short bullets, bold keywords, `![Illustration](...)` images,
  Starlight asides `:::note`, `:::tip`, `:::caution`, `:::danger[...]`.
- External links: `<a href=... target="_blank" rel="noopener noreferrer">`, like the rest.
- Button names stay in English as shown in Carbide Motion.
