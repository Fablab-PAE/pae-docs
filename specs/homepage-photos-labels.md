# Homepage: real machine photos and new labels

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Show real product photos of the Shapeoko 3, the Graphtec CE6000-60 Plus and the Prusa MK4
on the homepage cards (no annotated views), and change some labels, in French and English.

## Changes
- `src/assets/img/accueil/` (new): `shapeoko-3.jpg` (Carbide 3D photo, via All3DP review),
  `graphtec-ce6000.jpg` (photo from the Ace Makerspace wiki), `prusa-mk4.jpg` (Wikimedia
  Commons, "Prusa MK4.jpg" by Majkluss, CC BY-SA 4.0). Cropped to fit the cards, 900 px wide.
- `src/content/docs/{fr,en}/index.mdx`:
  - CNC, vinyl and 3D cards use these photos (vinyl no longer shows an icon). Laser card unchanged.
  - Hero: "Choisir une machine" -> "Découvrez nos machines" (en: "Discover our machines");
    the "Guide CNC" / "CNC guide" button is removed.
  - "## Nos projets et notre boutique" -> "## Découvrez les projets du local et notre
    boutique en ligne" (en: "Discover the workshop's projects and our online shop").
  - Short "Crédits photos" / "Photo credits" line at the bottom with the source of each photo
    (required by the Prusa photo's licence, and fair to the others).
- `astro.config.mjs`: sidebar label "Boutique" -> "Lien vers notre boutique"
  (en: "Link to our shop").

## Acceptance checks
- [ ] Homepage cards show the 3 real product photos (no annotations), fr + en
- [ ] Hero has a single button "Découvrez nos machines" / "Discover our machines" that jumps to the machines
- [ ] Section title and menu label read exactly as asked
- [ ] Photo credits shown on both homepages
- [ ] `scripts/test.sh` passes

## Implementation notes
- Only the Prusa photo is under a free licence. The Shapeoko and Graphtec photos belong to
  their authors: credited, and the owner is told they can be swapped for the FabLab's own photos.
