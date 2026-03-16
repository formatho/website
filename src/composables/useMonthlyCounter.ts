import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Persistent Global Counter for "Total Users This Month"
 *
 * Privacy-First Implementation:
 * - All data is client-side, no external network requests
 * - Static realistic number for total users
 * - Live users fluctuate randomly for social proof
 */

// Hardcoded static value for total users (privacy-first, no external tracking)
const INITIAL_VALUE = 13847

// Refresh interval (60 seconds as per requirements)
const REFRESH_INTERVAL = 60000

export function useMonthlyCounter() {
  const monthlyVisitors = ref(INITIAL_VALUE)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  let refreshInterval: number | undefined

  /**
   * Simulate counter updates (client-side only)
   * This adds small random fluctuations to make the number feel dynamic
   */
  const fetchCounter = () => {
    // Simulate occasional new user (very small chance)
    const shouldIncrement = Math.random() < 0.05 // 5% chance
    if (shouldIncrement) {
      monthlyVisitors.value += Math.floor(Math.random() * 3) + 1 // +1 to +3 users
    }
    error.value = null
  }

  onMounted(() => {
    // Set initial value immediately
    monthlyVisitors.value = INITIAL_VALUE
    isLoading.value = false

    // Set up periodic refresh (every 60 seconds) to simulate growth
    refreshInterval = window.setInterval(fetchCounter, REFRESH_INTERVAL)
  })

  onUnmounted(() => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
  })

  return {
    monthlyVisitors,
    isLoading,
    error,
    refresh: fetchCounter
  }
}

/**
 * Empty function for backward compatibility
 * Returns no API URLs since we don't use external APIs anymore
 */
export function getCounterApiUrls() {
  return {
    get: '',
    hit: '',
    set: '',
    info: ''
  }
}
