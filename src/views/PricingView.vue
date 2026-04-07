<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Check } from 'lucide-vue-next'

const billingPeriod = ref<'monthly' | 'yearly'>('monthly')

const plans = [
  {
    name: 'Free',
    description: 'For solo developers getting started with AI agents',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Up to 3 agents',
      '100 tasks per day',
      'Basic analytics dashboard',
      'Community support (Discord)',
      'REST API access',
      '1 project'
    ],
    cta: 'Get Started Free',
    ctaLink: 'https://todo.formatho.com',
    popular: false
  },
  {
    name: 'Pro',
    description: 'For serious developers and growing teams',
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      'Up to 25 agents',
      'Unlimited tasks',
      'Advanced analytics & reports',
      'Priority email support',
      'REST API access',
      'Unlimited projects',
      'Agent pools & parallel execution',
      'Cron scheduling',
      'State persistence',
      'Custom integrations'
    ],
    cta: 'Start 14-Day Free Trial',
    ctaLink: 'https://todo.formatho.com',
    popular: true
  },
  {
    name: 'Enterprise',
    description: 'For organizations with custom requirements',
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      'Unlimited agents',
      'Unlimited everything',
      'Dedicated account manager',
      'SLA guarantee (99.99%)',
      'On-premise deployment',
      'Custom training & onboarding',
      'SSO / SAML integration',
      'Audit logs',
      'Custom SLA & support'
    ],
    cta: 'Contact Sales',
    ctaLink: 'mailto:hello@formatho.com',
    popular: false
  }
]

const faqs = [
  {
    question: 'Is there really a free tier?',
    answer: 'Yes! The Free plan is free forever. No credit card required. You get 3 agents and 100 tasks per day — enough for most solo developers.'
  },
  {
    question: 'What happens when I hit the task limit?',
    answer: 'On the Free plan, tasks beyond the daily limit are queued and processed the next day. On Pro, there are no limits. We never delete your data.'
  },
  {
    question: 'Can I switch plans anytime?',
    answer: 'Absolutely. Upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at the end of your billing period.'
  },
  {
    question: 'Do you offer a startup discount?',
    answer: 'Yes! If you\'re a startup with under $1M in funding, email us at hello@formatho.com for 50% off Pro for the first year.'
  },
  {
    question: 'Is there a self-hosted option?',
    answer: 'Enterprise plans include on-premise deployment. Self-hosted Pro is coming Q3 2026. Join our newsletter to get notified.'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background to-muted/30">
    <!-- Header -->
    <section class="container mx-auto px-4 pt-16 pb-8">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Start free. Scale when you're ready. No hidden fees, no surprises.
        </p>

        <!-- Billing Toggle -->
        <div class="inline-flex items-center gap-3 bg-muted/50 rounded-full p-1">
          <button
            @click="billingPeriod = 'monthly'"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              billingPeriod === 'monthly'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            ]"
          >
            Monthly
          </button>
          <button
            @click="billingPeriod = 'yearly'"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              billingPeriod === 'yearly'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            ]"
          >
            Yearly
            <span class="ml-1 text-xs opacity-70">Save 17%</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="container mx-auto px-4 pb-16">
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="[
            'glass-card p-8 flex flex-col relative',
            plan.popular ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20' : 'border-border'
          ]"
        >
          <!-- Popular Badge -->
          <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </span>
          </div>

          <!-- Plan Info -->
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-1">{{ plan.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ plan.description }}</p>
          </div>

          <!-- Price -->
          <div class="mb-8">
            <div class="flex items-baseline gap-1">
              <span v-if="plan.monthlyPrice !== null" class="text-5xl font-bold">
                ${{ billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice }}
              </span>
              <span v-else class="text-3xl font-bold">Custom</span>
              <span v-if="plan.monthlyPrice !== null" class="text-muted-foreground">/mo</span>
            </div>
            <p v-if="billingPeriod === 'yearly' && plan.monthlyPrice" class="text-sm text-muted-foreground mt-1">
              Billed ${{ plan.yearlyPrice! * 12 }}/year
            </p>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-8 flex-1">
            <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3">
              <Check class="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="plan.ctaLink"
            :class="[
              'block w-full text-center py-3 rounded-lg font-semibold transition-all text-lg',
              plan.popular
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                : 'border border-primary/30 hover:bg-primary/5'
            ]"
          >
            {{ plan.cta }}
          </a>
        </div>
      </div>

      <!-- Money-Back Guarantee -->
      <div class="max-w-2xl mx-auto mt-12 text-center">
        <div class="inline-flex items-center gap-3 glass-card px-6 py-4">
          <span class="text-2xl">🛡️</span>
          <div class="text-left">
            <div class="font-semibold">30-Day Money-Back Guarantee</div>
            <div class="text-sm text-muted-foreground">Not satisfied? Full refund, no questions asked.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="faq in faqs" :key="faq.question" class="glass-card p-6">
            <h3 class="font-semibold text-lg mb-2">{{ faq.question }}</h3>
            <p class="text-muted-foreground leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-2xl mx-auto text-center glass-card p-12">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-muted-foreground mb-6">
          Join developers who trust Agent Todo for their AI workflow management.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://todo.formatho.com"
            class="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Start Free — No Credit Card
          </a>
          <RouterLink
            to="/agent-todo"
            class="px-8 py-3 border border-primary/30 rounded-lg font-medium hover:bg-primary/5 transition-colors"
          >
            Learn More
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
