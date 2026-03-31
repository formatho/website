<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useStripe } from '@/composables/useStripe'
import { useAnalytics, type PlanType, type BillingCycle } from '@/composables/useAnalytics'
import EmailCapture from '@/components/EmailCapture.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const billingCycle = ref<BillingCycle>('monthly')
const { createCheckoutSession, isLoading, error } = useStripe()
const {
  trackPricingView,
  trackPlanSelected,
  trackBillingCycleChanged,
  trackCheckoutInitiated,
  trackCheckoutError,
} = useAnalytics()

// Track pricing page view on mount
onMounted(() => {
  trackPricingView()
})

// Track billing cycle changes
watch(billingCycle, (newCycle) => {
  trackBillingCycleChanged(newCycle)
})

const handleSubscribe = async (plan: 'pro' | 'enterprise') => {
  const planPrice = plan === 'pro'
    ? (billingCycle.value === 'monthly' ? 19 : 190)
    : (billingCycle.value === 'monthly' ? 99 : 990)

  // Track checkout initiation
  trackCheckoutInitiated(plan as PlanType, billingCycle.value, planPrice)

  try {
    await createCheckoutSession(plan, billingCycle.value)
  } catch (e) {
    // Track checkout error
    trackCheckoutError(plan as PlanType, billingCycle.value, e instanceof Error ? e.message : 'Unknown error')
  }
}

// Track when user clicks on a plan CTA (including contact sales)
const handlePlanCta = (plan: PlanType, isContact: boolean = false) => {
  trackPlanSelected(plan)
}

const plans = [
  {
    name: 'Free',
    description: 'Perfect for trying out Formatho',
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: 'Access to 100+ developer tools', included: true },
      { text: 'Client-side processing (privacy-first)', included: true },
      { text: 'No account required', included: true },
      { text: 'Basic JSON/YAML tools', included: true },
      { text: 'Basic converters', included: true },
      { text: 'Pro crypto tools', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
      { text: 'Team collaboration', included: false },
    ],
    cta: 'Get Started Free',
    ctaLink: '/',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For power users and professionals',
    price: { monthly: 19, yearly: 190 },
    savings: 'Save $38',
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Pro crypto tools (multi-chain keys, EVM)', included: true },
      { text: 'Advanced formatters & converters', included: true },
      { text: 'API access (10,000 requests/month)', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Custom tool configurations', included: true },
      { text: 'Export & batch processing', included: true },
      { text: 'Team collaboration', included: false },
      { text: 'SLA guarantee', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/contact?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For teams and organizations',
    price: { monthly: 99, yearly: 990 },
    savings: 'Save $198',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited API requests', included: true },
      { text: 'Team collaboration (up to 50 users)', included: true },
      { text: 'SSO / SAML integration', included: true },
      { text: '99.9% SLA guarantee', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'On-premise deployment option', included: true },
      { text: 'Priority feature requests', included: true },
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise',
    highlighted: false,
  },
]

const faqs = [
  {
    question: 'Do I need to create an account to use Formatho?',
    answer: 'No! All 100+ tools work without an account. Your data stays in your browser. Pro features require an account for API access and saved preferences.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe. Enterprise customers can pay by invoice.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access until the end of your billing period.',
  },
  {
    question: 'Is my data really private?',
    answer: 'Absolutely. All tools run 100% in your browser. We never see, store, or transmit your data to our servers. This is our core architectural principle.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 14-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle.',
  },
]
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div class="container mx-auto px-4 py-16 md:py-24 relative">
        <div class="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight gradient-text">
            Simple, Transparent Pricing
          </h1>
          <p class="text-xl text-muted-foreground max-w-2xl">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
          
          <!-- Billing Toggle -->
          <div class="flex items-center gap-4 mt-8 p-1 bg-muted/30 rounded-full">
            <Button
              @click="billingCycle = 'monthly'"
              :variant="billingCycle === 'monthly' ? 'default' : 'ghost'"
              class="rounded-full"
              aria-label="Select monthly billing"
            >
              Monthly
            </Button>
            <Button
              @click="billingCycle = 'yearly'"
              :variant="billingCycle === 'yearly' ? 'default' : 'ghost'"
              class="rounded-full"
              aria-label="Select yearly billing (save 17%)"
            >
              Yearly
              <span class="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="[
            'relative rounded-2xl border p-8 transition-all duration-300',
            plan.highlighted
              ? 'border-primary bg-primary/5 scale-105 shadow-xl shadow-primary/10'
              : 'border-border bg-card hover:border-primary/50 hover:shadow-lg'
          ]"
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.highlighted"
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full"
          >
            Most Popular
          </div>

          <!-- Plan Header -->
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold mb-2">{{ plan.name }}</h3>
            <p class="text-muted-foreground text-sm">{{ plan.description }}</p>
          </div>

          <!-- Price -->
          <div class="text-center mb-8">
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-bold">
                ${{ plan.price[billingCycle] }}
              </span>
              <span class="text-muted-foreground">/{{ billingCycle === 'monthly' ? 'mo' : 'yr' }}</span>
            </div>
            <p
              v-if="plan.savings && billingCycle === 'yearly'"
              class="text-green-600 dark:text-green-400 text-sm mt-2 font-medium"
            >
              {{ plan.savings }}
            </p>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8">
            <li
              v-for="(feature, index) in plan.features"
              :key="index"
              class="flex items-start gap-3"
            >
              <svg
                v-if="feature.included"
                class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <svg
                v-else
                class="w-5 h-5 text-muted-foreground/30 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span
                :class="[
                  'text-sm',
                  feature.included ? 'text-foreground' : 'text-muted-foreground/50'
                ]"
              >
                {{ feature.text }}
              </span>
            </li>
          </ul>

          <!-- CTA Button -->
          <Button
            v-if="plan.name === 'Pro' || plan.name === 'Enterprise'"
            @click="handleSubscribe(plan.name.toLowerCase() as 'pro' | 'enterprise')"
            :disabled="isLoading"
            :variant="plan.highlighted ? 'default' : 'outline'"
            class="w-full"
            :class="{ 'shadow-lg shadow-primary/20': plan.highlighted }"
          >
            {{ isLoading ? 'Loading...' : plan.cta }}
          </Button>
          <RouterLink
            v-else
            :to="plan.ctaLink"
            :class="[
              'block w-full text-center py-3 px-6 rounded-lg font-medium transition-all',
              plan.highlighted
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            ]"
          >
            {{ plan.cta }}
          </RouterLink>

          <!-- Error Message -->
          <p v-if="error" class="text-red-500 text-sm mt-2 text-center">
            {{ error }}
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="container mx-auto px-4 py-16 md:py-24 bg-muted/20">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        
        <div class="space-y-6">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="bg-card rounded-xl border border-border p-6"
          >
            <h3 class="font-semibold mb-2">{{ faq.question }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ faq.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p class="text-xl text-muted-foreground mb-8">
          Join thousands of developers using Formatho's privacy-first tools.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            to="/"
            class="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Start Free
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </RouterLink>
          <RouterLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-all"
          >
            Contact Sales
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="container mx-auto px-4 py-16 border-t border-border/50">
      <div class="max-w-2xl mx-auto">
        <EmailCapture
          source="pricing"
          variant="inline"
          title="Get Formatho Updates"
          subtitle="Be the first to know about new features, pricing updates, and exclusive offers."
          placeholder="your@email.com"
          buttonText="Subscribe"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent;
}

.bg-grid-pattern {
  background-image: linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
