// Scroll depth tracking disabled - no backend configured
export function useScrollDepth() {
  const trackEvent = (_name: string, _data?: Record<string, unknown>) => {}
  return { trackEvent }
}
