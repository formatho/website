# Ad Placement Specification — Launch (F10)

AdSense goes live under these rules. Anything not explicitly allowed below
is disallowed. The spec is written for Google Auto Ads **disabled** — all
placements are manual, controlled slots.

## Console configuration required (owner action)

- AdSense → Ads → By ad unit: create display units; **do not enable Auto Ads**
  (Auto Ads decides its own placements, including anchors/overlays, and can
  violate the slot rules below).
- Privacy & messaging: publish the GDPR consent message (EEA/UK/CH) — see F3.
- If Auto Ads is ever enabled later, re-validate against this spec.

## Allowed slots

| Slot | Where | Format | Notes |
|---|---|---|---|
| `below-header` | After the page header, before main tool/work area | horizontal ≤ 90 px height, `display:block` | Never inside or directly adjacent to nav/action bars |
| `content-end` | End of article body, after the author box, before newsletter CTA | in-article rectangle ≤ 600 px | Blog posts only |
| `above-footer` | Immediately above the global footer | horizontal ≤ 90 px | One per page |

## Prohibited

- ❌ No ads inside navigation, toolbars, tab bars, or within 48 px of action
  buttons (Convert, Download, Run, form inputs)
- ❌ No overlays, interstitials, anchors, vignettes, or pop-ups of any kind
- ❌ No ads on dead-end screens: 404, error states, empty states, confirmation
  screens ("Conversion Successful"), or the loading shell
- ❌ No ads between a tool's input and its output
- ❌ Max 3 ad units per page; no ad under another ad without ≥ 400 px of
  content between them (Better Ads Standards: >30% ad density on mobile is
  intrusive)
- ❌ No ads on /privacy, /acceptable-use, /security, /contact, /about
  (YMYL/trust pages stay ad-free)

## Implementation notes

Slots render as empty `<ins class="adsbygoogle">` containers only when a
unit ID is configured; with no ID the container must not render at all.
Containers get `min-height` reserved via CSS to avoid layout shift (CLS).
No `position: fixed/sticky` on any ad container.

## Validation checklist — run before launch and after any layout change

- [ ] 1440 × 900 (desktop) and 414 × 896 (mobile viewport) — screenshot every
  page template: home, tool page, category, blog post, blog index
- [ ] No ad overlaps nav, toolbars, inputs, or action buttons at either width
- [ ] No overlay/interstitial appears on load, on scroll, or on navigation
- [ ] 404 page and error states show zero ads
- [ ] Ad density below 30% on mobile screens
- [ ] No layout shift when ads fill (reserved heights work)
- [ ] Ad-free pages (privacy, about, contact, acceptable-use) show none

_Last updated: 2026-09-14_
