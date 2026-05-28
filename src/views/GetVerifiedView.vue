<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-20">
    <!-- Badge -->
    <div class="inline-flex items-center gap-2 border border-foreground rounded-full px-4 py-2 mb-8">
      <span class="text-[11px] font-bold tracking-[2px] uppercase">🔐 Verification</span>
    </div>

    <!-- Main Heading -->
    <h1 class="text-5xl md:text-7xl font-black tracking-tight text-center mb-6">
      Get <span class="gradient-text">Verified</span>
    </h1>

    <!-- Subheading -->
    <p class="text-lg md:text-xl text-muted-foreground max-w-2xl text-center mb-12">
      We're building something trustworthy. A verification system that proves you are who you say you are — privacy-first, no middlemen.
    </p>

    <!-- Coming Soon Card -->
    <div class="border-2 border-foreground rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
      <!-- Decorative corner marks -->
      <div class="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground"></div>
      <div class="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground"></div>
      <div class="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground"></div>
      <div class="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground"></div>

      <!-- Icon -->
      <div class="text-6xl mb-6">🏗️</div>

      <h2 class="text-2xl md:text-3xl font-black tracking-tight mb-4">Coming Soon</h2>

      <p class="text-muted-foreground text-sm leading-relaxed mb-8">
        We're building the verification system from the ground up. It'll be worth the wait — trustless, private, and built for developers.
      </p>

      <!-- Status indicators -->
      <div class="space-y-3 text-left max-w-xs mx-auto mb-8">
        <div class="flex items-center gap-3 text-sm">
          <span class="text-green-500 font-mono">✓</span>
          <span>Privacy-first identity verification</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="text-green-500 font-mono">✓</span>
          <span>No personal data stored on servers</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="text-green-500 font-mono">✓</span>
          <span>Developer-friendly API & integrations</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="text-yellow-500 font-mono">◷</span>
          <span class="text-muted-foreground">Currently in development</span>
        </div>
      </div>

      <!-- Pulse indicator -->
      <div class="flex items-center justify-center gap-2 text-xs font-mono tracking-wider uppercase text-muted-foreground">
        <span class="inline-block w-2 h-2 rounded-full bg-foreground animate-pulse"></span>
        Under Construction
      </div>
    </div>

    <!-- Back Link -->
    <RouterLink
      to="/"
      class="mt-12 text-[13px] font-semibold tracking-[1.5px] uppercase text-foreground hover:underline hover:underline-offset-[6px] decoration-2 transition-all"
    >
      ← Back to Tools
    </RouterLink>
  </div>
</template>
