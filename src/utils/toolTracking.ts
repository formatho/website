/**
 * GA4 Key Event tracking for Formatho tools.
 * Privacy-first: sends only tool slugs, categories, and counts —
 * never input values, output values, or PII.
 *
 * Key Events (GA4 conversions):
 *   tool_used          — primary action click (Format/Encode/Generate/etc.)
 *   tool_result_copied — Copy button click on output
 *   bookmark_hint_click — bookmark prompt engagement
 *
 * Standard events:
 *   tool_error         — diagnostic (error_type is a category, not the message)
 *   search_tools       — search usage (result_count, never the term)
 */

type GtagFn = (...args: unknown[]) => void

function gtag(): GtagFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { gtag?: GtagFn; dataLayer?: unknown[] }
  if (typeof w.gtag === 'function') return w.gtag
  // gtag is defined in index.html — if dataLayer exists, gtag should too
  if (w.dataLayer) {
    return (...args: unknown[]) => w.dataLayer!.push(args)
  }
  return null
}

/** Session guard: each tool fires tool_used at most once per page session */
const sessionFiredTools = new Set<string>()

/** Track primary tool action (Generate/Format/Encode/Convert/etc.) */
export function trackToolUsed(toolSlug: string, toolCategory?: string): void {
  if (sessionFiredTools.has(toolSlug)) return
  sessionFiredTools.add(toolSlug)
  gtag()?.('event', 'tool_used', {
    tool_name: toolSlug,
    tool_category: toolCategory || 'unknown',
  })
}

/** Track Copy button click on tool output */
export function trackResultCopied(toolSlug: string): void {
  gtag()?.('event', 'tool_result_copied', {
    tool_name: toolSlug,
  })
}

/** Track tool error state (diagnostic — error_type is a category like 'invalid_input') */
export function trackToolError(toolSlug: string, errorType: string): void {
  gtag()?.('event', 'tool_error', {
    tool_name: toolSlug,
    error_type: errorType,
  })
}

/** Track tool search — result_count only, never the search term (privacy) */
export function trackSearchTools(resultCount: number): void {
  gtag()?.('event', 'search_tools', {
    result_count: resultCount,
  })
}

/** Track bookmark/home-screen prompt click */
export function trackBookmarkHintClick(toolSlug: string): void {
  gtag()?.('event', 'bookmark_hint_click', {
    tool_name: toolSlug,
  })
}

/** Reset session guard (useful for testing) */
export function resetToolSession(): void {
  sessionFiredTools.clear()
}
