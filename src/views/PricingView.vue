<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useStructuredData } from '@/composables/useStructuredData'

const { addFAQStructuredData, addBreadcrumbStructuredData } = useStructuredData()

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
    ctaLink: 'https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=pricing_page',
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
    ctaLink: 'https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=pricing_page',
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

const planSpacing = (name: string) => {
  return name.split('').join(' ')
}

onMounted(() => {
  addBreadcrumbStructuredData([
    { name: 'Home', url: 'https://formatho.com' },
    { name: 'Pricing', url: 'https://formatho.com/pricing' }
  ])
  addFAQStructuredData(faqs.map(f => ({ question: f.question, answer: f.answer })))
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <!-- ============================================ -->
    <!-- HEADER: Left-aligned, brutalist               -->
    <!-- ============================================ -->
    <section class="border-b-2 border-foreground">
      <div class="container mx-auto px-4 md:px-12 py-16 md:py-24">
        <h1 class="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6">
          Pricing
        </h1>
        <p class="font-mono text-xs md:text-sm tracking-widest text-muted-foreground max-w-xl">
          Start free. Scale when you're ready. No hidden fees, no surprises.
        </p>

        <!-- Billing Toggle -->
        <div class="mt-10 flex items-center gap-6">
          <button
            @click="billingPeriod = 'monthly'"
            :class="[
              'text-xs tracking-widest uppercase transition-all pb-1',
              billingPeriod === 'monthly'
                ? 'text-foreground font-bold border-b-2 border-foreground'
                : 'text-muted-foreground hover:text-foreground line-through decoration-foreground/20'
            ]"
          >
            Monthly
          </button>
          <button
            @click="billingPeriod = 'yearly'"
            :class="[
              'text-xs tracking-widest uppercase transition-all pb-1',
              billingPeriod === 'yearly'
                ? 'text-foreground font-bold border-b-2 border-foreground'
                : 'text-muted-foreground hover:text-foreground line-through decoration-foreground/20'
            ]"
          >
            Yearly <span class="text-muted-foreground normal-case tracking-normal ml-1">Save 17%</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- ANTI-CARD GRID                                -->
    <!-- ============================================ -->
    <section class="container mx-auto px-4 md:px-0">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div
          v-for="(plan, index) in plans"
          :key="plan.name"
          :class="[
            'flex flex-col p-8 md:p-12',
            plan.popular ? 'bg-foreground text-background' : 'bg-background text-foreground',
            index < plans.length - 1 ? 'md:border-r' : '',
            plan.popular ? 'md:border-r' : '',
          ]"
          :style="{ borderRight: index < plans.length - 1 && !plan.popular ? '1px solid var(--foreground)' : plan.popular ? '1px solid var(--foreground)' : 'none', borderColor: plan.popular ? 'var(--background)' : '' }"
        >
          <!-- Plan Name -->
          <p class="text-xs tracking-widest mb-2 opacity-60">
            {{ planSpacing(plan.name.toUpperCase()) }}
          </p>
          <p class="text-sm opacity-60 mb-8">{{ plan.description }}</p>

          <!-- Price -->
          <div class="mb-10">
            <div class="flex items-baseline gap-1">
              <span v-if="plan.monthlyPrice !== null" class="text-8xl md:text-9xl font-black tracking-tighter leading-none">
                ${{ billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice }}
              </span>
              <span v-else class="text-5xl md:text-6xl font-black tracking-tighter leading-none">Custom</span>
            </div>
            <p v-if="plan.monthlyPrice !== null" class="text-xs tracking-widest mt-2 opacity-50">PER MONTH</p>
            <p v-if="billingPeriod === 'yearly' && plan.monthlyPrice" class="text-xs tracking-widest mt-1 opacity-50">
              BILLED ${{ plan.yearlyPrice! * 12 }}/YEAR
            </p>
          </div>

          <!-- Features -->
          <ul class="flex-1 mb-10">
            <li
              v-for="feature in plan.features"
              :key="feature"
              :class="[
                'flex items-start gap-4 py-3 border-b',
                plan.popular ? 'border-background/10' : 'border-foreground/10'
              ]"
            >
              <span class="text-xs font-mono mt-0.5 opacity-40">+</span>
              <span class="text-sm">{{ feature }}</span>
            </li>
          </ul>

          <!-- CTA -->
          <a
            :href="plan.ctaLink"
            :class="[
              'block w-full text-center py-4 font-bold tracking-widest text-xs uppercase transition-all',
              plan.popular
                ? 'bg-background text-foreground hover:bg-background/90'
                : 'bg-foreground text-background hover:bg-foreground/90'
            ]"
          >
            {{ plan.cta }}
          </a>
        </div>
      </div>
    </section>

    <!-- Guarantee -->
    <section class="border-t-2 border-foreground">
      <div class="container mx-auto px-4 md:px-12 py-8">
        <div class="flex items-center gap-4">
          <span class="text-xs tracking-widest text-muted-foreground">30-DAY MONEY-BACK GUARANTEE</span>
          <span class="text-muted-foreground">—</span>
          <span class="text-xs text-muted-foreground">Not satisfied? Full refund, no questions asked.</span>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- FAQ: Brutalist spec sheet style               -->
    <!-- ============================================ -->
    <section class="container mx-auto px-4 md:px-12 py-16 md:py-24">
      <h2 class="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-12">
        FAQ
      </h2>
      <div class="border-t border-foreground/10">
        <div
          v-for="faq in faqs"
          :key="faq.question"
          class="border-b border-foreground/10 py-8"
        >
          <h3 class="text-lg font-bold tracking-tight mb-3">{{ faq.question }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl">{{ faq.answer }}</p>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="border-t-2 border-foreground">
      <div class="container mx-auto px-4 md:px-12 py-16 md:py-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Ready to Get Started?
          </h2>
          <div class="md:text-right">
            <a
              href="https://todo.formatho.com/?utm_source=formatho&utm_medium=website&utm_campaign=pricing_bottom_cta"
              class="inline-block bg-foreground text-background px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-foreground/90 transition-all"
            >
              Start Free — No Credit Card
            </a>
            <p class="text-xs text-muted-foreground mt-4 tracking-widest">
              No credit card required · Setup in 2 minutes · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
