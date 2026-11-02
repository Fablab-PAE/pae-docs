# Homepage: no sideways scrolling on phones

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On a phone, the homepage can be dragged sideways. Cause: the thin line under the grey hero
band is `.hero::after`, an absolutely positioned box with `inset-inline: -100vmax`. The hero's
`clip-path` hides it visually, but clipping does not change the page's scrollable width, so
the page is far wider than the screen. Draw the line with a box-shadow instead (shadows never
make a page wider). Same look on screen.

## Changes
- `src/styles/custom.css`, `.hero`:
  - remove `.hero::after` and `position: relative`;
  - `box-shadow: 0 0 0 100vmax var(--sl-color-gray-6), 0 1px 0 100vmax var(--sl-color-gray-5)`:
    the second, 1px lower shadow shows only as a 1px line under the band;
  - `clip-path: inset(-100vmax -100vmax -1px -100vmax)` so that line is not clipped;
  - comment corrected (why a shadow, and that clipping does not stop sideways scrolling).
- `scripts/check-site.mjs pages`: `src/styles/custom.css` must not place a positioned box
  outside the screen with a negative `100vmax` / `100vw` offset (the cause of this bug).

## Acceptance checks
- [ ] Homepage on a phone: no sideways scroll; band and line look the same
- [ ] `scripts/test.sh` passes
- [ ] Not pushed to GitHub until the owner says so
