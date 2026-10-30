# Shop link icon and two homepage sections

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Show that "Lien vers notre boutique" leads to an outside website (external-link icon), and
split the homepage section "Découvrez les projets du local et notre boutique en ligne" into
two sections. French and English.

## Changes
- `src/styles/custom.css` (new) + `customCss: ['./src/styles/custom.css']` in
  `astro.config.mjs`: menu links that open in a new tab (`target="_blank"`, today only the
  shop) get a small external-link icon after their label (Starlight's own "external" icon
  drawn with a CSS mask, so it follows the text colour in light and dark mode).
- `src/content/docs/{fr,en}/index.mdx`: the section becomes two:
  - "## Découvrez les projets du local" / "## Discover the workshop's projects" -> MILA card
  - "## Visitez notre boutique en ligne" / "## Visit our online shop" -> shop card
    (the card already shows an external-link icon).

## Acceptance checks
- [ ] Menu "Lien vers notre boutique" / "Link to our shop" shows an external-link icon
- [ ] Homepage shows the two sections with one card each, fr + en
- [ ] `scripts/test.sh` passes
