<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background"
    >
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div class="container mx-auto px-4 py-16 md:py-24 relative">
        <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold tracking-tight gradient-text leading-tight">
            About Formatho: The Privacy-First Digital Twin OS
          </h1>
        </div>
      </div>
    </section>

    <!-- Section 1: Our Evolution -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto">
        <Card>
          <CardHeader class="pb-6">
            <CardTitle class="text-3xl md:text-4xl font-bold tracking-tight">
              Our Evolution: From Utilities to Orchestration
            </CardTitle>
          </CardHeader>
          <CardContent class="prose prose-lg text-muted-foreground space-y-4">
            <p>
              Formatho began with a simple, uncompromising premise: developer tools should not be data liabilities. We built a suite of over 100 cryptography, formatting, and web utilities that operated strictly client-side. No server calls. No external APIs. Just clean, immediate execution. But as development workflows grew more complex, we realized that isolated utilities weren't enough. Developers needed automation, but existing AI agents required sending sensitive payloads—smart contract ABIs, proprietary logs, and unencrypted keys—to external cloud providers.
            </p>
            <p>
              So, we evolved. Formatho is no longer just a toolkit; it is a WebAssembly-powered Multi-Agent Operating System running entirely within your browser.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Section 2: The Problem -->
    <section class="container mx-auto px-4 py-16 md:py-24 bg-muted/30">
      <div class="max-w-4xl mx-auto">
        <Card>
          <CardHeader class="pb-6">
            <CardTitle class="text-3xl md:text-4xl font-bold tracking-tight">
              The Problem: Cloud AI is a Security Risk
            </CardTitle>
          </CardHeader>
          <CardContent class="prose prose-lg text-muted-foreground space-y-4">
            <p>
              In the Web3 and enterprise space, data privacy isn't a feature; it's the foundation. Sending sensitive system architecture or decentralized application logic to a centralized LLM breaks the zero-trust model. You shouldn't have to compromise your proprietary data just to leverage the power of AI automation.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Section 3: The Solution - Council of Agents -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-4xl mx-auto">
        <Card>
          <CardHeader class="pb-6">
            <CardTitle class="text-3xl md:text-4xl font-bold tracking-tight">
              The Solution: Enter The Council of Agents
            </CardTitle>
          </CardHeader>
          <CardContent class="prose prose-lg text-muted-foreground space-y-4">
            <p>
              We have engineered a localized orchestration layer governed by our Council of Agents—a suite of specialized, local AI agents designed to automate complex developer workflows with zero server footprint.
            </p>
            <p>
              Instead of manually chaining tools together, you hand your payload to the Council, where agents take on dedicated roles:
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg">Data &amp; Logic Specialists</span>
                <span>handle structural transformations, data parsing, and logic extraction.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg">Memory &amp; Routing Coordinators</span>
                <span>manage contextual state, API routing, and seamless execution.</span>
              </li>
            </ul>
            <p>
              They don't just execute commands; they collaborate. They hand off formatted data, structure typescript interfaces, and decode payloads dynamically—all happening securely on your local device.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Section 4: Powered by WebAssembly -->
    <section class="container mx-auto px-4 py-16 md:py-24 bg-muted/30">
      <div class="max-w-4xl mx-auto">
        <Card>
          <CardHeader class="pb-6">
            <CardTitle class="text-3xl md:text-4xl font-bold tracking-tight">
              Powered by WebAssembly. Governed by Privacy.
            </CardTitle>
          </CardHeader>
          <CardContent class="prose prose-lg text-muted-foreground space-y-6">
            <p>
              Formatho is built on the belief that the browser is the ultimate secure sandbox. By leveraging WebAssembly, we bring enterprise-grade processing power directly to your local environment.
            </p>

            <ul class="space-y-6">
              <li class="flex gap-4 p-6 rounded-xl bg-background/50 border border-border/30">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <span class="text-primary font-bold">🔒</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-1">Zero-Data Retention</h3>
                  <p>When you close the tab, the state is gone.</p>
                </div>
              </li>
              <li class="flex gap-4 p-6 rounded-xl bg-background/50 border border-border/30">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <span class="text-primary font-bold">🌐</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-1">Decentralized Execution</h3>
                  <p>No reliance on centralized cloud APIs for core formatting and transformations.</p>
                </div>
              </li>
              <li class="flex gap-4 p-6 rounded-xl bg-background/50 border border-border/30">
                <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <span class="text-primary font-bold">🤖</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-foreground mb-1">Agentic Architecture</h3>
                  <p>Create highly customized, local AI workflows that mirror your specific development needs.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-16 md:py-24">
      <div class="max-w-3xl mx-auto text-center">
        <Card>
          <CardContent class="p-8 md:p-12 space-y-6">
            <h2 class="text-3xl md:text-4xl font-bold">Build in Private.</h2>
            <p class="text-lg text-muted-foreground max-w-xl mx-auto">
              Whether you are a Web3 security researcher decoding complex tokens or an AI engineer parsing massive datasets, Formatho provides the infrastructure to build, orchestrate, and automate—completely in the dark.
            </p>
            <p class="text-2xl font-semibold text-foreground">
              Welcome to the Council.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <RouterLink
                to="/"
                class="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Explore Our Tools
              </RouterLink>
              <a
                href="mailto:support@formatho.com"
                class="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
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
</style>
