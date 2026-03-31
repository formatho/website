<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { X, Sparkles, Mail } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEmailCapture } from '@/composables/useEmailCapture'
import { useAnalytics } from '@/composables/useAnalytics'

const isVisible = ref(true)
const isDismissed = ref(false)
const showForm = ref(false)

const {
  email,
  isLoading,
  error,
  success,
  message,
  isValidEmail,
  submitEmail,
  reset
} = useEmailCapture()

const { trackEvent } = useAnalytics()

// A/B test variant
const abVariant = ref<'A' | 'B'>('A')

onMounted(() => {
  // Check if previously dismissed in this session
  if (sessionStorage.getItem('email-banner-dismissed')) {
    isVisible.value = false
    isDismissed.value = true
  }

  // Check for A/B test variant (50/50 split)
  const storedVariant = sessionStorage.getItem('email-banner-variant')
  if (storedVariant) {
    abVariant.value = storedVariant as 'A' | 'B'
  } else {
    abVariant.value = Math.random() > 0.5 ? 'A' : 'B'
    sessionStorage.setItem('email-banner-variant', abVariant.value)
  }

  // Track banner view
  trackEvent('email_banner_view', { variant: abVariant.value })
})

const copyTitle = computed(() => {
  return abVariant.value === 'A' 
    ? 'Get early access to Agent Orchestrator'
    : 'Privacy tips for developers + early access'
})

const dismissBanner = () => {
  isDismissed.value = true
  isVisible.value = false
  sessionStorage.setItem('email-banner-dismissed', 'true')
  trackEvent('email_banner_dismiss', { variant: abVariant.value })
}

const toggleForm = () => {
  showForm.value = !showForm.value
  if (showForm.value) {
    trackEvent('email_banner_expand', { variant: abVariant.value })
  }
}

const handleSubmit = async () => {
  if (!email.value || !isValidEmail.value) return

  trackEvent('email_banner_submit', { variant: abVariant.value })

  const result = await submitEmail(email.value, 'banner', {
    variant: abVariant.value,
    interested_in: 'orchestrator'
  })

  if (result.success) {
    trackEvent('email_banner_success', { variant: abVariant.value })
    // Auto-dismiss after success
    setTimeout(() => {
      dismissBanner()
    }, 3000)
  }
}

const handleDismiss = () => {
  reset()
  showForm.value = false
}
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-full"
  >
    <div
      v-if="isVisible && !isDismissed"
      class="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary to-blue-600 text-white shadow-lg"
    >
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>

      <div class="relative container mx-auto px-4">
        <!-- Collapsed State -->
        <div v-if="!showForm" class="flex items-center justify-center gap-3 py-3">
          <Sparkles class="w-4 h-4 flex-shrink-0" />
          <span class="text-sm font-medium">
            {{ copyTitle }}
          </span>
          <Button
            @click="toggleForm"
            size="sm"
            class="ml-2 px-4 py-1 h-7 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-full text-sm font-semibold transition-all"
          >
            Notify Me
          </Button>
          <button
            @click="dismissBanner"
            class="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Expanded Form State -->
        <div v-else class="py-3">
          <div class="flex items-center justify-center gap-3 flex-wrap">
            <Mail class="w-4 h-4 flex-shrink-0" />
            <span class="text-sm font-medium">{{ copyTitle }} + privacy tips</span>
            <div class="flex items-center gap-2">
              <Input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="w-48 h-8 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                :class="{ 'border-red-400': error }"
                @keyup.enter="handleSubmit"
              />
              <Button
                @click="handleSubmit"
                :disabled="isLoading || !email || !isValidEmail"
                size="sm"
                class="h-8 px-4 bg-white text-primary hover:bg-white/90 font-semibold"
              >
                {{ isLoading ? 'Subscribing...' : 'Notify Me' }}
              </Button>
              <button
                @click="handleDismiss"
                class="p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Cancel"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <!-- Success Message -->
          <div v-if="success" class="text-center mt-2">
            <span class="text-sm text-green-200">✓ {{ message }}</span>
          </div>
          
          <!-- Error Message -->
          <div v-if="error && !success" class="text-center mt-2">
            <span class="text-sm text-red-200">{{ error }}</span>
          </div>
          
          <!-- Privacy Statement -->
          <p v-if="!success" class="text-center text-xs text-white/60 mt-2">
            No spam. Unsubscribe anytime. We never sell data.
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>
