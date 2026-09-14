# AdSense Compliance Record (F7)

Declarations recorded for Google AdSense review, per the publisher programme
requirements: site ownership/authorisation, traffic provenance, and sanctions
eligibility. Keep this file updated when facts change.

## 1. Site ownership and authorisation

| Item | Value |
|---|---|
| Property | `https://formatho.com` (and `www.formatho.com`, redirecting) |
| AdSense publisher ID | `pub-7468579722342385` |
| Authorisation | The domain is developed, built, and deployed exclusively from the private repository `github.com/formatho/website` (origin `git@github.com-formatho:formatho/website.git`). Push access to `main`/`prod` is restricted to the owner account (`ritavidhata`). Ads are served only via this publisher ID, declared in `/ads.txt`. |
| Hosting | Cloudflare (DNS/CDN) in front of origin infrastructure under the same account control; the `formatho-lead-capture` Worker, KV namespaces, and DNS zones are provisioned from the owner's authenticated Cloudflare account. |

## 2. Traffic provenance

- **Organic and direct only.** No paid-to-click, incentivised traffic, pop-unders,
  bot farms, or traffic-exchange mechanisms exist anywhere in the codebase.
- Acquisition channels in use: organic search, the tool directory listings
  (MCP Registry), and product/social presence (X: @heyformatho, LinkedIn, GitHub).
- Analytics is Umami (cookieless). No traffic is purchased or artificially
  generated; no scripts exist that could simulate visits.

## 3. Sanctions eligibility

- The publisher and owning individual/entity operate from **India** — outside
  sanctioned regions (Crimea, Cuba, Iran, North Korea, Syria, and the so-called
  DNR/LNR regions).
- To the best of the owner's knowledge, the publisher, any owning entity, and
  payment recipients are **not restricted parties** under applicable sanctions
  lists (OFAC, EU, UN, or equivalent).
- ⚠️ **Owner action:** verify the legal entity name and address recorded in the
  AdSense payment profile matches the above before requesting review.

## 4. Related compliance artefacts in this repo

| Fix | Where |
|---|---|
| F1 — `/ads.txt` | `public/ads.txt` (served at domain root, `text/plain`) |
| F2/F4 — privacy disclosures | `src/views/PrivacyPolicyView.vue` (ads, cookies named, consent regime, withdrawal) |
| F3 — certified CMP | Google Funding Choices loader in `index.html`; CSP allows Google ad origins (`nginx.conf`) |
| F5 — E-E-A-T | Byline + author box in `src/views/BlogPostView.vue`; full article inlined at build (`scripts/inject-blog-content.js`) |
| F6 — thin content | 20 lowest-value posts parked (`scripts/parked-posts.json`): noindexed, out of the sitemap, unlisted — until deepened in Strapi |

_Last updated: 2026-09-14_
