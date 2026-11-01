# Homepage: hero on a tinted band, cleaning rule reworded

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The homepage top part (logo, tagline, "Découvrez nos machines" button) stands out from the
rest of the page: it sits on a light grey band across the whole width, with a thin line under
it. The cleaning rule reads "Nettoyez la machine et votre poste de travail après chaque
utilisation." (en: "Clean the machine and your workspace after each use.").

## Changes
- `src/content/docs/{fr,en}/index.mdx`: the cleaning rule's new wording.
- `src/styles/custom.css`: `.hero` (only on the homepage) gets a full-width band in
  `--sl-color-gray-6` (light grey in light mode, dark grey in dark mode, follows the theme),
  drawn with a wide box-shadow and clipped at its bottom edge, so the page never scrolls
  sideways; a 1px `--sl-color-gray-5` line at the bottom of the band; some space before the
  first section.

## Acceptance checks
- [ ] Both homepages: band behind the hero, full width, in light and dark mode; no sideways scroll
- [x] New cleaning rule wording, fr + en
- [x] `scripts/test.sh` passes
