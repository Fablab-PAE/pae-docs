# CNC guide: 4.8 vacuum and ventilation optional; closing the cover moves to 4.9

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Owner asked for "4.8 Aspiration, ventilation et capot (optionnel)". Closing the cover is
mandatory (safety sheet + red box), so, with the owner's choice ("Séparer le capot"):
- `### 4.8 Aspiration et ventilation (optionnel)` / `### 4.8 Vacuum and ventilation (optional)`:
  vacuum on the router, ventilation flap open, ventilation on (3 items, same pictures);
- `### 4.9 Lancer l'usinage` starts with "Fermer le capot de protection" (picture), the red
  box "Ne jamais démarrer la machine CNC avec le capot de protection ouvert" and the red box
  "Ne pas allumer la toupie maintenant !", then the existing start steps.
Safety sheet unchanged (it still says the extraction is mandatory): owner to decide the
wording; flagged in the report.

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: as above; no link pointed to the old
  4.8 anchor.

## Acceptance checks
- [x] fr + en: 4.8 "(optionnel)" with vacuum and ventilation only; cover + two red boxes at
      the start of 4.9
- [x] `scripts/test.sh` passes
