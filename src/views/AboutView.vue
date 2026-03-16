<script setup lang="ts">
import { RouterLink } from 'vue-router'
import formathoIcons from '@/assets/formatho-icons.json'

// Note: AOS is initialized globally in main.ts to prevent scroll freezing conflicts
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div class="container mx-auto px-4 py-12 md:py-16 relative">
        <div class="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div class="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Formatho"
              class="h-16 w-16 rounded-xl shadow-2xl ring-2 ring-primary/20"
            />
            <h1 class="text-4xl md:text-5xl font-bold tracking-tight gradient-text">
              Code That Respects Your Privacy
            </h1>
          </div>

          <p class="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            At Formatho, we believe developers deserve tools that work as hard as they do—without compromising what matters most: your data, your privacy, and your peace of mind. We've built a complete toolkit of 100+ developer utilities designed from the ground up to keep your information safe.
          </p>
        </div>
      </div>
    </section>

    <!-- Section 1: Your Data Never Leaves Your Browser (Text Left, Badge Right) -->
    <section class="container mx-auto px-4 py-12 md:py-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left: Text Content -->
          <div
            class="space-y-6"
            data-aos="fade-right"
            data-aos-duration="400"
          >
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight">
              Your Data Never Leaves Your Browser
            </h2>
            <div class="prose prose-lg text-muted-foreground space-y-4">
              <p>
                This is our core promise, and we mean it literally. Every tool on Formatho runs 100% client-side using modern web technologies. When you format JSON, convert YAML to JSON, or minify JavaScript, that data stays on your device—from the moment you paste it until the instant you close the tab.
              </p>
              <p class="font-medium text-foreground">
                We don't collect it. We don't store it. We can't see it.
              </p>
              <p>
                This isn't marketing fluff. It's architectural reality. Our tools execute entirely in your browser environment, meaning:
              </p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>Zero server uploads:</strong> Your code never leaves your machine</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>No database storage:</strong> Nothing gets saved anywhere</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>No third-party analytics:</strong> We don't track what you build</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>Offline-capable:</strong> Once loaded, many tools work without an internet connection</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right: Privacy Shield Trust Badge -->
          <div
            class="flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-delay="100"
          >
            <div class="glass-card p-12 max-w-sm text-center">
              <div class="mb-3 flex justify-center">
                <span
                  class="text-gray-900"
                  v-html="formathoIcons.icons['privacy-shield'].svg"
                />
              </div>
              <h3 class="text-gray-900">Privacy Shield</h3>
              <p class="text-lg text-muted-foreground">
                Your data never leaves your browser
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Why Privacy Matters (Text Right, Badge Left - Reversed) -->
    <section class="container mx-auto px-4 py-12 md:py-16 bg-muted/30">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left: No-Log Globe Trust Badge -->
          <div
            class="flex justify-center md:justify-start order-2 md:order-1"
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-delay="100"
          >
            <div class="glass-card p-12 max-w-sm text-center">
              <div class="mb-3 flex justify-center">
                <span
                  class="text-gray-900"
                  v-html="formathoIcons.icons['no-log-globe'].svg"
                />
              </div>
              <h3 class="text-gray-900">No-Log Globe</h3>
              <p class="text-lg text-muted-foreground">
                Zero tracking, zero storage, zero logs
              </p>
            </div>
          </div>

          <!-- Right: Text Content -->
          <div
            class="space-y-6 order-1 md:order-2"
            data-aos="fade-left"
            data-aos-duration="400"
          >
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight">
              Why Privacy Matters for Developers
            </h2>
            <div class="prose prose-lg text-muted-foreground space-y-4">
              <p>
                Developers handle sensitive information daily. API keys, authentication tokens, proprietary algorithms, and user data flow through their workflows constantly. When you rely on online tools to format or convert this code, you're essentially handing it to a stranger's server.
              </p>
              <p>
                We've all been there:
              </p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span>Pasting config files into JSON formatters only to wonder if they're being logged</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span>Using conversion tools that might be storing your proprietary data</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span>Not knowing what happens to your content after you hit "convert"</span>
                </li>
              </ul>
              <p class="font-medium text-foreground">
                At Formatho, we built the toolkit we wish existed. One where you can paste production configs, debug sensitive payloads, or format user-facing data without second-guessing whether it's safe. Because when you're a developer, privacy isn't optional—it's fundamental to doing your job securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Built for Security-Conscious Teams (Text Left, Badge Right) -->
    <section class="container mx-auto px-4 py-12 md:py-16">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Left: Text Content -->
          <div
            class="space-y-6"
            data-aos="fade-right"
            data-aos-duration="400"
          >
            <h2 class="text-3xl md:text-4xl font-bold tracking-tight">
              Built for Security-Conscious Teams
            </h2>
            <div class="prose prose-lg text-muted-foreground space-y-4">
              <p>
                Whether you're working on open-source projects, enterprise applications, or regulated industries (healthcare, finance, legal), you need tools that comply with strict data handling requirements. Formatho is designed for scenarios where:
              </p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>GDPR compliance matters:</strong> No personal data leaves the user's device</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>Code security audits are required:</strong> Zero external dependencies on your codebase</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>Team workflows demand trust:</strong> Developers can use tools without fear of exposure</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-gray-900">•</span>
                  <span><strong>Air-gapped environments:</strong> Many tools function in offline or restricted networks</span>
                </li>
              </ul>
              <p class="font-medium text-foreground">
                We're not just a convenience tool. We're a security requirement for teams that take their data seriously.
              </p>
            </div>
          </div>

          <!-- Right: Client-Side Chip Trust Badge -->
          <div
            class="flex justify-center md:justify-end"
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-delay="100"
          >
            <div class="glass-card p-12 max-w-sm text-center">
              <div class="mb-3 flex justify-center">
                <span
                  class="text-gray-900"
                  v-html="formathoIcons.icons['client-side-chip'].svg"
                />
              </div>
              <h3 class="text-gray-900">Client-Side Chip</h3>
              <p class="text-lg text-muted-foreground">
                100% client-side processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Pillars Section (3-Column Layout, Fade-Up from Bottom with Stagger) -->
    <section class="container mx-auto px-4 py-20 md:py-24 bg-muted/30">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Privacy Pillars</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            The three fundamental principles that define our approach to developer tools
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Pillar 1: Privacy First -->
          <div
            class="glass-card p-8 text-center"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-delay="0"
          >
            <div class="mb-6 flex justify-center">
              <span
                class="text-gray-900"
                v-html="formathoIcons.icons['privacy-shield'].svg"
              />
            </div>
            <h3 class="text-gray-900">Privacy First</h3>
            <p class="text-muted-foreground leading-relaxed">
              Your data never leaves your browser. We don't collect, store, or track anything you input. All processing happens locally on your device.
            </p>
          </div>

          <!-- Pillar 2: Zero Tracking -->
          <div
            class="glass-card p-8 text-center"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-delay="100"
          >
            <div class="mb-6 flex justify-center">
              <span
                class="text-gray-900"
                v-html="formathoIcons.icons['no-log-globe'].svg"
              />
            </div>
            <h3 class="text-gray-900">Zero Tracking</h3>
            <p class="text-muted-foreground leading-relaxed">
              No analytics, no cookies, no telemetry. We don't monetize your data. We believe privacy shouldn't be a premium feature—it should be the default.
            </p>
          </div>

          <!-- Pillar 3: Client-Side Only -->
          <div
            class="glass-card p-8 text-center"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-delay="200"
          >
            <div class="mb-6 flex justify-center">
              <span
                class="text-gray-900"
                v-html="formathoIcons.icons['client-side-chip'].svg"
              />
            </div>
            <h3 class="text-gray-900">Client-Side Only</h3>
            <p class="text-muted-foreground leading-relaxed">
              Every tool runs 100% in your browser. No server calls, no cloud processing. Fast, secure, and reliable tools that respect your data.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: The Future of Privacy-First Development Tools -->
    <section class="container mx-auto px-4 py-20 md:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="space-y-6"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight">
            The Future of Privacy-First Development Tools
          </h2>
          <div class="prose prose-lg text-muted-foreground space-y-4 max-w-3xl mx-auto">
            <p>
              The web has become cluttered with "free" tools that monetize your data. Every formatter, converter, and validator you use is either selling ads or building profiles on what you build. This creates a fundamental conflict of interest: the tool owner benefits from knowing your content, while you need them to not know it at all.
            </p>
            <p class="font-medium text-foreground">
              Formatho breaks this model entirely.
            </p>
            <p>
              By running everything client-side, we eliminate that conflict. Our incentives align with yours:
            </p>
            <ul class="text-left inline-block">
              <li class="mb-2"><strong>Better performance</strong> = faster client-side execution (we win)</li>
              <li class="mb-2"><strong>More features</strong> = more powerful browser capabilities (we both win)</li>
              <li><strong>User trust</strong> = continued adoption and word-of-mouth referrals (we both win)</li>
            </ul>
            <p class="font-medium text-foreground">
              We're building the future where privacy isn't a premium feature or an afterthought—it's the default. Every tool, every time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Our Commitment -->
    <section class="container mx-auto px-4 py-20 md:py-24 bg-muted/30">
      <div class="max-w-4xl mx-auto">
        <div class="glass-card p-8 md:p-12">
          <div
            class="text-center mb-12"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Commitment to You</h2>
            <p class="text-lg text-muted-foreground">
              Five promises that define how we build and operate
            </p>
          </div>

          <div class="space-y-6">
            <div
              class="flex gap-4 p-4 rounded-lg bg-background/50"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="0"
            >
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-gray-900">1</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-1">No Sign-Up Required</h3>
                <p class="text-muted-foreground">Use any tool instantly without creating accounts</p>
              </div>
            </div>

            <div
              class="flex gap-4 p-4 rounded-lg bg-background/50"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="50"
            >
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-gray-900">2</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-1">No Code Uploads</h3>
                <p class="text-muted-foreground">Your data processes locally in your browser</p>
              </div>
            </div>

            <div
              class="flex gap-4 p-4 rounded-lg bg-background/50"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="100"
            >
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-gray-900">3</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-1">No Analytics or Tracking</h3>
                <p class="text-muted-foreground">We don't monitor what you build</p>
              </div>
            </div>

            <div
              class="flex gap-4 p-4 rounded-lg bg-background/50"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="150"
            >
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-gray-900">4</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-1">Open Transparency</h3>
                <p class="text-muted-foreground">If we ever add server-side features, they'll be opt-in with clear disclosure</p>
              </div>
            </div>

            <div
              class="flex gap-4 p-4 rounded-lg bg-background/50"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="200"
            >
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="text-gray-900">5</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-1">Community-Driven</h3>
                <p class="text-muted-foreground">Tools are prioritized based on developer feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="container mx-auto px-4 py-20 md:py-24">
      <div class="max-w-3xl mx-auto text-center">
        <div
          class="space-y-6"
          data-aos="fade-up"
          data-aos-duration="400"
        >
          <h2 class="text-3xl md:text-4xl font-bold">Have questions about our privacy approach?</h2>
          <p class="text-lg text-muted-foreground max-w-xl mx-auto">
            We're here to answer any questions you have about how we handle your data or suggest new tools you'd like to see.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/"
              class="text-gray-900"
            >
              Explore Our Tools
            </RouterLink>
            <a
              href="mailto:support@formatho.com"
              class="text-gray-900"
            >
              Contact Us
            </a>
          </div>

          <p class="mt-8 text-sm text-muted-foreground">
            Formatho is open source and free to use. Contributions welcome!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Mobile: Stack vertically, maintain fade-in effect */
@media (max-width: 768px) {
  .grid > div {
    order: auto !important;
  }
}

/* Consistent button styling with signature blue */
a.bg-primary,
button.bg-primary {
  background-color: rgb(6, 182, 212) !important;
  color: white !important;
}
</style>
