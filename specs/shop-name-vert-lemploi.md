# Shop name: Vert l'emploi

Status: approved
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The shop is now called "Boutique Vert l'emploi" instead of "Boutique Chouette et Cie".

## Changes
- `src/content/docs/fr/index.mdx`: shop card title "Boutique Chouette et Cie" -> "Boutique Vert l'emploi"
- `src/content/docs/en/index.mdx`: "Chouette et Cie shop" -> "Vert l'emploi shop"
- The shop link (forms.app address containing "boutique-chouette-et-cie") is NOT changed: no new
  address was given.

## Acceptance checks
- [ ] No "Chouette et Cie" text left on the site (the link address excepted)
- [ ] `scripts/test.sh` passes
