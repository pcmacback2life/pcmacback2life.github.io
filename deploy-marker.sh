#!/usr/bin/env bash
set -euo pipefail

# Choose the served index (root or docs/)
if [[ -f "index.html" ]]; then FILE="index.html"
elif [[ -f "docs/index.html" ]]; then FILE="docs/index.html"
else
  echo "index.html not found in repo root or docs/"; exit 1
fi

TS="$(date +%Y%m%d-%H%M%S)"
echo "== Append deploy marker to $FILE =="
printf '\n<!-- deploy-marker %s -->\n' "$TS" >> "$FILE"

echo "== Commit & push =="
git add "$FILE"
git commit -m "deploy: marker $TS" || true
git push origin main

# Optional: trigger a Pages rebuild explicitly (usually not needed, but handy)
if command -v gh >/dev/null 2>&1; then
  echo "== Trigger GitHub Pages rebuild =="
  gh api -X POST repos/pcmacback2life/pcmacback2life.github.io/pages/builds >/dev/null || true
fi

# Verify live with a cache-buster
echo "== Verify live =="
URL="https://www.pc-mac-back-2-life.com?cb=$TS"
echo "GET $URL"
# Show just the last lines so you can spot the marker quickly
curl -s "$URL" | tr -d '\r' | tail -n 20

echo "== Done. Deployed at $TS =="
