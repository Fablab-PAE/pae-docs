# Homepage sections: new order, fewer sections

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Homepage (fr + en) sections, in this order: machines, before using a machine, projects, shop.
The "how the guides are structured" section and the ventilation rule go; the shop card's text
changes.

## Changes
- `src/content/docs/{fr,en}/index.mdx`:
  - Section titles and order: "Machines disponibles dans notre local" / "Machines available in
    our workshop"; "Avant d'utiliser une machine" / "Before using a machine"; "Projets
    développés au sein du local" / "Projects developed in our workshop"; "Visitez notre
    boutique en ligne" / "Visit our online shop".
  - Hero button link follows the new machines title anchor.
  - Removed: "Comment sont structurés les guides" / "How the guides are structured" section;
    the "Vérifiez que la ventilation fonctionne..." / "Check that the ventilation works..." rule.
  - Shop card: title "Boutique Vert l'emploi" (en "Vert l'emploi shop"), description
    "Commandez les objets fabriqués au sein de nos ateliers." / "Order the items made in our
    workshops."

## Acceptance checks
- [ ] fr + en homepages show the 4 sections in the new order, nothing else
- [ ] The "Découvrez nos machines" button still jumps to the machines section
- [ ] `scripts/test.sh` passes
