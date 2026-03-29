// A/B Testing Configuration
export interface ABTest {
  id: string
  name: string
  variants: ABTestVariant[]
  active: boolean
  startDate: Date
  endDate?: Date
  targetMetric: string
  trafficAllocation: number // 0-100
}

export interface ABTestVariant {
  id: string
  name: string
  weight: number // 0-100
  changes: Record<string, any>
  metrics?: {
    visitors: number
    conversions: number
    conversionRate: number
  }
}

// Storage key for persisting variant assignments
const STORAGE_KEY_PREFIX = 'ab_test_'
const USER_ID_KEY = 'ab_test_user_id'

// Landing Page A/B Tests
export const landingPageTests: ABTest[] = [
  {
    id: 'headline-v1',
    name: 'Headline Test: Value vs Speed',
    active: true,
    startDate: new Date('2026-03-28'),
    targetMetric: 'signUpRate',
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control: Orchestrate AI Agents',
        weight: 50,
        changes: {
          heroHeadline: 'Orchestrate AI Agents Like Never Before',
          heroSubheadline: 'Run multiple AI agents in parallel. Switch between models. Automate workflows.'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A: Ship Code Faster',
        weight: 50,
        changes: {
          heroHeadline: 'Ship Code 10x Faster with AI Agent Pools',
          heroSubheadline: 'Stop waiting for AI responses. Run 10 agents in parallel and get results instantly.'
        }
      }
    ]
  },
  {
    id: 'cta-v1',
    name: 'CTA Button Copy Test',
    active: true,
    startDate: new Date('2026-03-28'),
    targetMetric: 'clickThroughRate',
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control: Start Building Free',
        weight: 33,
        changes: {
          primaryCTA: 'Start Building Free',
          secondaryCTA: 'Watch Demo (2 min)'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A: Get Started in 2 Minutes',
        weight: 33,
        changes: {
          primaryCTA: 'Get Started in 2 Minutes',
          secondaryCTA: 'See How It Works'
        }
      },
      {
        id: 'variant-b',
        name: 'Variant B: Claim Your Free Agents',
        weight: 34,
        changes: {
          primaryCTA: 'Claim Your 5 Free Agents',
          secondaryCTA: 'See Live Demo'
        }
      }
    ]
  },
  {
    id: 'urgency-v1',
    name: 'Urgency Banner Test',
    active: true,
    startDate: new Date('2026-03-28'),
    targetMetric: 'conversionRate',
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control: Beta Spots Counter',
        weight: 50,
        changes: {
          urgencyBanner: 'Beta Program Open: Only 8 spots left out of 10!',
          urgencyType: 'scarcity'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A: Social Proof',
        weight: 50,
        changes: {
          urgencyBanner: '🎉 50+ developers already using Agent Orchestrator',
          urgencyType: 'socialProof'
        }
      }
    ]
  },
  {
    id: 'pricing-v1',
    name: 'Pricing Display Test',
    active: false, // Run after headline test completes
    startDate: new Date('2026-04-01'),
    targetMetric: 'trialStartRate',
    trafficAllocation: 100,
    variants: [
      {
        id: 'control',
        name: 'Control: Monthly Pricing',
        weight: 50,
        changes: {
          pricingDisplay: 'monthly',
          showAnnual: false
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A: Annual with Discount',
        weight: 50,
        changes: {
          pricingDisplay: 'annual',
          showAnnual: true,
          annualDiscount: 20
        }
      }
    ]
  }
]

// A/B Test Manager
export class ABTestManager {
  private tests: Map<string, ABTest> = new Map()
  private userAssignments: Map<string, string> = new Map()
  private analyticsEndpoint: string
  private debug: boolean

  constructor(tests: ABTest[]) {
    tests.forEach(test => {
      this.tests.set(test.id, test)
    })
    
    // Configuration
    this.analyticsEndpoint = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:18766/api/analytics'
    this.debug = import.meta.env.VITE_ANALYTICS_DEBUG === 'true'
    
    // Load persisted assignments from localStorage
    this.loadAssignments()
  }

