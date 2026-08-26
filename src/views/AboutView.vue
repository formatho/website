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
          DEVELOPER TOOLS ✧ ZERO UPLOADS ✧ NO SIGN-UPS
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
              WHO IT'S FOR
            </p>
            <h3 class="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
              Developer Tools.<br />Zero<br />Servers.
            </h3>
            <p class="text-muted-foreground leading-relaxed max-w-md">
              A complete developer toolkit that treats your browser as the only server it will ever need. Whatever stack you build on, there is a Formatho tool in your workflow.
            </p>
          </div>

          <!-- Right: Agent Roles -->
          <div class="md:col-span-8 md:border-l md:border-foreground/10 md:pl-16">
            <p class="text-sm text-muted-foreground leading-relaxed mb-8">
              Whatever your stack, the tools are already here — free, private, and one click away:
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">01</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">Ethereum & Web3</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">ABI calls, address safety, and unit math — keys never leave your machine.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/keccak256" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Keccak-256</RouterLink>
                  <RouterLink to="/tools/abi-encoder" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">ABI Encoder</RouterLink>
                  <RouterLink to="/tools/address-checksum" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">EIP-55 Checksum</RouterLink>
                  <RouterLink to="/tools/evm-converter" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Wei / Gwei / ETH</RouterLink>
                </div>
              </div>

              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">02</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">Kubernetes & DevOps</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">Manifests, Helm values, and cron schedules that lint and convert instantly.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/yaml-lint" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">YAML Linter</RouterLink>
                  <RouterLink to="/tools/json-yaml" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">JSON ↔ YAML</RouterLink>
                  <RouterLink to="/tools/docker-run-to-compose" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Docker → Compose</RouterLink>
                  <RouterLink to="/tools/crontab-generator" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Cron Builder</RouterLink>
                </div>
              </div>

              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">03</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">SAP & Enterprise Integration</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">PI/PO payloads, API responses, and exports business users can open.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/xml-formatter" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">XML Formatter</RouterLink>
                  <RouterLink to="/tools/json-lint" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">JSON Validator</RouterLink>
                  <RouterLink to="/tools/json-csv" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">JSON → CSV</RouterLink>
                  <RouterLink to="/tools/jwt" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">JWT Decoder</RouterLink>
                </div>
              </div>

              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">04</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">Security Engineers</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">Hash, encrypt, and audit credentials with zero server exposure.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/hash-text" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Argon2 / Bcrypt</RouterLink>
                  <RouterLink to="/tools/encryption" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">AES Encrypt</RouterLink>
                  <RouterLink to="/tools/rsa-key-pair-generator" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">RSA Keygen</RouterLink>
                  <RouterLink to="/tools/password-strength-analyser" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Password Audit</RouterLink>
                </div>
              </div>

              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">05</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">Data & Backend Engineers</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">SQL you can read, schemas you can see, and data you can move.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/sql" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">SQL Formatter</RouterLink>
                  <RouterLink to="/tools/sql-to-er-diagram" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">SQL → ER Diagram</RouterLink>
                  <RouterLink to="/tools/json-diff" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">JSON Diff</RouterLink>
                  <RouterLink to="/tools/uuid" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">UUID Generator</RouterLink>
                </div>
              </div>

              <div class="border border-foreground/10 rounded-lg p-6">
                <p class="text-xs font-medium tracking-widest text-muted-foreground mb-2">06</p>
                <h4 class="text-lg font-bold tracking-tight leading-tight mb-2">AI & LLM Engineers</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mb-4">Count tokens privately and render agent-generated diagrams.</p>
                <div class="flex flex-wrap gap-2">
                  <RouterLink to="/tools/local-token-counter" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Token Counter</RouterLink>
                  <RouterLink to="/tools/mermaid-viewer" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Mermaid Viewer</RouterLink>
                  <RouterLink to="/tools/markdown" class="text-xs font-medium px-2.5 py-1 border border-foreground/15 rounded-full hover:border-foreground/40 hover:bg-muted transition-colors">Markdown Editor</RouterLink>
                </div>
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
          FREE FOREVER ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧ FREE FOREVER ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧ FREE FOREVER ✧ ZERO UPLOADS ✧ NO SIGN-UPS ✧ BUILD IN PRIVATE ✧
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
            Whether you are a Web3 security researcher decoding complex tokens or a backend engineer parsing production payloads, Formatho gives you tools that treat your browser as the only server.
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
