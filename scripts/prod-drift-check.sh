#!/usr/bin/env bash
# prod-drift-check.sh — flags (1) commits on main missing from prod branch and
# (2) live-site vs repo title drift on key pages. Exit 1 + findings on stdout
# when drift is found; silent exit 0 when healthy. Run from repo root or the
# website-agent sandbox clone; requires git + curl + gh (for deploy status).
#
# Root cause this guards (09-26 incidents): prod branch silently lagging main
# left /blog 404 live while CI stayed green. Green CI ≠ deployed code.
set -uo pipefail

REPO="$(git rev-parse --show-toplevel 2>/dev/null)"
[ -z "$REPO" ] || cd "$REPO"
BASE_URL="${FORMATHO_BASE_URL:-https://formatho.com}"

fail=0
findings=()

# --- 1. prod branch vs main ---
git fetch origin main prod --quiet 2>/dev/null
# git cherry marks '-' for commits whose patch-content already exists in prod
# (re-commit/cherry-pick pattern — 10-04/10-05 false positives) and '+' for
# genuinely missing content; raw rev-list cannot tell them apart.
missing_out=$(git cherry origin/prod origin/main 2>/dev/null)
if [ -z "$missing_out" ] && [ -z "$(git rev-parse --verify origin/prod 2>/dev/null)" ]; then
  findings+=("FATAL: could not run git cherry against origin/prod (fetch or refs failed)")
  fail=1
else
  count=$(printf '%s\n' "$missing_out" | grep -c '^+')
  if [ "$count" -gt 0 ]; then
    findings+=("prod drift: $count commit(s) on main missing from prod:")
    for s in $(printf '%s\n' "$missing_out" | grep '^+' | sed 's/^+//' | head -5); do
      findings+=("  ${s:0:9} $(git log -1 --format=%s "$s" | cut -c1-80)")
    done
    fail=1
  fi
fi

# latest prod deploy conclusion (green deploy on the drifted tip is also broken)
if command -v gh >/dev/null 2>&1; then
  last_prod_sha=$(git rev-parse --short origin/prod 2>/dev/null)
  latest_concl=$(gh run list --branch prod --limit 1 --json conclusion,headSha \
    -q '.[0] | (.conclusion // "") + " " + .headSha[0:7]' 2>/dev/null)
  # empty conclusion = run still in progress — not a failure
  if [ -n "$latest_concl" ] && [ -n "$last_prod_sha" ] && [[ "$latest_concl" != success* ]] && [[ "$latest_concl" != " "* ]]; then
    findings+=("latest prod deploy not green: $latest_concl (prod tip $last_prod_sha)")
    fail=1
  fi
fi

# --- 2. live site vs repo expectations (titles of key pages) ---
# Keep this map in sync with src/views + scripts/inject-specialty-meta.js when copy changes.
declare -a CHECKS=(
  "/|Formatho | Private Infrastructure for AI Agents"
  "/runtime|Self-Hosted MCP Server — Docker, Private AI"
  "/eliza-tools|elizaOS Developer Tools — Free, Private, Client-Side"
  "/enterprise|Enterprise Agent-Ready Services | Formatho"
  "/blogs|Developer Guides & Tutorials | Formatho Blog"
  "/tools/jwt|JWT Decoder & Verifier"
)
for entry in "${CHECKS[@]}"; do
  path="${entry%%|*}"; expect="${entry#*|}"
  live=$(curl -s --max-time 15 "$BASE_URL$path" | grep -m1 -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g; s/&amp;/\&/g; s/&#39;/'"'"'/g' || true)
  if [ -z "$live" ]; then
    findings+=("live check failed: $BASE_URL$path returned no title (down or empty)")
    fail=1
  elif [[ "$live" != *"$expect"* ]]; then
    findings+=("live title drift: $path expected '*$expect*' got '$live'")
    fail=1
  fi
done

if [ "$fail" -eq 1 ]; then
  printf 'PROD DRIFT DETECTED (%s)\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf '%s\n' "${findings[@]}"
  exit 1
fi
echo "healthy: prod==main, $(( ${#CHECKS[@]} )) live pages match"
exit 0
