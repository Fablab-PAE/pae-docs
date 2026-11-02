#!/usr/bin/env bash
# The ONE test command for this project. /feature runs it before anything is merged.
#   - exit 0 when everything is fine, non-zero otherwise
#   - must NEVER touch the real database or send anything anywhere
# This site has no database, settings or outside services. The test build goes to
# .kit/test-build/, never to dist/ (served by the pae-docs-preview service).
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"                                        # this checkout (real project or work copy)
MAIN="$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")"   # the real project (has node_modules/)
cd "$ROOT"; export ROOT MAIN
mkdir -p .kit
export ASTRO_TELEMETRY_DISABLED=1

# Work copies have no node_modules of their own: borrow the real project's.
if [ ! -e "$ROOT/node_modules" ] && [ -d "$MAIN/node_modules" ]; then
  ln -s "$MAIN/node_modules" "$ROOT/node_modules"
fi

echo "== 1/5 Every French page has an English twin (and the reverse)"
node scripts/check-site.mjs pages

echo "== 2/5 Pictures: originals at most 2000 px and 500 KB, no duplicate, all used, none in public/"
node scripts/check-images.mjs

echo "== 3/5 astro check (page and config errors)"
npx --no-install astro check > .kit/test-check.log 2>&1 \
  || { tail -40 .kit/test-check.log; echo "astro check FAILED (full log: .kit/test-check.log)"; exit 1; }

echo "== 4/5 Test build into .kit/test-build"
rm -rf .kit/test-build
npx --no-install astro build --outDir "$ROOT/.kit/test-build" > .kit/test-build.log 2>&1 \
  || { tail -40 .kit/test-build.log; echo "Build FAILED (full log: .kit/test-build.log)"; exit 1; }

echo "== 5/5 Internal links and images point to real files"
node scripts/check-site.mjs links .kit/test-build
rm -rf .kit/test-build

echo "All checks passed."
