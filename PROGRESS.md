# PROGRESS.md — website-qa agent work log

One line per work block: date | summary | status | link. Detailed archive for 2026-09-22→09-24 at bottom (pre-format).

2026-09-29 | work-block am: shipped 3 stranded tools (gtin-validator, dpp-readiness, spf-analyzer) to main — were prod-only (0720fab) and 404 live; cherry-pick+merge resolved 2 merge-brace breaks, deploys green (b39664e/e55d2c8), live 200 all 3, sitemap 170 lastmod incl new URLs | ✅ verified | https://formatho.com/tools/gtin-validator
2026-10-01 | work-block am: OKR-2 KR3 weekly QA crawl — 279/279 URLs OK on qa.formatho.com (avg 382ms, 0 slow >3s); QA current with main 081dee4 (newest 5 tools 200; live bom-cost-rollup title = 'Automotive BOM…' from 081dee4; 172 lastmod entries live) | ✅ verified | https://qa.formatho.com/sitemap.xml
2026-10-02 | work-block am: no new main commits (tip 6585055); standing QA pass all green — overnight CI success (incl. 03:57 UTC scheduled runs), prod-drift-guard healthy (prod==main, 6/6 live titles), QA↔prod sitemap parity IDENTICAL (279/279 locs, 0 diff), fresh QA crawl 279/279 OK (avg 431ms, 0 slow >3s); secrets store empty → backlog #2's 10-05 gate still needs owner Umami read | ✅ verified | https://qa.formatho.com/sitemap.xml
2026-10-04 | work-block am: pre-gate rehearsal for #2 (Oct-5) — A/B machinery re-verified in current rotated chunks: EnterpriseCta is now its own lazy chunk (-fQBYXmr0 QA / -BgP49xFN prod) w/ all 4 markers (flag/attr/copy/seed), view chunks import it; prod browser functional test: formatho_cta_ab=b → variant B w/ data-cta-variant="b" + Air-gap copy, default = control-only SSR; gate-decision.sh rehearsal exits 3 = blind ITERATE/HOLD, sole blocker UMAMI_API_KEY (store empty). Standing pass: c013aa4 (homepage UX) live QA+prod, parity 279/279 IDENTICAL (172 lastmod), crawl 279/279 OK avg 410ms | ✅ verified | https://formatho.com/tools/saml-metadata-generator
2026-10-05 | work-block am: post-flip QA verification of #2's Oct-5 A/B found the kill-switch BROKEN — formatho_cta_ab=off only moved the CTA to the bottom while ab-default still ran the 50/50 (variant B copy + data-cta-variant rendered post-kill; proven live on QA w/ deterministic seed bbbb2222); fixed 29caa33 (explicit off / VITE_CTA_AB=off overrides abDefault in EnterpriseCta), CI 37262099087 green (build + deploy-qa + CodeQL), verified live on QA post-fix: off+seed→b = control-only (no variant attr, CTA bottom), default = top CTA + variant b (flip intact); jwt-decoder spot-check: no CTA at all (scope guardrail holds); PROD still serves 9d9b048 w/ broken kill-switch — main→prod merge of 29caa33 flagged to website-agent in C0C44G305PS | ✅ verified | https://github.com/formatho/website/actions/runs/37262099087
2026-10-09 | work-block am: standing pass all green on new tip 220ece6 — #2 A/B battery 20/20 prod + 20/20 QA (flip, saml-only scope, kill-switch, 4/4 events, HouseAd OFF — machinery intact through the comfyui deploy's chunk rotation); verified 220ece6: 5/5 new ComfyUI/safetensors tools 200 on QA+prod, CI 37637807730 green, IndexNow pinged, sitemap 284 locs w/ QA↔prod parity IDENTICAL, prod-drift healthy (prod==main, 6/6 titles) | ✅ verified | https://formatho.com/tools/comfyui-workflow-inspector

---

## Detailed archive (2026-09-22 → 2026-09-24, superseded by line format above)

## Work log

### 2026-09-22 (Tue AM work block)
- **Task:** OKR-2 KR3 — weekly QA crawl of all site pages (no backlog item assigned; top QA-lane item within autonomy).
- **Artifact:** `scripts/qa-crawl-report.mjs` — sitemap-driven crawler for qa.formatho.com (rewrites canonical prod `<loc>` URLs onto the QA host, 8-way concurrency, follows redirects, flags non-200s and >3s responses). Commit `13aebae`, pushed to main.
- **Result (pre-push crawl):** 246/246 sitemap URLs OK on qa.formatho.com, avg 358ms, 0 slow, 0 failures → weekly crawl clean.
- **Gates:** lint 0 errors (119 pre-existing warnings), build clean, pre-commit checks passed.
- **Status posted** to C0C44G305PS.
- Note: workboard tools (workboard_create etc.) not available in this toolset this session — logged here instead.

### 2026-09-23 (Wed AM work block)
- **Task:** No backlog item assigned; QA lane (OKR-2 KR3). Post-crawl verification of the 7 new main commits (funnel system e11ac0e..934d4b6 + visio-viewer da2ed2e).
- **Found:** qa.formatho.com was silently serving a ~Sep-5 build — `/funnels` + both detail pages 404 on QA (200 on prod), old bundle + old sitemap, while deploy-qa stayed green. Root cause: `docker service update --image ghcr.io/formatho/website:qa` resolved the floating tag from the swarm's local cache, so "converged" deploys never rolled the new image. A hidden second layer: nodes couldn't pull the private ghcr package because deploy-qa lacked `packages: read` (the prod deploy job had it).
- **Fixes (main da2ed2e..0abe1b7):**
  - `dd30164` — deploy by unique per-commit tag (`main-<sha>`) + stale-image guard on the service spec; first run correctly turned the silent failure into a red build (update rolled back)
  - `3faf765` — `packages: read` for deploy-qa → swarm pulled the fresh image, QA updated
  - `0abe1b7` — guard asserts the spec's unique tag (digest lives on the task, not the spec, so the digest check failed a healthy deploy)
- **Verified:** qa.formatho.com `/funnels`, `/funnels/eu-product-passport`, `/funnels/email-auth-hardening`, `/tools/visio-viewer` all 200; visio-viewer "How to View a Visio File Online" section live on QA; crawl 246/246 OK earlier in the block. Sitemap-driven crawl alone can't catch this class (stale sitemap hides missing pages) — the CI guard now does.
- **Next:** CI green-run confirmation for 0abe1b7; sitemap gap — `generate-sitemap.js` lists `/funnels` but not the detail slugs (both prod + QA) → OKR-2 KR3 indexing gap, small data-driven fix.

### 2026-09-24 (Thu AM work block)
- **Task:** OKR-2 KR3 sub-work (assigned, no backlog row) — (1) sitemap funnel-slug gap fix, (2) official CI green confirmation for 0abe1b7.
- **(2) CI confirmation for `0abe1b7` (recorded):**
  - Build and Deploy run 35817717576 — conclusion **success** (build ✅, deploy-qa ✅; generate-version/create-release/deploy skipped as expected for non-tag) — https://github.com/formatho/website/actions/runs/35817717576
  - CodeQL run 35817717562 — conclusion **success** — https://github.com/formatho/website/actions/runs/35817717562
  - This closes the loop on the 2026-09-23 deploy-pipeline repair: all three fix commits verified green end-to-end.
- **(1) Sitemap funnel-slug fix:**
  - `generate-sitemap.js` gained `parseFunnelSlugs()` — regex-parses quoted `slug:` values from `src/data/funnels.ts` (regex not TS-import because Docker builds on node:20-alpine, no native type stripping), emits `/funnels/<slug>` entries (0.8/weekly) after staticRoutes. New funnels flow into the sitemap automatically.
  - Verified: funnel detail meta carries no noindex/canonical → safe to advertise. Sitemap 293 → 295 URLs (`+` exactly 2 new `<url>` blocks).
  - Gates: lint 0 errors (122 pre-existing warnings), build clean, pre-commit gate passed; funnel meta checks ok in post-build verification.
  - Commit `9f1d21c` pushed to main → CI + deploy-qa. Milestones posted to C0C44G305PS.
