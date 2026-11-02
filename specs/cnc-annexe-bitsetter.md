# CNC guide: BitSetter section moved to the appendices (D)

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The "Module BitSetter (changement de mèches)" section (between "Logiciels à utiliser" and
"1. Mise sous tension") becomes appendix "D. Le module BitSetter" after A, B, C (fr + en),
so the guide gets to the steps faster. "Référence matérielle" keeps a clear mention of the
BitSetter with a link to appendix D ("à lire avant votre premier usinage").
Owner's choice for "Versions installées à l'atelier": stays in the hardware section
(recommended: it lists the machine, firmware and software, not only the BitSetter) or moves
with the rest.

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`:
  - cut the section; paste it after appendix C as `### D. Le module BitSetter` /
    `### D. The BitSetter module`, its sub-headings one level lower (`####`: what it is
    for, where it is, when the machine moves on its own, golden rules, documentation);
    content unchanged;
  - "Référence matérielle", BitSetter bullet: "Module BitSetter : capteur fixé à l'avant
    droit de la machine qui mesure automatiquement la longueur de la mèche, pour pouvoir
    utiliser plusieurs mèches dans un même usinage. Son fonctionnement, quand la machine
    bouge toute seule et ses règles d'or sont expliqués dans l'annexe D (à lire avant votre
    premier usinage)." with the link;
  - "Versions installées à l'atelier" (table + note): per the owner's choice, at the end of
    "Référence matérielle" (`###`) or inside appendix D.
- Existing links (diagram, appendix A/B, BitSetter section) updated; the test checks every
  same-page link.

## Acceptance checks
- [ ] fr + en: no BitSetter section before step 1; appendix D after C; mention + link in
      "Référence matérielle"
- [ ] `scripts/test.sh` passes (links, diagram)
- [ ] Not pushed to GitHub
