<script setup lang="ts">
/**
 * HeroBackground — Isolated Procedural Background Component
 *
 * Architectural constraints:
 * - Uses shallowRef for all DOM refs to bypass deep reactivity overhead
 * - SSG-safe: renders flat ultra-dark slate background during static build
 * - On client hydration: fades in opacity 0→100% over 1200ms linear
 * - Three #d1f7ff orbs drift slowly and disorderly (20s/25s/30s cycles)
 */
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

// Shallow refs — no deep reactivity tracking on DOM nodes
const container = shallowRef<HTMLElement | null>(null)
const isHydrated = shallowRef(false)

let rafId: number | null = null
let startTime = 0

/**
 * Procedural orb drift using requestAnimationFrame.
 * Each orb has its own sinusoidal path with different frequencies
 * to create disorderly, organic motion.
 */
function animateOrbs(timestamp: number) {
  if (!startTime) startTime = timestamp
  const elapsed = (timestamp - startTime) / 1000 // seconds

  const orbs = container.value?.querySelectorAll<HTMLElement>('[data-orb]')
  if (!orbs) return

  orbs.forEach((orb, i) => {
    // Different frequency and amplitude per orb for disorderly motion
    const speedX = 0.08 + i * 0.03
    const speedY = 0.06 + i * 0.025
    const ampX = 15 + i * 8
    const ampY = 12 + i * 6
    const phaseX = i * 1.7
    const phaseY = i * 2.3

    const dx = Math.sin(elapsed * speedX + phaseX) * ampX
    const dy = Math.cos(elapsed * speedY + phaseY) * ampY

    orb.style.transform = `translate(${dx}px, ${dy}px)`
  })

  rafId = requestAnimationFrame(animateOrbs)
}

onMounted(() => {
  // Trigger fade-in on next frame after hydration
  requestAnimationFrame(() => {
    isHydrated.value = true
  })

  // Start procedural drift animation
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
    SSG fallback: solid ultra-dark slate background (#0f172a)
    On hydration: fades from opacity 0 → 1 over 1200ms linear
  -->
  <div
    ref="container"
    class="absolute inset-0 overflow-hidden pointer-events-none"
    :style="{
      opacity: isHydrated ? 1 : 0,
      transition: 'opacity 1200ms linear',
      backgroundColor: '#0f172a'
    }"
  >
    <!-- Ambient spotlight overlays (lightest blue #d1f7ff) -->
    <div
      class="absolute inset-0"
      style="
        background: radial-gradient(
          circle at 50% 50%,
          rgba(209, 247, 255, 0.12) 0%,
          transparent 70%
        );
      "
    ></div>
    <div
      class="absolute inset-0"
      style="
        background: radial-gradient(
          circle at 30% 20%,
          rgba(209, 247, 255, 0.1) 0%,
          transparent 50%
        );
      "
    ></div>

    <!-- Three drifting orbs — lightest blue #d1f7ff -->
    <div
      data-orb="0"
      class="absolute rounded-full blur-3xl"
      style="
        top: -10%;
        right: -5%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, #d1f7ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="1"
      class="absolute rounded-full blur-3xl"
      style="
        bottom: -10%;
        left: -8%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, #d1f7ff 0%, transparent 70%);
      "
    ></div>
    <div
      data-orb="2"
      class="absolute rounded-full blur-3xl"
      style="
        top: 30%;
        left: 40%;
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, #d1f7ff 0%, transparent 70%);
      "
    ></div>
  </div>
</template>
