# CNC guide: owner's wording edits

Status: docs
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Apply the owner's list of text edits to the CNC guide (fr + en): softer wording, fewer details,
no install section, no purchase link.

## Changes
`src/content/docs/fr/guides/cnc-machine.md` and the same in `en/`:
- Work area: remove the "sticky papers at the 4 corners" bullet; surface becomes "about 30" x 27"".
- BitSetter "what for": new example (big bit to remove material fast, then thin bit for a small
  drawing); remove "you only set the zero once, at the start".
- Danger box title -> "soyez vigilant aux déplacements de la machine"; text -> "lorsque vous
  touchez au zéro Z, considérez que la machine pourrait se mettre en mouvement" (the 3 bullets stay).
- Golden rule 4: last sentence -> "Rien ne doit se trouver sur le bouton du BitSetter avant de
  commencer." Golden rule 5: remove the sentence pointing to the install section.
- Links: "Télécharger ou mettre à jour Carbide Create et Carbide Motion"; remove the purchase
  link; heading "Documentation et achat" -> "Documentation".
- Remove the whole "Installation et réglage (utilisateurs avancés)" section, and delete its two
  images `bitsetter_03.jpg` and `bitsetter_05.jpg` (used nowhere else).
- Clamps caution: add "et lors du calibrage de l'axe Z avec le BitSetter".
- Remove the "Astuce: noter la position" note and its image `cnc_37.png` from the page
  (the image file itself stays).
- Speed step: "Régler **manuellement** la molette...".
- Mid-job bit change step 5: "régler la molette de la toupie pour choisir la vitesse de la
  nouvelle mèche, allumer la toupie, puis cliquer sur OK".
- "Pour aller plus loin": "Bon à savoir : un adaptateur imprimé en 3D peut être installé ...
  au lieu de réaliser une opération d'usinage."
- Accents fixed in the owner's text (matière, à jour, à savoir, être, déplacements).

## Acceptance checks
- [ ] Every item of the owner's list applied in fr and en
- [ ] No link or image left pointing to the removed section or images
- [ ] `scripts/test.sh` passes
