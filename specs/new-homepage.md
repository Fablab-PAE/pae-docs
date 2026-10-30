# New homepage

Status: building
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Replace the starter homepage (Starlight "Next steps" cards, Houston astronaut, "Get started
building your docs site" description) with a simple real homepage that introduces the
FabLab machine guides, in French (`fr/index.mdx`) and English (`en/index.mdx`).

## Not doing
- No change to the guides, the sidebar or the site design.
- No new machine guides.

## Changes
- `src/content/docs/fr/index.mdx` and `src/content/docs/en/index.mdx` (same structure):
  - Frontmatter: real `description`; hero image = RoboTic logo (`light`/`dark` files from
    `src/assets/`) instead of `houston.webp`; buttons "Choisir une machine" (to `#machines`)
    and "Guide CNC" (first full guide). Remove commented starter lines.
  - Section "Les machines" / "The machines": one `LinkCard` per guide (CNC Shapeoko 3,
    laser engraver 5 W diode, vinyl cutter, 3D printing), short description of what each
    machine is for; vinyl and 3D cards say the guide is being written.
  - Section "Avant d'utiliser une machine" / "Before using a machine": 4-5 short rules
    taken from the existing guides (read the guide first, protective equipment, never leave
    a running machine, clean up, ask a FabLab manager if unsure).
  - Section "Comment sont faits les guides" / "How the guides work": the common structure
    (safety, hardware, materials, numbered steps, cleaning).
- `src/assets/houston.webp`: deleted (Starlight's mascot, no longer used).
- `src/content/docs/{fr,en}/changelog.md`: one dated line about the new homepage.

## Tests to add or update
None new: `scripts/test.sh` already builds the site and checks every internal link and
image of the homepage, and that fr/en pages match. No database or outside service involved.

## Acceptance checks
- [ ] /pae-docs/fr/ and /pae-docs/en/ show the new content, no starter text ("Starlight",
      "Next steps", "src/content/docs") left on either homepage
- [ ] Every card links to the right guide in the same language
- [ ] `scripts/test.sh` passes

## Implementation notes
Use Starlight's `LinkCard` and `CardGrid` components (already used in MDX pages).
Links include base and language: `/pae-docs/fr/guides/cnc-machine/`.