  // Get or create user ID for consistent assignment
  getUserId(): string {
    let userId = localStorage.getItem(USER_ID_KEY)
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem(USER_ID_KEY, userId)
    }
    return userId
  }

  // Load persisted assignments from localStorage
  private loadAssignments() {
    try {
      this.tests.forEach((test, testId) => {
        const stored = localStorage.getItem(STORAGE_KEY_PREFIX + testId)
        if (stored) {
          const { variantId, userId } = JSON.parse(stored)
          const assignmentKey = `${testId}-${userId}`
          this.userAssignments.set(assignmentKey, variantId)
        }
      })
    } catch (e) {
      // Ignore errors loading persisted assignments
    }
  }

  // Get variant for a user (consistent assignment)
  getVariant(testId: string, userId?: string): ABTestVariant | null {
    const test = this.tests.get(testId)
    if (!test || !test.active) return null

    // Use provided userId or get/create one
    const effectiveUserId = userId || this.getUserId()

    // Check if user already assigned (in memory)
    const assignmentKey = `${testId}-${effectiveUserId}`
    if (this.userAssignments.has(assignmentKey)) {
      const variantId = this.userAssignments.get(assignmentKey)!
      return test.variants.find(v => v.id === variantId) || null
    }

    // Check localStorage for persisted assignment
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + testId)
      if (stored) {
        const { variantId, userId: storedUserId } = JSON.parse(stored)
        if (storedUserId === effectiveUserId) {
          this.userAssignments.set(assignmentKey, variantId)
          return test.variants.find(v => v.id === variantId) || null
        }
      }
    } catch (e) {
      // Ignore storage errors
    }

    // Assign variant based on deterministic hash for consistency
    const hash = this.hashString(`${testId}-${effectiveUserId}`)
    const normalizedHash = (hash % 100) + 1 // 1-100

    // Find variant based on weights
    let cumulative = 0
    for (const variant of test.variants) {
      cumulative += variant.weight
      if (normalizedHash <= cumulative) {
        // Store assignment
        this.userAssignments.set(assignmentKey, variant.id)
        
        // Persist to localStorage
        try {
          localStorage.setItem(STORAGE_KEY_PREFIX + testId, JSON.stringify({
            variantId: variant.id,
            userId: effectiveUserId,
            timestamp: Date.now()
          }))
        } catch (e) {
          // Storage full or unavailable
        }

        if (this.debug) {
          console.log(`[A/B Test] Assigned ${testId}:${variant.id} to user ${effectiveUserId}`)
        }
        
        return variant
      }
    }

    return test.variants[0]
  }

  // Simple string hash for deterministic assignment
  private hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  // Track conversion event
  trackConversion(testId: string, variantId: string, metricName: string, value: number = 1) {
    const test = this.tests.get(testId)
    if (!test) return

    const payload = {
      type: 'ab_test_conversion',
      test_id: testId,
      test_name: test.name,
      variant_id: variantId,
      metric_name: metricName,
      value,
      user_id: this.getUserId(),
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    }

    // Use sendBeacon for reliability
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(`${this.analyticsEndpoint}/track`, blob)
    } catch (err) {
      // Fallback to fetch if sendBeacon fails
      fetch(`${this.analyticsEndpoint}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(e => {
        if (this.debug) {
          console.error('[A/B Test] Failed to track conversion:', e)
        }
      })
    }

    if (this.debug) {
      console.log('[A/B Test] Conversion tracked:', testId, variantId, metricName, value)
    }
  }

  // Track impression (when user sees the variant)
  trackImpression(testId: string, variantId: string) {
    this.trackConversion(testId, variantId, 'impression', 1)
  }

  // Get test results (requires backend support)
  async getResults(testId: string): Promise<any> {
    try {
      const response = await fetch(`${this.analyticsEndpoint}/ab-test-results/${testId}`)
      return response.json()
    } catch (err) {
      if (this.debug) {
        console.error('[A/B Test] Failed to get results:', err)
      }
      return null
    }
  }

  // Get all active tests
  getActiveTests(): ABTest[] {
    return Array.from(this.tests.values()).filter(t => t.active)
  }

  // Get user's current variant for a test
  getUserVariant(testId: string): string | null {
    const userId = this.getUserId()
    const assignmentKey = `${testId}-${userId}`
    return this.userAssignments.get(assignmentKey) || null
  }
}

// Export singleton instance
export const abTestManager = new ABTestManager(landingPageTests)
