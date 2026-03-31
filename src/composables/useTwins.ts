/**
 * useTwins Composable
 * Global state management for Formatho Digital Twins
 * Allows dynamic summoning and dismissal of mascot notifications from any component
 */
import { ref, computed } from 'vue'
import type { MascotName } from '@/assets/mascot-assets'

// ============================================================
// Types
// ============================================================
export interface TwinPosition {
  x: 'left' | 'center' | 'right' | number
  y: 'top' | 'center' | 'bottom' | number
  type: 'fixed' | 'absolute'
}

export interface TwinSummon {
  id: string
  character: MascotName
  message: string
  contextId: string
  position: TwinPosition
  timestamp: number
}

// ============================================================
// Reactive State (Singleton)
// ============================================================
const activeTwins = ref<TwinSummon[]>([])

// ============================================================
// Cooldown Configuration
// ============================================================
const COOLDOWN_DAYS = 7
const STORAGE_PREFIX = 'formatho-twin-dismissed-'

// ============================================================
// Helper Functions
// ============================================================
const checkCooldown = (contextId: string): boolean => {
  if (typeof window === 'undefined') return false
  
  const storageKey = `${STORAGE_PREFIX}${contextId}`
  const dismissedAt = localStorage.getItem(storageKey)
  
  if (!dismissedAt) return false
  
  const dismissedTimestamp = parseInt(dismissedAt, 10)
  const now = Date.now()
  const cooldownMs = COOLDOWN_DAYS * 24 * 60 * 60 * 1000
  
  return (now - dismissedTimestamp) < cooldownMs
}

const setDismissed = (contextId: string) => {
  if (typeof window === 'undefined') return
  
  const storageKey = `${STORAGE_PREFIX}${contextId}`
  localStorage.setItem(storageKey, Date.now().toString())
}

const generateId = () => `twin-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// ============================================================
// Audio System (Subtle Twin Spawn Sound)
// ============================================================
const audioEnabled = ref(true)

const playSpawnSound = () => {
  if (!audioEnabled.value) return
  if (typeof window === 'undefined') return
  
  try {
    // Create a subtle, premium UI "pop" sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Frequency sweep for a pleasant "pop"
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    // Very low volume, subtle
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  } catch (e) {
    // Fail silently if browser blocks audio
    console.debug('[useTwins] Audio playback blocked or failed')
  }
}

const setAudioEnabled = (enabled: boolean) => {
  audioEnabled.value = enabled
  if (typeof window !== 'undefined') {
    localStorage.setItem('formatho-twin-audio', String(enabled))
  }
}

// Load audio preference on mount
if (typeof window !== 'undefined') {
  const savedPref = localStorage.getItem('formatho-twin-audio')
  if (savedPref !== null) {
    audioEnabled.value = savedPref === 'true'
  }
}

// ============================================================
// Composable Export
// ============================================================
export function useTwins() {
  /**
   * Summon a digital twin mascot to appear on screen
   * @param character - The mascot character name
   * @param message - The message to display
   * @param contextId - Unique context ID for cooldown tracking
   * @param position - Position configuration (default: bottom-right fixed)
   * @returns The twin ID if summoned, null if on cooldown
   */
  const summonTwin = (
    character: MascotName,
    message: string,
    contextId: string,
    position: Partial<TwinPosition> = {}
  ): string | null => {
    // Check cooldown first
    if (checkCooldown(contextId)) {
      console.log(`[useTwins] Twin "${contextId}" is on cooldown`)
      return null
    }
    
    // Check if already active
    const existingIndex = activeTwins.value.findIndex(t => t.contextId === contextId)
    if (existingIndex !== -1) {
      console.log(`[useTwins] Twin "${contextId}" is already active`)
      return activeTwins.value[existingIndex].id
    }
    
    // Default position: bottom-right fixed
    const finalPosition: TwinPosition = {
      x: position.x ?? 'right',
      y: position.y ?? 'bottom',
      type: position.type ?? 'fixed'
    }
    
    const twin: TwinSummon = {
      id: generateId(),
      character,
      message,
      contextId,
      position: finalPosition,
      timestamp: Date.now()
    }
    
    activeTwins.value.push(twin)
    console.log(`[useTwins] Summoned ${character} with context "${contextId}"`)
    
    // Play subtle spawn sound
    playSpawnSound()
    
    return twin.id
  }
  
  /**
   * Dismiss a twin by its context ID
   * @param contextId - The context ID of the twin to dismiss
   * @param permanent - If true, sets 7-day cooldown
   */
  const dismissTwin = (contextId: string, permanent: boolean = true) => {
    const index = activeTwins.value.findIndex(t => t.contextId === contextId)
    
    if (index !== -1) {
      activeTwins.value.splice(index, 1)
      console.log(`[useTwins] Dismissed twin "${contextId}"`)
      
      if (permanent) {
        setDismissed(contextId)
      }
    }
  }
  
  /**
   * Dismiss a twin by its unique ID
   * @param id - The unique ID of the twin to dismiss
   * @param permanent - If true, sets 7-day cooldown
   */
  const dismissTwinById = (id: string, permanent: boolean = true) => {
    const twin = activeTwins.value.find(t => t.id === id)
    
    if (twin) {
      dismissTwin(twin.contextId, permanent)
    }
  }
  
  /**
   * Clear all active twins (without setting cooldown)
   */
  const clearAllTwins = () => {
    activeTwins.value = []
  }
  
  /**
   * Get active twin by context ID
   */
  const getTwin = (contextId: string): TwinSummon | undefined => {
    return activeTwins.value.find(t => t.contextId === contextId)
  }
  
  /**
   * Check if a twin is currently active
   */
  const isTwinActive = (contextId: string): boolean => {
    return activeTwins.value.some(t => t.contextId === contextId)
  }
  
  // Computed properties
  const hasActiveTwins = computed(() => activeTwins.value.length > 0)
  const twinCount = computed(() => activeTwins.value.length)
  
  return {
    // State
    activeTwins,
    hasActiveTwins,
    twinCount,
    
    // Actions
    summonTwin,
    dismissTwin,
    dismissTwinById,
    clearAllTwins,
    
    // Helpers
    getTwin,
    isTwinActive,
    checkCooldown,
    
    // Audio
    audioEnabled,
    setAudioEnabled
  }
}

// Export type for use in components
export type UseTwinsReturn = ReturnType<typeof useTwins>
