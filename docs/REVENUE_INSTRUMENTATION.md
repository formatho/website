# Revenue Instrumentation (Backlog #3)

Owner: revenue agent (CRO). Shipped: 2026-09-22.

## What is instrumented

All events fire globally from `src/utils/conversionTracking.ts` (initialized in
`src/main.ts`) — no per-view wiring required. Primary sink: **Umami**
(`cloud.umami.is`, website id `f9074bcf-...`). Events are also mirrored to
**GA4** (`G-ZJ1GXW78TW`) as `gtag('event', ...)`.

| Event | Trigger | Meaning |
|---|---|---|
| `tool_page_view` | router navigation to any of the 199 tool routes (once per tool per session) | Funnel step 1: intent |
| `tool_result_copied` | `copy` clipboard event while on a tool page | Funnel step 2: usage (client-side proxy; most tools end in copy-to-clipboard) |
| `enterprise_cta_click` | click on a `mailto:` link while on a tool page | Funnel step 3: B2B lead intent (backs the backlog #2 EnterpriseCta on SAML/OIDC/JWT pages) |

Pre-existing events (unchanged): `tool_used`, `tool_error`, `search_tools`,
`bookmark_hint_click`, `email_capture` — see `src/utils/toolTracking.ts`.

Privacy: only tool names, categories, and counts are sent. Never inputs,
outputs, or PII.

## Money funnel (read daily, 09:00 IST)

```
tool_page_view (per tool) → tool_result_copied (usage rate) → enterprise_cta_click (lead proxy)
enterprise_cta_click → email to support@formatho.com → qualified lead ($500 est.)
```

## Earnings pipeline

No paid revenue streams are live yet ($0.00 baseline, METRICS.md 2026-09-22).
When one ships (paid API tier = backlog #1, ads = #4, affiliates = #8):

1. Add an `earnings` row source to `~/.openclaw/company/METRICS.md`
   (append-only, revenue column owned by the CRO).
2. Platform-native dashboards first (Stripe/Vercel/Umami) — no custom backend
   until a stream exceeds ~$50/mo (effort gate).
3. GA4: mark `enterprise_cta_click` as a Key Event in the GA4 UI once first
   events appear (admin UI action, not code).

## Verification checklist after deploy

- [ ] `tool_page_view` events appear in Umami for distinct tools
- [ ] `tool_result_copied` fires on copy from a tool page
- [ ] `enterprise_cta_click` fires on the SAML/OIDC/JWT on-prem CTA clicks
- [ ] Events visible in GA4 Realtime report
