// Analytics utilities — Umami (cookieless)
// Umami tracks pageviews automatically via the script tag.
// Custom events use window.umami.track() when available.

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void
    }
  }
}

// Track custom events via Umami (no-ops if analytics is blocked)
function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, data)
  }
}

// Track conversion events
export function trackConversion(
  eventName: 'pricing_view' | 'cta_click' | 'checkout_start' | 'checkout_complete',
  metadata?: Record<string, any>
) {
  trackEvent(eventName, metadata)
}

// Track tool usage
export function trackToolUsage(toolName: string, action: string) {
  trackEvent('tool_used', { tool_name: toolName, action })
}

// Track contact form
export function trackContactFormSubmitted() {
  trackEvent('contact_form_submitted')
}

// Track email capture
export function trackEmailCapture(source: string) {
  trackEvent('email_capture', { source })
}
