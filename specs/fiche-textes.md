# Safety sheet: shorter intro, button "Imprimer"

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
In the 4 guides (fr + en), the safety sheet's intro sentence loses its second part about the
button, and the sheet's button says "Imprimer" (en: "Print"), like the guide's button.

## Changes
- `src/content/docs/{fr,en}/guides/*.md`, "Fiche de sécurité" / "Safety sheet" section:
  - fr intro: "Cette fiche résume les règles de sécurité de la machine. Imprimez-la pour
    l'afficher à côté de la machine." (was "... machine : le bouton n'imprime que la fiche,
    sur une page A4.")
  - en intro: "This sheet sums up the machine's safety rules. Print it to post it next to the
    machine."
  - button label: "Imprimer la fiche" -> "Imprimer", "Print the sheet" -> "Print".
- The button still prints only the sheet (no code change).

## Acceptance checks
- [ ] 8 guide pages: new intro and "Imprimer" / "Print" on the sheet button
- [ ] `scripts/test.sh` passes