- **Result (verified live):**
  - CI run 35948407435 (sha 9f1d21c): build ✅, deploy-qa ✅ — https://github.com/formatho/website/actions/runs/35948407435
  - QA sitemap: `/funnels` + both detail slugs present; all three pages 200.
  - **Prod**: main→prod merge (run 35948424834) deployed successfully + IndexNow pinged; `formatho.com/sitemap.xml` carries all 3 funnel URLs → gap closed on **both prod + QA**.
- **Incident (not mine, handled):** `cff7103` (eliza landing) deploy-qa failed with the stale-image guard — root cause was a **concurrent-deploy race** (two deploy-qa jobs hit `qa_qa-app` within seconds; guard saw the other run's fresh tag main-9f1d21c, expected main-cff7103). Not a broken build (build job green). Re-ran the failed job → success; QA now current with main (`/eliza-tools` 200).
  - Follow-up candidate: serialize deploy-qa (workflow `concurrency` group for the QA service) to prevent the race from reddening builds.

#### 2026-09-24 (Thu AM work block, follow-up shipped)
- **Task:** The follow-up above — serialize deploy-qa so concurrent pushes can't race on `docker service update qa_qa-app`.
- **Race proof mid-block:** revenue agent's run 35953939347 (`affiliate_click` push) went in-flight while I was committing — held my push until it completed (completed/success) instead of re-creating the race.
- **Fix (commit `16e6e78`, after rebase onto `5897382`):**
  - `deploy-qa` job-level `concurrency: group deploy-qa-app, cancel-in-progress: false` — queue, never cancel, so an in-flight SSH deploy is never killed half-verified.
  - New `Skip if superseded by a newer commit` step: queries the GitHub API for the branch tip; if this run's sha isn't the tip, deploy is skipped (a queued OLDER run can start after a NEWER one — without this the older sha would win the service with all-green builds, the exact silent-staleness class the guard exists to catch). Fail-open on API trouble; concurrency group already prevents the race itself.
  - Known corner (documented): if the NEWEST run's deploy genuinely fails, queued older runs skip and QA holds the last good image — loud (red build), standard play is fix + re-run newest.
- **Gates:** lint 0 errors (122 pre-existing warnings), build clean, pre-commit hook passed; workspace-state deletions (TOOLS.md etc.) kept uncommitted.
- **Verified:** CI run 35954195452 **success** — deploy-qa ✓ 21s, first live exercise of both new steps (`Skip if superseded…` ✓, `Deploy QA via SSH` ✓); image `main-16e6e78` deployed, guard passed; QA live (`/eliza-tools` 200, sitemap 300 URLs) — https://github.com/formatho/website/actions/runs/35954195452
- **Status posted** to C0C44G305PS.

### 2026-09-25 (Fri AM work block)
- **Task:** OKR-2 KR3 weekly QA crawl + post-push verification of the 6 new main commits since `16e6e78` (`6e6fe76`..`12ffbd1`: password generator tool, CSP fix for Clarity/Cloudflare beacon, 4 multi-chain wallet address fixes).
- **CI verified:** tip `12ffbd1` Build and Deploy run [36001975279](https://github.com/formatho/website/actions/runs/36001975279) success — deploy-qa ✓ with both new steps exercised (`Skip if superseded by a newer commit` ✓, `Deploy QA via SSH` ✓); CodeQL ✓. Concurrency serialization working as designed on real subsequent runs.
- **QA live:** `/tools/password-generator` 200, sitemap 300→301 URLs (new tool picked up automatically via data-driven generation).
- **Weekly crawl:** `node scripts/qa-crawl-report.mjs` → **301/301 OK, avg 378ms, 0 slow >3s, 0 failures** — clean.
- **Prod spot-check:** sitemap 301 URLs, `password-generator` listed, page 200 — prod current too.
- **Status posted** to C0C44G305PS.

### 2026-09-25 (Fri midday work block)
- **Task:** 09-25 briefing — (1) QA crawl + flag sitemap deltas, re-run after website-agent's deploy; (2) 525 incident verification (growth's JEV-SEO-AUDIT-2026-09-24.md: ~40% edge→origin 525/SSL failures on prod, all recover-on-retry).
- **Crawl run 1 (pre-deploy):** 301/301 OK, avg 381ms, 0 slow. Sitemap delta vs 09-24 baseline (git show 9f1d21c): +6 URLs (5 blog posts from Strapi + /tools/password-generator), 0 dropped.
- **website-agent deploy watched:** `e95584a` (runtime SoftwareApplication JSON-LD + /eliza-tools in sitemap) — CI 36106692274 build ✅ deploy-qa ✅, CodeQL ✅.
- **Crawl run 2 (post-deploy):** 302/302 OK, avg 394ms, 0 slow. `/eliza-tools` confirmed in QA sitemap.
- **525 verification (both hosts, exact 09-24 failure endpoints):** 6× each of `/`, `/llms.txt`, `/manifest.json`, `/sitemap.xml` on formatho.com + qa.formatho.com → **48/48 × 200, zero 525s/SSL errors**. Combined with crawls: ~650 requests today, 0 failures. Caveats noted for seo-build: sampled via SIN edge only; original issue was intermittent, so not-reproducing ≠ fixed — their nginx/origin fix should still land. Findings posted to C0C44G305PS for seo-build coordination.
- **Backlog:** monitoring/watch work only → no status change (per dispatch rules; nothing new shipped).
- Tooling note: background exec sessions have a broken PATH (`seq`/`curl` not found → false ERRs); use absolute paths (`/usr/bin/curl`) or foreground for curl loops.

### 2026-09-26 (Sat AM work block)
- **Task:** No backlog item assigned; QA lane (OKR-2 KR3) — verify the 2 new main commits since `12ffbd1`: `1967a54` (SEO: blank-404 patch + blog→blogs 301) and `753e608` (build target es2018).
- **Verified (QA live):**
  - CI green for both: Build and Deploy [36213352152](https://github.com/formatho/website/actions/runs/36213352152) success (deploy-qa ✓, skip-guard ✓), CodeQL ✓.
  - Weekly crawl: **302/302 OK, avg 359ms, 0 slow >3s, 0 failures** — clean.
  - `/blog/<slug>` → 301 → `/blogs/<slug>` live; 404 page patched (serves built entry `/assets/app-C5tesXhg.js`, no `/src/main.ts` dev template).
  - es2018 fix: deployed bundle contains **0 `?.` / `??` / `??=` / `||=` / `&&=` tokens** (node scan of app-C5tesXhg.js). Note: dynamic `import()` remains (ES2020) — vite intentionally keeps it in EDM output; browsers too old for it can't run the app anyway, not the class the fix targeted.
- **Gap found + fixed:** bare `/blog` 404'd (1967a54's regex `^/blog/(.+)$` only covers slugged paths). Committed `location = /blog { return 301 /blogs; }`.
- **Concurrent-fix collision (handled):** website-agent pushed the identical fix (`f15cc63`) while my commit was in pre-commit build → my rebase stacked a **duplicate `location = /blog`** into nginx.conf (nginx won't boot with duplicate exact-match locations). Deduped in `7df2792` and pushed before the broken image could deploy — the deploy-qa supersede guard skipped `0f4c0ca`'s deploy ("Deploy QA via SSH: skipped"), so QA never served the bad config. `7df2792` CI [36216779921](https://github.com/formatho/website/actions/runs/36216779921) success.
- **Final live verify:** `/blog` → 301 → `/blogs`; `/blog/some-post` → 301 → `/blogs/some-post`; `/blogs` 200; `/` 200. Single `location = /blog` in nginx.conf.
- **Observation (no action):** `/blogs` SSR HTML shows "No posts found" pre-hydration — identical on prod, so normal behavior, not a QA regression. JSON-LD carries all 10 posts.
- **Status posted** to C0C44G305PS.

### 2026-09-26 (Sat AM block — completed retro; wrap-up was cut off mid-session)
- **525 verification handoff (row #10): PASSED.** 3 spaced rounds × (40 seq + 48 burst) on formatho.com + qa.formatho.com = 120/120 seq ×200 + 144/144 burst ×200 at 24-way concurrency; weekly QA crawl 302/302 OK — zero 525s all day. Fix (nginx worker_connections 8192 etc., live 09-25) holding.
- **Incident + fix:** 3 red main builds (09-25 11:03 → 09-26 02:38) — deploy-qa's new FRONT PROXY CONFIG DUMP (seo-build hardening) cat'd `$CONF_DIR/*.conf` but the /etc/nginx mount source is a single FILE → 'Not a directory' → script_stop killed the job before the stale-image guard. Fixed in `3c89420` (file-or-dir handling + glob guard). **Confirmed success: run 36212854789**; deploy-qa green on all subsequent runs (04:03 ×2, 04:05, prod merges, 09-27 thin-pages). Stale QA worry was moot: service had rolled forward despite red jobs.
- Local npm install needed after multi-chain commits (ed25519-hd-key) — pre-commit build gate caught it before push.

### 2026-09-27 (Sun AM block)
- **Task:** Standing weekly crawl vs prod + spot-check 09-26 fixes hold.
- **Prod crawl:** 302/302 OK, avg 382ms, 0 slow, 0 4xx/5xx, no divergence (briefing est. ~301 — actual 302, all covered).
- **Spot-checks (all hold):** `/blog` → 301 → `https://formatho.com/blogs` ✅; `/blogs` → 200 ✅; HouseAd chunk live on prod (`HouseAd…-CVISwpxz.js`, 200/1.2KB) with `formatho_house_ads` gate present, and zero house-ad markup rendered on default pages (flag OFF) ✅.
- Thin-pages adsense merge (`9942495`) deployed green mid-block (36289096907, CodeQL ✅).
- **Backlog:** appended live-verification evidence to #4 (house-ads phase-1) and #10 (525 handoff close) notes; no status changes (standing crawl = monitoring, no dedicated row; per dispatch rules).

### 2026-09-27 (Sun 09:30 block)
- **Task:** No open website-qa backlog rows (all shipped); QA lane — verify new main commits since `9942495`, investigate QA sitemap delta.
- **`7e8b3df` (prod-drift guard, backlog #14):** CI Build and Deploy [36289346312](https://github.com/formatho/website/actions/runs/36289346312) success + CodeQL ✓. Ran `scripts/prod-drift-check.sh` from this checkout → **healthy: prod==main, 6 live pages match** (exit 0) — first independent website-qa validation of the guard.
- **Thin-pages merge (`9942495`) verified on QA:** sitemap 302→278 is the deliberate merge; **prod also 278 (QA==prod)**. All 28 merged-away tool URLs → **301 to combined tool/category pages, zero 404s**; all 9 redirect targets (toml-yaml-json-converter, mac-address-toolkit, ipv4-converter-suite, text-encoding-playground, everyday-converters, quick-utilities, /category/developer, /category/network, /tools) → 200. `pdf-signature-checker` + `base64-file-converter` still in live sitemap (diff-extraction noise, not actually removed).
- **QA spot checks:** `/`, `/blogs`, `/eliza-tools`, `/tools/jwt` → 200.
- **Status posted** to C0C44G305PS.

### 2026-09-28 (Mon AM block)
- **Task:** Verify post-deploy of website-agent's sitemap F1/F2 patch (`80812ca` — homepage entry + loc dedupe).
- **Pre-patch live state (quantified the bugs):** 278 URLs with **5 duplicate blog locs** (Strapi∩localPosts overlap: decode-jwt-saml, iso-20022-pain001, keccak-256-vs-sha-256, secure-ai-agent-stack, what-is-jev-system-one) and **no homepage entry**.
- **Deploy:** Build+deploy-qa ✅ (36370792348), CodeQL ✅, main→prod merge ✅ (36370807703), IndexNow pinged ✅.
- **Post-deploy verification — ALL PASS:**
  - Sitemap: **274 URLs** (278 − 5 dupes + 1 homepage — exactly as predicted), homepage `https://formatho.com/` as first entry, **0 duplicates**
  - Chunks live: app chunk rotated to `app-l9yd-xWi.js`, 200; homepage 200
  - Zero regressions: prod crawl **274/274 OK**, avg 350ms, 0 slow
  - prod-drift-guard: **healthy, prod==main**, 6 live pages match; no drift posts in #agent-ops
- Watch methodology: bounded origin/main poller (3-min interval, absolute git path for background-shell PATH gotcha) caught the commit 3 min after push.

### 2026-09-28 (Mon 09:30 work block)
- **Task:** No open website-qa backlog rows (all shipped/closed); no new commits on origin/main since `80812ca`; CI green through the 03:30 UTC scheduled runs. QA lane: standing weekly QA crawl (last QA crawl 09-25 at 302 URLs; sitemap has since changed 302→278→274) + QA-side confirmation of the F1/F2 sitemap fix.
- **QA↔prod sitemap parity:** both 274 `<loc>`s, diff **IDENTICAL**, homepage `https://formatho.com/` first entry on QA too, **0 duplicate locs** → the 80812ca F1/F2 patch is verifiably live on **QA as well as prod** (deploy-qa run 36370792348), not just prod.
- **Weekly QA crawl:** `node scripts/qa-crawl-report.mjs` → **274/274 OK, avg 374ms, 0 slow >3s, 0 failures** — clean.
- **Backlog:** monitoring only → no status changes (per dispatch rules).
- **Status posted** to C0C44G305PS.

### 2026-09-29 (Tue AM block)
- **Task:** Weekly crawl (09-29 briefing) — monitoring only, no BACKLOG changes per dispatch.
- **Result:** **274/274 OK**, avg 382ms, 0 slow >3s, 0 failures — clean.
- **vs last week (09-26, 302-URL crawl):** count 302 → 274 = −28, **fully accounted for by intentional changes** — thin-page consolidation 9942495 (−24: 24 merged into 6 combined, 6 removed, 9 persona pages noindexed) + F1/F2 80812ca (−5 dup blog locs, +1 homepage) → 302−24−5+1 = 274 exactly. No unexplained drops, no 4xx/5xx, deduped blogs still resolve (once), homepage crawls OK. Health identical week-over-week (100% OK, avg 382ms both).
- Overnight: `9c9b907` (EV battery keywords on battery tools) deployed green + IndexNow'd before the crawl.

### 2026-09-29 (Tue 09:30 work block)
- **Task:** QA-lane verification of the 2 new main commits since `9c9b907` — `d5b9620` (git-derived sitemap lastmod for all tool routes; motivator: Google ignores IndexNow, visio-viewer push of 09-23 still not recrawled) + `c188963` (Docker fix: builder stage lacked git + .dockerignore excluded .git, so d5b9620's first deploy silently shipped **no** lastmods).
- **CI:** both green — Build and Deploy [36515922879](https://github.com/formatho/website/actions/runs/36515922879) (d5b9620) + [36516727949](https://github.com/formatho/website/actions/runs/36516727949) (c188963) success, CodeQL ✓, IndexNow pinged; prod deployed both (live evidence below).
- **Live verification — all pass (QA + prod identical):** 274 `<loc>` (count unchanged), **167 git-derived `<lastmod>`** entries now live on both hosts (fix verifiably worked: pre-c188963 deploy had 0), xmllint well-formed, date range 2026-08-21→2026-09-29 sane.
- **Date-sanity spot checks vs git:** visio-viewer lastmod `2026-09-23` (exactly the content-push date claimed in commit msg) ✓; password-generator `2026-09-24` = git last-touch ✓; jwt `2026-09-21` ✓ — per-route pickaxe stamping accurate, no global restamp.
- **Crawl regression:** 274/274 OK, avg 392ms, 0 slow, 0 failures — lastmod addition broke nothing downstream.
- **Status posted** to C0C44G305PS. Monitoring/verification only → no BACKLOG changes.

### 2026-09-30 (Wed AM block)
- **Task:** Independent prod verification pass (09-30 briefing) — drift guard, key pages/chunks, no regressions vs yesterday.
- **All PASS:**
  - prod-drift-guard: healthy, prod==main, 6 live pages match
  - Key pages 8/8 → 200 (/, /tools, /funnels, /eliza-tools, /runtime, /blogs, /tools/jwt, /tools/visio-viewer)
  - Sitemap **279 URLs** — briefing's 274 + 5 intentional overnight additions (1 blog: how-to-open-camunda-bpmn-files-in-visio via `cb5e75e` + 4 tools: csr-decoder, dpp-readiness, gtin-validator, spf-analyzer), 0 dropped, homepage-first, 0 dupes — all 5 new URLs → 200
  - Overnight **git-derived sitemap lastmod** feature (`d5b9620` + Docker fix `c188963`) live and correct: 172 lastmod entries; /tools/visio-viewer → 2026-09-23 exactly matching the content-push commit
  - HouseAd: chunk live (Cl-a-m3e.js 200) with flag + house_ad_view/click events; **0 markup rendered by default → gated OFF**
  - Conversion events: tool_page_view / tool_result_copied / enterprise_cta_click present in current conversionTracking chunk
  - Overnight CI: all green (last: cb5e75e run 36654041013 + CodeQL + IndexNow)

### 2026-09-30 (Wed 09:30 work block)
- **Task:** No new commits since `cb5e75e` (verified earlier AM block); QA lane — independent verification of backlog #2's A/B iterate path (`36e70b4`, shipped 09-29: variant B copy + `formatho_cta_ab` flag + `cta_variant` payload) ahead of the Oct-5 gate, plus the GA consent-mode change (`9722d7a`).
- **All PASS:**
  - Default state: `/tools/saml-metadata-generator` serves control copy only on prod AND QA (A-copy 1×, B-copy strings 0× in HTML on both hosts) — flag OFF by default, zero public change
  - Chunks: gate + both copy variants live in EnterpriseCta chunks (prod `…-CmSzrN7a.js` / QA `…-BHNiFuBJ.js` — separate builds, both 200); `cta_variant` + `enterprise_cta_click` in `conversionTracking-DRyAA0LP.js`
  - **Browser functional test (prod):** localStorage `formatho_cta_ab=b` → variant B renders ("Air-gap your SAML stack" + air-gapped body, `data-cta-variant="b"`); `=a` → control A; cleared → control with no variant attr. Iterate path fully functional — Oct-5 ITERATE decision = zero code
  - GA (`9722d7a`): standard gtag snippet live, 0 manual `gtag('consent')` calls; remaining "consent" strings are privacy-policy prose (CMP handles consent)
- **Backlog:** appended verification evidence to row #2. Tab hygiene: test tab closed, flag + seed cleared on the visitor profile.
- **Status posted** to C0C44G305PS.

### 2026-10-01 (Thu AM block)
- **Re-dispatch closure (stale 09-24 assignment):** both items shipped 09-24 and still holding — 0abe1b7 CI runs all `success` (Build+deploy-qa + CodeQL); funnel detail slugs present in current sitemap (2), /funnels/eu-product-passport 200. No new work needed; dispatcher queue item explicitly closed.
- **Independent verification pass (today's briefing):**
  - Conversion events: chunk rotated to `conversionTracking-QkfGd2vB.js` (200), all 3 events intact (tool_page_view / tool_result_copied / enterprise_cta_click)
  - HouseAd: chunk `3f50atAb.js` (200) with flag gate; **0 markup by default on bpmn-to-visio → OFF**
  - **A/B flag state: nothing ACTIVE on prod; both mechanisms verified** — (a) hero A/B (`formatho_ab_test`) is unwired dead code, config window expired 2026-04-05, zero strings in deployed main bundle; (b) CTA A/B (`formatho_cta_ab`, shipped 09-29 36e70b4) machinery IS live in lazy view chunks (SamlDecoderView-Bt6J_DOY.js: flag ×3 + data-cta-variant ×2), default renders **control-only** (0 variant markers in HTML), `cta_variant` event present in conversionTracking chunk — Oct-5 ITERATE flip needs zero further code, per #2 gate memo
  - Drift guard cross-check: healthy — prod==main, 6 live pages match

### 2026-10-04 (Sun midday — steward check, no work block)
- Steward asked for status after ~2-day runtime outage (10-02 PM → 10-04 AM). **No website-qa block was in-flight** — last completed: 10-01 AM (this session); 09-30 CTA A/B entry was a sibling website-qa session. No 10-02/10-03 entries = no sessions ran during the outage, as expected.
- Post-outage health: prod-drift-guard **healthy (prod==main, 6 live pages match)**; key pages /, /tools, /funnels all 200; GitHub Actions kept running through the outage (scheduled runs green 10-03→10-04). Nothing drifted; nothing blocking.
- Note: any briefings dispatched into the outage window never reached a session — re-dispatch if still relevant.

### 2026-10-04 (Sun midday — T-1 gate verification pass, outage-delayed briefing)
- **Task:** Independent prod verification, T-1 to backlog #2's Oct-5 gate.
- **ALL PASS:**
  - Drift guard: healthy — prod==main, 6 live pages match (incl. `c013aa4` homepage-UX deploy)
  - Key routes 6/6 → 200
  - **Conversion events: all 4 gate-relevant events live** in `conversionTracking-BHgkHCN0.js` (200): tool_page_view / tool_result_copied / enterprise_cta_click / **cta_variant**
  - CTA A/B: machinery now consolidated in the **EnterpriseCta chunk** (`BgP49xFN.js`, 200: formatho_cta_ab ×3 + data-cta-variant ×2 — moved out of per-view chunks by the 10-02→04 deploys, not a regression); default renders control-only (0 variant markers on /tools/saml-decoder)
  - HouseAd: chunk `ZLrNFDlP.js` 200; 0 markup by default → **OFF**
- Context: no Build-and-Deploy ran during the runtime outage (only scheduled GH Actions); current chunks are from the 10-02 morning deploys + c013aa4. Repo's committed work log (6585055/560c50a) confirmed the 10-02 09:31 standing-pass session pre-outage.
- **Oct-5 gate readiness: ITERATE path fully functional, zero code needed** — events + flag machinery + control default all verified on current prod chunks.

### 2026-10-05 (Mon AM block — gate-day QA pass on #2 ITERATE flip)
- **Flip:** `9d9b048` (abDefault prop, page-scoped to saml-metadata-generator) — CI green incl. prod merge 37256658388 + IndexNow; watched it land 3 min after push.
- **Prod functional battery (browser, fresh localStorage): ALL PASS** — default split ON (variant b, B copy, above-fold y≈221/873, seed auto-created); reload-stable (same variant + seed); `=a`→control copy/attr=a; `=b`→B copy/attr=b; cleared→natural re-split (new seed → variant a — both hash arms observed). **Scope isolation:** saml-decoder = control copy, NO variant attr (seed present but unused).
- **QA battery:** default split + reload determinism PASS.
- **⚠️ Finding — kill-switch `off` broken in 9d9b048:** prod ignores `formatho_cta_ab=off` (falls through abDefault → split continues; attr=b persisted). Verified in deployed chunk (no "off" literal in EC-CgkThRBj.js) + committed source (no off branch). Commit message documented a kill-switch the code never had. A sibling website-qa session independently found + fixed it (`29caa33`, live on QA — I browser-verified: off→control-only, no attr). **Prod still awaits main→prod merge of 29caa33** (flagged to website-agent via #agent-ops + backlog #2). Working kill today: one-line revert at call site.
- Standard checks: 4/4 conversion events in `conversionTracking-B_GR1rx6.js`; HouseAd chunk 200 + 0 markup default → OFF; drift: prod behind main by fix+docs commits (expected until prod merge).
- Tab hygiene: prod + QA localStorage cleared, tab reset to about:blank.

### 2026-10-06 (Tue AM block — standing prod pass + kill-switch hold confirmation)
- **Context:** 29caa33 (kill-switch fix) merged to prod at 1404dfe; drift healthy prod==main; prod chunks rotated (app-DWMivJmW.js, EC-CgN1LdMU.js carries "off").
- **Browser battery on prod — ALL PASS:**
  - **Kill-switch holding:** `formatho_cta_ab=off` → control-only, `data-cta-variant` **absent** (verified twice — inherited off state from sibling's test + explicit re-test after re-enabling the split)
  - **Default split stays ON post-fix:** cleared → variant b + B copy above-fold, fresh seed, reload-deterministic (same variant+seed)
  - **Scope intact:** saml-decoder (clean state) → no variant attr, control copy — split remains page-scoped to saml-metadata-generator
- Standard: 4/4 conversion events in `conversionTracking-BLFvqK4d.js` (200); HouseAd chunk 200 + 0 default markup → OFF; key routes 4/4 × 200.
- Tab hygiene: prod localStorage cleared, tab reset to about:blank.

### 2026-10-06 (Tue AM work block — QA-domain pass + repo convergence)
- **Assignment check:** no new briefings; backlog has no open website-qa items (sibling session already completed the 10-06 standing prod pass + #2 HOLD-confirm). #4 CRO watch noted: ad gate pushed OUT — DO NOT flip.
- **CI health:** last 8 runs green incl. overnight dependabot wave (77ed8c3 dompurify + ef74133 vue/katex/source-map-js, prod deploys 37405652255/37406354582).
- **QA crawl** (`scripts/qa-crawl-report.mjs` vs qa.formatho.com): **279/279 OK, avg 383ms, 0 slow** — weekly crawl clean.
- **Repo convergence:** prod+QA sitemaps already serve `lastmod 2026-10-05` for /tools/saml-metadata-generator (rotated by the 10-05 ITERATE flip deploys) but main was one behind (uncommitted local regen). Committed the sync (`107045e`, rebased over the overnight dependabot wave after an initial push rejection); first two attempts hit commitlint (header 107>100, then body line >100) — build itself passed all pre-commit checks each time; third attempt with wrapped message.

### 2026-10-07 (Wed AM block — standing prod pass)
- **Overnight changes:** `107045e` (lastmod sync) + `ef74133` (dependabot wave: vue 3.5.43, katex, source-map-js) — chunks rotated to app-CJZh95n6 / EC-Dw0zU8hC / conversionTracking-DhVCEY3r.
- **All PASS:**
  - Kill-switch holding on the NEW build (post-dependabot rebuild): off → control-only, `data-cta-variant` absent
  - Default 50/50 split ON (fresh: variant b + B copy, seed auto-created); scope intact (saml-decoder clean → no attr, control copy)
  - 4/4 events in conversionTracking-DhVCEY3r.js; HouseAd chunk 200 + 0 default markup → OFF
  - Drift: healthy prod==main; key pages 5/5 × 200
- Sitemap lastmod sync (`107045e`) verified live yesterday: saml-metadata-generator carries lastmod 2026-10-05.
- Tab hygiene: localStorage cleared, tab reset.

### 2026-10-07 (Wed AM work block — #2 A/B morning battery scripted)
- **Task:** No new assignment (the 10-07 standing prod pass above was done by a sibling session); QA lane — automated the 3-morning manual #2 A/B battery into a one-command guard.
- **Artifact:** `scripts/ab-battery-check.sh` (commit `02785cf`, CI 37570123108 green incl. deploy-qa): resolves entry HTML → app chunk map → view chunks; asserts flip wiring (`ab-default` ×2 in SamlMetadataGeneratorView) + view off-check + scope (`ab-default` absent from SamlDecoderView); discovers the shared EnterpriseCta chunk via the saml views' import intersection (it ships as a `vue_vue_type_*` chunk, not a named one) and asserts flag ×3 / `data-cta-variant` ×2 / `"off"` kill literal / `abDefault` / both copy variants; all 4 conversion events in the conversionTracking chunk; HouseAd machinery via tool-view imports. `--selftest` 5/5 offline fixtures (kill-switch-broken, scope-leak, missing-event, no-shell cases). Guards the 10-05 9d9b048 class — green chunk greps with a broken kill-switch.
- **Find en route:** CTA copy strings are NOT present in served HTML on either host (client-render only, incl. prerendered pages) — battery therefore asserts at chunk level, not HTML level.
- **Live:** prod 20/20 ALL GREEN (app-CJZh95n6, off-literal present in EC chunk, cta_variant in conversionTracking-DhVCEY3r); QA 20/20 pre-push and 20/20 post-deploy (app-CkEh4VJy / conversionTracking-CsYAsuoU).
- **Status posted** to C0C44G305PS.

### 2026-10-09 (Fri AM work block — standing pass + 220ece6 comfyui deploy verification)
- **Assignment check:** no new briefings; no open website-qa backlog items (all shipped/reassigned). QA lane: standing morning pass + first-pass verification of `220ece6` (5 new ComfyUI/safetensors tool pages, shipped 10-07 20:03 by website-agent — after my 10-07 AM block).
- **#2 A/B battery** (`scripts/ab-battery-check.sh`): **prod 20/20 + QA 20/20 ALL GREEN** on the 220ece6 build — flip wiring (`ab-default` ×2, saml-metadata-generator only), scope (saml-decoder clean), EnterpriseCta markers (flag ×3, `data-cta-variant` ×2, `"off"` kill literal, `abDefault` ×2, both copies), 4/4 conversion events (prod `conversionTracking-C1v8mp_p` / QA `-UG2dlY3d`), HouseAd machinery shipped + OFF. Machinery survived the comfyui deploy's chunk rotation.
- **220ece6 verification:** CI 37637807730 success (Build+Deploy incl. deploy-qa) + IndexNow ping success; **5/5 new pages 200 on both hosts** — comfyui-workflow-inspector / comfyui-api-converter / comfyui-workflow-diff / comfyui-sampler-guide / safetensors-reader (QA 0.6–1.5s, prod ~0.6s); title + meta description render correctly (inspector title "ComfyUI Workflow Inspector - Check Any Workflow JSON | Formatho", matches established-page pattern).
- **Sitemap:** 284 locs live (279 + 5 new), QA↔prod parity IDENTICAL (0-loc diff).
- **Drift:** `prod-drift-check.sh` healthy — prod==main, 6 live pages match.
- **Status posted** to C0C44G305PS.

### 2026-10-10 (Sat AM block — standing A/B battery via ab-battery-check.sh)
- **Repo state:** 4 commits since 02785cf (comfyui suite 220ece6 + docs) → both hosts in scope per dispatch.
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD *and* QA** (first scripted run; sibling's 02785cf tooling):
  - A/B machinery live through chunk rotations (prod app-nUn17Wj0 / EC markers ×3+×2 / off literal / abDefault ×2 / both copy variants)
  - Scope: ab-default only in SamlMetadataGeneratorView; absent from SamlDecoderView
  - 4/4 events in current conversionTracking chunks (prod CfG6SKuI / QA CDz-hs6E)
  - HouseAd phase-1 machinery shipped (flag + house_ad_view/click); default OFF (0 markup)
- Drift healthy (prod==main, 6 live pages) · prod / 200.
- No reds → nothing to diagnose.

### 2026-10-11 (Sun AM block — standing A/B battery + key-page spot checks)
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD *and* QA** (prod app-B4KNMfjM / conv B7yZXJnc; QA app-Bc5DSJV4 / conv dLOEcTdw — chunk rotations absorbed, all compiled markers hold: flip scoped, kill override, abDefault, both copies, 4/4 events, house-ad machinery OFF).
- Drift healthy (prod==main, 6 live pages) · key pages 7/7 × 200 (/, /tools, /funnels, /eliza-tools, /blogs, /tools/jwt, /tools/saml-metadata-generator).
- No reds → nothing to diagnose.

### 2026-10-11 (Sun AM work block 2 — sitemap lastmod host-parity guard)
- **Assignment check:** no new briefings; no open website-qa backlog rows; standing pass green —
  CI all green (incl. 10-10 PM prod merge 18cba94, run 38041922241), drift healthy (prod==main,
  6/6 titles), sitemap loc parity 284/284 identical across hosts.
- **Finding (root-caused, benign):** full-file sitemap diff prod↔QA showed 3 lastmod divergences
  (dpp-readiness / gtin-validator / spf-analyzer: prod 2026-09-22 vs QA 2026-09-29). Root cause:
  the 09-29 rescue cherry-pick — tools authored prod-only at 0720fab (commit-dated 09-22),
  cherry-picked to main as 5b7a3b0 (commit-dated 09-29); generate-sitemap.js stamps %cs
  (commit date), so each branch reports its own last-touch. Prod's 09-22 is the true content
  authoring date; Google sees a stable truthful date; self-heals on next real content edit.
  No live change made (fake-dating lastmods would burn recrawl trust).
- **Artifact:** `scripts/prod-drift-check.sh` gained section 3 — WARN-only sitemap lastmod
  host-parity check (fetch both sitemaps, join loc→lastmod, report divergence; loc-set mismatch
  or empty fetch also WARN; exit code unchanged so website-agent's 6h cron stays
  silent-when-healthy). Known-benign class documented in-script.
- **Verified live:** `bash -n` clean; full run from repo root → exactly the 3 expected WARNs +
  `healthy: prod==main, 6 live pages match`, exit 0.

### 2026-10-12 (Mon AM block — A/B battery + standing drift watch)
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD and QA** (prod app-D3P22yUu / conv vvyqvhTi; QA conv C5UVOvZo — all markers hold through rotations).
- **Drift: healthy prod==main** (6 live pages) · key pages 5/5 × 200 · HouseAd OFF (0 markup).
- **Tooling note (important):** `c1919f5` added a bash-only process-substitution to prod-drift-check.sh's new warn-only sitemap host-parity check — the script now MUST run via bash/shebang-direct, not `/bin/sh` (my habitual invocation broke with a line-93 syntax error; bash run healthy). Under bash the parity check emits 2 benign WARNs (gtin-validator, spf-analyzer lastmod prod 09-22 vs QA 09-29 — pages 200 on both). Flagged in channel so the prod-drift-guard cron invocation gets double-checked.

### 2026-10-12 (Mon AM work block 2 — POSIX-safe prod-drift-check)
- **Assignment check:** delegated slack:read blocked this run; BACKLOG has no open website-qa rows → executed the open tooling follow-up flagged by this morning's standing pass.
- **Fix:** prod-drift-check.sh sitemap host-parity check rewritten POSIX-safe — bash-only process substitution (`comm -3 <(...)`, `join <(...)`) replaced with sorted `mktemp -d` files + explicit cleanup. Restores the `/bin/sh scripts/prod-drift-check.sh` invocation documented in the prod-verification-pass skill, and de-risks the 6h prod-drift-guard cron regardless of how it invokes the script.
- **Verified live:** `bash -n` + `/bin/sh -n` clean, zero `<( ` remaining in the file; full runs under BOTH shells byte-identical: exactly the 3 known-benign lastmod WARNs (dpp-readiness/gtin-validator/spf-analyzer, prod 09-22 vs QA 09-29) + `healthy: prod==main, 6 live pages match`, exit 0. (prod==main held through c8b6d14 visio patch — prod already converged by the growth session; AM note's "2 WARNs" was an undercount, full set is 3.)

### 2026-10-13 (Tue AM block — A/B battery + posix-fix close-out)
- **Part 1 — Battery: 20 pass / 0 FAIL — ALL GREEN on PROD and QA** · key pages 5/5 × 200 · HouseAd OFF.
- **Part 2 — 9ee1c2f posix fix VERIFIED: GREEN.**
  - Diff audit: assertion-equivalent (full-line sort → cut ≡ cut → sort with unique locs; identical comm/join inputs; WARN logic untouched — no weakened checks)
  - Empirical: /bin/sh and bash both execute the full check-set; outputs byte-identical modulo run timestamps (only diff: DETECTED-line timestamp 10s apart); sh exit 1 was a legitimate drift finding (clean output), NOT a syntax error
  - Cron: prod-drift-guard (6e85b01c, every 6h, website-agent isolated) **last run 3h ago: ok, no last-error** on the fixed script → posix-safe end-to-end confirmed; state DB protected so exact shell mode uninspectable, but post-fix run health is the operative proof. Next run +3h.
  - Current drift finding = `b07ced2` (sibling's docs commit) pending routine prod merge — guard working as designed, not a red.
- Note: mid-block the drift state moved (healthy → 1-commit drift) as the sibling pushed; the earlier wild-hav session proved the healthy state pre-push. Both states correctly reported.

### 2026-10-14 (Wed AM block — standing A/B battery)
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD and QA** against current chunks (prod app-S_n1guHb 752,893B / conv DKXatNYU; QA conv CYmhbky0 — hash rotations verified per briefing, not yesterday's).
- Drift healthy (prod==main — b07ced2 merged overnight) · key pages 5/5 × 200 · HouseAd OFF.
- Note: entry bundle +3.9KB vs 10-12 = cloudhsm guide + EVM deriver tool (41dbc28) now live on both hosts.

### 2026-10-14 (Wed AM work block 2 — mid-week crawl on expanded URL set + rebase housekeeping)
- **Assignment check:** delegated slack:read blocked this run; no open website-qa backlog rows → standing QA pass on the 3 overnight commits (3e383b4 / 178499f / 9136f3e).
- **Housekeeping:** worktree was behind 3 with unstaged changes — stashed, rebased to 9136f3e, popped; one sitemap.xml conflict resolved to origin's version (my stashed cloudhsm lastmod one-liner already upstream; 288 locs both). Workspace-state deletions/untracked left uncommitted as always.
- **Crawl artifact: QA 288/288 OK, avg 406ms, 0 slow** (`qa-crawl-report.mjs`) — first full crawl of the expanded set: /tools/cloudhsm-evm-address + the 3 new eliza/env URLs (eliza-character-validator, env-hygiene-checker, eliza-plugin-linter) all crawled green; +4 vs 10-10's 284.
- **Drift:** `/bin/sh scripts/prod-drift-check.sh` healthy (prod==main through the 9136f3e prod merge d28c02d / deploy 38443272149) — only the 3 known-benign 09-29-skew lastmod WARNs, exit 0.
- **Spot checks:** 3 new tool URLs + /about all 200 on prod; 178499f publisher-section removal verified live on both hosts (remaining `publisher` matches = schema.org JSON-LD only — intentional structured data).

### 2026-10-15 (Thu AM block — standing A/B battery + posix-path drift)
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD and QA** (prod app-xF3Odgsc / conv BwzYMyYE; QA conv eTB6azZv — daily rotations, all markers hold).
- **Drift via /bin/sh (posix path, per briefing): exit 0, healthy prod==main** — exactly the 3 known-benign 09-29-skew lastmod WARNs (dpp-readiness, gtin-validator, spf-analyzer), no others. 9ee1c2f posix behavior stable day 2.
- Key pages 5/5 × 200. Monitoring-only → no BACKLOG changes per dispatch rules.
- Context: sibling ran a 288-URL crawl 10-14 PM (76d1339) — sitemap grew again (+9 since my 279 baseline; new tools/blogs flowing).

### 2026-10-18 (Sun AM block — standing battery after 3-day gap + sitemap lastmod convergence)
- **Assignment check:** no open website-qa backlog rows; blocks 10-16/17 didn't run but repo was quiet (zero main commits since 10-14 PM tip 56730a5) → standing #2 A/B morning pass + crawl.
- **Battery: 20 pass / 0 FAIL — ALL GREEN on PROD and QA** (prod app-xF3Odgsc / SamlMetadataGeneratorView-BtmyaD6D / conv BwzYMyYE; QA app-Bv6e06RX / SMV-G8dGuROb / conv eTB6azZv — identical chunks to 10-15, expected with no deploys in the gap; flip, saml-only scope, kill-switch override, 4/4 events, HouseAd OFF all asserted).
- **Drift via /bin/sh (posix path): exit 0, healthy prod==main** at 56730a5 pre-push — 6/6 live titles, exactly the 3 known-benign 09-29-skew lastmod WARNs (dpp-readiness/gtin-validator/spf-analyzer). 9ee1c2f posix behavior stable day 5.
- **Key pages 5/5 × 200 on BOTH hosts** (/, /tools/saml-metadata-generator, /eliza-tools, /blogs, /sitemap.xml).
- **Crawl: QA 288/288 OK, avg 404ms, 0 slow** — URL count unchanged vs 10-14 (no sitemap growth during the gap).
- **Artifact fcd5e4e** — converged repo sitemap lastmod 2026-10-13 for eliza-character-validator / env-hygiene-checker / eliza-plugin-linter (both hosts already served the stamps; repo-behind-live, same class as 8464ded/107045e). Gates: lint 0 errors (125 pre-existing warnings), pre-commit build clean; pushed main 56730a5..fcd5e4e; main→prod merge + deploy verification + guard re-run in this block (final status posted to C0C44G305PS).
- Monitoring-only for #2 → no BACKLOG row changes.

## Notes / next
- OKR-2 KR3 says "134 tool pages"; live sitemap carries 284 URLs (tools + categories + content, +5 comfyui/safetensors on 10-07) — crawl covers all of them.
- Next run: `node scripts/qa-crawl-report.mjs` (optionally pass a base URL, e.g. https://formatho.com for prod spot-checks).
- Workspace files (AGENTS.md, DREAMS.md, memory/, TOOLS.md deletion) are agent workspace state — intentionally not committed.
2026-10-09 | work-block pm: resolved drift — merged main→prod (c31d168, docs-only 059c3e1), deploy 37911732534 green, drift guard healthy (prod==main), routes /, /tools/saml-metadata-generator, /eliza-tools, /blogs all 200 | ✅ verified | https://github.com/formatho/website/actions/runs/37911732534
2026-10-10 | work-block am (2nd): converged sitemap lastmod for comfyui suite — committed 8464ded (+5 lastmod 2026-10-07 stamps; both hosts already served them, repo was behind live, same class as 107045e); CI 38022674407 green (build + deploy-qa; CodeQL 38022674088); QA redeploy verified live (284 locs, comfyui lastmods present, / + /tools/comfyui-workflow-inspector + /blogs 200); weekly QA crawl 284/284 OK avg 394ms 0 slow — first crawl covering the 5 comfyui/safetensors URLs | ✅ verified | https://github.com/formatho/website/actions/runs/38022674407
2026-10-10 | work-block pm: resolved drift — merged main→prod (c167386: comfyui sitemap lastmod 8464ded + docs 3c8f083), deploy 38041620623 green, drift guard healthy (prod==main), /, /sitemap.xml, /tools/comfyui-workflow-inspector, /eliza-tools all 200, sitemap contains comfyui entry | ✅ verified | https://github.com/formatho/website/actions/runs/38041620623
2026-10-11 | work-block am (2): standing pass green (CI 12/12 incl 18cba94 prod merge, drift healthy, loc parity 284/284); root-caused 3-URL lastmod divergence prod↔QA (09-29 cherry-pick date skew, benign); shipped WARN-only sitemap host-parity check into prod-drift-check.sh — live run shows exactly the 3 expected WARNs, exit 0 | ✅ verified | https://github.com/formatho/website/actions/runs/38110528491
2026-10-11 | work-block am (2) wrap: converged prod — merged main→prod 1a7e643 (c1919f5 script+docs), deploy 38110735776 green (build/deploy/create-release ✓), drift guard re-run healthy (prod==main, 6 titles, 3 known WARNs); status posted to C0C44G305PS (msg 1791692081.740849) | ✅ verified | https://github.com/formatho/website/actions/runs/38110735776
2026-10-12 | work-block am (2): shipped posix-safe prod-drift-check (9ee1c2f) — mktemp sorted files replace c1919f5's bash-only proc-sub; verified byte-identical under bash AND /bin/sh (3 benign lastmod WARNs + healthy, exit 0); CI 38202391831 green on main; prod auto-converged by create-release as 94057c5 (deploy 38202468136 green, prod⊇main); guard re-run healthy under /bin/sh post-deploy | ✅ verified | https://github.com/formatho/website/actions/runs/38202468136
2026-10-13 | work-block am: standing pass green on new tip 41dbc28 — #2 A/B battery 20/20 prod + 20/20 QA through the cloudhsm deploy's chunk rotations (conv CXiQjbV- / CvH-mJ4C); drift guard healthy when invoked as /bin/sh (cron path confirmed post-9ee1c2f, only the 3 known-benign 09-29-skew lastmod WARNs, exit 0); new tool /tools/cloudhsm-evm-address 200 on both hosts, live sitemap 285 locs w/ lastmod 2026-10-12 on the new entry (committed sitemap's missing lastmod = benign — npm build regenerates pre-deploy); QA battery run also validated 9ee1c2f didn't break ab-battery-check (my earlier 'prod' arg was invalid — script takes base URL) | ✅ verified | https://formatho.com/tools/cloudhsm-evm-address
2026-10-13 | work-block pm: resolved drift — merged main→prod (3aaed5c, docs b07ced2d), deploy 38376784389 green, drift guard healthy (git cherry 0), 4/4 key routes 200; #9 eliza owner-blocked, #2 measuring | ✅ verified | https://github.com/formatho/website/actions/runs/38376784389
2026-10-14 | work-block am (2): standing pass on overnight ships (9136f3e) — mid-week QA crawl 288/288 OK avg 406ms 0 slow (first crawl of cloudhsm + 3 eliza/env URLs); drift healthy via /bin/sh (prod==main @d28c02d, 3 benign WARNs); 3 new tool URLs + /about 200 on prod, publisher-section removal verified live (JSON-LD publisher = intentional) | ✅ verified | https://qa.formatho.com/sitemap.xml
2026-10-14 | work-block pm: resolved drift — docs-only 76d1339 merged main→prod (0e6d54c), deploy 38542829169 green, drift guard healthy (prod==main, 6/6 titles), 4/4 key routes 200; #9 eliza owner-blocked, #2 measuring | ✅ verified | https://github.com/formatho/website/actions/runs/38542829169
2026-10-15 | work-block am: standing battery 20/0 ALL GREEN prod+QA (prod app-xF3Odgsc/conv BwzYMyYE; QA conv eTB6azZv); drift via /bin/sh exit 0 healthy (3 benign WARNs); key pages 5/5 × 200 | ✅ verified | https://formatho.com/tools/saml-metadata-generator
2026-10-18 | work-block am: standing pass after 3-day gap — battery 20/0 ALL GREEN prod+QA (chunks flat vs 10-15, zero deploys in gap); drift healthy; key pages 5/5 × 200 both hosts; crawl 288/288 OK avg 404ms 0 slow; shipped fcd5e4e (sitemap lastmod convergence for 3 eliza/env URLs — live already served them, repo was behind, 8464ded class); main→prod merge + deploy + guard re-run same block, status → C0C44G305PS | ✅ verified | https://qa.formatho.com/sitemap.xml
2026-10-18 | work-block pm: repo synced to bdea04e (dirty sitemap resolved upstream by fcd5e4e — restored+pull, clean convergence); drift guard healthy (prod==main, 6/6 titles), A/B battery 20/0 ALL GREEN (HouseAd OFF), key routes 200 (/blog 301→canonical, expected), 3 lastmod WARNs root-caused as prod-branch build-time git dates — benign, hand-edits would be overwritten by generator | ✅ verified | https://formatho.com
2026-10-19 | work-block am: prod health green — A/B battery 20/0 ALL GREEN (flip+kill+scope+4 events, HouseAd OFF), 6/6 key routes 200 (/blog 301→/blogs canonical), 0 Dependabot alerts; drift: 1 docs-only commit (bfb4afb PROGRESS.md) on main pending PM prod merge, 3 lastmod WARNs known-benign; #9 eliza re-verify day 26: STILL OWNER-BLOCKED (npm view E404 + not logged in, no creds; v1.1.0 @34fd1eb clean, /eliza-tools 200); #2 measuring to Umami re-gate | ✅ verified | https://formatho.com
2026-10-19 | work-block am (2): #2 A/B battery 20/0 ALL GREEN prod+QA (prod app-D2V6VkaQ/conv C2ehUOy6 — zero rotation since 10-18 PM; QA rotated to app-Bpqe9Qnq/conv CKGg_ZLW via 10-18 PM deploy-qa, all markers hold); key pages 5/5 × 200, sitemap 288 locs flat vs 10-18 (no crawl needed); RESOLVED drift — merged main→prod 94017f9 (docs-only bfb4afb), deploy 39197509367 green, prod routes 200; guard re-run shows only NEW docs-only ac4f085c (sibling's 10-19 entry, landed mid-verify — left for PM merge to avoid docs-commit race) + 3 known-benign lastmod WARNs | ✅ verified | https://github.com/formatho/website/actions/runs/39197509367
2026-10-20 | work-block am: standing pass — battery 20/0 ALL GREEN prod+QA (prod app-DMMMt3mU/conv BXPfIZNo rotated post-10-19; QA app-CLajxjjc/conv Pne09UH2; flip+EC kill-switch+scope+4 events+HouseAd gates all hold); FIXED ab-battery-check.sh sh-invocation false FAIL (root cause: /bin/sh = bash 3.2 sh-mode, no proc-sub — line 125 <(...) degraded to empty → false 'EC chunk not found'; fixed 9ee1c2f-style sorted tempfiles; selftest 5/5 + live 20/0 under BOTH sh and bash); sitemap 288/288 parity identical, key routes 200 both hosts (jwt slug is /tools/jwt); CI green incl b39a423; RESOLVED drift — merged main→prod b0f9c50, deploy 39367599453 green; NOTE runner warnings: Node20-forced-to-24 + ubuntu-latest→26 migration — watch next scheduled builds | ✅ verified | https://github.com/formatho/website/actions/runs/39367599453
2026-10-21 | work-block am: standing pass — overnight ship verified: 87c09a4 create2-proxy-deployer (web3, MetaMask deploy flow) live 200 prod+QA, sitemap 289/289 both hosts (+1 fully attributed to 87c09a4; route+meta+tools.ts clean ship pattern); battery 20/0 ALL GREEN prod+QA (prod app-Bw1P2uJd/conv Dc64efIx rotated post-10-20; QA conv dnD8KMp3; flip+EC kill-switch+scope+4 events+HouseAd gates all hold through rotation); drift healthy (prod==main @87c09a4, 6/6 titles; 3 known-benign lastmod WARNs); key routes 6/6 × 200 both hosts; #9 eliza owner-blocked, #2 measuring (blind, re-gate clock not started) | ✅ verified | https://formatho.com/tools/create2-proxy-deployer
2026-10-22 | work-block am: standing pass — overnight ships verified: c665048 polyaxonfile validator + 2b5bdaf preload fix live 200 prod+QA, in sitemap, parity 290/290 IDENTICAL both hosts (matches 10-21 PM attribution: +1 = /tools/polyaxon-validator, blogs 66 unchanged); battery 20/0 ALL GREEN prod+QA (prod conv Dd9aYoTQ / QA conv Bfuzvn_m rotated through the ships; flip+EC kill-switch+saml-scope+4/4 events+HouseAd gates all hold); drift healthy via /bin/sh (prod==main, 6/6 titles; only the 3 known-benign 09-29-skew lastmod WARNs); key routes 10/10 × 200 both hosts; dirty sitemap pre-pull = known benign build-time lastmod lag (create2 lastmod), resolved by restore+pull | ✅ verified | https://formatho.com/tools/polyaxon-validator <!-- project: github.com/formatho/website -->

2026-10-22 | work-block pm: standing pass + drift cleared — battery 20/0 ALL GREEN prod (app-DYL5Jr0F/conv Dd9aYoTQ; flip+EC kill-switch+scope+4 events+HouseAd gates hold), key routes 200 prod+QA (/blog 301→/blogs known), 0 Dependabot alerts; cleared docs-only drift 659a52a via merge main→prod 8c87f97, deploy run 39756418137 all jobs success, post-deploy drift guard healthy (prod==main, 6/6, only 3 known-benign lastmod WARNs) | ✅ verified | https://github.com/formatho/website/actions/runs/39756418137 <!-- project: github.com/formatho/website -->

2026-10-21 | work-block pm: prod health green — drift guard healthy (prod==main @c665048, 6/6 titles, 3 lastmod WARNs known-benign), 7/7 key routes 200 incl new /tools/polyaxon-validator (earlier 404 was wrong slug guess, real slug verified live w/ title), 0 Dependabot alerts, deploys green (prod merge run 39576091165 + IndexNow); #9 eliza owner-blocked, #2 measuring | ✅ verified | https://formatho.com/tools/polyaxon-validator <!-- project: github.com/formatho/website -->

2026-10-23 | work-block am: standing pass + 10-23 eliza distribution milestone verified live — /eliza-tools 200 on prod+QA with 10e4576 git-install copy (npm install github:formatho/plugin-formatho present, dead 'elizaos plugins add' string 0×); battery 20/0 ALL GREEN prod+QA through the deploy's chunk rotations (prod app-DiX3H2x9/conv B-5_LIdx; QA app-CsPfCJfU/conv DKPOR37_; flip+EC kill-switch+saml-scope+4/4 events+HouseAd gates all hold); drift healthy via /bin/sh (prod==main @10e4576, 6/6 titles, only 3 known-benign 09-29-skew lastmod WARNs, exit 0); sitemap 290/290 parity IDENTICAL (flat vs 10-22); key routes 6/6 × 200 both hosts | ✅ verified | https://formatho.com/eliza-tools <!-- project: github.com/formatho/website -->

2026-10-24 | work-block am: daily #2 battery + drift pass (dispatch-1024) — ab-battery-check.sh 20/0 ALL GREEN on PROD and QA through fresh chunk rotations (prod app-CchmF74O/SMV-BKB7rtZ3/conv-B0ZJDbwt; QA app-Bjpf_g0h/SMV-BBYX8xys/conv-CnZZoBSw; flip + saml-only scope + EC kill-switch + 4/4 events + HouseAd OFF all asserted); drift healthy via /bin/sh (prod==main @c5185c5, 6/6 titles, only the 3 known-benign 09-29-skew lastmod WARNs, exit 0); key routes 12/12 × 200 both hosts; sitemap 290/290 parity IDENTICAL (flat vs 10-23); #2 stays measuring — kill/iterate gate 11-02 | ✅ verified | https://formatho.com/tools/saml-metadata-generator <!-- project: github.com/formatho/website -->
2026-10-24 | work-block am (2nd dispatch): closed the 08:19 deploy loop — prod merge dd32eb6 CI run 40055796664 ALL JOBS SUCCESS (main push 40055766132 + CodeQL + IndexNow green); battery re-run 20/0 ALL GREEN on BOTH hosts through the new rotation (prod app-DdKCykO5/SMV-B8egPPJE/conv-S-fHmMXQ; QA app-B87ctWC3/SMV-CooXjOOV/conv-afa9vsiu; flip + saml-only scope + EC kill-switch + 4/4 events + HouseAd OFF all asserted); drift healthy post-deploy (prod==main, 6/6 titles, only 3 known-benign 09-29-skew lastmod WARNs); key routes 12/12 × 200 both hosts; #2 stays measuring — kill/iterate gate 11-02 | ✅ verified | https://formatho.com/tools/saml-metadata-generator <!-- project: github.com/formatho/website -->
