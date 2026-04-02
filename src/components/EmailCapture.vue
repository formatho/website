<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEmailCapture, type EmailCaptureSource } from '@/composables/useEmailCapture'
import { useAnalytics } from '@/composables/useAnalytics'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-vue-next'

interface Props {
  source: EmailCaptureSource
  variant?: 'inline' | 'card' | 'compact' | 'hero'
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  showIcon?: boolean
  className?: string
  metadata?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  title: 'Stay Updated',
  subtitle: 'Get the latest updates, tutorials, and insights delivered to your inbox.',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  showIcon: true,
  className: ''
})

const emit = defineEmits<{
  success: [email: string]
  error: [error: string]
}>()

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

// Track when user focuses on the input
const hasInteracted = ref(false)
const handleFocus = () => {
  if (!hasInteracted.value) {
    hasInteracted.value = true
    trackEvent('email_capture_focus', { source: props.source })
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!email.value || !isValidEmail.value) return

  trackEvent('email_capture_submit', {
    source: props.source,
    variant: props.variant
  })

  const result = await submitEmail(email.value, props.source, props.metadata)

  if (result.success) {
    emit('success', email.value)
    trackEvent('email_capture_success', { source: props.source })
  } else {
    emit('error', result.message)
    trackEvent('email_capture_error', {
      source: props.source,
      error: result.message
    })
  }
}

// Dismiss success message
const handleDismiss = () => {
  reset()
}

// Compute button state
const isButtonDisabled = computed(() => {
  return isLoading.value || !email.value || !isValidEmail.value
})
</script>

<template>
  <!-- Hero Variant - Large, prominent for homepage hero -->
  <div
    v-if="variant === 'hero'"
    :class="['w-full', className]"
    data-aos="fade-up"
    data-aos-delay="300"
  >
    <div v-if="!success" class="space-y-3">
      <p class="text-sm text-center text-muted-foreground">
        <span class="text-orange-600 font-semibold">🚀 Join the waitlist</span> for early access
      </p>
    </div>

    <!-- Success State -->
    <div
      v-else
      class="flex items-center justify-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg max-w-md mx-auto"
    >
      <CheckCircle class="w-5 h-5 text-green-600" />
      <p class="text-green-700 dark:text-green-400">{{ message }}</p>
      <button
        @click="handleDismiss"
        class="ml-auto text-muted-foreground hover:text-foreground"
      >
        ×
      </button>
    </div>

    <!-- Error State -->
    <p v-if="error && !success" class="text-red-500 text-sm mt-2 text-center">
      {{ error }}
    </p>
  </div>

  <!-- Card Variant - For blog sidebar, pricing bottom -->
  <div
    v-else-if="variant === 'card'"
    :class="['glass-card p-6 md:p-8', className]"
    data-aos="fade-up"
  >
    <div v-if="!success" class="space-y-4">
      <div class="flex items-center gap-3">
        <div v-if="showIcon" class="p-2 bg-primary/10 rounded-lg">
          <Mail class="w-5 h-5 text-primary" />
        </div>
        <h3 class="text-xl font-bold">{{ title }}</h3>
      </div>
      <p class="text-muted-foreground text-sm leading-relaxed">
        {{ subtitle }}
      </p>
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <Input
          v-model="email"
          type="email"
          :placeholder="placeholder"
          :class="['w-full', error ? 'border-red-500' : '']"
          @focus="handleFocus"
        />
        <Button
          type="submit"
          :disabled="isButtonDisabled"
          class="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading ? 'Subscribing...' : buttonText }}
        </Button>
      </form>
      <p v-if="error" class="text-red-500 text-sm flex items-center gap-1">
        <AlertCircle class="w-4 h-4" />
        {{ error }}
      </p>
      <p class="text-xs text-muted-foreground text-center">
        No spam, ever. Unsubscribe anytime.
      </p>
    </div>

    <!-- Success State -->
    <div v-else class="text-center py-4 space-y-3">
      <div class="flex justify-center">
        <div class="p-3 bg-green-500/10 rounded-full">
          <CheckCircle class="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h3 class="text-lg font-semibold">You're subscribed!</h3>
      <p class="text-muted-foreground text-sm">{{ message }}</p>
      <button
        @click="handleDismiss"
        class="text-primary text-sm hover:underline"
      >
        Subscribe another email
      </button>
    </div>
  </div>

  <!-- Inline Variant - For pricing page bottom -->
  <div
    v-else-if="variant === 'inline'"
    :class="['w-full', className]"
  >
    <div v-if="!success" class="space-y-4">
      <div class="text-center mb-6">
        <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
        <p class="text-muted-foreground">{{ subtitle }}</p>
      </div>
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <Input
          v-model="email"
          type="email"
          :placeholder="placeholder"
          :class="['flex-1', error ? 'border-red-500' : '']"
          @focus="handleFocus"
        />
        <Button
          type="submit"
          :disabled="isButtonDisabled"
          class="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Loader2 v-if="isLoading" class="w-4 h-4 mr-2 animate-spin" />
          {{ isLoading ? 'Subscribing...' : buttonText }}
        </Button>
      </form>
      <p v-if="error" class="text-red-500 text-sm text-center">
        {{ error }}
      </p>
      <p class="text-xs text-muted-foreground text-center">
        Join 1,000+ developers. No spam, unsubscribe anytime.
      </p>
    </div>

    <!-- Success State -->
    <div v-else class="text-center space-y-3 py-4">
      <div class="flex justify-center">
        <CheckCircle class="w-8 h-8 text-green-600" />
      </div>
      <h3 class="text-xl font-semibold">Welcome aboard!</h3>
      <p class="text-muted-foreground">{{ message }}</p>
      <button
        @click="handleDismiss"
        class="text-primary text-sm hover:underline"
      >
        Subscribe another email
      </button>
    </div>
  </div>

  <!-- Compact Variant - For footer, small spaces -->
  <div
    v-else-if="variant === 'compact'"
    :class="['space-y-2', className]"
  >
    <div v-if="!success" class="flex gap-2">
      <Input
        v-model="email"
        type="email"
        :placeholder="placeholder"
        :class="['flex-1 h-9 text-sm', error ? 'border-red-500' : '']"
        @focus="handleFocus"
        @keyup.enter="handleSubmit"
      />
      <Button
        @click="handleSubmit"
        :disabled="isButtonDisabled"
        size="sm"
        class="h-9"
      >
        <Loader2 v-if="isLoading" class="w-3 h-3 mr-1 animate-spin" />
        {{ isLoading ? '...' : buttonText }}
      </Button>
    </div>
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
    <p v-else-if="success" class="text-green-600 text-sm flex items-center gap-1">
      <CheckCircle class="w-3 h-3" />
      Subscribed!
    </p>
  </div>
</template>

<style scoped>
.glass-card {
  @apply bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl;
}
</style>
