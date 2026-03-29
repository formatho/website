import { ref, onMounted, onUnmounted } from 'vue'
import { useAnalytics } from './useAnalytics'

export function useScrollDepth() {
  const { trackEvent } = useAnalytics()
  
  const scrollDepths = ref({
    25: false,
    50: false,
    75: false,
    100: false
  })
  
  const maxScrollDepth = ref(0)
  const timeOnPage = ref(0)
  const startTime = ref(Date.now())
  
  let scrollHandler: (() => void) | null = null
  let timeInterval: number | null = null

  const getScrollPercentage = (): number => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
  }

  const handleScroll = () => {
    const percentage = getScrollPercentage()
    
    // Update max scroll depth
    if (percentage > maxScrollDepth.value) {
      maxScrollDepth.value = percentage
    }
    
    // Track milestone depths (only once each)
    const depths: (25 | 50 | 75 | 100)[] = [25, 50, 75, 100]
    
    for (const depth of depths) {
      if (percentage >= depth && !scrollDepths.value[depth]) {
        scrollDepths.value[depth] = true
        
        trackEvent('scroll_depth', 'engagement', `${depth}%`, depth, {
          depth,
          percentage,
          timeOnPage: timeOnPage.value
        })
        
        console.log(`[Scroll] Reached ${depth}% depth`)
      }
    }
  }

  const updateTime = () => {
    timeOnPage.value = Math.round((Date.now() - startTime.value) / 1000)
  }

  const getEngagementMetrics = () => {
    return {
      maxScrollDepth: maxScrollDepth.value,
      timeOnPage: timeOnPage.value,
      scrollMilestones: { ...scrollDepths.value }
    }
  }

  const trackTimeOnPage = () => {
    // Track time intervals
    const intervals = [30, 60, 120, 300, 600] // 30s, 1m, 2m, 5m, 10m
    
    for (const seconds of intervals) {
      if (timeOnPage.value === seconds) {
        trackEvent('time_on_page', 'engagement', `${seconds}s`, seconds, {
          seconds,
          maxScrollDepth: maxScrollDepth.value
        })
      }
    }
  }

  onMounted(() => {
    // Set up scroll listener
    scrollHandler = () => {
      handleScroll()
      trackTimeOnPage()
    }
    
    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    // Set up time tracker
    timeInterval = window.setInterval(updateTime, 1000)
    
    // Track initial page view
    trackEvent('page_view', 'navigation', window.location.pathname)
  })

  onUnmounted(() => {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
    }
    
    if (timeInterval) {
      clearInterval(timeInterval)
    }
    
    // Track final engagement metrics on unmount
    trackEvent('page_exit', 'navigation', window.location.pathname, timeOnPage.value, {
      maxScrollDepth: maxScrollDepth.value,
      timeOnPage: timeOnPage.value,
      scrollMilestones: scrollDepths.value
    })
  })

  return {
    scrollDepths,
    maxScrollDepth,
    timeOnPage,
    getEngagementMetrics
  }
}

/**
 * Usage Example:
 * 
 * <script setup>
 * import { useScrollDepth } from '@/composables/useScrollDepth'
 * 
 * const { maxScrollDepth, timeOnPage, getEngagementMetrics } = useScrollDepth()
 * 
 * // Get engagement metrics at any time
 * const metrics = getEngagementMetrics()
 * console.log('User engagement:', metrics)
 * </script>
 * 
 * <template>
 *   <div v-if="maxScrollDepth >= 50">
 *     <!-- Show CTA only if user scrolled past 50% -->
 *     <button>Sign Up Now</button>
 *   </div>
 * </template>
 */
