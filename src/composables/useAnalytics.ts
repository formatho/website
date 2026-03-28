import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Types
interface AnalyticsEvent {
  name: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp?: Date
  properties?: Record<string, any>
}

interface PageView {
  path: string
  title: string
  referrer?: string
  timestamp: Date
  duration?: number
}

interface UserSession {
  sessionId: string
  userId?: string
  startTime: Date
  pageViews: number
  events: AnalyticsEvent[]
  device: DeviceInfo
  location?: LocationInfo
}

interface DeviceInfo {
  userAgent: string
  language: string
  screenSize: string
  viewportSize: string
  platform: string
  timezone: string
}

interface LocationInfo {
  country?: string
  region?: string
  city?: string
}

interface ConversionFunnel {
  name: string
  steps: string[]
  currentStep: number
  completed: boolean
}

// State
const sessionId = ref<string>('')
const userId = ref<string>('')
const pageViewStart = ref<Date>(new Date())
const currentPage = ref<string>('')
const events = ref<AnalyticsEvent[]>([])
const isEnabled = ref(true)

// Configuration
const config = {
  apiEndpoint: import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:18766/api/analytics',
  googleAnalyticsId: import.meta.env.VITE_GA_TRACKING_ID || '',
  debug: import.meta.env.VITE_ANALYTICS_DEBUG === 'true',
  trackPageViews: true,
  trackClicks: true,
  trackScrollDepth: true,
  trackFormSubmissions: true,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
}

