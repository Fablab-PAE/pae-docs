# CNC guide: machine initialisation path and end-of-job steps (owner's text)

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The CNC guide (fr + en) describes what the machine does now (owner's text):
1. "Initialize machine": the machine goes first to the back of the machine, then to the front.
2. End of the job: a "Please turn spindle off" message shows; switch the router off; clicking
   OK sends the machine back to the back right corner.
3. The old step "Une fois la machine arrêtée, éteindre la toupie..." goes (now part of 2).

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`:
  - caution box after "Cliquer sur Initialize machine": "Lorsque vous cliquez sur
    “Initialize machine”, la machine va se déplacer automatiquement en position initiale en
    allant d’abord au fond de la machine, puis en se positionnant devant. Il ne faut donc pas
    qu’elle rencontre des objets ou obstacles sur son chemin !" (bold kept on the key words);
  - "Fin de l'usinage" danger box: "Dès que l’usinage est terminé, un message s’affiche
    `Please turn spindle off` : vous pouvez alors éteindre l’interrupteur de la toupie. En
    cliquant sur OK, la machine va alors se replacer automatiquement au fond à droite : rien
    (cales, objets, mains) ne doit donc se trouver sur le chemin de la toupie !" (small typos
    of the draft fixed: éteindre, l’interrupteur, « droite : »);
  - the bullet "Une fois la machine arrêtée, éteindre la toupie..." removed;
  - the job-flow diagram, part "4. Fin": "Please turn spindle off : éteindre la toupie → OK"
    then "La machine retourne seule au fond à droite" (same order as the text).
  - English: faithful translation of the same changes.

## Acceptance checks
- [ ] fr + en: the 3 changes, and the diagram in the same order
- [ ] `scripts/test.sh` passes (the diagram builds)
