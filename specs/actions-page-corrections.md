# Page actions: fewer menu items, copy label fix, fixed button width

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. The guides' page actions menu loses "Voir en Markdown" and "Ouvrir dans Perplexity": it
   keeps Copier la page, Imprimer la page, Ouvrir dans ChatGPT, Ouvrir dans Claude.
2. Bug: after a copy, the main button's label could disappear instead of reading "Copié !".
   Cause: the "Copié !" text was stored in the widget's `data-copied` attribute, the same
   attribute used as the "copied" marker; removing the marker after 2 s deleted the text, so
   the next copy had no label to show. Fix, and the button keeps the same width whatever its
   label.

## Changes
- `src/components/PageActions.astro`:
  - remove the "Voir en Markdown" link and the Perplexity entry (and its icon);
  - main button: the three labels ("Copier la page", "Copié !", "Copie impossible") and two
    icons (copy, check) are all in the button, stacked in one grid cell; only the one for the
    current state is visible (`data-pa-state` = "" / "copied" / "failed" on the widget), so
    the button's width is the widest label and never changes;
  - a visually hidden `role="status"` text announces "Copié !" / "Copie impossible" to screen
    readers;
  - the script no longer reads or writes label text in attributes.
- The .md files stay: copy and the ChatGPT / Claude links use them.
- `AGENTS.md`, `src/pages/[...slug].md.ts` comments: menu items updated.

## Acceptance checks
- [x] Menu: 4 items (copy, print, ChatGPT, Claude), fr + en
- [ ] Main button shows "Copié !" after every copy (1st, 2nd...), width unchanged
- [x] `scripts/test.sh` passes (the .md files are still checked)
