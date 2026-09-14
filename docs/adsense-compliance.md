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

## 5. Content classification — Google Publisher Restrictions (F12)

Classified from live CMS tags/titles (`scripts/blog-content-cache.json`,
regenerated at each build). Google's Publisher Restrictions do not ban
cryptocurrency content — they let advertisers limit demand against it.
Monetisation impact is lower ad serving on classified pages; no policy
violation exists while content stays informational.

**Class: cryptocurrency-related (12 posts)** — informational/educational
coverage of tokenisation, regulation, and protocol engineering. None
promote ICOs, price prediction services, unregulated exchanges, or
investment advice:

    index-tracking-assets-options-not-debt
    future-of-rwa-tokenization-5-megatrends-reshaping-finance-2030
    real-estate-tokenization-legal-frameworks-sm-reits-2026
    structural-reconfiguration-finance-rwa-tokenization-2026
    why-rwa-ai-privacy-tokens-outperforming-bitcoin-2026
    clarity-act-victory-regulatory-clarity-3t-crypto-market
    eip-7702-ethereum-pectra-eoa-smart-contract-upgrade
    erc-7730-clear-signing-ethereum-standard
    from-dead-capital-to-programmable-gold-2026
    ai-meets-blockchain-agent-orchestration-web3
    ethereum-units-explained
    bip39-mnemonic-guide

**Class: general/technical (48 posts)** — no restricted themes.

Review triggers: re-run the classification when posts are added or retagged;
any post that starts advising on trades, promoting token sales, or linking
paid referral schemes must be treated as restricted content and reviewed
against the full Publisher Restrictions list.

## 6. Related documents

- `docs/ad-placement-spec.md` — ad placement rules for launch (F10)
