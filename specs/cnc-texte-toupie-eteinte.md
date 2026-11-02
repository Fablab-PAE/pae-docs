# CNC guide: "Ne pas allumer la toupie maintenant !" box wording

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
4.9 red box text (owner's text; "seulement quand lorsque" typo fixed to "seulement lorsque"):
"Avec le BitSetter, la toupie doit rester **éteinte** jusqu'au lancement de l'usinage : la
machine va d'abord mesurer la mèche. Vous allumerez la toupie **seulement lorsque Carbide
Motion vous le demandera** (voir étapes ci-dessous)."
en: "With the BitSetter, the router must stay **off** until the job starts: the machine will
first measure the bit. You will switch the router on **only when Carbide Motion asks you to**
(see the steps below)."

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md`: that box text only.

## Acceptance checks
- [ ] fr + en: new wording
- [ ] `scripts/test.sh` passes
