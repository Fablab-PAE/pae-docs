# Page actions menu stays on screen on phones

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On a phone, the guides' "Copier la page" menu opens partly off the screen (cut on the left).
Cause: the menu is always aligned on the right edge of the split button and grows to the
left; on narrow screens the button wraps under the title, on the left, so the menu (wider
than the button) goes past the left edge of the screen. Fix: when opening, if the menu would
go past the left edge, align it on the button's left edge instead (it then grows to the
right). Desktop is unchanged.

## Changes
- `src/components/PageActions.astro`:
  - `open()`: show the menu aligned right (default), measure it; if its left edge is less
    than 8 px from the screen's left edge, set `data-align="start"` on the widget;
  - CSS: `[data-align='start'] .pa-menu { inset-inline-start: 0; inset-inline-end: auto; }`;
    width already limited to the screen (`max-width: min(22rem, 100vw - 2rem)`);
  - the menu closes when the window is resized (or the phone turned), so it is placed again
    on the next opening.

## Acceptance checks
- [ ] Phone: the whole menu is visible under "Copier la page"; desktop: unchanged
- [ ] `scripts/test.sh` passes
- [ ] Not pushed to GitHub until the owner says so