// Generate session ID
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get device info
function getDeviceInfo(): DeviceInfo {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenSize: `${screen.width}x${screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

// Initialize analytics
export function useAnalytics() {
  const route = useRoute()

  // Initialize session
  function init() {
    if (!isEnabled.value) return

    // Get or create session ID
    const storedSessionId = sessionStorage.getItem('analytics_session_id')
    const sessionTimestamp = sessionStorage.getItem('analytics_session_timestamp')
    
    if (storedSessionId && sessionTimestamp) {
      const sessionAge = Date.now() - parseInt(sessionTimestamp)
      if (sessionAge < config.sessionTimeout) {
        sessionId.value = storedSessionId
      } else {
        // Session expired, create new
        sessionId.value = generateSessionId()
      }
    } else {
      sessionId.value = generateSessionId()
    }

    // Store session
    sessionStorage.setItem('analytics_session_id', sessionId.value)
    sessionStorage.setItem('analytics_session_timestamp', Date.now().toString())

    // Track initial page view
    if (config.trackPageViews) {
      trackPageView()
    }

    // Set up automatic tracking
    setupAutoTracking()

    if (config.debug) {
      console.log('[Analytics] Initialized with session:', sessionId.value)
    }
  }

  // Set up automatic tracking
  function setupAutoTracking() {
    // Track scroll depth
    if (config.trackScrollDepth) {
      let maxScroll = 0
      window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent
          if (maxScroll >= 25 && maxScroll < 50) {
            trackEvent('scroll_depth', 'engagement', '25%', 25)
          } else if (maxScroll >= 50 && maxScroll < 75) {
            trackEvent('scroll_depth', 'engagement', '50%', 50)
          } else if (maxScroll >= 75 && maxScroll < 100) {
            trackEvent('scroll_depth', 'engagement', '75%', 75)
          } else if (maxScroll >= 100) {
            trackEvent('scroll_depth', 'engagement', '100%', 100)
          }
        }
      })
    }

    // Track outbound clicks
    if (config.trackClicks) {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement
        const link = target.closest('a')
        if (link && link.href && !link.href.includes(window.location.hostname)) {
          trackEvent('outbound_click', 'navigation', link.href)
        }
      })
    }
  }

  // Track page view
  function trackPageView(pagePath?: string, pageTitle?: string) {
    const path = pagePath || route.path
    const title = pageTitle || document.title

    const pageView: PageView = {
      path,
      title,
      referrer: document.referrer,
      timestamp: new Date(),
    }

    currentPage.value = path
    pageViewStart.value = new Date()

    // Send to backend
    sendToBackend('pageview', pageView)

    // Send to Google Analytics
    if (config.googleAnalyticsId && typeof window.gtag !== 'undefined') {
      window.gtag('config', config.googleAnalyticsId, {
        page_path: path,
        page_title: title,
      })
    }

    if (config.debug) {
      console.log('[Analytics] Page view:', path, title)
    }
  }

  // Track event
  function trackEvent(
    name: string,
    category: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ) {
    const event: AnalyticsEvent = {
      name,
      category,
      action: name,
      label,
      value,
      timestamp: new Date(),
      properties,
    }

    events.value.push(event)

    // Send to backend
    sendToBackend('event', event)

    // Send to Google Analytics
    if (config.googleAnalyticsId && typeof window.gtag !== 'undefined') {
      window.gtag('event', name, {
        event_category: category,
        event_label: label,
        value: value,
        ...properties,
      })
    }

    if (config.debug) {
      console.log('[Analytics] Event:', name, category, label, value)
    }
  }

  // Track conversion funnel
  function trackFunnelStep(funnelName: string, stepName: string, stepNumber: number, totalSteps: number) {
    trackEvent('funnel_step', funnelName, stepName, stepNumber, {
      funnel_name: funnelName,
      step_name: stepName,
      step_number: stepNumber,
      total_steps: totalSteps,
      completion_percentage: (stepNumber / totalSteps) * 100,
    })
  }

  // Track conversion
  function trackConversion(conversionType: string, value?: number, properties?: Record<string, any>) {
    trackEvent('conversion', conversionType, undefined, value, {
      conversion_type: conversionType,
      conversion_value: value,
      ...properties,
    })
  }

  // Track feature usage
  function trackFeatureUsage(featureName: string, action: string, properties?: Record<string, any>) {
    trackEvent('feature_usage', featureName, action, undefined, {
      feature_name: featureName,
      feature_action: action,
      ...properties,
    })
  }

  // Track tool usage
  function trackToolUsage(toolName: string, action: 'view' | 'use' | 'complete' | 'error', properties?: Record<string, any>) {
    trackEvent('tool_usage', toolName, action, undefined, {
      tool_name: toolName,
      tool_action: action,
      ...properties,
    })
  }

  // Track timing
  function trackTiming(category: string, variable: string, time: number, label?: string) {
    trackEvent('timing', category, label, time, {
      timing_category: category,
      timing_variable: variable,
      timing_time: time,
      timing_label: label,
    })
  }

  // Track error
  function trackError(errorType: string, errorMessage: string, properties?: Record<string, any>) {
    trackEvent('error', errorType, errorMessage, undefined, {
      error_type: errorType,
      error_message: errorMessage,
      ...properties,
    })
  }

  // Set user ID
  function setUserId(id: string) {
    userId.value = id
    sessionStorage.setItem('analytics_user_id', id)

    // Update Google Analytics
    if (config.googleAnalyticsId && typeof window.gtag !== 'undefined') {
      window.gtag('set', { user_id: id })
    }
  }

  // Identify user
  function identify(userId: string, traits?: Record<string, any>) {
    setUserId(userId)
    
    sendToBackend('identify', {
      user_id: userId,
      traits,
      device: getDeviceInfo(),
    })

    if (config.debug) {
      console.log('[Analytics] Identify:', userId, traits)
    }
  }

  // Send to backend
  async function sendToBackend(type: string, data: any) {
    if (!isEnabled.value) return

    const payload = {
      type,
      session_id: sessionId.value,
      user_id: userId.value,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      data,
    }

    try {
      // Use navigator.sendBeacon for reliability
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(`${config.apiEndpoint}/track`, blob)
    } catch (error) {
      if (config.debug) {
        console.error('[Analytics] Failed to send:', error)
      }
    }
  }

  // Clean up
  function cleanup() {
    // Track page duration before leaving
    if (currentPage.value) {
      const duration = Date.now() - pageViewStart.value.getTime()
      trackTiming('engagement', 'page_duration', duration, currentPage.value)
    }
  }

  // Lifecycle
  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  // Window unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', cleanup)
  }

  return {
    // State
    sessionId,
    userId,
    isEnabled,
    
    // Methods
    init,
    trackPageView,
    trackEvent,
    trackFunnelStep,
    trackConversion,
    trackFeatureUsage,
    trackToolUsage,
    trackTiming,
    trackError,
    setUserId,
    identify,
    
    // Utilities
    getDeviceInfo,
  }
}

// Singleton instance for global use
let analyticsInstance: ReturnType<typeof useAnalytics> | null = null

export function getAnalytics() {
  if (!analyticsInstance) {
    analyticsInstance = useAnalytics()
  }
  return analyticsInstance
}

// Global type declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
