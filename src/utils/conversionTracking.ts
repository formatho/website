/**
 * Revenue conversion tracking — Backlog #3 (CRO instrumentation).
 * Fires per-tool-page conversion events to Umami (primary) and GA4 (mirror)
 * without requiring edits to individual tool views.
 *
 * Event taxonomy (see docs/REVENUE_INSTRUMENTATION.md):
 *  - tool_page_view     : user landed on a tool page (once per session per tool)
 *  - tool_result_copied : user copied output on a tool page (usage proxy)
 *  - enterprise_cta_click: user clicked a mailto/contact CTA on a tool page (lead proxy)
 *  - affiliate_click     : user clicked an outbound affiliate link (backlog #8; fires on
 *                           anchors with data-affiliate="merchant" — links are owner-gated)
 *  - outbound_click       : any other outbound link click on a tool page (funnel context)
 *
 * Privacy: only slugs + categories, never inputs/outputs/PII.
 */
import type { Router } from 'vue-router'
import { tools } from '@/data/tools'

type TrackFn = (eventName: string, data?: Record<string, unknown>) => void

function umami(): TrackFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { umami?: { track: TrackFn } }
  return w.umami && typeof w.umami.track === 'function' ? w.umami.track : null
}

function gtagTrack(): TrackFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { gtag?: (...args: unknown[]) => void }
  return typeof w.gtag === 'function'
    ? (name, data) => w.gtag!('event', name, data ?? {})
    : null
}

function send(eventName: string, data?: Record<string, unknown>): void {
  umami()?.(eventName, data)
  gtagTrack()?.(eventName, data)
}

// Tool lookup by route path
const toolByPath = new Map<string, { name: string; category: string }>()
for (const category of tools) {
  for (const tool of category.items) {
    toolByPath.set(tool.route, { name: tool.name, category: category.category })
  }
}

function toolForPath(path: string): { name: string; category: string } | null {
  const clean = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
  return toolByPath.get(clean) ?? null
}

/** Session guard: one tool_page_view per tool per page session */
const viewedTools = new Set<string>()

let initialized = false

export function initConversionTracking(router: Router): void {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true

    // 1. Tool page views — one event per tool page visit (session-guarded per tool)
    router.afterEach((to) => {
      const tool = toolForPath(to.path)
      if (!tool || viewedTools.has(to.path)) return
      viewedTools.add(to.path)
      send('tool_page_view', {
        tool_name: tool.name,
        tool_category: tool.category,
        path: to.path,
      })
    })

    // 2. Copy on a tool page = strongest client-side usage signal
    document.addEventListener('copy', () => {
      const tool = toolForPath(router.currentRoute.value.path)
      if (!tool) return
      send('tool_result_copied', {
        tool_name: tool.name,
        tool_category: tool.category,
      })
    })

    // 3. Contact/mailto clicks on tool pages = B2B lead proxy (backlog #2 funnel)
    document.addEventListener(
      'click',
      (event) => {
        const target = (event.target as HTMLElement | null)?.closest?.('a[href^="mailto:"]')
        if (!target) return
        const tool = toolForPath(router.currentRoute.value.path)
        if (!tool) return
        send('enterprise_cta_click', {
          tool_name: tool.name,
          tool_category: tool.category,
          cta_href: (target as HTMLAnchorElement).href,
        })
      },
      true
    )

    // 4. Outbound + affiliate clicks (backlog #8 funnel — affiliate links themselves owner-gated)
    document.addEventListener(
      'click',
      (event) => {
        const anchor = (event.target as HTMLElement | null)?.closest?.('a[href]') as
          | HTMLAnchorElement
          | null
        if (!anchor) return
        const href = anchor.getAttribute('href') ?? ''
        // Absolute http(s) links to another host = outbound
        if (!/^https?:\/\//i.test(href)) return
        const tool = toolForPath(router.currentRoute.value.path)
        const affiliateMerchant = anchor.dataset.affiliate
        if (affiliateMerchant) {
          send('affiliate_click', {
            tool_name: tool?.name,
            tool_category: tool?.category,
            merchant: affiliateMerchant,
            path: router.currentRoute.value.path,
          })
          return // affiliate_click supersedes generic outbound_click
        }
        if (!tool) return
        let host = ''
        try {
          host = new URL(anchor.href, window.location.href).host
        } catch {
          return
        }
        if (host === window.location.host) return
        send('outbound_click', {
          tool_name: tool.name,
          tool_category: tool.category,
          outbound_host: host,
        })
      },
      true
    )
  }
}
