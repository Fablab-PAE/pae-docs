# Homepage FAQ: the owner's questions and answers

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
The homepage FAQ uses the owner's text (8 questions): who can use the machines, which machine
to start with, own projects (new), own materials and equipment, never unattended,
problems / emergencies, asking an AI, buying the items (new: 25 % discount for participants).
"Quelle machine choisir pour mon projet ?" and "Comment imprimer un guide ou sa fiche de
sécurité ?" go. English: faithful translation.

## Changes
- `src/content/docs/{fr,en}/index.mdx`: the `<Faq>` items replaced with the owner's text,
  same accordion look. The owner's line breaks become separate paragraphs (more reliable than
  trailing spaces); lists, bold and italics kept; "Vert l'emploi" links to the shop (new tab).
  Section title stays "Questions fréquentes" (a `##` section like the others).

## Acceptance checks
- [ ] fr: the 8 questions and answers exactly as given; en: same 8, translated
- [ ] `scripts/test.sh` passes (FAQ last, same count fr / en)
