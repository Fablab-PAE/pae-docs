# Homepage heading: how the guides are structured

Status: ready to merge
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Rename the homepage section "Comment sont faits les guides".

## Changes
- `src/content/docs/fr/index.mdx`: "## Comment sont faits les guides" -> "## Comment sont structurés les guides"
- `src/content/docs/en/index.mdx`: "## How the guides work" -> "## How the guides are structured"
- No link points to the old heading anchors (checked).

## Acceptance checks
- [x] New heading on both homepages
- [x] `scripts/test.sh` passes
