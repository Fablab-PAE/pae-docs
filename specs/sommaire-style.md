# "Sur cette page" list: rail, highlight bar, bold current section, hover

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The "Sur cette page" / "On this page" list (right column, wide screens) looks like the ones on
shopify.dev and fal.ai: a thin grey vertical line on its left; the section being read is in
bold dark text with a thick accent-coloured bar on the line; hovering a section darkens its
text and shows a light grey bar. Sub-sections stay indented.

## Changes
- `src/styles/custom.css`, new block for `starlight-toc` (desktop list only; the small
  "Sur cette page" drop-down on narrow screens is unchanged):
  - top list: `border-inline-start: 1px solid var(--sl-color-gray-5)` (the rail);
  - links: grey text (`--sl-color-gray-3`), no rounded corners, colour transition;
  - `a::before`: 3px bar, rounded, over the rail, transparent by default;
  - hover / keyboard focus: text `--sl-color-white` (dark in light mode), bar `--sl-color-gray-4`;
  - current section (`a[aria-current='true']`, set by Starlight while scrolling): text
    `--sl-color-white`, weight 600, bar `--sl-color-text-accent`.
- Works in light and dark mode, and with the Tailwind test look (it uses the same colours).

## Acceptance checks
- [ ] Guides: rail, accent bar + bold on the current section, hover effect (fr + en)
- [ ] Mobile drop-down unchanged
- [ ] `scripts/test.sh` passes
