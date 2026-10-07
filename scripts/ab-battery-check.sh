#!/usr/bin/env bash
# ab-battery-check.sh — standing verification battery for backlog #2's CTA A/B
# (plus its gate-relevant machinery) against a live Formatho host.
#
# What it guards (root cause: the 10-05 kill-switch incident, where a chunk
# grep said "healthy" while formatho_cta_ab=off was broken in 9d9b048 — the
# morning pass must assert compiled markers, not just chunk existence):
#   1. A/B machinery liveness through chunk rotations (dependabot rebuilds,
#      merges): flip marker + kill-switch override + both copy variants in the
#      EnterpriseCta chunk (discovered via the saml view chunks' shared
#      imports — it ships as a shared vue_vue_type_* chunk, not a named one).
#   2. Scope: ab-default wired ONLY in the SamlMetadataGeneratorView chunk,
#      absent from SamlDecoderView.
#   3. All 4 conversion events in the current conversionTracking chunk.
#   4. HouseAd phase-1 machinery still shipped (flag + house_ad_view/click),
#      resolved through the BpmnToVisioConverterView/JsonViewerView imports.
#
# Usage:
#   scripts/ab-battery-check.sh                      # prod (formatho.com)
#   scripts/ab-battery-check.sh https://qa.formatho.com
#   FORMATHO_BASE_URL=... scripts/ab-battery-check.sh
#   scripts/ab-battery-check.sh --selftest           # offline fixtures
# Exit 0 = all checks pass, exit 1 = findings on stdout. curl-only, no keys.
set -uo pipefail

PASS=()
FAIL=()
note_pass() { PASS+=("ok: $1"); }
note_fail() { FAIL+=("FAIL: $1"); }

# --- network layer (overridden by --selftest via FIXTURE_DIR) ---
http_get() {
  if [ -n "${FIXTURE_DIR:-}" ]; then
    local f
    case "$1" in
      *\/) f=index.html ;;
      *) f="$(basename "$1")" ;;
    esac
    cat "$FIXTURE_DIR/$f" 2>/dev/null || true
  else
    curl -fsS --max-time 25 "$1" 2>/dev/null || true
  fi
}

occurrences() { # occurrences <body> <fixed-literal>
  printf '%s' "$1" | grep -oF -- "$2" | wc -l | tr -d ' '
}

chunk_url() { printf '%s/assets/%s' "$BASE_URL" "$(basename "$1")"; }

resolve_chunk() { # resolve_chunk <body> <name-regex> -> first Name-hash.js
  printf '%s' "$1" | grep -oE "$2" | head -1
}

import_list() { # all chunk filenames referenced in a chunk body
  printf '%s' "$1" | grep -oE '[A-Za-z0-9_.-]+-[A-Za-z0-9_-]+\.js' | sort -u
}

