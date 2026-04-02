// A/B Testing disabled - no backend configured
export class ABTestManager {
  getVariant(_testName: string): string { return 'A' }
  trackImpression(_testName: string, _variant: string) {}
  trackConversion(_testName: string, _variant: string) {}
  getResults(_testName: string) { return null }
}

export function useABTest() {
  const getVariant = (_testName: string) => 'A'
  const trackImpression = (_testName: string, _variant: string) => {}
  const trackConversion = (_testName: string, _variant: string) => {}
  return { getVariant, trackImpression, trackConversion }
}
