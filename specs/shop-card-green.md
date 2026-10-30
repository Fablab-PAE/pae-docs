# Shop card: green top with a white heart

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On the homepages (fr + en), the "Boutique Vert l'emploi" card's top area is green #26901A with
a white heart icon. Title and description stay like the other cards (owner's choice).

## Changes
- `src/components/MachineCard.astro`: two optional props, `background` (top area color) and
  `iconColor` (icon color), applied to the `.picture` area. Cards without them are unchanged.
- `src/content/docs/{fr,en}/index.mdx`: shop card gets `background="#26901A" iconColor="#ffffff"`.

## Acceptance checks
- [x] Shop card top is #26901A with a white heart, in light and dark mode
- [x] Other cards unchanged
- [x] `scripts/test.sh` passes