run_battery() {
  # --- 0. entry HTML + app chunk ---
  local root app_name app_body
  root="$(http_get "$BASE_URL/")"
  app_name="$(resolve_chunk "$root" 'app-[A-Za-z0-9_-]+\.js')"
  if [ -z "$app_name" ]; then
    note_fail "FATAL: could not resolve app chunk from $BASE_URL/ (site down or shell changed)"
    return 1
  fi
  app_body="$(http_get "$(chunk_url "$app_name")")"
  if [ -z "$app_body" ]; then
    note_fail "FATAL: app chunk $app_name unreachable"
    return 1
  fi
  note_pass "entry: $BASE_URL/ -> $app_name ($(printf '%s' "$app_body" | wc -c | tr -d ' ') bytes)"

  # --- 1. view chunks from the app chunk map ---
  local smgv sdv ct smgv_body sdv_body ct_body
  smgv="$(resolve_chunk "$app_body" 'SamlMetadataGeneratorView-[A-Za-z0-9_-]+\.js')"
  sdv="$(resolve_chunk "$app_body" 'SamlDecoderView-[A-Za-z0-9_-]+\.js')"
  ct="$(resolve_chunk "$app_body" 'conversionTracking-[A-Za-z0-9_-]+\.js')"
  for pair in "SamlMetadataGeneratorView:$smgv" "SamlDecoderView:$sdv" "conversionTracking:$ct"; do
    if [ -z "${pair#*:}" ]; then note_fail "chunk not in app map: ${pair%%:*}"; fi
  done
  [ ${#FAIL[@]} -gt 0 ] && return 1
  smgv_body="$(http_get "$(chunk_url "$smgv")")"
  sdv_body="$(http_get "$(chunk_url "$sdv")")"
  ct_body="$(http_get "$(chunk_url "$ct")")"
  [ -n "$smgv_body" ] && note_pass "view chunk: $smgv" || note_fail "SamlMetadataGeneratorView chunk unreachable"
  [ -n "$sdv_body" ] && note_pass "view chunk: $sdv" || note_fail "SamlDecoderView chunk unreachable"
  [ -n "$ct_body" ] && note_pass "view chunk: $ct" || note_fail "conversionTracking chunk unreachable"

  # --- 2. scope: ab-default wired only at the flip call site ---
  local n_abdefault_smgv n_abdefault_sdv n_flag_smgv
  n_abdefault_smgv="$(occurrences "$smgv_body" 'ab-default')"
  n_flag_smgv="$(occurrences "$smgv_body" 'formatho_cta_ab')"
  n_abdefault_sdv="$(occurrences "$sdv_body" 'ab-default')"
  if [ "$n_abdefault_smgv" -ge 1 ]; then
    note_pass "flip wired: ab-default x$n_abdefault_smgv in SamlMetadataGeneratorView"
  else
    note_fail "flip NOT wired: ab-default missing from SamlMetadataGeneratorView (A/B default-on lost)"
  fi
  if [ "$n_flag_smgv" -ge 1 ]; then
    note_pass "view off-check: formatho_cta_ab x$n_flag_smgv in SamlMetadataGeneratorView"
  else
    note_fail "view off-check: formatho_cta_ab absent from SamlMetadataGeneratorView (bottom-CTA kill path lost)"
  fi
  if [ "$n_abdefault_sdv" -eq 0 ]; then
    note_pass "scope: ab-default absent from SamlDecoderView (split stays page-scoped)"
  else
    note_fail "scope LEAK: ab-default x$n_abdefault_sdv in SamlDecoderView (split no longer page-scoped)"
  fi

  # --- 3. EnterpriseCta chunk: shared import of both saml views that carries
  #        the A/B machinery (ships as a vue_vue_type_* chunk, name varies) ---
  local ec_body cand c
  ec_body=""
  for c in $(comm -12 <(import_list "$smgv_body") <(import_list "$sdv_body")); do
    case "$c" in app-*) continue ;; esac
    local body; body="$(http_get "$(chunk_url "$c")")"
    if [ "$(occurrences "$body" 'data-cta-variant')" -gt 0 ]; then ec_body="$body"; break; fi
  done
  if [ -z "$ec_body" ]; then
    note_fail "EnterpriseCta chunk not found via saml view shared imports (A/B machinery vanished from build)"
  else
    local n_flag n_attr n_off n_abd n_copya n_copyb
    n_flag="$(occurrences "$ec_body" 'formatho_cta_ab')"
    n_attr="$(occurrences "$ec_body" 'data-cta-variant')"
    n_off="$(occurrences "$ec_body" '"off"')"
    n_abd="$(occurrences "$ec_body" 'abDefault')"
    n_copya="$(occurrences "$ec_body" 'Need this on-premise or behind your firewall?')"
    n_copyb="$(occurrences "$ec_body" 'Air-gap your SAML stack')"
    [ "$n_flag" -ge 1 ] && note_pass "EC: formatho_cta_ab x$n_flag" \
      || note_fail "EC: formatho_cta_ab absent (flag machinery lost)"
    [ "$n_attr" -ge 2 ] && note_pass "EC: data-cta-variant x$n_attr" \
      || note_fail "EC: data-cta-variant x$n_attr <2 (variant attr lost)"
    [ "$n_off" -ge 1 ] && note_pass "EC: kill-switch override ('\"off\"' literal) present" \
      || note_fail "EC: kill-switch BROKEN — no '\"off\"' literal (10-05 9d9b048 regression class)"
    [ "$n_abd" -ge 1 ] && note_pass "EC: abDefault prop x$n_abd" \
      || note_fail "EC: abDefault prop absent (default-on path lost)"
    [ "$n_copya" -ge 1 ] && note_pass "EC: control copy present" \
      || note_fail "EC: control copy absent"
    [ "$n_copyb" -ge 1 ] && note_pass "EC: variant B copy present" \
      || note_fail "EC: variant B copy absent (iterate path lost)"
  fi

  # --- 4. conversion events (all 4 are gate-relevant) ---
  local ev
  for ev in tool_page_view tool_result_copied enterprise_cta_click cta_variant; do
    if [ "$(occurrences "$ct_body" "$ev")" -ge 1 ]; then
      note_pass "event: $ev in $(basename "$ct")"
    else
      note_fail "event MISSING: $ev not in $(basename "$ct")"
    fi
  done

  # --- 5. HouseAd phase-1 machinery (flag stays OFF by default) ---
  local host_view hv_body ad_body
  for host_view in \
    "$(resolve_chunk "$app_body" 'BpmnToVisioConverterView-[A-Za-z0-9_-]+\.js')" \
    "$(resolve_chunk "$app_body" 'JsonViewerView-[A-Za-z0-9_-]+\.js')"; do
    [ -z "$host_view" ] && continue
    hv_body="$(http_get "$(chunk_url "$host_view")")"
    [ -z "$hv_body" ] && continue
    for c in $(import_list "$hv_body"); do
      case "$c" in app-*) continue ;; esac
      local body; body="$(http_get "$(chunk_url "$c")")"
      if [ "$(occurrences "$body" 'formatho_house_ads')" -gt 0 ]; then ad_body="$body"; break 2; fi
    done
    break
  done
  if [ -z "${ad_body:-}" ]; then
    note_fail "HouseAd chunk not found via tool view imports (phase-1 machinery vanished)"
  else
    for ev in formatho_house_ads house_ad_view house_ad_click; do
      if [ "$(occurrences "$ad_body" "$ev")" -ge 1 ]; then
        note_pass "house-ad: $ev"
      else
        note_fail "house-ad MISSING: $ev"
      fi
    done
  fi
  # verdict for callers that check the return code (report() prints details)
  [ ${#FAIL[@]} -eq 0 ]
}

report() {
  local p
  for p in "${PASS[@]:-}"; do [ -n "$p" ] && printf '%s\n' "$p"; done
  if [ ${#FAIL[@]} -gt 0 ]; then
    for p in "${FAIL[@]:-}"; do [ -n "$p" ] && printf '%s\n' "$p"; done
    printf 'AB BATTERY: %d pass / %d FAIL (host %s)\n' "${#PASS[@]}" "${#FAIL[@]}" "$BASE_URL"
    return 1
  fi
  printf 'AB BATTERY: %d pass / 0 FAIL — ALL GREEN (host %s)\n' "${#PASS[@]}" "$BASE_URL"
  return 0
}

selftest() { # offline fixtures; each case must produce the expected verdict
  local tmp; tmp="$(mktemp -d)"
  local app_app="app-TEST.js" smgv="SamlMetadataGeneratorView-TEST.js" \
        sdv="SamlDecoderView-TEST.js" ct="conversionTracking-TEST.js" \
        ec="vue_vue_type_script_setup_true_lang-TEST.js" ad="HouseAd-TEST.js" \
        bpmn="BpmnToVisioConverterView-TEST.js"
  mkdir -p "$tmp/t1" "$tmp/t2" "$tmp/t3" "$tmp/t4" "$tmp/t5"
  for d in t1 t2 t3 t4 t5; do
    printf '<html><script src="/assets/%s"></script></html>' "$app_app" > "$tmp/$d/index.html"
    # app chunk map: view chunks + (not) the shared EC/ad chunks by name
    printf '"%s","%s","%s","%s"' "$smgv" "$sdv" "$ct" "$bpmn" > "$tmp/$d/$app_app"
    # view chunks: flip page wires ab-default + own off-check; decoder clean
    printf 'import"./%s";e.createElement(o,{ab-default:!0});localStorage.getItem("formatho_cta_ab")' "$ec" > "$tmp/$d/$smgv"
    printf 'import"./%s";e.createElement(o,null)' "$ec" > "$tmp/$d/$sdv"
    # EC chunk: full machinery (t2 drops the "off" literal; t3 leaks scope)
    printf 'formatho_cta_ab;formatho_cta_ab_seed;data-cta-variant;data-cta-variant;f==="off";props.abDefault;Need this on-premise or behind your firewall?;Air-gap your SAML stack' > "$tmp/$d/$ec"
    # conversionTracking (t4 drops cta_variant)
    printf 'tool_page_view;tool_result_copied;enterprise_cta_click;%s' \
      "$([ "$d" = t4 ] && printf '' || printf 'cta_variant')" > "$tmp/$d/$ct"
    printf 'formatho_house_ads;house_ad_view;house_ad_click' > "$tmp/$d/$ad"
    printf 'import"./%s"' "$ad" > "$tmp/$d/$bpmn"
  done
  # t2: kill-switch literal removed from EC chunk
  printf 'formatho_cta_ab;data-cta-variant;data-cta-variant;props.abDefault;Need this on-premise or behind your firewall?;Air-gap your SAML stack' > "$tmp/t2/$ec"
  # t3: scope leak — decoder also wires the flip
    printf 'import"./%s";e.createElement(o,{ab-default:!0})' "$ec" > "$tmp/t3/$sdv"
  # t5: entry HTML no longer references the app shell
  printf '<html>no shell here</html>' > "$tmp/t5/index.html"

  local ok=0 total=0 verdict d exp_fail exp_code rc spec
  for spec in "t1 - 0" "t2 kill-switch 1" "t3 scope 1" "t4 event 1" "t5 FATAL 1"; do
    read -r d exp_fail exp_code <<<"$spec"
    total=$((total+1)); PASS=(); FAIL=()
    FIXTURE_DIR="$tmp/$d" BASE_URL="https://fixture.test" run_battery >/dev/null 2>&1
    rc=$?
    verdict="ok"
    if [ "$exp_code" -eq 0 ]; then
      [ "$rc" -eq 0 ] || verdict="MISMATCH (rc=$rc want 0)"
    else
      { [ "$rc" -eq "$exp_code" ] && printf '%s\n' "${FAIL[@]}" | grep -qF "$exp_fail"; } \
        || verdict="MISMATCH (rc=$rc want $exp_code, fail-look-for=$exp_fail)"
    fi
    printf 'selftest %s: %s\n' "$d" "$verdict"
    [ "$verdict" = ok ] && ok=$((ok+1))
  done
  printf 'SELFTEST: %d/%d\n' "$ok" "$total"
  rm -rf "$tmp"
  [ "$ok" -eq "$total" ]
}

if [ "${1:-}" = "--selftest" ]; then
  selftest; exit $?
fi
[ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ] && { sed -n '2,20p' "$0"; exit 0; }
BASE_URL="${1:-${FORMATHO_BASE_URL:-https://formatho.com}}"
run_battery
report
