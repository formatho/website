<script setup lang="ts">
/**
 * HeroBackground — Isolated Procedural Background Component
 *
 * - White background with subtle #C4F4FF blurred orbs
 * - Orbs drift in a completely random, disorderly fashion
 * - Uses shallowRef for DOM refs (no deep reactivity overhead)
 * - SSG-safe: renders flat white during static build
 * - On hydration: opacity 0→100% over 1200ms linear
 */
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

const container = shallowRef<HTMLElement | null>(null)
const isHydrated = shallowRef(false)

let rafId: number | null = null
let startTime = 0

// Each orb has independent random parameters for disorderly motion
interface OrbParams {
  baseX: number
  baseY: number
  speedX: number
  speedY: number
  ampX: number
  ampY: number
  phaseX: number
  phaseY: number
  freqModX: number
  freqModY: number
}

// Pre-generate random-ish params at module load
const orbParams: OrbParams[] = [
  {
    baseX: 20,
    baseY: 15,
    speedX: 0.035,
    speedY: 0.028,
    ampX: 35,
    ampY: 28,
    phaseX: 0.7,
    phaseY: 2.1,
    freqModX: 1.3,
    freqModY: 0.9
  },
  {
    baseX: 70,
    baseY: 60,
    speedX: 0.022,
    speedY: 0.041,
    ampX: 42,
    ampY: 32,
    phaseX: 3.4,
    phaseY: 1.2,
    freqModX: 0.8,
    freqModY: 1.5
  },
  {
    baseX: 45,
    baseY: 40,
    speedX: 0.048,
    speedY: 0.019,
    ampX: 28,
    ampY: 38,
    phaseX: 1.9,
    phaseY: 4.0,
    freqModX: 1.7,
    freqModY: 0.7
  },
  {
    baseX: 85,
    baseY: 20,
    speedX: 0.029,
    speedY: 0.037,
    ampX: 38,
    ampY: 25,
    phaseX: 5.1,
    phaseY: 2.8,
    freqModX: 1.1,
    freqModY: 1.3
  },
  {
    baseX: 10,
    baseY: 75,
    speedX: 0.041,
    speedY: 0.025,
    ampX: 32,
    ampY: 35,
    phaseX: 2.3,
    phaseY: 0.5,
    freqModX: 1.4,
    freqModY: 1.0
  }
]

function animateOrbs(timestamp: number) {
  if (!startTime) startTime = timestamp
  const elapsed = (timestamp - startTime) / 1000

  const orbs = container.value?.querySelectorAll<HTMLElement>('[data-orb]')
  if (!orbs) return

  orbs.forEach((orb, i) => {
    const p = orbParams[i] || orbParams[0]

    // Multi-frequency sinusoidal motion for disorderly, organic drift
    const dx =
      Math.sin(elapsed * p.speedX * p.freqModX + p.phaseX) * p.ampX +
      Math.sin(elapsed * p.speedX * 2.3 + p.phaseX * 0.5) * (p.ampX * 0.3)
    const dy =
      Math.cos(elapsed * p.speedY * p.freqModY + p.phaseY) * p.ampY +
      Math.cos(elapsed * p.speedY * 1.7 + p.phaseY * 1.3) * (p.ampY * 0.35)

    orb.style.transform = `translate(${dx}px, ${dy}px)`
  })

  rafId = requestAnimationFrame(animateOrbs)
}

onMounted(() => {
  requestAnimationFrame(() => {
    isHydrated.value = true
  })
  rafId = requestAnimationFrame(animateOrbs)
})

onBeforeUnmount(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>

<template>
  <!--
    SSG fallback: solid white background
    On hydration: fades from opacity 0 → 1 over 1200ms linear
  -->
  <div
    ref="container"
    class="absolute inset-0 overflow-hidden pointer-events-none"
    :style="{
      opacity: isHydrated ? 1 : 0,
      transition: 'opacity 1200ms linear',
      backgroundColor: '#ffffff'
    }"
  >
    <!-- Five drifting orbs — lightest blue #C4F4FF on white -->
    <div
      data-orb="0"
      class="absolute rounded-full blur-3xl"
      style="
        top: 15%;
        left: 20%;
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, #c4f4ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="1"
      class="absolute rounded-full blur-3xl"
      style="
        top: 60%;
        left: 70%;
        width: 420px;
        height: 420px;
        background: radial-gradient(circle, #c4f4ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="2"
      class="absolute rounded-full blur-3xl"
      style="
        top: 40%;
        left: 45%;
        width: 360px;
        height: 360px;
        background: radial-gradient(circle, #c4f4ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="3"
      class="absolute rounded-full blur-3xl"
      style="
        top: 20%;
        left: 85%;
        width: 380px;
        height: 380px;
        background: radial-gradient(circle, #c4f4ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="4"
      class="absolute rounded-full blur-3xl"
      style="
        top: 75%;
        left: 10%;
        width: 340px;
        height: 340px;
        background: radial-gradient(circle, #c4f4ff 0%, transparent 70%);
      "
    ></div>
  </div>
</template>
