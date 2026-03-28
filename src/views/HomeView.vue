<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLandingPageABTesting } from '@/composables/useABTesting'

// Get or create user ID for consistent A/B test assignment
const userId = ref(localStorage.getItem('ab_test_user_id') || generateUserId())

function generateUserId(): string {
  const id = 'user_' + Math.random().toString(36).substr(2, 9)
  localStorage.setItem('ab_test_user_id', id)
  return id
}

// A/B Testing hooks
const {
  heroHeadline,
  heroSubheadline,
  primaryCTA,
  secondaryCTA,
  urgencyBanner,
  urgencyType,
  trackAllImpressions,
  trackPrimaryCTAClick,
  trackSecondaryCTAClick,
  trackSignUp,
  trackTrialStart,
  trackBetaApplication
} = useLandingPageABTesting(userId.value)

// Track impressions on mount
onMounted(() => {
  trackAllImpressions()
})

const betaSpots = ref(8) // Out of 10

const features = [
  {
    icon: '🤖',
    title: 'Multiple AI Models',
    description: 'Connect to OpenAI, Anthropic Claude, or run local models with Ollama',
    stat: '10+ models supported'
  },
  {
    icon: '⚡',
    title: 'Agent Pools',
    description: 'Run multiple AI agents in parallel for maximum productivity',
    stat: '10x faster workflows'
  },
  {
    icon: '🔒',
    title: 'Privacy-First',
    description: 'All data stays on your machine. No cloud dependency required',
    stat: '100% local control'
  },
  {
    icon: '🔄',
    title: 'Cron Scheduling',
    description: 'Automate recurring tasks with built-in cron job support',
    stat: '24/7 automation'
  },
  {
    icon: '📊',
    title: 'State Persistence',
    description: 'Agents remember context across sessions automatically',
    stat: 'Zero context loss'
  },
  {
    icon: '🚀',
    title: 'REST API',
    description: 'Full programmatic access with comprehensive REST API',
    stat: '100+ endpoints'
  }
]

const testimonials = [
  {
    quote: "Agent Orchestrator cut our code review time by 70%. It's like having a senior developer available 24/7.",
    author: "Sarah Chen",
    role: "CTO, TechStartup",
    avatar: "SC"
  },
  {
    quote: "Finally, a privacy-first AI tool that doesn't require sending data to the cloud. Perfect for our security needs.",
    author: "Marcus Johnson",
    role: "Security Engineer",
    avatar: "MJ"
  },
  {
    quote: "The agent pools feature is incredible. We run 10 agents in parallel and ship features 5x faster.",
    author: "Alex Rivera",
    role: "Lead Developer",
    avatar: "AR"
  }
]

const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out Agent Orchestrator',
    features: [
      '5 AI agents',
      'Basic support',
      'Community access',
      '1 agent pool',
      'Standard models'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For serious developers and small teams',
    features: [
      'Unlimited agents',
      'Priority support',
      'Private Discord',
      'Unlimited pools',
      'All models + local LLMs',
      'API access',
      'Cron scheduling',
      'State persistence'
    ],
    cta: 'Start 14-Day Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: null,
    description: 'For organizations with custom needs',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee',
      'On-premise deployment',
      'Custom training'
    ],
    cta: 'Contact Sales',
    popular: false
  }
]

const faqs = [
  {
    question: 'What makes Agent Orchestrator different from other AI tools?',
    answer: 'Agent Orchestrator runs entirely on your machine with zero cloud dependency. Your code, data, and conversations never leave your infrastructure. Plus, our agent pools feature lets you run multiple AI agents in parallel, dramatically increasing productivity.'
  },
  {
    question: 'Do I need to be technical to use it?',
    answer: 'Agent Orchestrator is designed for developers, but we also provide a user-friendly web interface. If you can use ChatGPT, you can use Agent Orchestrator. For advanced features, some technical knowledge helps but isn\'t required.'
  },
  {
    question: 'What AI models are supported?',
    answer: 'We support OpenAI (GPT-4, GPT-3.5), Anthropic Claude, and local models via Ollama (Llama 2, Mistral, etc.). You can switch between providers seamlessly, and even use multiple models simultaneously in different agents.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Our Free tier includes 5 agents forever at no cost. Pro tier comes with a 14-day free trial with full feature access. No credit card required to start.'
  },
  {
    question: 'Can I self-host Agent Orchestrator?',
    answer: 'Absolutely. Agent Orchestrator is designed to run on your infrastructure. Download the binary, run it locally or on your servers, and maintain complete control over your data. Enterprise plans include on-premise deployment support.'
  },
  {
    question: 'What happens if I go over the agent limit?',
    answer: 'On the Free tier, you\'ll be prompted to upgrade to Pro or remove inactive agents. Your agents will continue running - we never interrupt your work. Pro tier includes unlimited agents.'
  }
]

