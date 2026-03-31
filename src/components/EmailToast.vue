<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { X, Bell, CheckCircle, Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEmailCapture } from '@/composables/useEmailCapture'
import { useAnalytics } from '@/composables/useAnalytics'

interface Props {
  toolName?: string
  autoShowDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  toolName: 'tool',
  autoShowDelay: 0
})

const isVisible = ref(false)
const isDismissed = ref(false)

const {
  email,
  isLoading,
  error,
  success,
  message,
  isValidEmail,
  submitEmail
} = useEmailCapture()

const { trackEvent } = useAnalytics()

let showTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // Check if already shown for this tool
  const shownTools = JSON.parse(sessionStorage.getItem('email-toast-shown-tools') || '[]')
  if (shownTools.includes(props.toolName)) {
    isDismissed.value = true
    return
  }

  if (props.autoShowDelay > 0) {
    showTimeout = setTimeout(() => {
      show()
    }, props.autoShowDelay)
  }
})

onUnmounted(() => {
  if (showTimeout) {
    clearTimeout(showTimeout)
  }
})

const show = () => {
  if (isDismissed.value) return
  isVisible.value = true
  trackEvent('email_toast_show', { tool: props.toolName })
}

const dismiss = () => {
  isVisible.value = false
  isDismissed.value = true
  
  // Remember this tool
  const shownTools = JSON.parse(sessionStorage.getItem('email-toast-shown-tools') || '[]')
  if (!shownTools.includes(props.toolName)) {
    shownTools.push(props.toolName)
    sessionStorage.setItem('email-toast-shown-tools', JSON.stringify(shownTools))
  }
  
  trackEvent('email_toast_dismiss', { tool: props.toolName })
}

const handleSubmit = async () => {
  if (!email.value || !isValidEmail.value) return

  trackEvent('email_toast_submit', { tool: props.toolName })

  const result = await submitEmail(email.value, 'contextual', {
    tool: props.toolName,
    interested_in: 'tools'
  })

  if (result.success) {
    trackEvent('email_toast_success', { tool: props.toolName })
    // Auto-dismiss after success
    setTimeout(() => {
      dismiss()
    }, 3000)
  }
}

// Expose show method for parent components
defineExpose({ show, dismiss })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isVisible"
        class="fixed bottom-4 right-4 z-50 max-w-sm w-full shadow-2xl"
      >
        <div class="bg-card border border-border rounded-xl overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div class="flex items-center gap-2">
              <Bell class="w-4 h-4 text-primary" />
              <span class="font-semibold text-sm">Enjoyed this tool?</span>
            </div>
            <button
              @click="dismiss"
              class="p-1 hover:bg-muted rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X class="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-4">
            <!-- Success State -->
            <div v-if="success" class="text-center py-2">
              <CheckCircle class="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p class="text-sm font-medium">You're subscribed!</p>
              <p class="text-xs text-muted-foreground mt-1">{{ message }}</p>
            </div>

            <!-- Form State -->
            <div v-else class="space-y-3">
              <p class="text-sm text-muted-foreground">
                Get notified when we launch more free, privacy-first tools.
              </p>
              
              <form @submit.prevent="handleSubmit" class="space-y-2">
                <Input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  class="h-9"
                  :class="{ 'border-red-500': error }"
                />
                <Button
                  type="submit"
                  :disabled="isLoading || !email || !isValidEmail"
                  class="w-full h-9"
                >
                  <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isLoading ? 'Subscribing...' : 'Keep Me Updated' }}
                </Button>
              </form>

              <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
              
              <p class="text-xs text-muted-foreground text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
