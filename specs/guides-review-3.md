# Guides review 3 (vinyl images, 3D printing edits)

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Illustrate the vinyl cutter guide and apply the owner's three 3D printing edits, fr + en.

## Changes
- Vinyl images in `src/assets/img/decoupe-vinyle/` (the Graphtec manual forbids reproduction,
  so nothing is taken from it):
  - `plotter_exemple.jpg`: "Plotter - Fab LAB Newton" by Vivian Guerra Moreira, Wikimedia
    Commons, CC BY-SA 4.0 (credited on the page; labelled as another model).
  - Own SVG diagrams, one file per language (`*_fr.svg`, `*_en.svg`), white background so they
    read in light and dark mode:
    - `rouleaux`: top view, push rollers on the vinyl edges above the grit rollers (step 2)
    - `lame`: blade depth through vinyl / adhesive / backing (step 3)
    - `test_coupe`: the three test cut results (step 4)
    - `echenillage`: cut, weed, transfer tape, apply (step 7)
- `src/content/docs/{fr,en}/guides/impression-3d.md`:
  - firmware line: "à vérifier et mettre à jour périodiquement"
  - slicer glossary: other slicers (OrcaSlicer, Bambu Studio) can also be used
  - after "Retirez les supports et la bordure...": red `:::danger` box: wear safety glasses when
    removing plastic.
- Changelog: none (the owner removed the changelog pages in homepage-projects-store).

## Acceptance checks
- [x] Images show on both vinyl pages, each in the page's language
- [x] The three 3D edits in both languages
- [x] `scripts/test.sh` passes
