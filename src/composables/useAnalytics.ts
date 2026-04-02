import { ref } from 'vue'

// Analytics disabled - no backend configured
const sessionId = ref('')

export function useAnalytics() {
  const trackEvent = (_name: string, _data?: Record<string, unknown>) => {}
  const trackPageView = (_path?: string) => {}
  const trackConversion = (_type: string, _value?: number) => {}
  const trackToolUsage = (_toolName: string, _action: string) => {}
  const trackContactFormSubmitted = () => {}
  const trackPricingView = () => {}
  const trackEmailCapture = (_source: string) => {}

  return {
    sessionId,
    trackEvent,
    trackPageView,
    trackConversion,
    trackToolUsage,
    trackContactFormSubmitted,
    trackPricingView,
    trackEmailCapture,
  }
}
