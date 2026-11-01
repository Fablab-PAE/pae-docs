# Footer copyright line; Claude before ChatGPT in the page actions menu

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. Guides' page actions menu: "Ouvrir dans Claude" comes before "Ouvrir dans ChatGPT".
2. Footer of every page, centred, on two lines:
   - "© 2026 Place à l'emploi. Tous droits réservés." (en: "© 2026 Place à l'emploi. All
     rights reserved.")
   - version pill | "Crédits photos" link (version first now).

## Changes
- `src/components/PageActions.astro`: Claude first in the `ai` list.
- `src/components/Footer.astro`: copyright line (year = the year the site is built, so it
  stays current: 2026 today), then the version pill, a "|" separator, the credits link.
  Same small grey text; both lines centred. Class `photo-credits-link` kept on the block
  (print hides it).
- `scripts/check-site.mjs links`: every page has the copyright line.

## Acceptance checks
- [ ] Menu order: copy, print, Claude, ChatGPT
- [ ] Every page: centred "© 2026 Place à l'emploi. Tous droits réservés." then "version | Crédits photos"
- [ ] `scripts/test.sh` passes
