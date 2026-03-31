<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showPopup" class="exit-intent-overlay" @click.self="closePopup">
        <div class="exit-intent-modal">
          <button class="close-btn" @click="closePopup">&times;</button>
          
          <div class="popup-content">
            <div class="emoji">🚀</div>
            <h2>Wait! Don't Miss Agent Orchestrator Launch</h2>
            <p class="subtext">Be the first to try <strong>Agent Orchestrator</strong> - our new AI-powered automation platform</p>
            
            <!-- Success State -->
            <div v-if="isSubmitted" class="success-state">
              <CheckCircle class="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 class="text-lg font-semibold mb-2">You're on the list!</h3>
              <p class="text-muted-foreground text-sm">{{ successMessage }}</p>
            </div>
            
            <!-- Form State -->
            <div v-else>
              <div class="offer-badge">
                First 100 subscribers get <strong>50% off</strong> first month!
              </div>
              
              <form @submit.prevent="handleSubmit" class="email-form">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="email-input"
                  :class="{ 'error': validationError }"
                />
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                  {{ isSubmitting ? 'Subscribing...' : 'Keep Me Updated' }}
                </button>
                <p v-if="validationError" class="error-text">{{ validationError }}</p>
              </form>
              
              <div class="benefits">
                <div class="benefit">
                  <span class="check">✓</span>
                  <span>Early access to Agent Orchestrator</span>
                </div>
                <div class="benefit">
                  <span class="check">✓</span>
                  <span>Privacy tips for developers</span>
                </div>
                <div class="benefit">
                  <span class="check">✓</span>
                  <span>New tool announcements</span>
                </div>
              </div>
              
              <p class="no-spam">🔒 No spam, ever. Unsubscribe anytime. We never sell your data.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CheckCircle, Loader2 } from 'lucide-vue-next'
import { useAnalytics } from '@/composables/useAnalytics'
import { useEmailCapture } from '@/composables/useEmailCapture'

const { trackEvent, trackConversion } = useAnalytics()
const { submitEmail } = useEmailCapture()

const showPopup = ref(false)
const email = ref('')
const hasShown = ref(false)
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const validationError = ref('')
const successMessage = ref('')

// Track time on page for 30-second delay
const pageLoadTime = ref(Date.now())
const MIN_TIME_ON_PAGE = 30000 // 30 seconds

const handleMouseLeave = (e: MouseEvent) => {
  // Only trigger if mouse leaves from top of page
  if (e.clientY < 10 && !hasShown.value) {
    // Check time on page - must be at least 30 seconds
    const timeOnPage = Date.now() - pageLoadTime.value
    if (timeOnPage < MIN_TIME_ON_PAGE) {
      return
    }
    
    // Check if user has already seen popup this session
    const seen = sessionStorage.getItem('exit_intent_shown')
    const dismissedAt = localStorage.getItem('exit_intent_dismissed')
    
    // Don't show if dismissed in last 7 days
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) return
    }
    
    // Don't show if already seen this session
    if (seen) return
    
    showPopup.value = true
    hasShown.value = true
    sessionStorage.setItem('exit_intent_shown', 'true')
    
    // Track popup shown
    trackEvent('exit_intent_popup_shown', { source: 'exit_intent' })
  }
}

const closePopup = () => {
  showPopup.value = false
  localStorage.setItem('exit_intent_dismissed', Date.now().toString())
  
  // Track popup dismissed
  trackEvent('exit_intent_popup_dismissed', { source: 'exit_intent' })
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  validationError.value = ''
  
  // Validate email
  if (!email.value) {
    validationError.value = 'Please enter your email'
    return
  }
  
  if (!validateEmail(email.value)) {
    validationError.value = 'Please enter a valid email address'
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Track conversion
    trackEvent('exit_intent_popup_submit', { source: 'exit_intent' })
    trackConversion('exit_intent', 'signup')
    
    // Submit using the composable
    const result = await submitEmail(email.value, 'popup', {
      interested_in: 'orchestrator',
      offer: '50_percent_off'
    })
    
    if (result.success) {
      isSubmitted.value = true
      successMessage.value = result.message
      trackEvent('exit_intent_popup_success', { source: 'exit_intent' })
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        closePopup()
      }, 3000)
    } else {
      validationError.value = result.message
    }
  } catch (error) {
    console.error('Failed to submit email:', error)
    validationError.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Enable on tools pages and landing page
  const path = window.location.pathname
  if (path === '/' || path.startsWith('/json') || path.startsWith('/base64') || path.startsWith('/uuid')) {
    document.addEventListener('mouseleave', handleMouseLeave)
    pageLoadTime.value = Date.now()
  }
})

onUnmounted(() => {
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.exit-intent-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.exit-intent-modal {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.popup-content {
  text-align: center;
}

.emoji {
  font-size: 60px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  color: #1a1a1a;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.subtext {
  font-size: 16px;
  color: #666;
  margin: 0 0 20px 0;
}

.subtext strong {
  color: #6366f1;
}

.offer-badge {
  display: inline-block;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  border: 1px solid #fcd34d;
}

.success-state {
  padding: 20px 0;
}

.success-state h3 {
  color: #1f293b;
}

.email-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.email-input {
  width: 100%;
  padding: 14px 18px;
  font-size: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.email-input:focus {
  outline: none;
  border-color: #6366f1;
}

.email-input.error {
  border-color: #ef4444;
}

.submit-btn {
  width: 100%;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-text {
  color: #ef4444;
  font-size: 14px;
  margin: 0;
}

.benefits {
  text-align: left;
  margin-bottom: 20px;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  color: #374151;
}

.check {
  color: #10b981;
  font-weight: bold;
  font-size: 18px;
}

.no-spam {
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .exit-intent-modal {
    padding: 30px 20px;
  }

  h2 {
    font-size: 22px;
  }

  .emoji {
    font-size: 48px;
  }

  .email-form {
    flex-direction: column;
  }

  .submit-btn {
    width: 100%;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .exit-intent-modal {
    background: #1f2937;
  }

  h2 {
    color: #f9fafb;
  }

  .subtext {
    color: #9ca3af;
  }

  .email-input {
    background: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }

  .benefit {
    color: #d1d5db;
  }
}
</style>
