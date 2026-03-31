import { useAnalytics } from './useAnalytics'

export interface EmailCaptureMetrics {
  views: number
  submissions: number
  conversions: number
}

export type EmailCaptureLocation = 'banner' | 'popup' | 'footer' | 'contextual' | 'hero'

/**
 * Composable for tracking email capture metrics and conversions
 */
export function useEmailCaptureTracking() {
  const { trackEvent, trackConversion } = useAnalytics()

  // Track when a capture form is viewed
  const trackView = (location: EmailCaptureLocation, metadata?: Record<string, string>) => {
    trackEvent('email_capture_view', {
      location,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track when a user interacts with the form (focuses on input)
  const trackInteraction = (location: EmailCaptureLocation, metadata?: Record<string, string>) => {
    trackEvent('email_capture_interaction', {
      location,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track when a user starts typing their email
  const trackInputStart = (location: EmailCaptureLocation, metadata?: Record<string, string>) => {
    trackEvent('email_capture_input_start', {
      location,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track when a form submission is attempted
  const trackSubmit = (location: EmailCaptureLocation, metadata?: Record<string, string>) => {
    trackEvent('email_capture_submit', {
      location,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track successful subscription
  const trackSuccess = (
    location: EmailCaptureLocation,
    source: string,
    metadata?: Record<string, string>
  ) => {
    trackEvent('email_capture_success', {
      location,
      source,
      timestamp: new Date().toISOString(),
      ...metadata
    })

    // Also track as a conversion
    trackConversion('email_signup', source, {
      location,
      ...metadata
    })
  }

  // Track when a form submission fails
  const trackError = (
    location: EmailCaptureLocation,
    error: string,
    metadata?: Record<string, string>
  ) => {
    trackEvent('email_capture_error', {
      location,
      error,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track when a capture form is dismissed
  const trackDismiss = (location: EmailCaptureLocation, metadata?: Record<string, string>) => {
    trackEvent('email_capture_dismiss', {
      location,
      timestamp: new Date().toISOString(),
      ...metadata
    })
  }

  // Track A/B test variant exposure
  const trackABTestExposure = (
    testName: string,
    variant: string,
    location: EmailCaptureLocation
  ) => {
    trackEvent('ab_test_exposure', {
      test_name: testName,
      variant,
      location,
      timestamp: new Date().toISOString()
    })
  }

  // Track A/B test conversion
  const trackABTestConversion = (
    testName: string,
    variant: string,
    location: EmailCaptureLocation
  ) => {
    trackEvent('ab_test_conversion', {
      test_name: testName,
      variant,
      location,
      timestamp: new Date().toISOString()
    })
  }

  return {
    trackView,
    trackInteraction,
    trackInputStart,
    trackSubmit,
    trackSuccess,
    trackError,
    trackDismiss,
    trackABTestExposure,
    trackABTestConversion
  }
}
