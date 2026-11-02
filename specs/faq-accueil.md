# Homepage FAQ (fal.ai-style accordion); info boxes print like on screen

Status: ready to merge
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
1. A "Questions fréquentes" / "Frequently asked questions" section at the end of both
   homepages, as an accordion like https://fal.ai/docs/documentation/assets/faq: one rounded
   box, a thin line between questions, a small triangle that turns when a question opens,
   light grey on hover. All closed at first. Answers only use facts already in the guides and
   safety sheets.
2. Info / caution / danger boxes print with their coloured background, like on screen.
   Why they differ today: browsers do not print background colours by default (to save ink:
   "Background graphics" is off in the print window), so a box prints with only its coloured
   left bar and title. Starlight also prints in light colours on purpose, even when the page
   is in dark mode.

## Questions (fr; en translated)
1. Qui peut utiliser les machines du local ? - With the agreement of the RoboTic trainer:
   always check with them before starting a machine, even one you have used before.
2. Par quelle machine commencer ? - 3D printing, laser and vinyl are "Débutant", the CNC is
   "Avancé"; start with a beginner machine and read its whole guide first.
3. Quelle machine choisir pour mon projet ? - plastic object: 3D printing; engrave wood,
   cardboard, leather or fabric, or cut 3 mm wood: laser; stickers, lettering, heat-transfer
   vinyl: vinyl cutter; mill / cut wood, printed circuit boards: CNC. Links to the guides.
4. Puis-je apporter mes propres matériaux ? - Only compatible materials approved by the person
   in charge; ask if in doubt. Never PVC or vinyl in the laser (toxic fumes).
5. Puis-je laisser une machine fonctionner seule ? - No, stay next to it the whole time; a 3D
   print longer than your time in the room must be approved by the person in charge.
6. Que faire en cas de problème ou d'urgence ? - Stop the machine (emergency stop or
   power), tell the person in charge; uncontrollable fire: evacuate, fire alarm, 911. Details
   in the safety sheet at the end of each guide.
7. Comment imprimer un guide ou sa fiche de sécurité ? - Menu right of the guide's title ->
   "Imprimer la page"; the safety sheet has its own "Imprimer" button (one A4 page).
8. Puis-je poser des questions sur un guide à une IA ? - "Copier la page" copies the guide for
   an AI tool, or the menu -> "Ouvrir dans Claude" / "Ouvrir dans ChatGPT".
9. Comment acheter les objets fabriqués à l'atelier ? - On the Vert l'emploi online shop (link).

## Changes
- `src/components/Faq.astro` (new): `<div class="faq">` around native `<details>` /
  `<summary>` items written in the MDX (keyboard and screen readers work natively). Styles:
  rounded 1rem box, `--sl-color-gray-5` border, dividers, summary padding 0.875rem 1.25rem,
  weight 500, custom triangle (turns 90° when open), hover background `--sl-color-gray-6`,
  answer padding; Starlight's default details look (left bar) is replaced inside `.faq`.
  Light and dark mode. Print: every answer shown.
- `src/content/docs/{fr,en}/index.mdx`: `## Questions fréquentes` / `## Frequently asked
  questions` after the shop section, with the 9 questions.
- `src/styles/custom.css` print block: `.starlight-aside` and the FAQ keep their colours
  (`print-color-adjust: exact`).
- `scripts/check-site.mjs`: both homepages have the FAQ with the same number of questions.

## Acceptance checks
- [ ] Homepages: FAQ at the end, 9 questions, fr + en, opens / closes, keyboard works
- [ ] Info / caution / danger boxes print with their background
- [x] `scripts/test.sh` passes
