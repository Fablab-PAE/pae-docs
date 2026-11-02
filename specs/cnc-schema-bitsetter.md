# CNC guide: BitSetter warning as a danger box; job diagram at the start of section 4

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. In 4.5 (fixing the board), "Ne placez aucune cale ni aucun objet devant ou à côté du
   BitSetter (avant droit de la machine) : la toupie doit pouvoir y aller librement" becomes a
   red danger box (fr + en).
2. If the owner agrees (recommended): the diagram "Le déroulement en un coup d'œil" moves from
   the BitSetter part to the start of section 4 (before 4.1), same title, legend and
   explanation. The BitSetter part keeps one sentence linking to it.

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`:
  - 4.5: the sub-bullet becomes `:::danger[Attention]` with the same text (after the bullet
    about the fixing blocks);
  - option "move": cut "### Le déroulement en un coup d'œil" (heading, intro, diagram,
    legend, explanation) from the BitSetter part; paste it right after "## 4. Utilisation du
    logiciel Carbide Motion" in place of the line "Pour une vue d'ensemble, voir le schéma…";
    its intro says the steps follow (4.1 to 4.10) and the bit change is in appendix A
    (link); in the BitSetter part, where it was: "Le déroulement complet d'un usinage avec le
    BitSetter est résumé par un schéma au début de la section 4 : [Le déroulement en un coup
    d'œil](#...)". The anchor stays the same.

## Acceptance checks
- [x] Danger box in 4.5, fr + en
- [x] (move) diagram at the start of section 4; link from the BitSetter part works
- [x] `scripts/test.sh` passes (diagram builds, same-page links checked)
- [x] Not pushed to GitHub
