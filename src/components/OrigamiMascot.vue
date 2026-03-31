<script setup lang="ts">
/**
 * OrigamiMascot.vue
 * Global, reusable component for Formatho origami characters
 * Supports inline rendering and absolute/fixed positioning
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
  contextId: string
  // Positioning props for floating mode
  positionX?: 'left' | 'center' | 'right' | number
  positionY?: 'top' | 'center' | 'bottom' | number
  positionType?: 'fixed' | 'absolute'
  // Dismiss callback for overlay mode
  onDismiss?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  size: 'w-8 h-8',
  positionX: 'right',
  positionY: 'bottom',
  positionType: 'fixed'
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
const isMounted = ref(false)

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

// Position styles
const positionStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  // X position
  if (typeof props.positionX === 'number') {
    styles.left = `${props.positionX}px`
  } else if (props.positionX === 'left') {
    styles.left = '24px'
  } else if (props.positionX === 'center') {
    styles.left = '50%'
    styles.transform = 'translateX(-50%)'
  } else if (props.positionX === 'right') {
    styles.right = '24px'
  }
  
  // Y position
  if (typeof props.positionY === 'number') {
    styles.top = `${props.positionY}px`
  } else if (props.positionY === 'top') {
    styles.top = '24px'
  } else if (props.positionY === 'center') {
    styles.top = '50%'
    styles.transform = styles.transform ? 'translate(-50%, -50%)' : 'translateY(-50%)'
  } else if (props.positionY === 'bottom') {
    styles.bottom = '24px'
  }
  
  return styles
})

// ============================================================
// Cooldown Engine
// ============================================================
const checkCooldown = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const storageKey = `${STORAGE_PREFIX}${props.contextId}`
  const dismissedAt = localStorage.getItem(storageKey)
  
  if (!dismissedAt) return false
  
  const dismissedTimestamp = parseInt(dismissedAt, 10)
  const now = Date.now()
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  
  return (now - dismissedTimestamp) < cooldownMs
}

const dismissMascot = () => {
  if (typeof window === 'undefined') return
  
  const storageKey = `${STORAGE_PREFIX}${props.contextId}`
  localStorage.setItem(storageKey, Date.now().toString())
  isVisible.value = false
  isDismissed.value = true
  
  // Call external dismiss callback if provided
  props.onDismiss?.()
}

// ============================================================
// Lifecycle
// ============================================================
onMounted(() => {
  isMounted.value = true
  
  if (checkCooldown()) {
    isVisible.value = false
    isDismissed.value = true
  }
})
</script>

<template>
  <Transition name="twin">
    <div
      v-if="isValidCharacter && isMounted && isVisible && config && svgContent"
      :class="[
        'flex items-start gap-3 group z-50',
        positionType
      ]"
      :style="positionStyles"
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
          class="w-full h-full p-1.5"
          v-html="svgContent"
        />
      </div>

      <!-- Message Bubble (Glassmorphic) -->
      <div
        v-if="message"
        class="relative flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-lg max-w-sm"
      >
        <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        <p class="relative text-sm text-slate-200 leading-relaxed">
          <span :class="['font-semibold', config.textClass]">
            {{ character.charAt(0).toUpperCase() + character.slice(1) }}:
          </span>
          <span class="text-slate-300 ml-1">{{ message }}</span>
        </p>

        <button
          @click="dismissMascot"
          class="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-slate-800 border border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-500 transition-all duration-200 opacity-0 group-hover:opacity-100 text-xs leading-none"
          title="Dismiss for 7 days"
        >
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
:deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* Twin enter/leave animations */
.twin-enter-active {
  animation: twin-enter 0.4s ease-out;
}

.twin-leave-active {
  animation: twin-leave 0.3s ease-in;
}

@keyframes twin-enter {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes twin-leave {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}
</style>
