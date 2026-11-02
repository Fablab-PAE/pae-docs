# Theme icon (Shopify style), print label, no style switch, plain rules section

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. Top bar: Starlight's Dark / Light / Auto drop-down becomes one icon button, like
   shopify.dev: a moon in light mode (click: dark), a sun in dark mode (click: light).
2. Page actions menu: print hint "Imprimer le guide sans les menus" -> "Imprimer ce guide"
   (en: "Print this guide").
3. The TEST "Style : Astro / Tailwind" switch and its Tailwind look are removed.
4. Homepage "Avant d'utiliser une machine" / "Before using a machine": back to a plain section
   (`##` heading + list), no box (owner's choice).

## Changes
- `src/components/ThemeSelect.astro` (new, `components.ThemeSelect` in `astro.config.mjs`):
  a `<button>` with Starlight's `moon` and `sun` icons (CSS shows the right one from
  `data-theme`), `aria-label` / `title` "Changer de thème (clair / sombre)" / "Switch theme
  (light / dark)". Click: sets `data-theme` and stores it in `localStorage` key
  `starlight-theme` (same as Starlight, so the early theme script keeps working without a
  flash). With nothing stored, the site follows the system theme, and follows its changes.
  Used in the top bar and in the phone menu (Starlight places it in both).
- `src/components/PageActions.astro`: print hint text.
- Delete `public/skin.js`, `src/styles/skin-tailwind.css`; remove them from
  `astro.config.mjs`; remove their check from `scripts/check-site.mjs` and their lines in
  `AGENTS.md`. The level badges keep their Flowbite style (they live in `MachineCard.astro`).
- `src/content/docs/{fr,en}/index.mdx`: `:::note[...]` box back to `## Avant d'utiliser une
  machine` + the same 5 rules.
- `scripts/check-site.mjs pages`: the "rules in an info box" check becomes "rules section
  present as a heading, not in a box"; a check that every page has the theme button.

## Acceptance checks
- [ ] Top bar: one icon, toggles light / dark, remembered after reload; no drop-down
- [x] Menu hint "Imprimer ce guide" / "Print this guide"
- [x] No "Style" button; no skin files left
- [x] Homepage rules: plain section, fr + en
- [x] `scripts/test.sh` passes
