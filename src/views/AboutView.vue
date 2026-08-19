<script setup lang="ts">
import { RouterLink } from 'vue-router'
import cloudIsAtRisk from '@/assets/cloud-is-at-risk.png'
import { useSEO } from '@/composables/useSEO'

useSEO({
  title: 'About Formatho - Privacy-First Developer Tools',
  description: 'Learn about Formatho: building free, privacy-first developer tools that run entirely in your browser. No tracking, no data collection, no server-side processing.',
  keywords: ['about formatho', 'privacy first', 'developer tools company', 'open source', 'client-side tools'],
  ogType: 'website'
})
</script>

<template>
  <div class="min-h-screen overflow-x-hidden">
    <!-- ============================================ -->
    <!-- SECTION 1: HERO — Z-INDEX STACKING           -->
    <!-- ============================================ -->
    <section class="relative min-h-screen flex items-center overflow-hidden bg-background -mt-16">
      <!-- Layer 0: Massive Background Typography -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1
          class="text-[18vw] md:text-[14vw] font-black tracking-tighter leading-none text-foreground/[0.04] whitespace-nowrap"
        >
          PRIVACY FIRST
        </h1>
      </div>

      <!-- Layer 0b: Secondary bleed text -->
      <div class="absolute bottom-0 left-0 right-0 pointer-events-none select-none z-0">
        <p
          class="text-[6vw] md:text-[4vw] font-black tracking-tighter leading-none text-foreground/[0.03] whitespace-nowrap -mb-4"
        >
          100+ DEVELOPER TOOLS ✧ ZERO UPLOADS ✧ NO SIGN-UPS
        </p>
      </div>

      <!-- Layer 1: Central Abstract 3D Placeholder -->
      <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div class="w-48 h-48 md:w-72 md:h-72 border border-foreground/10 rounded-sm rotate-45 opacity-20"></div>
        <div class="absolute w-32 h-32 md:w-52 md:h-52 border border-foreground/5 rounded-sm rotate-12 opacity-10"></div>
      </div>

      <!-- Layer 3: Content Grid -->
      <div class="relative z-20 container mx-auto px-4 md:px-12 py-16 md:py-24 w-full">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end min-h-[70vh]">
          <!-- Left Column: Title -->
          <div class="md:col-span-7">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-6">
              ABOUT FORMATHO
            </p>
            <h2 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-foreground">
              The Privacy-First<br />Developer Toolkit
            </h2>
          </div>

          <!-- Right Column: Our Evolution -->
          <div class="md:col-span-5 md:border-l md:border-foreground/10 md:pl-12">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              WHY WE BUILT THIS
            </p>
            <h3 class="text-2xl md:text-3xl font-bold tracking-tight leading-tight mb-6">
              Our Premise: Tools Should Not Be Data Liabilities
            </h3>
            <p class="text-muted-foreground leading-relaxed">
              Formatho began with a simple, uncompromising premise: developer tools should not be data liabilities. Every day, developers paste production JWTs, smart contract ABIs, private keys, and proprietary configs into random websites that upload everything to a server. We built the alternative: over 100 cryptography, formatting, conversion, and web utilities that run strictly client-side. No server calls. No external APIs. Just clean, immediate execution.
            </p>
            <p class="text-muted-foreground leading-relaxed mt-4">
              That premise still governs every tool we ship. Nothing you enter is uploaded, logged, or stored. When you close the tab, it is gone.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 2: PHILOSOPHY — ASYMMETRICAL LAYOUT   -->
    <!-- Layout: Left overlapping images, right soft-  -->
    <!-- focus image, center floating text              -->
    <!-- ============================================ -->
    <section class="relative py-16 md:py-32 bg-muted/30">
      <div class="container mx-auto px-4 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

          <!-- Left: Main Image -->
          <div class="relative md:col-span-4 min-h-[400px] md:min-h-[600px]">
            <img
              :src="cloudIsAtRisk"
              alt="Cloud AI is a Security Risk"
              class="absolute inset-0 w-full h-full object-cover border border-foreground/10"
              style="filter: grayscale(100%) contrast(120%);"
              loading="lazy"
            />
          </div>

          <!-- Right: Soft-focus Image -->
          <div class="relative md:col-span-3 min-h-[300px] hidden md:block">
            <img
              :src="cloudIsAtRisk"
              alt="Privacy risk soft focus"
              class="absolute inset-0 w-full h-full object-cover border border-foreground/10"
              style="filter: grayscale(100%) blur(4px); opacity: 0.3;"
              loading="lazy"
            />
          </div>

          <!-- Text -->
          <div class="md:col-span-5 relative">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              THE PROBLEM
            </p>
            <h3 class="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              Your Data Shouldn't<br />Leave the Browser
            </h3>
            <p class="text-muted-foreground leading-relaxed mb-8">
              Most free online tools are free for a reason: your input becomes their data. The JSON you validate, the token you decode, the key you generate — it all hits their servers. For security researchers, Web3 developers, and anyone handling production data, that is an unacceptable trade-off. The browser is powerful enough to do all of this locally. So we do.
            </p>
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
    <!-- SECTION 3: TOOLKIT — EDITORIAL SPLIT         -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32">
      <div class="container mx-auto px-4 md:px-12">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <!-- Left: Large Statement -->
          <div class="md:col-span-4">
            <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
              WHAT WE BUILT
            </p>
            <h3 class="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              One Hundred<br />Tools. Zero<br />Servers.
            </h3>
            <p class="text-muted-foreground leading-relaxed max-w-md">
              A complete developer toolkit that treats your browser as the only server it will ever need — organized into focused categories, all free, with no account required.
            </p>
          </div>

          <!-- Right: Agent Roles -->
          <div class="md:col-span-8 md:border-l md:border-foreground/10 md:pl-16">
            <p class="text-sm text-muted-foreground leading-relaxed mb-10">
              Every category solves a real part of the developer workflow, locally:
            </p>

            <div class="space-y-10">
              <!-- Agent Role 1 -->
              <div class="border-b border-foreground/10 pb-10">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">01</p>
                <h4 class="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3">
                  Data &amp; Logic Tools
                </h4>
                <p class="text-muted-foreground leading-relaxed">
                  Formatters, validators, and converters for JSON, YAML, SQL, XML, TOML, and Markdown.
                </p>
              </div>

              <!-- Agent Role 2 -->
              <div class="border-b border-foreground/10 pb-10">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">02</p>
                <h4 class="text-xl md:text-2xl font-bold tracking-tight leading-tight mb-3">
                  Crypto &amp; Security Tools
                </h4>
                <p class="text-muted-foreground leading-relaxed">
                  Hashing, encryption, JWT inspection, and password analysis using real cryptographic libraries in your browser.
                </p>
              </div>

              <!-- Collaboration Statement -->
              <div>
                <p class="text-muted-foreground leading-relaxed">
                  Plus a deep Web3 and blockchain suite: Keccak-256 hashing, ABI encoding, EVM unit conversion, multi-chain key derivation, and Solidity compilation — all client-side, so keys and payloads never leave your machine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 4: ECOSYSTEM — THE GRID BREAKER       -->
    <!-- Central vertical line bleeds across horizontal -->
    <!-- ============================================ -->
    <section class="relative py-16 md:py-32 border-t border-b border-foreground/10">
      <div class="container mx-auto px-4 md:px-12">
        <div class="mb-16">
          <p class="text-xs font-medium tracking-widest text-muted-foreground mb-4">
            ARCHITECTURE
          </p>
          <h3 class="text-3xl md:text-5xl font-black tracking-tighter leading-none">
            Runs in Your Browser.<br />Governed by Privacy.
          </h3>
        </div>

        <!-- Grid with Horizontal Dividers + Central Vertical Line -->
        <div class="relative">
          <!-- Grid Breaker: Vertical Line -->
          <div class="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-foreground/10 -translate-x-1/2 z-10"></div>

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
                NO STRINGS ATTACHED
              </h4>
            </div>
            <div class="py-10 md:pl-16 md:border-l border-foreground/10">
              <p class="text-muted-foreground leading-relaxed">
                No accounts, no sign-ups, no usage limits. Tool inputs are never stored or transmitted.
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
          100+ TOOLS ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧ 100+ TOOLS ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧ 100+ TOOLS ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧
        </span>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SECTION 6: FOOTER CTA                         -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32">
      <div class="container mx-auto px-4 md:px-12">
        <div class="max-w-3xl">
          <h2 class="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-none mb-8">
            Build in<br />Private.
          </h2>
          <p class="text-muted-foreground leading-relaxed max-w-xl mb-10">
            Whether you are a Web3 security researcher decoding complex tokens or a backend engineer parsing production payloads, Formatho gives you 100+ tools that treat your browser as the only server.
          </p>
          <p class="text-2xl md:text-3xl font-black tracking-widest leading-none mb-12">
            WELCOME TO FORMATHO.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <RouterLink
              to="/"
              class="inline-flex items-center justify-center rounded-xl bg-foreground px-8 py-4 text-sm font-medium tracking-widest text-background hover:bg-foreground/90 transition-colors"
            >
              EXPLORE TOOLS
            </RouterLink>
            <a
              href="mailto:support@formatho.com"
              class="inline-flex items-center justify-center rounded-xl border border-foreground/20 px-8 py-4 text-sm font-medium tracking-widest text-foreground hover:bg-muted transition-colors"
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
