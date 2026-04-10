<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import cloudIsAtRisk from '@/assets/cloud-is-at-risk.png'
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <!-- ============================================ -->
    <!-- SECTION 1: HERO — Z-INDEX STACKING           -->
    <!-- ============================================ -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-background">
      <!-- Layer 0: Massive Background Typography -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1
          class="text-[18vw] md:text-[14vw] font-black tracking-tighter leading-none text-foreground/[0.04] whitespace-nowrap"
        >
          THE COUNCIL
        </h1>
      </div>

      <!-- Layer 1: Secondary bleed text -->
      <div class="absolute bottom-0 left-0 right-0 pointer-events-none select-none z-0">
        <p
          class="text-[6vw] md:text-[4vw] font-black tracking-tighter leading-none text-foreground/[0.03] whitespace-nowrap -mb-4"
        >
          DIGITAL TWIN OS ✧ PRIVACY-FIRST ✧ WASM POWERED
        </p>
      </div>

      <!-- Layer 2: Central Abstract 3D Placeholder -->
      <div
        class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div
          class="w-48 h-48 md:w-72 md:h-72 border border-foreground/10 rounded-sm rotate-45 opacity-20"
        ></div>
        <div
          class="absolute w-32 h-32 md:w-52 md:h-52 border border-foreground/5 rounded-sm rotate-12 opacity-10"
        ></div>
      </div>

      <!-- Layer 3: Content Grid -->
      <div class="relative z-20 container mx-auto px-4 md:px-12 py-16 md:py-24 w-full">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end min-h-[70vh]">
          <!-- Left Column: Title -->
          <div class="md:col-span-7">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-6">
              ABOUT FORMATHO
            </p>
            <h2
              class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-foreground"
            >
              The Privacy-First<br />Digital Twin OS
            </h2>
          </div>

          <!-- Right Column: Our Evolution -->
          <div class="md:col-span-5 md:border-l md:border-foreground/10 md:pl-12">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              EFFICIENCY UNLEASHED
            </p>
            <h3 class="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-6">
              Our Evolution: From Utilities to Orchestration
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Formatho began with a simple, uncompromising premise: developer tools should not be data liabilities. We built a suite of over 100 cryptography, formatting, and web utilities that operated strictly client-side. No server calls. No external APIs. Just clean, immediate execution. But as development workflows grew more complex, we realized that isolated utilities weren't enough. Developers needed automation, but existing AI agents required sending sensitive payloads—smart contract ABIs, proprietary logs, and unencrypted keys—to external cloud providers.
            </p>
            <p class="text-muted-foreground leading-relaxed mt-4">
              So, we evolved. Formatho is no longer just a toolkit; it is a WebAssembly-powered Multi-Agent Operating System running entirely within your browser.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 2: PHILOSOPHY — ASYMMETRICAL LAYOUT   -->
    <!-- ============================================ -->
    <section class="relative py-16 md:py-32 bg-muted/30 overflow-hidden">
      <div class="container mx-auto px-4 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          <!-- Left: Overlapping Images with Shadow -->
          <div class="relative md:col-span-7 min-h-[400px] md:min-h-[600px]">
            <img
              :src="cloudIsAtRisk"
              alt="Cloud AI is a Security Risk"
              class="absolute top-0 left-0 w-3/4 h-3/4 object-cover grayscale contrast-125 border border-foreground/10"
              loading="lazy"
            />
            <img
              :src="cloudIsAtRisk"
              alt="Cloud AI Security Shadow"
              class="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover grayscale contrast-125 border border-foreground/10 -z-10"
              loading="lazy"
            />
          </div>

          <!-- Center Floating Text -->
          <div class="md:col-span-5 relative">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              THE PROBLEM
            </p>
            <h3 class="text-3xl md:text-4xl font-black tracking-tighter leading-none mb-8">
              Cloud AI is a Security Risk
            </h3>
            <p class="text-muted-foreground leading-relaxed mb-8">
              In the Web3 and enterprise space, data privacy isn't a feature; it's the foundation. Sending sensitive system architecture or decentralized application logic to a centralized LLM breaks the zero-trust model. You shouldn't have to compromise your proprietary data just to leverage the power of AI automation.
            </p>
            <!-- Floating Statement -->
            <div class="border-l-2 border-foreground pl-6 py-2">
              <p class="text-xl md:text-2xl font-black tracking-widest leading-none">
                FORMATHO IS PRIVACY.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 3: COUNCIL — EDITORIAL SPLIT          -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32">
      <div class="container mx-auto px-4 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <!-- Left: Large Statement -->
          <div class="md:col-span-5">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              THE SOLUTION
            </p>
            <h3 class="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              Enter The<br />Council of<br />Agents
            </h3>
            <p class="text-muted-foreground leading-relaxed max-w-md">
              We have engineered a localized orchestration layer governed by our Council of Agents—a suite of specialized, local AI agents designed to automate complex developer workflows with zero server footprint.
            </p>
          </div>

          <!-- Right: Agent Roles -->
          <div class="md:col-span-7 md:border-l md:border-foreground/10 md:pl-16">
            <p class="text-sm text-muted-foreground leading-relaxed mb-10">
              Instead of manually chaining tools together, you hand your payload to the Council, where agents take on dedicated roles:
            </p>

            <div class="space-y-10">
              <!-- Agent Role 1 -->
              <div class="border-b border-foreground/10 pb-10">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">01</p>
                <h4 class="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3">
                  Data &amp; Logic Specialists
                </h4>
                <p class="text-muted-foreground leading-relaxed">
                  Handle structural transformations, data parsing, and logic extraction.
                </p>
              </div>

              <!-- Agent Role 2 -->
              <div class="border-b border-foreground/10 pb-10">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">02</p>
                <h4 class="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3">
                  Memory &amp; Routing Coordinators
                </h4>
                <p class="text-muted-foreground leading-relaxed">
                  Manage contextual state, API routing, and seamless execution.
                </p>
              </div>

              <!-- Collaboration Statement -->
              <div>
                <p class="text-muted-foreground leading-relaxed">
                  They don't just execute commands; they collaborate. They hand off formatted data, structure typescript interfaces, and decode payloads dynamically—all happening securely on your local device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 4: ECOSYSTEM — THE GRID BREAKER       -->
    <!-- ============================================ -->
    <section class="relative py-16 md:py-32 border-t border-b border-foreground/10">
      <div class="container mx-auto px-4 md:px-12">
        <div class="mb-16">
          <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
            ARCHITECTURE
          </p>
          <h3 class="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            Powered by WebAssembly.<br />Governed by Privacy.
          </h3>
        </div>

        <!-- Grid with Horizontal Dividers -->
        <div class="relative">
          <!-- Grid Breaker: Vertical Line -->
          <div
            class="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-foreground/10 -translate-x-1/2 z-10"
          ></div>

          <!-- Row 1 -->
          <div class="grid grid-cols-1 md:grid-cols-2 border-b border-foreground/10">
            <div class="py-10 md:pr-16">
              <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">01</p>
              <h4 class="text-2xl md:text-3xl font-black tracking-tighter leading-none">
                ZERO RETENTION
              </h4>
            </div>
            <div class="py-10 md:pl-16 md:border-l border-foreground/10">
              <p class="text-muted-foreground leading-relaxed">
                When you close the tab, the state is gone.
              </p>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="grid grid-cols-1 md:grid-cols-2 border-b border-foreground/10">
            <div class="py-10 md:pr-16">
              <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">02</p>
              <h4 class="text-2xl md:text-3xl font-black tracking-tighter leading-none">
                LOCAL EXECUTION
              </h4>
            </div>
            <div class="py-10 md:pl-16 md:border-l border-foreground/10">
              <p class="text-muted-foreground leading-relaxed">
                No reliance on centralized cloud APIs for core formatting and transformations.
              </p>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="py-10 md:pr-16">
              <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">03</p>
              <h4 class="text-2xl md:text-3xl font-black tracking-tighter leading-none">
                AGENTIC ARCHITECTURE
              </h4>
            </div>
            <div class="py-10 md:pl-16 md:border-l border-foreground/10">
              <p class="text-muted-foreground leading-relaxed">
                Create highly customized, local AI workflows that mirror your specific development needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 5: MARQUEE TICKER TAPE                -->
    <!-- ============================================ -->
    <section class="py-6 border-b border-foreground/10 overflow-hidden bg-muted/30">
      <div class="marquee whitespace-nowrap">
        <span class="text-sm font-medium tracking-widest text-muted-foreground">
          WASM POWERED ✧ ZERO SERVER FOOTPRINT ✧ LOCAL AUTOMATION ✧ BUILD IN PRIVATE ✧ WASM POWERED ✧ ZERO SERVER FOOTPRINT ✧ LOCAL AUTOMATION ✧ BUILD IN PRIVATE ✧ WASM POWERED ✧ ZERO SERVER FOOTPRINT ✧ LOCAL AUTOMATION ✧ BUILD IN PRIVATE ✧
        </span>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 6: FOOTER CTA                         -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32">
      <div class="container mx-auto px-4 md:px-12">
        <div class="max-w-3xl">
          <h2 class="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            Build in<br />Private.
          </h2>
          <p class="text-muted-foreground leading-relaxed max-w-xl mb-10">
            Whether you are a Web3 security researcher decoding complex tokens or an AI engineer parsing massive datasets, Formatho provides the infrastructure to build, orchestrate, and automate—completely in the dark.
          </p>
          <p class="text-2xl md:text-3xl font-black tracking-widest leading-none mb-12">
            WELCOME TO THE COUNCIL.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink
              to="/"
              class="inline-flex items-center justify-center rounded-none bg-foreground px-8 py-4 text-sm font-medium tracking-widest text-background hover:bg-foreground/90 transition-colors"
            >
              EXPLORE TOOLS
            </RouterLink>
            <a
              href="mailto:support@formatho.com"
              class="inline-flex items-center justify-center rounded-none border border-foreground/20 px-8 py-4 text-sm font-medium tracking-widest text-foreground hover:bg-muted transition-colors"
            >
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}

.marquee {
  animation: marquee-scroll 20s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}
</style>
