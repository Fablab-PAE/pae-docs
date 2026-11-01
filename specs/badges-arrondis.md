# Rounded level badges in the card text, version pill back to its old look

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. The homepage level badges (Débutant / Avancé) are rounded pills and sit in the card's text
   part, above the machine name, instead of on the picture. Colours unchanged (green / orange).
2. The docs version in the footer gets back the pill look it had in the top bar (blue border,
   light blue background, small monospace text).

## Changes
- `src/components/MachineCard.astro`: the `Badge` moves from `.picture` to the top of `.text`
  (before the link); style: fully rounded (`border-radius: 999px`), aligned left, no shadow,
  no absolute position.
- `src/components/Footer.astro`: `.docs-version` uses the old SiteTitle pill style
  (`--sl-color-accent` border, `--sl-color-accent-low` background, `--sl-color-text-accent`
  text, monospace, `--sl-text-xs`, `border-radius: 999px`); the credits link stays grey text.

## Acceptance checks
- [ ] Level badges: rounded, in the text part above the title, on the 4 machine cards (fr + en)
- [ ] Footer version: blue pill like the old one in the top bar
- [ ] `scripts/test.sh` passes
