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
  
  constructor(tests: ABTest[]) {
    tests.forEach(test => {
      this.tests.set(test.id, test)
    })
  }

  // Get variant for a user (consistent assignment)
  getVariant(testId: string, userId?: string): ABTestVariant | null {
    const test = this.tests.get(testId)
    if (!test || !test.active) return null

    // Check if user already assigned
    const assignmentKey = `${testId}-${userId}`
    if (userId && this.userAssignments.has(assignmentKey)) {
      const variantId = this.userAssignments.get(assignmentKey)!
      return test.variants.find(v => v.id === variantId) || null
    }

    // Assign variant based on weights
    const random = Math.random() * 100
    let cumulative = 0
    
    for (const variant of test.variants) {
      cumulative += variant.weight
      if (random <= cumulative) {
        if (userId) {
          this.userAssignments.set(assignmentKey, variant.id)
        }
        return variant
      }
    }

    return test.variants[0]
  }

  // Track conversion event
  trackConversion(testId: string, variantId: string, metricName: string, value: number = 1) {
    const test = this.tests.get(testId)
    if (!test) return

    // Send to analytics
    fetch('/api/analytics/ab-test-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId,
        variantId,
        metricName,
        value,
        timestamp: new Date().toISOString()
      })
    }).catch(err => console.error('Failed to track A/B test conversion:', err))
  }

  // Get test results
  async getResults(testId: string): Promise<any> {
    const response = await fetch(`/api/analytics/ab-test-results/${testId}`)
    return response.json()
  }
}

// Export singleton instance
export const abTestManager = new ABTestManager(landingPageTests)