const handlePrimaryCTA = () => {
  trackPrimaryCTAClick()
  // Navigate to sign-up
  window.location.href = '/signup'
}

const handleSecondaryCTA = () => {
  trackSecondaryCTAClick()
  // Navigate to demo
  window.location.href = '/demo'
}

const handleBetaApplication = () => {
  trackBetaApplication()
  window.location.href = '/beta'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
    <!-- Announcement Banner - A/B Tested -->
    <div 
      v-if="urgencyType === 'scarcity'"
      class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center text-sm font-medium"
    >
      <span class="mr-2">🎉</span>
      <span>{{ urgencyBanner }}</span>
      <a href="/beta" @click="handleBetaApplication" class="ml-2 underline hover:no-underline">Apply Now →</a>
    </div>
    <div 
      v-else
      class="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 text-center text-sm font-medium"
    >
      <span class="mr-2">🎉</span>
      <span>{{ urgencyBanner }}</span>
      <a href="/beta" @click="handleBetaApplication" class="ml-2 underline hover:no-underline">Join Them →</a>
    </div>

    <!-- Header -->
    <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🏗️</span>
            <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Formatho</span>
          </div>
          <nav class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-slate-300 hover:text-white transition">Features</a>
            <a href="#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
            <a href="/docs/api" class="text-slate-300 hover:text-white transition">API Docs</a>
            <a href="#faq" class="text-slate-300 hover:text-white transition">FAQ</a>
          </nav>
          <div class="flex items-center gap-4">
            <a href="/beta" class="text-slate-300 hover:text-white transition">Beta</a>
            <Button @click="handlePrimaryCTA" class="bg-blue-600 hover:bg-blue-700">
              {{ primaryCTA }}
            </Button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section - A/B Tested -->
    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <!-- Social Proof -->
          <div class="flex items-center justify-center gap-2 mb-8">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">SC</div>
              <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">MJ</div>
              <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold">AR</div>
            </div>
            <span class="text-slate-400 text-sm">Trusted by 50+ developers</span>
          </div>

          <!-- Main Headline - A/B Tested -->
          <h1 class="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            {{ heroHeadline.split(' ').slice(0, -2).join(' ') }}<br>
            <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {{ heroHeadline.split(' ').slice(-2).join(' ') }}
            </span>
          </h1>

          <p class="text-xl text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            {{ heroSubheadline }}
          </p>

          <!-- CTA Buttons - A/B Tested -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" @click="handlePrimaryCTA" class="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
              {{ primaryCTA }} →
            </Button>
            <Button size="lg" @click="handleSecondaryCTA" variant="outline" class="border-slate-700 px-8 py-6 text-lg">
              {{ secondaryCTA }}
            </Button>
          </div>

          <!-- Trust Signals -->
          <div class="flex items-center justify-center gap-8 text-sm text-slate-500">
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>No credit card required</span>
            </div>
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>5 agents free forever</span>
            </div>
            <div class="flex items-center gap-2">
              <span>✓</span>
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>

        <!-- Hero Image/Preview -->
        <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 p-2 shadow-2xl">
          <div class="bg-slate-950 rounded-lg p-6 aspect-video flex items-center justify-center">
            <div class="text-center text-slate-500">
              <div class="text-6xl mb-4">🤖</div>
              <div class="text-lg font-medium">Agent Orchestrator Dashboard</div>
              <div class="text-sm mt-2">Screenshot preview coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logos Section -->
    <section class="py-12 border-y border-slate-800 bg-slate-900/30">
      <div class="max-w-7xl mx-auto px-6">
        <p class="text-center text-slate-500 text-sm mb-8">TRUSTED BY DEVELOPERS AT</p>
        <div class="flex items-center justify-center gap-12 flex-wrap opacity-50">
          <div class="text-2xl font-bold text-slate-400">TechStartup</div>
          <div class="text-2xl font-bold text-slate-400">DevCorp</div>
          <div class="text-2xl font-bold text-slate-400">AILabs</div>
          <div class="text-2xl font-bold text-slate-400">CloudCo</div>
          <div class="text-2xl font-bold text-slate-400">DataFlow</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Everything You Need to Ship Faster</h2>
          <p class="text-xl text-slate-400">Powerful features that help you build, test, and deploy 10x faster</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card v-for="feature in features" :key="feature.title" class="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition">
            <CardHeader>
              <div class="text-4xl mb-3">{{ feature.icon }}</div>
              <CardTitle class="text-xl">{{ feature.title }}</CardTitle>
              <CardDescription>{{ feature.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="text-sm text-blue-400 font-medium">{{ feature.stat }}</div>
            </CardContent>
          </Card>
        </div>

        <!-- CTA After Features -->
        <div class="text-center mt-12">
          <Button size="lg" @click="handlePrimaryCTA" class="bg-blue-600 hover:bg-blue-700 px-8">
            Start Using These Features →
          </Button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 px-6 bg-slate-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Loved by Developers</h2>
          <p class="text-xl text-slate-400">See what early users are saying about Agent Orchestrator</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <Card v-for="testimonial in testimonials" :key="testimonial.author" class="bg-slate-800/50 border-slate-700">
            <CardContent class="pt-6">
              <div class="flex items-center gap-1 mb-4">
                <span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
              </div>
              <p class="text-slate-300 mb-6 italic">"{{ testimonial.quote }}"</p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                  {{ testimonial.avatar }}
                </div>
                <div>
                  <div class="font-semibold">{{ testimonial.author }}</div>
                  <div class="text-sm text-slate-500">{{ testimonial.role }}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p class="text-xl text-slate-400 mb-6">Start free, scale when you're ready</p>
          <div class="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
            <span class="text-green-400 text-sm">✓ 14-day free trial on Pro • No credit card required</span>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card v-for="plan in pricingPlans" :key="plan.name" 
                :class="[
                  'bg-slate-900/50 border-slate-800 relative',
                  plan.popular ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
                ]">
            <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
            </div>
            <CardHeader class="text-center pb-4">
              <CardTitle class="text-2xl">{{ plan.name }}</CardTitle>
              <CardDescription>{{ plan.description }}</CardDescription>
            </CardHeader>
            <CardContent class="text-center">
              <div class="mb-6">
                <span v-if="plan.price !== null" class="text-5xl font-bold">${{ plan.price }}</span>
                <span v-else class="text-3xl font-bold">Custom</span>
                <span v-if="plan.price !== null" class="text-slate-400">/mo</span>
              </div>
              <ul class="text-left space-y-3 mb-8">
                <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
                  <span class="text-green-400 mt-1">✓</span>
                  <span class="text-slate-300 text-sm">{{ feature }}</span>
                </li>
              </ul>
              <Button 
                @click="plan.popular ? handlePrimaryCTA() : null"
                :variant="plan.popular ? 'default' : 'outline'"
                :class="plan.popular ? 'bg-blue-600 hover:bg-blue-700 w-full' : 'border-slate-700 w-full'"
              >
                {{ plan.cta }}
              </Button>
            </CardContent>
          </Card>
        </div>

        <!-- Money-Back Guarantee -->
        <div class="text-center mt-12">
          <div class="inline-flex items-center gap-3 bg-slate-800/50 rounded-lg px-6 py-3">
            <span class="text-2xl">🛡️</span>
            <div class="text-left">
              <div class="font-semibold">30-Day Money-Back Guarantee</div>
              <div class="text-sm text-slate-400">Not satisfied? Get a full refund, no questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 px-6 bg-slate-900/50">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-slate-400">Everything you need to know</p>
        </div>

        <div class="space-y-4">
          <Card v-for="faq in faqs" :key="faq.question" class="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle class="text-lg">{{ faq.question }}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-slate-300">{{ faq.answer }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-5xl font-bold mb-6">Ready to Orchestrate?</h2>
        <p class="text-xl text-slate-400 mb-8">
          Join 50+ developers already using Agent Orchestrator to ship faster.
        </p>

        <!-- Urgency Indicator - A/B Tested -->
        <div 
          v-if="urgencyType === 'scarcity'"
          class="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 mb-8"
        >
          <span class="animate-pulse">🔴</span>
          <span class="text-red-400 text-sm font-medium">
            Beta program: Only {{ betaSpots }} spots left!
          </span>
        </div>
        <div 
          v-else
          class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 mb-8"
        >
          <span>🎉</span>
          <span class="text-blue-400 text-sm font-medium">
            Join 50+ developers already shipping faster!
          </span>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" @click="handlePrimaryCTA" class="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
            {{ primaryCTA }} →
          </Button>
          <Button size="lg" @click="handleSecondaryCTA" variant="outline" class="border-slate-700 px-8 py-6 text-lg">
            Schedule Demo
          </Button>
        </div>

        <p class="text-sm text-slate-500 mt-6">
          No credit card required • 5 agents free forever • Setup in 2 minutes
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-800 py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🏗️</span>
            <span class="text-xl font-bold">Formatho</span>
          </div>
          <div class="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" class="hover:text-white transition">Privacy Policy</a>
            <a href="#" class="hover:text-white transition">Terms of Service</a>
            <a href="#" class="hover:text-white transition">Contact</a>
          </div>
          <div class="text-sm text-slate-500">
            © 2026 Formatho. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
