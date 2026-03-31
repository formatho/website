import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useEmailCapture } from './useEmailCapture'
import { useEmailCaptureTracking } from './useEmailCaptureTracking'

/**
 * Composable for showing email toast after successful tool operations
 * 
 * Usage in tool views:
 * ```ts
 * const { showEmailToast, handleToolSuccess } = useToolEmailCapture()
 * 
 * // After tool operation completes successfully
 * handleToolSuccess()
 * ```
 */
export function useToolEmailCapture() {
  const route = useRoute()
  const { submitEmail } = useEmailCapture()
  const { trackView, trackSubmit, trackSuccess } = useEmailCaptureTracking()

  const showToast = ref(false)
  const toolName = ref('')
  const hasShownForTool = ref(false)

  // Auto-show toast after delay (in ms)
  const autoShowDelay = 2000 // 2 seconds after tool success

  let showTimeout: ReturnType<typeof setTimeout> | null = null

  /**
   * Call this when a tool operation completes successfully
   * Triggers email toast if conditions are met
   */
  const handleToolSuccess = () => {
    // Don't show if already shown for this tool
    if (hasShownForTool.value) return

    // Don't show if already subscribed
    const alreadySubscribed = localStorage.getItem('formatho_subscribed')
    if (alreadySubscribed) return

    // Get tool name from route
    toolName.value = route.path.split('/').pop() || 'tool'

    // Check if already shown for this tool in this session
    const shownTools = JSON.parse(
      sessionStorage.getItem('email_toast_shown_tools') || '[]'
    )
    if (shownTools.includes(toolName.value)) {
      return
    }

    // Show toast after delay
    showTimeout = setTimeout(() => {
      showToast.value = true
      hasShownForTool.value = true
      
      // Mark as shown for this tool
      shownTools.push(toolName.value)
      sessionStorage.setItem('email_toast_shown_tools', JSON.stringify(shownTools))

      // Track toast view
      trackView('contextual', { tool: toolName.value })
    }, autoShowDelay)
  }

  /**
   * Dismiss the email toast
   */
  const dismissToast = () => {
    showToast.value = false
  }

  /**
   * Submit email from the toast
   */
  const handleEmailSubmit = async (email: string) => {
    trackSubmit('contextual', { tool: toolName.value })

    const result = await submitEmail(email, 'contextual', {
      tool: toolName.value,
      interested_in: 'tools'
    })

    if (result.success) {
      trackSuccess('contextual', 'tool_page', { tool: toolName.value })
      
      // Mark as subscribed
      localStorage.setItem('formatho_subscribed', 'true')
      
      // Auto-dismiss after success
      setTimeout(() => {
        dismissToast()
      }, 2000)
    }

    return result
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (showTimeout) {
      clearTimeout(showTimeout)
    }
  })

  return {
    showToast,
    toolName,
    handleToolSuccess,
    dismissToast,
    handleEmailSubmit
  }
}
