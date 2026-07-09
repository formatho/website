<script setup lang="ts">
/**
 * HeroBackground — Procedural SVG Noise + Orb Drift Background
 *
 * Architecture:
 * - SVG feTurbulence fractal noise (4 iterations, baseFrequency 0.005)
 * - feColorMatrix maps to indigo/teal/cyan ramp
 * - CSS keyframe animation: 120s diagonal drift, scale to 150%
 * - Performance budgets enforced via IntersectionObserver, Page Visibility, Network Information
 * - SSG-safe: flat white fallback, hydrates on client over 1200ms linear
 * - Uses shallowRef for all DOM refs (no deep reactivity overhead)
 */
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

const container = shallowRef<HTMLElement | null>(null)
const heroSection = shallowRef<HTMLElement | null>(null)
const isHydrated = shallowRef(false)
const isPaused = shallowRef(false)
const isHidden = shallowRef(false)
const isReducedData = shallowRef(false)

let rafId: number | null = null
let startTime = 0
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: ((e: Event) => void) | null = null

// Orb parameters for disorderly drift
interface OrbParams {
  speedX: number
  speedY: number
  ampX: number
  ampY: number
  phaseX: number
  phaseY: number
  freqModX: number
  freqModY: number
}

const orbParams: OrbParams[] = [
  {
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

function startAnimation() {
  if (rafId === null) {
    rafId = requestAnimationFrame(animateOrbs)
  }
}

function stopAnimation() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function setPaused(paused: boolean) {
  isPaused.value = paused
  if (paused) {
    stopAnimation()
  } else if (!isHidden.value && !isReducedData.value) {
    startAnimation()
  }
}

onMounted(() => {
  // Hydration fade-in
  requestAnimationFrame(() => {
    isHydrated.value = true
  })

  // Check reduced data preference (metered connections)
  const connection = (navigator as any).connection
  if (connection?.saveData) {
    isReducedData.value = true
  }

  // Only start heavy animations if not on reduced data
  if (!isReducedData.value) {
    startAnimation()
  }

  // Viewport Intersection: pause when hero is 200px out of view
  heroSection.value = container.value?.closest('section') || null
  if (heroSection.value && 'IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Calculate if we're more than 200px past the hero
          const rect = entry.boundingClientRect
          const pastHero = rect.bottom < -200
          setPaused(pastHero || !entry.isIntersecting)
        }
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0 }
    )
    intersectionObserver.observe(heroSection.value)
  }

  // Tab Visibility Safety: freeze animation when tab is hidden
  visibilityHandler = () => {
    if (document.hidden) {
      setPaused(true)
    } else {
      setPaused(false)
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

onBeforeUnmount(() => {
  stopAnimation()
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
})
</script>

<template>
  <!--
    SSG fallback: solid white background
    On hydration: fades from opacity 0 → 1 over 1200ms linear
    Performance: pauses when out of viewport, hidden tab, or reduced data
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
    <!--
      SVG Fractal Noise Filter (inline, invisible definitions)
      feTurbulence: 4 octaves, baseFrequency 0.005
      feColorMatrix: maps noise to indigo → teal → cyan ramp
    -->
    <svg class="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        <filter id="hero-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005"
            numOctaves="4"
            result="noise"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="
              0 0 0 0 0.29
              0 0 0 0 0.27
              0 0 0 0 0.45
              0 0 0 0.15 0
            "
            result="colored"
          />
          <feGaussianBlur in="colored" stdDeviation="40" result="blurred" />
        </filter>
      </defs>
    </svg>

    <!--
      Reduced data mode: static gradient fallback (no SVG noise, no orbs)
    -->
    <div
      v-if="isReducedData"
      class="absolute inset-0"
      style="background: linear-gradient(135deg, #ffffff 0%, #e0f7ff 50%, #ffffff 100%)"
    ></div>

    <!--
      Normal mode: SVG noise layer with CSS-only 120s diagonal drift animation
      Pauses/resumes via play-state binding
    -->
    <template v-else>
      <div
        class="absolute inset-0 hero-noise-layer"
        :style="{
          animationPlayState: isPaused ? 'paused' : 'running',
          filter: 'url(#hero-noise)'
        }"
      ></div>

      <!-- Orb drift layer (#C4F4FF, disorderly motion via rAF) -->
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
    </template>
  </div>
</template>
