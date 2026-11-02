# CNC guide: two Carbide Motion 667 screenshots (RPM change, spindle off)

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The CNC guide (fr + en) shows the owner's two Carbide Motion build 667 screenshots where
they happen:
1. "RPM Change - Please set RPM to 16000 (Set speed dial to 3)": under the job-start step
   "Un message s'affiche ensuite avec la vitesse de rotation à utiliser pour cette mèche".
2. "RPM Change - Please turn spindle off": in "Fin de l'usinage", under the danger box.
Not published to GitHub until the owner says so.

## Changes
- `src/assets/img/guide-cnc/cnc_rpm_change.png`, `cnc_spindle_off.png`: the owner's
  screenshots (1433x851 px, ~100 KB: within the picture rules; `npm run images` run anyway).
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: the two pictures, with a descriptive alt
  text (fr / en), at the places above, in the guide's usual picture style.
- Credits: covered by "Autres photos et captures d'écran : atelier RoboTic" (CNC row).

## Acceptance checks
- [ ] Both pictures at the right places, fr + en
- [ ] `scripts/test.sh` passes (picture rules, links)
- [ ] Not pushed to GitHub
