# Homepage: remove the language line

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Remove the last sentence of the homepage about the other language.

## Changes
- `src/content/docs/fr/index.mdx`: remove "Les guides existent aussi en anglais : utilisez le
  sélecteur de langue en haut de la page."
- `src/content/docs/en/index.mdx`: remove its translation, "The guides are also available in
  French: use the language picker at the top of the page."

## Acceptance checks
- [ ] The sentence is gone from both homepages, nothing else changed
- [ ] `scripts/test.sh` passes
