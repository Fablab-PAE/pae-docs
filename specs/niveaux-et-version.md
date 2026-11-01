# Level badges on the machine cards, docs version moved to the footer

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. Each machine card on the homepages shows a level badge: "Débutant" (green) for 3D
   printing, laser and vinyl, "Avancé" (orange) for the CNC (en: "Beginner" / "Advanced").
2. The docs version pill leaves the top bar and goes to the footer of every page, next to the
   "Crédits photos" link, in small grey text, so it is less visible.

## Changes
- `src/components/MachineCard.astro`: new optional prop `level` (`'beginner' | 'advanced'`).
  When set, a badge (Starlight's `Badge`, variant `success` / `caution`) sits in the top-left
  corner of the picture; label in the page's language. Cards without `level` (MILA, shop)
  are unchanged.
- `src/content/docs/{fr,en}/index.mdx`: `level="beginner"` on the 3D printing, laser and vinyl
  cards, `level="advanced"` on the CNC card.
- `src/components/SiteTitle.astro`: only Starlight's own title (no pill). The file stays, so
  `kit docs upgrade` does not put the pill back in the top bar; its comment says so.
- `src/components/Footer.astro`: the footer line becomes "Crédits photos · Version abc1234"
  (`src/version.mjs`), version in grey, with the same hover text as before (save date).
- `AGENTS.md`: version badge now in the footer; level badges on the cards.

## Tests to add or update
- `scripts/check-site.mjs links`: every built page has the version in its footer; the
  homepages have 4 level badges (3 beginner, 1 advanced).

## Acceptance checks
- [ ] Homepage cards: Débutant on 3D, laser, vinyl; Avancé on CNC (fr + en)
- [ ] No version pill in the top bar; version shown in the footer of every page
- [ ] `scripts/test.sh` passes
