<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  userEmail?: string
  userName?: string
  pageUrl?: string
}>()

const emit = defineEmits<{
  submitted: []
}>()

const category = ref('general')
const subject = ref('')
const message = ref('')
const rating = ref<number | null>(null)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const categories = [
  { value: 'bug', label: '🐛 Bug Report', description: 'Report a bug or issue' },
  { value: 'feature_request', label: '💡 Feature Request', description: 'Suggest a new feature' },
  { value: 'testimonial', label: '⭐ Testimonial', description: 'Share your success story' },
  { value: 'general', label: '💬 General Feedback', description: 'Other feedback or questions' }
]

const handleSubmit = async () => {
  if (!subject.value || !message.value || !category.value) {
    errorMessage.value = 'Please fill in all required fields'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('http://localhost:18766/api/beta-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_email: props.userEmail || 'anonymous@example.com',
        user_name: props.userName || 'Anonymous',
        category: category.value,
        subject: subject.value,
        message: message.value,
        rating: rating.value,
        page_url: props.pageUrl || window.location.href,
        user_agent: navigator.userAgent
      })
    })

    const data = await response.json()

    if (response.ok && data.success) {
      isSubmitted.value = true
      emit('submitted')
    } else {
      errorMessage.value = data.error || 'Failed to submit feedback. Please try again.'
    }
  } catch (error) {
    console.error('Feedback submission failed:', error)
    errorMessage.value = 'Failed to submit feedback. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  category.value = 'general'
  subject.value = ''
  message.value = ''
  rating.value = null
  isSubmitted.value = false
  errorMessage.value = ''
}
</script>

<template>
  <Card class="bg-slate-900/50 border-slate-800">
    <CardHeader>
      <CardTitle class="text-2xl flex items-center gap-2">
        <span>💬</span>
        Share Your Feedback
      </CardTitle>
      <CardDescription>
        Help us improve Agent Orchestrator by sharing your experience
      </CardDescription>
    </CardHeader>

    <CardContent>
      <!-- Success Message -->
      <div v-if="isSubmitted" class="text-center py-8">
        <div class="text-6xl mb-4">🎉</div>
        <h3 class="text-2xl font-bold mb-2 text-green-400">Thank You!</h3>
        <p class="text-slate-400 mb-6">
          Your feedback has been submitted successfully. We appreciate your input!
        </p>
        <Button @click="resetForm" variant="outline" class="border-slate-700" aria-label="Reset feedback form">
          Submit Another Response
        </Button>
      </div>

      <!-- Feedback Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Category Selection -->
        <div>
          <label class="block text-sm font-medium mb-3">Category *</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="cat in categories"
              :key="cat.value"
              type="button"
              @click="category = cat.value"
              :class="[
                'p-3 rounded-lg border text-left transition-all',
                category === cat.value
                  ? 'bg-blue-500/20 border-blue-500/50 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
              ]"
            >
              <div class="font-medium">{{ cat.label }}</div>
              <div class="text-xs mt-1 opacity-75">{{ cat.description }}</div>
            </button>
          </div>
        </div>

        <!-- Subject -->
        <div>
          <label class="block text-sm font-medium mb-2">Subject *</label>
          <Input
            v-model="subject"
            placeholder="Brief summary of your feedback"
            required
            class="bg-slate-800 border-slate-700"
          />
        </div>

        <!-- Message -->
        <div>
          <label class="block text-sm font-medium mb-2">Message *</label>
          <Textarea
            v-model="message"
            placeholder="Describe your feedback in detail..."
            required
            :rows="6"
            class="bg-slate-800 border-slate-700"
          />
        </div>

        <!-- Rating (Optional) -->
        <div>
          <label class="block text-sm font-medium mb-3">Rating (Optional)</label>
          <div class="flex gap-2">
            <button
              v-for="i in 5"
              :key="i"
              type="button"
              @click="rating = i"
              :class="[
                'text-3xl transition-all',
                rating && i <= rating ? 'text-yellow-400' : 'text-slate-600'
              ]"
            >
              ⭐
            </button>
            <span v-if="rating" class="ml-3 text-slate-400 self-center">
              {{ rating }} star{{ rating > 1 ? 's' : '' }}
            </span>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p class="text-red-400 text-sm">{{ errorMessage }}</p>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Feedback' }}
        </Button>

        <p class="text-center text-xs text-slate-500">
          Your feedback will be reviewed by our team within 24 hours.
        </p>
      </form>
    </CardContent>
  </Card>
</template>
