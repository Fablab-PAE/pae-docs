# Level badges in the Flowbite / Tailwind "pill" style

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The homepage level badges look like Flowbite's pill badges
(https://flowbite.com/docs/components/badge/): pale background, dark text of the same colour,
fully rounded, small medium-weight text, no border. Débutant = green, Avancé = orange. In dark
mode: dark background, light text (Flowbite's dark variant). The badge moves to the end of the
card text, after the description (owner's request). Written as plain CSS with Tailwind's colour values: no Tailwind install.

## Changes
- `src/components/MachineCard.astro`: the level badge becomes a plain
  `<span class="level level-beginner|level-advanced" data-level=...>` (Starlight's `Badge` no
  longer used there). Style (Tailwind `text-xs font-medium px-2.5 py-0.5 rounded-full`):
  0.75rem, weight 500, padding 0.125rem 0.625rem, radius 9999px, system sans font.
  Colours: green-100 `#dcfce7` / green-800 `#166534` (dark: green-900 `#14532d` / green-300
  `#86efac`); orange-100 `#ffedd5` / orange-800 `#9a3412` (dark: orange-900 `#7c2d12` /
  orange-300 `#fdba74`). Dark colours follow Starlight's theme (`[data-theme='dark']`).
- Docs version pill in the footer: unchanged (the owner asked for its old look).

## Acceptance checks
- [x] 4 machine cards (fr + en): pill badges after the description, green Débutant / orange Avancé, light and dark mode
- [x] `scripts/test.sh` passes (it checks 3 beginner and 1 advanced badges)
