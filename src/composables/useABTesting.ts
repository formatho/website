import { ref, computed, onMounted } from 'vue'
import { abTestManager, landingPageTests } from '@/utils/abTesting'

export function useABTesting(testId: string, userId?: string) {
  const variant = ref<any>(null)
  const isLoading = ref(true)
  const hasTrackedImpression = ref(false)

  onMounted(() => {
    variant.value = abTestManager.getVariant(testId, userId)
    isLoading.value = false
  })

  // Get variant value for a specific key
  const getVariantValue = (key: string, defaultValue: any) => {
    if (!variant.value) return defaultValue
    return variant.value.changes[key] ?? defaultValue
  }

  // Track impression (page view)
  const trackImpression = () => {
    if (hasTrackedImpression.value || !variant.value) return
    
    abTestManager.trackConversion(testId, variant.value.id, 'impression', 1)
    hasTrackedImpression.value = true
  }

  // Track conversion (sign up, click, etc.)
  const trackConversion = (metricName: string, value: number = 1) => {
    if (!variant.value) return
    
    abTestManager.trackConversion(testId, variant.value.id, metricName, value)
  }

  // Convenience methods for common conversions
  const trackClick = (buttonName: string) => {
    trackConversion(`${buttonName}_click`, 1)
  }

  const trackSignUp = () => {
    trackConversion('sign_up', 1)
  }

  const trackTrialStart = () => {
    trackConversion('trial_start', 1)
  }

  const trackBetaApplication = () => {
    trackConversion('beta_application', 1)
  }

  return {
    variant,
    isLoading,
    getVariantValue,
    trackImpression,
    trackConversion,
    trackClick,
    trackSignUp,
    trackTrialStart,
    trackBetaApplication
  }
}

// Specialized hook for landing page tests
export function useLandingPageABTesting(userId?: string) {
  const headlineTest = useABTesting('headline-v1', userId)
  const ctaTest = useABTesting('cta-v1', userId)
  const urgencyTest = useABTesting('urgency-v1', userId)

  const heroHeadline = computed(() => 
    headlineTest.getVariantValue('heroHeadline', 'Orchestrate AI Agents Like Never Before')
  )

  const heroSubheadline = computed(() => 
    headlineTest.getVariantValue('heroSubheadline', 'Run multiple AI agents in parallel. Switch between models. Automate workflows.')
  )

  const primaryCTA = computed(() => 
    ctaTest.getVariantValue('primaryCTA', 'Start Building Free')
  )

  const secondaryCTA = computed(() => 
    ctaTest.getVariantValue('secondaryCTA', 'Watch Demo (2 min)')
  )

  const urgencyBanner = computed(() => 
    urgencyTest.getVariantValue('urgencyBanner', 'Beta Program Open: Only 8 spots left out of 10!')
  )

  const urgencyType = computed(() => 
    urgencyTest.getVariantValue('urgencyType', 'scarcity')
  )

  // Track all impressions on mount
  const trackAllImpressions = () => {
    headlineTest.trackImpression()
    ctaTest.trackImpression()
    urgencyTest.trackImpression()
  }

  // Track primary CTA click
  const trackPrimaryCTAClick = () => {
    ctaTest.trackClick('primary_cta')
    headlineTest.trackConversion('primary_cta_click')
  }

  // Track secondary CTA click
  const trackSecondaryCTAClick = () => {
    ctaTest.trackClick('secondary_cta')
  }

  return {
    heroHeadline,
    heroSubheadline,
    primaryCTA,
    secondaryCTA,
    urgencyBanner,
    urgencyType,
    trackAllImpressions,
    trackPrimaryCTAClick,
    trackSecondaryCTAClick,
    trackSignUp: headlineTest.trackSignUp,
    trackTrialStart: headlineTest.trackTrialStart,
    trackBetaApplication: headlineTest.trackBetaApplication
  }
}
