# Homepage: "Before using a machine" in an info box

Status: planning
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
On both homepages, the "Avant d'utiliser une machine" / "Before using a machine" title and its
5 rules sit together in a blue info box (Starlight's "note" box with the "i" icon, the same
kind of box the guides already use for warnings), so they stand out from the rest of the page.

## Changes
- `src/content/docs/{fr,en}/index.mdx`: the `## Avant d'utiliser une machine` heading and its
  list become `:::note[Avant d'utiliser une machine]` ... `:::` with the same 5 rules
  (en: `:::note[Before using a machine]`). Section order unchanged.

## Acceptance checks
- [ ] Both homepages: the rules are inside an info box titled with the section name
- [ ] The other sections and the hero button are unchanged
- [ ] `scripts/test.sh` passes
