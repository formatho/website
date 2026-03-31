<script setup lang="ts">
/**
 * OrigamiMascot.vue
 * Global, reusable component for Formatho origami characters
 * Enforces "Invisible Mascot Rule" with strict sizing and 7-day contextual cooldowns
 */
import { ref, computed, onMounted } from 'vue'
import { mascotSvgs, type MascotName } from '@/assets/mascot-assets'

// ============================================================
// Props Definition
// ============================================================
interface Props {
  character: MascotName
  message: string
  size?: string
  contextId: string // Required for cooldown tracking
}

const props = withDefaults(defineProps<Props>(), {
  size: 'w-8 h-8'
})

// ============================================================
// Cooldown Configuration
// ============================================================
const COOLDOWN_DAYS = 7
const STORAGE_PREFIX = 'formatho-mascot-dismissed-'

// ============================================================
// Reactive State
// ============================================================
const isVisible = ref(true)
const isDismissed = ref(false)
const isMounted = ref(false) // SSR safety: don't render until mounted

// ============================================================
// Character Configuration
// ============================================================
interface CharacterConfig {
  color: string
  bgClass: string
  textClass: string
  borderClass: string
  animationClass: string
  glowClass: string
}

const characterConfigs: Record<MascotName, CharacterConfig> = {
  flowtho: {
    color: 'cyan',
    bgClass: 'bg-cyan-500/10',
    textClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/20',
    animationClass: 'animate-wave-breathe',
    glowClass: 'shadow-cyan-500/20'
  },
  morpho: {
    color: 'violet',
    bgClass: 'bg-violet-500/10',
    textClass: 'text-violet-400',
    borderClass: 'border-violet-500/20',
    animationClass: 'animate-fox-morph',
    glowClass: 'shadow-violet-500/20'
  },
  memo: {
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    animationClass: 'animate-memory-pulse',
    glowClass: 'shadow-amber-500/20'
  },
  nexo: {
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    animationClass: 'animate-crane-flap',
    glowClass: 'shadow-emerald-500/20'
  },
  halo: {
    color: 'rose',
    bgClass: 'bg-rose-500/10',
    textClass: 'text-rose-400',
    borderClass: 'border-rose-500/20',
    animationClass: 'animate-dove-glow',
    glowClass: 'shadow-rose-500/20'
  }
}

// ============================================================
// Computed Properties
// ============================================================
const isValidCharacter = computed(() => {
  return Object.keys(characterConfigs).includes(props.character)
})

const config = computed<CharacterConfig | null>(() => {
  if (!isValidCharacter.value) return null
  return characterConfigs[props.character]
})

const svgContent = computed<string | null>(() => {
  if (!isValidCharacter.value) return null
  return mascotSvgs[props.character] || null
})

// ============================================================
// Cooldown Engine
// ============================================================
/**
 * Check if this context was dismissed within the cooldown period
 * Uses localStorage to persist dismissal timestamps
 * SSR-safe: checks for window availability
 */
const checkCooldown = (): boolean => {
  // SSR guard - localStorage only available in browser
  if (typeof window === 'undefined') return false
  
  const storageKey = `${STORAGE_PREFIX}${props.contextId}`
  const dismissedAt = localStorage.getItem(storageKey)
  
  if (!dismissedAt) return false
  
  const dismissedTimestamp = parseInt(dismissedAt, 10)
  const now = Date.now()
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  
  return (now - dismissedTimestamp) < cooldownMs
}

/**
 * Dismiss the mascot and store timestamp in localStorage
 * SSR-safe: checks for window availability
 */
const dismissMascot = () => {
  // SSR guard
  if (typeof window === 'undefined') return
  
  const storageKey = `${STORAGE_PREFIX}${props.contextId}`
  localStorage.setItem(storageKey, Date.now().toString())
  isVisible.value = false
  isDismissed.value = true
}

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
  // SSR safety: mark as mounted before any client-side logic
  isMounted.value = true
  
  // Check cooldown on mount - hide if recently dismissed
  if (checkCooldown()) {
    isVisible.value = false
    isDismissed.value = true
  }
})
</script>

<template>
  <!-- Graceful failure: render nothing for invalid character or dismissed context -->
  <!-- SSR safety: don't render until client-side mounted -->
  <div
    v-if="isValidCharacter && isMounted && isVisible && config && svgContent"
    class="flex items-start gap-3 group"
  >
    <!-- Mascot Icon Container -->
    <div
      :class="[
        'flex-shrink-0 flex items-center justify-center rounded-lg transition-all duration-300',
        'border shadow-sm',
        config.bgClass,
        config.borderClass,
        config.glowClass,
        config.animationClass,
        size
      ]"
    >
      <!-- Dynamic SVG Rendering -->
      <div
        :class="['w-full h-full p-1.5', config.textClass]"
        v-html="svgContent"
      />
    </div>

    <!-- Message Bubble (Glassmorphic) -->
    <div
      v-if="message"
      class="relative flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-lg"
    >
      <!-- Premium Glass Effect Overlay -->
      <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <!-- Message Text -->
      <p class="relative text-sm text-slate-200 leading-relaxed">
        <!-- Character name highlight -->
        <span :class="['font-semibold', config.textClass]">
          {{ character.charAt(0).toUpperCase() + character.slice(1) }}:
        </span>
        <span class="text-slate-300 ml-1">{{ message }}</span>
      </p>

      <!-- Dismiss Button -->
      <button
        @click="dismissMascot"
        class="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 opacity-0 group-hover:opacity-100 text-xs leading-none"
        title="Dismiss for 7 days"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Ensure SVG inherits color properly */
:deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* Smooth fade-out animation */
.group {
  transition: opacity 0.3s ease;
}
</style>
