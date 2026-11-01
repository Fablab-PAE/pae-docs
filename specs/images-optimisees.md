# Optimised images: responsive sizes, light originals, automatic checks

Status: ready to merge
Size: normal
Database change: no
New settings (.env keys): none
Restart needed after merge: no

## Goal
Every picture of the documentation follows the 2026 good practices, and stays that way:
1. visitors get a picture sized for their screen (responsive `srcset`), in WebP, with
   width/height and lazy loading (Astro already does the last three);
2. the originals in `src/assets/` are light (at most 2000 px on the longest side, at most
   500 KB), with no duplicates and no unused files;
3. the tests refuse any new picture that breaks these rules, and one command fixes them.

## Not doing
- No AVIF output (slower builds for a small gain over WebP); no new package (sharp is
  already installed with Astro).
- PDFs in `public/pdf/` are manuals, not pictures: unchanged.
- The kit's picture viewer (managed file) is unchanged; it already shows the size the
  browser picked.

## Current situation (measured)
- 105 files in `src/assets` (82 PNG, 12 JPEG, 1 GIF, 10 SVG), 71 MB. 32 files over 1 MB
  (laser photos saved as PNG, ~2.4 MB each); `prusaslicer_interface.jpg` is 3480 px wide.
- Built site: 96 WebP files, 6 MB. Guide pictures have one size only (no `srcset`); only the
  homepage cards (`MachineCard`, `<Image widths sizes>`) have several.
- `laser_19.png` = `laser_06.png` (same bytes). Unused: `cnc_23.png`, `cnc_37.png`,
  `laser_17.png`, `slide_test.png`; only in HTML comments: `giphy.gif`, `cnc_14.png`.

## Changes
- `astro.config.mjs`: `image: { layout: 'constrained', breakpoints: [400, 800, 1200, 1600, 2000] }`:
  every picture (Markdown and `<Image>`) gets a `srcset` + `sizes`, never wider than its
  original; few sizes, to keep builds quick. Starlight already keeps content pictures
  within the page width (no `responsiveStyles` needed).
- `scripts/optimize-images.mjs` (new; `npm run images`): for each raster picture in
  `src/assets/img/`:
  - longer than 2000 px: resized to 2000 px;
  - still over 500 KB: converted to WebP (quality 88, transparency kept), the old file
    removed and every reference in `src/content/` and `src/components/` updated;
  - otherwise re-saved only if that makes it smaller (JPEG mozjpeg q85, PNG max compression).
  Prints what it did. Run once now on all pictures.
- Clean-up: references to `laser_19.png` point to `laser_06`, `laser_19.png` deleted; the 6
  unused / comment-only files deleted, with the 2 commented lines that pointed to them
  (fr + en CNC guide). Git history keeps them.
- `scripts/check-images.mjs` (new, uses sharp), step "pictures" in `scripts/test.sh`:
  fails, with the fix to run, when a picture in `src/assets/` is over 2000 px or 500 KB
  (SVG: over 200 KB), when two pictures are identical, when a picture is used nowhere
  (comments don't count), or when a picture is put in `public/` (only `favicon.svg` allowed).
- `scripts/check-site.mjs links`: every built raster picture (`/_astro/*.webp|png|jpg`) in a
  page has a `srcset`.
- `AGENTS.md`: "Adding a picture" rules (put it in `src/assets/img/<guide>/`, run
  `npm run images`, then the tests); `package.json`: `"images"` script.

## Tests to add or update
- New `scripts/check-images.mjs` step in `scripts/test.sh` (reads files only, no network).
- `srcset` check in `scripts/check-site.mjs links`.

## Acceptance checks
- [x] All originals ≤ 2000 px and ≤ 500 KB; no duplicates, no unused files; `src/assets` much
      smaller than 71 MB
- [x] Guide pictures have a `srcset` in the built pages; pictures look the same
- [x] Adding a 3 MB photo makes `scripts/test.sh` fail with the command to run; after
      `npm run images` it passes
- [x] `scripts/test.sh` passes
