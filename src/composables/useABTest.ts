import { ref, computed, onMounted } from 'vue'

/**
 * A/B Test Configuration for Hero Section
 * 
 * Usage:
 * 1. Import useABTest in your component
 * 2. Use heroVariant.value to get current variant ('control', 'b', 'c', 'd')
 * 3. Use HeroVariantB, HeroVariantC, HeroVariantD components as needed
 * 
 * Example in HomeView.vue:
 * ```vue
 * <script setup>
 * import { useABTest } from '@/composables/useABTest'
 * import HeroVariantB from '@/components/ab-test/HeroVariantB.vue'
 * import HeroVariantC from '@/components/ab-test/HeroVariantC.vue'
 * import HeroVariantD from '@/components/ab-test/HeroVariantD.vue'
 * 
 * const { heroVariant } = useABTest()
 * </script>
 * 
 * <template>
 *   <component :is="heroComponent" />
 * </template>
 * ```
 */

export type HeroVariant = 'control' | 'b' | 'c' | 'd'

export interface ABTestConfig {
  testName: string
  variants: HeroVariant[]
  trafficSplit: Record<HeroVariant, number>
  startDate: string
  endDate: string
}

// Current active test configuration
export const CURRENT_TEST: ABTestConfig = {
  testName: 'hero-section-v1',
  variants: ['control', 'b'],
  trafficSplit: {
    control: 0.5,
    b: 0.5,
    c: 0,
    d: 0,
  },
  startDate: '2026-03-22',
  endDate: '2026-04-05',
}

const STORAGE_KEY = 'formatho_ab_test'

export function useABTest() {
  const variant = ref<HeroVariant>('control')
  const isLoaded = ref(false)

  // Get stored variant or assign new one
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    
    if (stored) {
      try {
        const data = JSON.parse(stored)
        // Check if stored test is still active
        if (data.testName === CURRENT_TEST.testName) {
          variant.value = data.variant
          isLoaded.value = true
          return
        }
      } catch (e) {
        // Invalid data, assign new variant
      }
    }

    // Assign new variant based on traffic split
    variant.value = assignVariant()
    
    // Store the assignment
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      testName: CURRENT_TEST.testName,
      variant: variant.value,
      assignedAt: new Date().toISOString(),
    }))
    
    isLoaded.value = true
    
    // Track assignment
    trackEvent('ab_test_assigned', {
      test_name: CURRENT_TEST.testName,
      variant: variant.value,
    })
  })

  // Assign variant based on traffic split
  function assignVariant(): HeroVariant {
    const random = Math.random()
    let cumulative = 0

    for (const v of CURRENT_TEST.variants) {
      cumulative += CURRENT_TEST.trafficSplit[v]
      if (random < cumulative) {
        return v
      }
    }

    return 'control'
  }

  // Track event (integrate with your analytics)
  function trackEvent(eventName: string, data: Record<string, any>) {
    // Umami Analytics (cookieless)
    if (typeof window !== 'undefined' && (window as any).umami?.track) {
      ;(window as any).umami.track(eventName, data)
    }

    // Console log for development
    if (import.meta.env.DEV) {
      console.log('[A/B Test]', eventName, data)
    }
  }

  // Track conversion event
  function trackConversion(conversionType: string, data: Record<string, any> = {}) {
    trackEvent('ab_test_conversion', {
      test_name: CURRENT_TEST.testName,
      variant: variant.value,
      conversion_type: conversionType,
      ...data,
    })
  }

  return {
    variant,
    isLoaded,
    trackConversion,
    testName: CURRENT_TEST.testName,
  }
}

// Composable for getting the hero component
export function useHeroComponent() {
  const { variant, isLoaded } = useABTest()
  
  const heroComponent = computed(() => {
    if (!isLoaded.value) return null
    
    switch (variant.value) {
      case 'b':
        return 'HeroVariantB'
      case 'c':
        return 'HeroVariantC'
      case 'd':
        return 'HeroVariantD'
      default:
        return 'HeroControl'
    }
  })

  return {
    variant,
    heroComponent,
    isLoaded,
  }
}

// Utility to force a specific variant (for testing)
export function forceVariant(v: HeroVariant) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    testName: CURRENT_TEST.testName,
    variant: v,
    assignedAt: new Date().toISOString(),
    forced: true,
  }))
  
  // Reload to apply
  window.location.reload()
}

// Expose forceVariant to window for console access
if (typeof window !== 'undefined') {
  (window as any).forceABVariant = forceVariant
}
