<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Github, ExternalLink } from 'lucide-vue-next'
import { useAnalytics, type PlanType } from '@/composables/useAnalytics'

const route = useRoute()
const { trackContactFormSubmitted, trackPricingView } = useAnalytics()

// Get plan from query parameter if coming from pricing page
const planFromQuery = computed(() => route.query.plan as string | undefined)

// Track lead when viewing contact with plan intent
onMounted(() => {
  if (planFromQuery.value && ['pro', 'enterprise'].includes(planFromQuery.value)) {
    trackContactFormSubmitted(planFromQuery.value as PlanType)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-12">
        Have questions, feedback, or want to contribute? We'd love to hear from you.
      </p>

      <!-- Contact Options Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <!-- GitHub -->
        <div class="glass-card p-6 hover:border-primary/50 transition-all">
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl bg-primary/10 shrink-0">
              <Github class="text-gray-900" />
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Open Source</h3>
              <p class="text-muted-foreground mb-4">
                Formatho is open source. Report bugs, request features, or contribute code on
                GitHub.
              </p>
              <a
                href="https://github.com/formatho/tools"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900"
              >
                Visit GitHub Repository
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- Community -->
        <div class="glass-card p-6 hover:border-primary/50 transition-all">
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-xl bg-primary/10 shrink-0">
              <svg
                class="text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                ></path>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-2">Community</h3>
              <p class="text-muted-foreground mb-4">
                Join our community to discuss features, share ideas, and connect with other
                developers.
              </p>
              <a
                href="https://github.com/formatho/tools/discussions"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-900"
              >
                Join Discussions
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Section -->
      <div class="glass-card p-8 md:p-12">
        <h2 class="text-2xl font-bold mb-6">Get in Touch</h2>

        <div class="space-y-6 text-muted-foreground">
          <p class="leading-relaxed">
            <strong class="text-foreground">For General Inquiries:</strong> We're a small team
            dedicated to building privacy-first tools. While we may not be able to respond to every
            message, we read all feedback and use it to improve our services.
          </p>

          <p class="leading-relaxed">
            <strong class="text-foreground">For Bug Reports:</strong> Please open an issue on our
            GitHub repository. Include as much detail as possible: browser version, steps to
            reproduce, and expected vs actual behavior.
          </p>

          <p class="leading-relaxed">
            <strong class="text-foreground">For Feature Requests:</strong> We love hearing ideas for
            new tools or improvements! Submit feature requests via GitHub Issues or Discussions.
          </p>

          <p class="leading-relaxed">
            <strong class="text-foreground">For Business Inquiries:</strong> While Formatho is
            primarily a free, open-source project, we're open to partnerships and collaborations
            that align with our privacy-first mission.
          </p>
        </div>

        <div class="mt-8 pt-8 border-t border-border">
          <h3 class="text-lg font-semibold mb-4">Response Time</h3>
          <p class="text-muted-foreground">
            We typically respond to GitHub issues within 24-48 hours. For urgent matters affecting
            site functionality, please mark your issue as "critical" on GitHub.
          </p>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

        <div class="space-y-4">
          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">Is Formatho really 100% private?</h3>
            <p class="text-sm text-muted-foreground">
              Yes! All data processing happens locally in your browser. Your data never leaves your
              device. See our Privacy Policy for details.
            </p>
          </div>

          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">Are these tools free to use?</h3>
            <p class="text-sm text-muted-foreground">
              Yes, all our tools are completely free and open-source. No accounts required, no
              limitations.
            </p>
          </div>

          <div class="glass-card p-6">
            <h3 class="font-semibold mb-2">Can I contribute to Formatho?</h3>
            <p class="text-sm text-muted-foreground">
              Absolutely! We welcome contributions. Check our GitHub repository for open issues and
              contribution guidelines.
            </p>
          </div>
        </div>
      </div>

      <!-- Related Links -->
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/about"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          About Us →
        </RouterLink>
        <RouterLink
          to="/privacy"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Privacy Policy →
        </RouterLink>
        <RouterLink
          to="/terms"
          class="text-sm text-muted-foreground hover:text-gray-900 transition-colors"
        >
          Terms of Service →
        </RouterLink>
      </div>
    </div>
  </div>
</template>
