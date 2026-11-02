# Printing: every picture loaded before the print window opens

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Printing a guide shows every picture. Today pictures further down the page are blank on
paper (their space is kept, empty).

Causes:
1. Pictures load only when scrolled near (`loading="lazy"`, Astro's default): pictures never
   scrolled to are not downloaded when the print window opens.
2. Pictures come in several widths (`srcset`): the paper width differs from the screen, so the
   browser picks another width, not downloaded yet, while preparing the print.

## Changes
- `public/print.js`, before `window.print()` (guide "Imprimer la page" and safety sheet
  "Imprimer"):
  - every picture of the page switches to `loading="eager"` and is awaited (load or error),
    at most 10 s, then the print window opens;
  - every loaded picture is "frozen" to the file already downloaded: `srcset` / `sizes`
    put aside and `src` = `currentSrc`, so the print keeps that file; put back after printing
    (`afterprint`).
  - The button shows the wait cursor meanwhile (usually under a second).
  - Ctrl+P: `beforeprint` does the same without waiting (the browser does not allow it), so
    pictures already seen print; the menu button is the reliable way. Pictures start loading
    as soon as the pointer is on the page actions (hover / focus), so the wait is short.
- Comments in `public/print.js` explain why.

## Acceptance checks
- [ ] Printing a guide from the menu without scrolling shows all its pictures
- [ ] The safety sheet print still works
- [x] `scripts/test.sh` passes
