<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  betaTesterId?: string
  email?: string
}>()

// Form state
const feedbackType = ref<'bug' | 'feature' | 'testimonial' | 'general'>('general')
const rating = ref<number>(0)
const title = ref('')
const description = ref('')
const email = ref(props.email || '')
const name = ref('')
const priority = ref<'low' | 'medium' | 'high' | 'critical'>('medium')
const browser = ref('')
const stepsToReproduce = ref('')
const expectedBehavior = ref('')
const actualBehavior = ref('')
const files = ref<File[]>([])

// UI state
const isSubmitting = ref(false)
const submitted = ref(false)
const error = ref('')
const showSteps = computed(() => feedbackType.value === 'bug')

// Auto-detect browser
if (typeof navigator !== 'undefined') {
  browser.value = navigator.userAgent
}

const feedbackTypes = [
  { value: 'bug', label: '🐛 Bug Report', icon: '🐛' },
  { value: 'feature', label: '💡 Feature Request', icon: '💡' },
  { value: 'testimonial', label: '⭐ Testimonial', icon: '⭐' },
  { value: 'general', label: '💬 General Feedback', icon: '💬' }
]

const priorities = [
  { value: 'low', label: 'Low - Minor issue', color: 'gray' },
  { value: 'medium', label: 'Medium - Affects workflow', color: 'yellow' },
  { value: 'high', label: 'High - Blocking work', color: 'orange' },
  { value: 'critical', label: 'Critical - System down', color: 'red' }
]

const handleSubmit = async () => {
  if (!title.value || !description.value || !email.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  isSubmitting.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('type', feedbackType.value)
    formData.append('rating', rating.value.toString())
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('email', email.value)
    formData.append('name', name.value)
    formData.append('priority', priority.value)
    formData.append('browser', browser.value)
    
    if (feedbackType.value === 'bug') {
      formData.append('steps_to_reproduce', stepsToReproduce.value)
      formData.append('expected_behavior', expectedBehavior.value)
      formData.append('actual_behavior', actualBehavior.value)
    }

    if (props.betaTesterId) {
      formData.append('beta_tester_id', props.betaTesterId)
    }

    // Attach files
    files.value.forEach((file, index) => {
      formData.append(`file_${index}`, file)
    })

    const response = await fetch('http://localhost:18766/api/beta-feedback', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to submit feedback')
    }

    submitted.value = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to submit feedback'
  } finally {
    isSubmitting.value = false
  }
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    files.value = Array.from(target.files).slice(0, 5) // Max 5 files
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <!-- Success State -->
    <div v-if="submitted" class="text-center py-12">
      <div class="text-6xl mb-4">✅</div>
      <h2 class="text-2xl font-bold mb-2">Thank You!</h2>
      <p class="text-muted-foreground mb-6">
        Your feedback has been submitted successfully. We'll review it and get back to you soon.
      </p>
      <button
        @click="submitted = false; title = ''; description = ''; rating = 0"
        class="px-6 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Submit Another
      </button>
    </div>

    <!-- Feedback Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">Beta Feedback</h1>
        <p class="text-muted-foreground">Help us improve Formatho by sharing your experience</p>
      </div>

      <!-- Feedback Type -->
      <div class="space-y-3">
        <label class="text-sm font-medium">Feedback Type *</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="type in feedbackTypes"
            :key="type.value"
            type="button"
            @click="feedbackType = type.value as any"
            :class="[
              'p-4 rounded-lg border-2 transition-all text-center',
              feedbackType === type.value
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            ]"
          >
            <div class="text-2xl mb-1">{{ type.icon }}</div>
            <div class="text-sm font-medium">{{ type.label.split(' ')[1] }}</div>
          </button>
        </div>
      </div>

      <!-- Rating (for testimonials and general feedback) -->
      <div v-if="feedbackType === 'testimonial' || feedbackType === 'general'" class="space-y-3">
        <label class="text-sm font-medium">Overall Rating</label>
        <div class="flex gap-2">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            @click="rating = i"
            class="text-3xl transition-transform hover:scale-110"
          >
            {{ i <= rating ? '⭐' : '☆' }}
          </button>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Your name"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Email *</label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="your@email.com"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <!-- Title -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Title *</label>
        <input
          v-model="title"
          type="text"
          required
          placeholder="Brief summary of your feedback"
          class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <!-- Priority (for bugs and feature requests) -->
      <div v-if="feedbackType === 'bug' || feedbackType === 'feature'" class="space-y-3">
        <label class="text-sm font-medium">Priority</label>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            v-for="p in priorities"
            :key="p.value"
            type="button"
            @click="priority = p.value as any"
            :class="[
              'px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all',
              priority === p.value
                ? `border-${p.color}-500 bg-${p.color}-500/10 text-${p.color}-600`
                : 'border-border hover:border-primary/50'
            ]"
          >
            {{ p.label }}
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Description *</label>
        <textarea
          v-model="description"
          required
          rows="5"
          :placeholder="feedbackType === 'bug' 
            ? 'Describe what happened...' 
            : feedbackType === 'feature'
            ? 'Describe the feature you\'d like...'
            : feedbackType === 'testimonial'
            ? 'Share your experience with Formatho...'
            : 'Share your thoughts...'"
          class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        ></textarea>
      </div>

      <!-- Bug-specific fields -->
      <div v-if="feedbackType === 'bug'" class="space-y-4 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
        <h3 class="font-semibold text-red-600">Bug Details</h3>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">Steps to Reproduce</label>
          <textarea
            v-model="stepsToReproduce"
            rows="3"
            placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
            class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Expected Behavior</label>
          <input
            v-model="expectedBehavior"
            type="text"
            placeholder="What should have happened?"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Actual Behavior</label>
          <input
            v-model="actualBehavior"
            type="text"
            placeholder="What actually happened?"
            class="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <!-- File Attachments -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Attachments (optional)</label>
        <div class="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.txt"
            @change="handleFileUpload"
            class="hidden"
            id="file-upload"
          />
          <label for="file-upload" class="cursor-pointer">
            <div class="text-4xl mb-2">📎</div>
            <p class="text-sm text-muted-foreground">
              Click to upload screenshots or files (max 5)
            </p>
          </label>
        </div>
        
        <!-- File List -->
        <div v-if="files.length > 0" class="space-y-2">
          <div
            v-for="(file, index) in files"
            :key="index"
            class="flex items-center justify-between p-2 bg-muted rounded"
          >
            <span class="text-sm truncate">{{ file.name }}</span>
            <button
              type="button"
              @click="removeFile(index)"
              class="text-red-500 hover:text-red-600"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Submit Button -->
      <Button
        type="submit"
        :disabled="isSubmitting"
        size="lg"
        class="w-full"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Feedback' }}
      </Button>

      <!-- Privacy Note -->
      <p class="text-xs text-muted-foreground text-center">
        Your feedback helps us improve. We may contact you for follow-up questions.
      </p>
    </form>
  </div>
</template>
