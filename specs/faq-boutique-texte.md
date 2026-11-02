# FAQ: shop answer wording

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The FAQ's shop answer reads: "Rendez-vous directement sur notre boutique en ligne Vert l’emploi.
En tant que participant à l’atelier, vous bénéficierez d’un rabais de 25 % sur le prix affiché."
(was "participant de l’atelier, vous bénéficiez"). English: "As a workshop participant, you
will get a 25% discount on the displayed price."

## Changes
- `src/content/docs/{fr,en}/index.mdx`: that sentence only (link and bold kept).

## Acceptance checks
- [x] New wording, fr + en
- [x] `scripts/test.sh` passes
