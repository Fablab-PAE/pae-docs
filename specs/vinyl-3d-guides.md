# Vinyl cutter and 3D printer guides

Status: planning
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Replace the two "guide being written" pages with real guides, in French and English, in the
same style as the CNC and laser guides:
- Vinyl cutter: Graphtec CE6000-60 Plus, software Graphtec Studio.
- 3D printer: Original Prusa MK4, software PrusaSlicer 2.9.6.

## Not doing
- No photos of our own machines (we have none yet): text only, like a guide before its
  screenshots are added. No placeholder images.
- Manufacturer manuals are linked (official URLs), not copied into `public/pdf/` (the
  Graphtec manual forbids reproduction).
- No change to the sidebar (both pages already exist and are listed).

## Current situation
`src/content/docs/{fr,en}/guides/decoupe-vinyle.md` and `impression-3d.md` only hold a
"being written" caution box, and their description wrongly says "machine de gravure laser".
The homepage cards say "Guide en cours de rédaction / Guide being written".

## Changes
- `src/content/docs/fr/guides/decoupe-vinyle.md` + `en/`: full guide. Sections, following the
  laser/CNC structure: intro; Sécurité personnelle (blade handling, hands away from the
  carriage, never touch the blade when on); Référence matérielle (CE6000-60 Plus, max cut width
  603 mm, media 50-712 mm wide, film up to 0.25 mm, blade plunger 0.9 mm blue cap, cut force
  38 steps, speed 1-60 cm/s, USB link, manual link); Glossaire (vinyle adhésif, support,
  mi-chair/half cut, découpe complète, échenillage/weeding, transfert, offset); Zone de travail;
  Matériaux (allowed: adhesive vinyl, flex/flock transfer, paper/cardboard thin; not allowed:
  >0.25 mm, curled media); Processus; 1. Mise sous tension; 2. Chargement du vinyle (sheet/roll,
  push rollers on grit rollers, lever, media type ROLL-1/ROLL-2/SHEET); 3. Réglage de la lame
  (blade length < media thickness, 0.1 mm per graduation); 4. Conditions + test de coupe
  (COND/TEST, force/speed, CUT TEST, reading the result); 5. Graphtec Studio (import SVG,
  size, mirror for heat transfer, send to plotter); 6. Origine + lancement; Pause / arrêt
  (PAUSE/MENU, CONTINUE / QUIT JOB); 7. Échenillage et transfert; 8. Nettoyage / rangement;
  Entretien; Dépannage; Pour aller plus loin.
- `src/content/docs/fr/guides/impression-3d.md` + `en/`: full guide. Sections: intro; Sécurité
  (hot nozzle/bed, moving parts, never under the bed, never unattended, ventilate, magnetic
  sheet); Référence matérielle (MK4, volume 250×210×220 mm, nozzle 0.4 mm, filament 1.75 mm,
  Nextruder + Loadcell auto bed leveling, rotary knob + reset button, manual links FR/EN);
  Glossaire (slicing, G-code/.bgcode, couche, remplissage, supports, bordure/brim, PEI sheet);
  Zone d'impression; Matériaux (PLA recommended 215/60 °C, PETG 240/85 °C with glue stick on
  smooth sheet; ASA/ABS not allowed without enclosure/ventilation - our rule to confirm);
  Processus; 1. Préparer le modèle (STL/3MF/STEP, Printables, Tinkercad); 2. PrusaSlicer 2.9.6
  (printer Original Prusa MK4, filament, layer height 0.15/0.20, infill 10-20 %, supports,
  brim, place on face, slice, check preview, export G-code to USB); 3. Préparer l'imprimante
  (power switch at the back, clean sheet with IPA, sheet on the pins); 4. Charger le filament
  (Filament > Load); 5. Lancer l'impression (USB, Print menu, first layer watch, Tune > Speed);
  Arrêt; 6. Retirer la pièce (wait for cooling, bend sheet, plastic spatula); 7. Décharger /
  éteindre; Entretien; Dépannage (first layer peeling, no extrusion, USB not detected,
  homing failed); Pour aller plus loin.
- Both pages: real `description` in the frontmatter.
- `src/content/docs/{fr,en}/index.mdx`: vinyl and 3D cards lose "Guide en cours de rédaction";
  descriptions name the machine and software like the other cards.
- `src/content/docs/{fr,en}/changelog.md`: dated entry.

## Tests to add or update
`scripts/check-site.mjs pages`: add a check that no guide still holds the "being written"
caution ("La rédaction de ce guide est actuellement en cours" / "This guide is currently being
written") and that every page has a non-empty `description`. Existing checks cover links,
fr/en pairs and the build. No database or outside service involved.

## Acceptance checks
- [ ] Both guides exist in fr and en, same sections in the same order
- [ ] Facts match the manuals (sizes, temperatures, menu names)
- [ ] Homepage cards updated in both languages
- [ ] `scripts/test.sh` passes, including the new check

## Implementation notes
Sources: Graphtec CE6000 User's Manual CE6000-UM-154 (chapters 2, 3, 12, 13, appendix A),
Prusa MK4/MK3.9 handbook 1.03 (fr + en). Graphtec Studio is not described in the cutter
manual: keep that section short and general, and say button names can vary with the version.
Use Starlight asides (`:::note`, `:::caution`, `:::danger`) like the existing guides.
