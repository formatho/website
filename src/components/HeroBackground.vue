<script setup lang="ts">
/**
 * HeroBackground — Procedural SVG Noise + Orb Drift Background
 *
 * Architecture:
 * - SVG feTurbulence fractal noise (4 iterations, baseFrequency 0.005)
 * - feColorMatrix maps to indigo/teal/cyan ramp
 * - CSS keyframe animation: 120s diagonal drift, scale to 150%
 * - Performance budgets: IntersectionObserver, Page Visibility, Network Information
 * - Memory lifecycle: explicit teardown of all observers, listeners, DOM refs
 * - Vestibular safety: respects prefers-reduced-motion
 * - Hostile recovery: static fallback crossfade on render failure
 * - SSG-safe: flat white fallback, hydrates on client over 1200ms linear
 * - Uses shallowRef for all DOM refs (no deep reactivity overhead)
 */
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'

const container = shallowRef<HTMLElement | null>(null)
const heroSection = shallowRef<HTMLElement | null>(null)
const isHydrated = shallowRef(false)
const isPaused = shallowRef(false)
const isReducedData = shallowRef(false)
const isReducedMotion = shallowRef(false)
const isFallbackImage = shallowRef(false)

let rafId: number | null = null
let startTime = 0
let intersectionObserver: IntersectionObserver | null = null
let visibilityHandler: ((e: Event) => void) | null = null
let motionHandler: ((e: MediaQueryListEvent) => void) | null = null
let renderCheckTimer: ReturnType<typeof setTimeout> | null = null

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
  if (rafId === null && !isReducedMotion.value && !isReducedData.value) {
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
  if (paused || isReducedMotion.value || isReducedData.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

/**
 * Hostile Environment Recovery
 * Detects if the device is too underpowered to render SVG filters.
 * Uses a simple render timing check — if a single rAF takes >100ms,
 * the device is struggling. Falls back to static image.
 */
function checkRenderPerformance() {
  const start = performance.now()
  requestAnimationFrame(() => {
    const duration = performance.now() - start
    // If frame time exceeds 100ms (less than 10fps), device is underpowered
    if (duration > 100) {
      triggerFallbackImage()
    }
  })
}

function triggerFallbackImage() {
  if (isFallbackImage.value) return
  isFallbackImage.value = true
  stopAnimation()
  // Crossfade handled by CSS transition on the fallback image
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

  // Check vestibular motion safety (prefers-reduced-motion)
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion.value = motionQuery.matches

  // Listen for changes to reduced motion preference
  motionHandler = (e: MediaQueryListEvent) => {
    isReducedMotion.value = e.matches
    if (e.matches) {
      // Freeze: stop all animation, show static first frame
      stopAnimation()
    } else if (!isReducedData.value) {
      startAnimation()
    }
  }
  motionQuery.addEventListener('change', motionHandler)

  // Only start heavy animations if not reduced data/motion
  if (!isReducedData.value && !isReducedMotion.value) {
    startAnimation()
  }

  // Viewport Intersection: pause when hero is 200px out of view
  heroSection.value = container.value?.closest('section') || null
  if (heroSection.value && 'IntersectionObserver' in window) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
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

  // Hostile environment check: after 2s, test render performance
  renderCheckTimer = setTimeout(() => {
    if (!isReducedData.value && !isReducedMotion.value) {
      checkRenderPerformance()
    }
  }, 2000)
})

onBeforeUnmount(() => {
  // === TEARDOWN PROTOCOL ===
  // Explicitly disconnect IntersectionObserver
  stopAnimation()
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }

  // Remove tab visibility listener
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }

  // Remove reduced motion listener
  if (motionHandler) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.removeEventListener('change', motionHandler)
    motionHandler = null
  }

  // Clear render check timer
  if (renderCheckTimer) {
    clearTimeout(renderCheckTimer)
    renderCheckTimer = null
  }

  // Nullify all DOM references for garbage collection
  container.value = null
  heroSection.value = null
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
    <!-- Inline SVG fractal noise filter definitions -->
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
      Reduced data mode: static gradient fallback
      Ethical data constraint: no SVG noise, no orbs, no JS animation
    -->
    <div
      v-if="isReducedData"
      class="absolute inset-0"
      style="background: linear-gradient(135deg, #ffffff 0%, #e0f7ff 50%, #ffffff 100%)"
    ></div>

    <!--
      Normal / reduced-motion / fallback modes
    -->
    <template v-else>
      <!-- SVG noise layer: frozen if reduced motion, animated otherwise -->
      <div
        v-if="!isFallbackImage"
        class="absolute inset-0 hero-noise-layer"
        :style="{
          animationPlayState: isPaused || isReducedMotion ? 'paused' : 'running',
          filter: 'url(#hero-noise)'
        }"
      ></div>

      <!--
        Hostile Environment Recovery: ultra-optimized static fallback
        Crossfades in over 400ms when device is underpowered
      -->
      <div
        v-if="isFallbackImage"
        class="absolute inset-0 hero-fallback-image"
        style="
          background: linear-gradient(135deg, #ffffff 0%, #c4f4ff 30%, #e0f7ff 60%, #ffffff 100%);
          opacity: 0;
          animation: hero-fallback-fade 400ms ease-out forwards;
        "
      ></div>

      <!-- Orb drift layer — hidden if reduced motion or fallback -->
      <template v-if="!isReducedMotion && !isFallbackImage">
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
    </template>
  </div>
</template>
