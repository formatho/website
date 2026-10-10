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

## Notes / next
- OKR-2 KR3 says "134 tool pages"; live sitemap carries 284 URLs (tools + categories + content, +5 comfyui/safetensors on 10-07) — crawl covers all of them.
- Next run: `node scripts/qa-crawl-report.mjs` (optionally pass a base URL, e.g. https://formatho.com for prod spot-checks).
- Workspace files (AGENTS.md, DREAMS.md, memory/, TOOLS.md deletion) are agent workspace state — intentionally not committed.
2026-10-09 | work-block pm: resolved drift — merged main→prod (c31d168, docs-only 059c3e1), deploy 37911732534 green, drift guard healthy (prod==main), routes /, /tools/saml-metadata-generator, /eliza-tools, /blogs all 200 | ✅ verified | https://github.com/formatho/website/actions/runs/37911732534
2026-10-10 | work-block am (2nd): converged sitemap lastmod for comfyui suite — committed 8464ded (+5 lastmod 2026-10-07 stamps; both hosts already served them, repo was behind live, same class as 107045e); CI 38022674407 green (build + deploy-qa; CodeQL 38022674088); QA redeploy verified live (284 locs, comfyui lastmods present, / + /tools/comfyui-workflow-inspector + /blogs 200); weekly QA crawl 284/284 OK avg 394ms 0 slow — first crawl covering the 5 comfyui/safetensors URLs | ✅ verified | https://github.com/formatho/website/actions/runs/38022674407
2026-10-10 | work-block pm: resolved drift — merged main→prod (c167386: comfyui sitemap lastmod 8464ded + docs 3c8f083), deploy 38041620623 green, drift guard healthy (prod==main), /, /sitemap.xml, /tools/comfyui-workflow-inspector, /eliza-tools all 200, sitemap contains comfyui entry | ✅ verified | https://github.com/formatho/website/actions/runs/38041620623
