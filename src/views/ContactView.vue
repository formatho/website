<script setup lang="ts">
import { Github, Mail, Bug, Lightbulb, Handshake, Clock, ArrowRight, ShieldCheck, Code2 } from 'lucide-vue-next'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'Contact - Formatho',
  description: 'Get in touch with the Formatho team. Report bugs, request features, or discuss partnerships on GitHub.',
  keywords: ['contact formatho', 'bug report', 'feature request', 'github formatho'],
  ogType: 'website'
})

const channels = [
  {
    icon: Bug,
    title: 'Found a bug?',
    body: 'Open an issue with your browser version, steps to reproduce, and what you expected vs what happened.',
    action: 'Open an issue',
    link: 'https://github.com/formatho/website/issues/new?labels=bug&template=bug_report.md',
    tone: 'bg-primary/10'
  },
  {
    icon: Lightbulb,
    title: 'Have an idea?',
    body: 'Suggest a new tool, an improvement, or a whole category. The best ideas come from daily users.',
    action: 'Request a feature',
    link: 'https://github.com/formatho/website/issues/new?labels=enhancement&template=feature_request.md',
    tone: 'bg-primary/10'
  },
  {
    icon: Code2,
    title: 'Want to contribute?',
    body: 'The entire site is open source. Pick an open issue, submit a PR, or start a discussion about architecture.',
    action: 'Browse the code',
    link: 'https://github.com/formatho/website',
    tone: 'bg-primary/10'
  },
  {
    icon: Handshake,
    title: 'Partnership or sponsorship?',
    body: 'RPC providers, dev-tool companies, and web3 infrastructure teams — reach out to discuss placements.',
    action: 'Start a conversation',
    link: 'mailto:support@formatho.com?subject=Partnership',
    tone: 'bg-primary/10'
  }
]

const faqs = [
  {
    q: 'Is Formatho really 100% private?',
    a: 'Yes. Every tool processes data locally in your browser using standard Web APIs. Nothing is uploaded, logged, or stored on a server.'
  },
  {
    q: 'Are these tools free?',
    a: 'All 122 tools are free with no accounts, no limits, and no paywalls. The source code is open on GitHub.'
  },
  {
    q: 'How fast do you respond?',
    a: 'GitHub issues are typically triaged within 24-48 hours. Critical bugs affecting site functionality get priority.'
  },
  {
    q: 'Can I self-host Formatho?',
    a: 'Yes — the entire site is a static build. Clone the repo, run npm run build, and serve the dist directory with any static server.'
  }
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <!-- Header -->
    <div class="mb-12">
      <p class="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-3">Contact</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Talk to us on GitHub
      </h1>
      <p class="text-lg text-muted-foreground leading-relaxed max-w-2xl">
        We don't have a Discord or a Slack yet — and we won't pretend otherwise.
        Everything happens in the open: bug reports, feature ideas, and code review
        all live on GitHub where anyone can follow along.
      </p>
    </div>

    <!-- Contact channels -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
      <a
        v-for="ch in channels"
        :key="ch.title"
        :href="ch.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
      >
        <div class="flex items-start gap-4">
          <div class="p-2.5 rounded-lg shrink-0" :class="ch.tone">
            <component :is="ch.icon" class="w-5 h-5 text-foreground" stroke-width="1.5" />
          </div>
          <div class="min-w-0">
            <h2 class="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{{ ch.title }}</h2>
            <p class="text-sm text-muted-foreground leading-relaxed mb-3">{{ ch.body }}</p>
            <span class="text-sm font-medium text-primary inline-flex items-center gap-1">
              {{ ch.action }}
              <ArrowRight class="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </a>
    </div>

    <!-- What to expect -->
    <div class="border-t border-border pt-10 mb-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Clock class="w-4 h-4 text-muted-foreground" />
            <h3 class="text-sm font-semibold">Response time</h3>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Issues are triaged within 24-48 hours. Critical bugs get priority treatment.
          </p>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-2">
            <ShieldCheck class="w-4 h-4 text-muted-foreground" />
            <h3 class="text-sm font-semibold">Your privacy</h3>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Contacting us via GitHub or email never involves tracking pixels or data brokers.
          </p>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-2">
            <Github class="w-4 h-4 text-muted-foreground" />
            <h3 class="text-sm font-semibold">Open source</h3>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            Every tool, every page, every deployment script — all on GitHub under the formatho org.
          </p>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="border-t border-border pt-10">
      <h2 class="text-xl font-bold mb-6">Common questions</h2>
      <div class="space-y-2">
        <details v-for="faq in faqs" :key="faq.q" class="group border border-border rounded-lg">
          <summary class="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between gap-4">
            {{ faq.q }}
            <span class="text-muted-foreground transition-transform group-open:rotate-180 text-sm">&#9662;</span>
          </summary>
          <p class="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{{ faq.a }}</p>
        </details>
      </div>
    </div>

    <!-- Footer links -->
    <div class="mt-10 flex items-center gap-6 text-sm">
      <RouterLink to="/about" class="text-muted-foreground hover:text-foreground transition-colors">About</RouterLink>
      <RouterLink to="/privacy" class="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</RouterLink>
      <RouterLink to="/terms" class="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</RouterLink>
      <a href="mailto:support@formatho.com" class="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
        <Mail class="w-3.5 h-3.5" /> support@formatho.com
      </a>
    </div>
  </div>
</template>
