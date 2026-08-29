/**
 * GA4 Key Event tracking for Formatho tools — now via Umami (cookieless).
 * Privacy-first: sends only tool slugs, categories, and counts —
 * never input values, output values, or PII.
 */

type UmamiFn = (eventName: string, data?: Record<string, unknown>) => void

function umami(): UmamiFn | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as { umami?: { track: UmamiFn } }
  if (w.umami && typeof w.umami.track === 'function') {
    return (name: string, data?: Record<string, unknown>) => w.umami.track(name, data)
  }
  return null
}

/** Session guard: each tool fires tool_used at most once per page session */
const sessionFiredTools = new Set<string>()

/** Track primary tool action (Generate/Format/Encode/Convert/etc.) */
export function trackToolUsed(toolSlug: string, toolCategory?: string): void {
  if (sessionFiredTools.has(toolSlug)) return
  sessionFiredTools.add(toolSlug)
  umami()?.('tool_used', {
    tool_name: toolSlug,
    tool_category: toolCategory || 'unknown',
  })
}

/** Track Copy button click on tool output */
export function trackResultCopied(toolSlug: string): void {
  umami()?.('tool_result_copied', {
    tool_name: toolSlug,
  })
}

/** Track tool error state (diagnostic — error_type is a category like 'invalid_input') */
export function trackToolError(toolSlug: string, errorType: string): void {
  umami()?.('tool_error', {
    tool_name: toolSlug,
    error_type: errorType,
  })
}

/** Track tool search — result_count only, never the search term (privacy) */
export function trackSearchTools(resultCount: number): void {
  umami()?.('search_tools', {
    result_count: resultCount,
  })
}

/** Track bookmark/home-screen prompt click */
export function trackBookmarkHintClick(toolSlug: string): void {
  umami()?.('bookmark_hint_click', {
    tool_name: toolSlug,
  })
}

/** Reset session guard (useful for testing) */
export function resetToolSession(): void {
  sessionFiredTools.clear()
}
