# AGENTS.md - rules for every AI working on this project

Read by AI agents working on this project. Keep it short and true.

## What this project is
The documentation website of the PAE FabLab (atelier RoboTic): how to use each machine
(CNC, laser engraver, vinyl cutter, 3D printers). Built with Astro + Starlight. Written in
French first (default language), with an English translation of every page.
This project IS the docs website: there is no separate `docs/` folder.

## Where things are
- `src/content/docs/fr/` - French pages (the reference version); `index.mdx` is the homepage
- `src/content/docs/en/` - English translation: same file names as `fr/`
- `src/content/docs/*/guides/` - one guide per machine
- `src/content/docs/*/projets/` - one page per FabLab project (e.g. MILA)
- `src/assets/` - logos and guide images (`img/<guide>/`); `public/pdf/` - machine manuals
- `astro.config.mjs` - site settings, languages, sidebar (menu labels in fr + en)
- `src/components/MachineCard.astro` - homepage card with a picture (machines, projects, shop)
- `src/styles/custom.css` - site styles added to Starlight (external-link icon in the menu)
- `src/components/`, `src/diagrams/`, `src/version.mjs`, `src/scripts/` - agent kit docs
  features (version badge, diagrams, zoom). Files marked "agent-kit: managed" are updated
  by `kit docs upgrade`
- `public/redirect.js` - sends `/pae-docs/` to `/pae-docs/fr/`
- `scripts/test.sh`, `scripts/check-site.mjs` - the tests
- Code map: none. Feature plans: `specs/`

## How to run the tests
Run `scripts/test.sh` from the project root. It must pass before anything is merged.
It checks that every French page has an English twin (and the reverse), runs `astro check`,
builds the site into `.kit/test-build/` (never into `dist/`, which the live preview serves),
and checks that every internal link and image in the built site points to a real file.
How tests stay safe: the site has no database, no settings and no outside services; the
build only writes inside `.kit/`.
Each /feature adds checks for what it builds when it makes sense.

## Writing pages
- Every page change is made in BOTH languages: French in `fr/`, English in `en/`.
- New guide: add the page in both folders AND a sidebar entry (fr + en labels) in
  `astro.config.mjs`.
- Internal links include the base and language: `/pae-docs/fr/guides/...`.
- There is no changelog page (the owner removed it): don't add one back.
- Plain, friendly language for FabLab members, not developers.

## Safety rules (never break these)
- No database. Nothing to connect to.
- Never run these (they publish the site on the internet):
  - `git push` - GitHub Actions (`.github/workflows/deploy.yml`) then deploys the site to
    GitHub Pages (https://fablab-pae.github.io/pae-docs/). Pushing only with the owner's OK.
- Never read, print or edit `.env` (there is none today). Work copies get a safe `.env`
  made from `.env.workcopy`.
- Never install packages without the owner's OK. If you need one, say so.
- Don't commit, push or change branches directly: kit commands handle saving and merging.

## How the app runs for real
- Local preview: systemd service `pae-docs-preview` runs `astro preview` on port 4322 and
  serves the last build in `dist/`: http://10.10.10.248:4322/pae-docs/fr/
- Public site: GitHub Pages, built by GitHub Actions on each push to `main`.
- After a merge, `kit merge` rebuilds `dist/` (`.agentkit` sets `DOCS_DIR=.`), so the local
  preview shows the change right away. No restart needed. Manual rebuild: `kit docs build`.

## Applying database changes
Not applicable: there is no database.

## Conventions
- Astro 7, Starlight 0.42, Node 24. Pages in Markdown (`.md`) or MDX (`.mdx` when using
  Starlight components such as `Card`).
- Keep the existing style of the guides: short sections, numbered steps, screenshots.

## Specialist delegation (`consult`, opt-in only)
- External API calls (`consult`) are off by default. Only run `consult` when the
  owner explicitly requests a delegation (`--authorized-once`) or enables a
  session scope (`consult scope enable ...`).
- Tasks: `consult review | investigate | tests | compare | ask` (supports
  `--provider anthropic|openai|gemini`, `--model <name>`, `--diff`, `--spec`,
  `--file path[:start-end]`, `--test-log`, `--question "..."`).
- External models are read-only advisors. Critically verify their suggestions
  against this file and the codebase, and validate any changes with `scripts/test.sh`.
  If a provider is unavailable, report the failure in one line and continue without it.
