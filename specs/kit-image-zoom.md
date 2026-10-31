# Guide pictures open in the kit viewer (no more starlight-image-zoom)

Status: tests passed
Size: small
Database change: no
New settings (.env keys): none
Restart needed after merge: no (kit merge rebuilds dist/, the preview serves it)

## Goal
The owner asked to update the site to the agent kit picture zoom (kit 9a3c305): clicking a
picture in a guide opens it full screen in the same viewer as the diagrams (zoom, move, a click
or Esc closes, double click zooms). The starlight-image-zoom add-on is removed, so the site has
one viewer and one package less.

## Changes
- `kit docs upgrade`: `src/components/MarkdownContent.astro`, `src/scripts/diagram-zoom.mjs`,
  `src/scripts/zoom-math.mjs` updated to the kit version (`SiteTitle.astro` stays the site own).
- `astro.config.mjs`: remove the `starlight-image-zoom` import, `plugins: [starlightImageZoom()]`
  and the `Footer` component entry; the kit comment says pictures open in the viewer too.
- `src/components/Footer.astro`: deleted (it only added the add-on viewer to Starlight footer).
- `package.json` + `package-lock.json`: `starlight-image-zoom` removed (`npm uninstall
  --package-lock-only`; kit merge installs the packages again in the real project).
- `src/components/MachineCard.astro`: the picture box gets `data-zoom="off"`. The whole card is a link
  (an invisible layer on top), so a click already goes to the link, but without the mark the kit
  would make the picture a keyboard stop that opens the viewer.
- `AGENTS.md`: the kit features line names picture zoom, and how to keep a picture from opening
  (`data-zoom="off"`); pictures in links (homepage cards) never open.

## Acceptance checks
- [ ] Built guide pages have no `starlight-image-zoom` element left; the kit viewer script is there
- [ ] Homepage cards (pictures in links) are not made zoomable
- [ ] `scripts/test.sh` passes (astro check, build, links and images)
