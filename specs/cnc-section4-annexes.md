# CNC guide: sub-headings in section 4, appendices for bit change and re-run

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Section 4 of the CNC guide (~190 lines) has no sub-heading before "Changement de mèche", so
the "Sur cette page" list shows one line for it and the guide is hard to follow. Split it
into numbered steps that show in the list, and move the two optional parts to an
"Annexes" section near the end. Text unchanged, except headings, two short "see the
appendix" sentences, and the typo "maintenance placée" -> "maintenant placée". fr + en.

## New structure
## 4. Utilisation du logiciel Carbide Motion (intro + link to the diagram)
### 4.1 Préparer la machine          (work surface clear, BitSetter clear)
### 4.2 Installer la mèche            (bit choice, insertion, tightening, centring note)
### 4.3 Régler la vitesse de la toupie (dial 1-6, correspondence table)
### 4.4 Connecter et initialiser la machine (open Carbide Motion, Connect, Initialize)
### 4.5 Fixer la planche              (fixing blocks, nothing near the BitSetter)
### 4.6 Définir le point zéro         (JOG, increments, X/Y/Z, check, Set Zero / Zero All, Done)
### 4.7 Charger le fichier            (RUN, LOAD NEW FILE, Done)
### 4.8 Aspiration, ventilation et capot (vacuum, vent flap, ventilation, close cover)
### 4.9 Lancer l'usinage              (START JOB, Please insert tool, RPM change, router on,
                                       OK, machining note, supervision) + "plusieurs mèches ?
                                       voir l'annexe A"
### 4.10 Fin de l'usinage             (spindle off message + picture) + "relancer le même
                                       fichier ? voir l'annexe B"
## 5. Nettoyage après utilisation
## Annexes
### A. Changement de mèche pendant l'usinage
### B. Refaire le même usinage
## Pour aller plus loin
## Fiche de sécurité (stays last)

English: same structure (4.1 Preparing the machine, 4.2 Installing the bit, 4.3 Setting the
router speed, 4.4 Connecting and initialising the machine, 4.5 Clamping the board,
4.6 Setting the zero point, 4.7 Loading the file, 4.8 Vacuum, ventilation and cover,
4.9 Starting the job, 4.10 End of the job; Appendices: A. Changing bits during a job,
B. Running the same job again).

## Changes
- `src/content/docs/{fr,en}/guides/cnc-machine.md` only. Existing links (#4-...,
  diagram) keep working; the appendix links point to the new headings.
- `scripts/check-site.mjs links`: links to a section of the same page (`href="#..."`) are
  checked on every page, not only the homepages (catches a broken "voir l'annexe" link).

## Acceptance checks
- [x] fr + en: 4.1-4.10 and Annexes A / B in the "Sur cette page" list; content unchanged
- [x] "voir l'annexe" links jump to the right place
- [x] `scripts/test.sh` passes
