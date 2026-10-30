# Menu groups always open (no accordion)

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The side menu has few links, so its groups ("Guides", "Nos projets") should not fold. Group
titles stay as plain headings, always open, with no arrow and nothing happening on click.

## Changes
- `src/styles/custom.css`: in the menu, hide the group arrow (`summary .caret`) and use a
  normal cursor on group titles.
- `public/sidebar-open.js` (new), loaded in `head` in `astro.config.mjs` like `redirect.js`:
  ignores clicks (and Enter/Space, which become clicks) on menu group titles, and opens every
  menu group when the page loads (Starlight remembers groups folded earlier in the visit).
- `AGENTS.md`: mention `public/sidebar-open.js`.

## Acceptance checks
- [ ] Built pages load `sidebar-open.js`; custom CSS hides the menu arrows
- [ ] Clicking a group title does not fold the group
- [ ] `scripts/test.sh` passes

## Implementation notes
- Easy to undo later: remove the script line in `astro.config.mjs` and the CSS rule.
