<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showPopup" class="exit-intent-overlay" @click.self="closePopup">
        <div class="exit-intent-modal">
          <button class="close-btn" @click="closePopup">&times;</button>
          
          <div class="popup-content">
            <div class="emoji">🎁</div>
            <h2>Wait! Don't Miss Out</h2>
            <p class="subtext">Get <strong>5 FREE AI Agents</strong> and start automating today</p>
            
            <form @submit.prevent="handleSubmit" class="email-form">
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                required
                class="email-input"
              />
              <button type="submit" class="submit-btn">
                Claim Free Agents
              </button>
            </form>
            
            <div class="benefits">
              <div class="benefit">
                <span class="check">✓</span>
                <span>5 Free Agents Forever</span>
              </div>
              <div class="benefit">
                <span class="check">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div class="benefit">
                <span class="check">✓</span>
                <span>Setup in 2 Minutes</span>
              </div>
            </div>
            
            <p class="no-spam">🔒 No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

const { trackEvent, trackConversion } = useAnalytics()

const showPopup = ref(false)
const email = ref('')
const hasShown = ref(false)

const handleMouseLeave = (e: MouseEvent) => {
  // Only trigger if mouse leaves from top of page
  if (e.clientY < 10 && !hasShown.value) {
    // Check if user has already seen popup
    const seen = localStorage.getItem('exit_intent_shown')
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
    localStorage.setItem('exit_intent_shown', 'true')
    
    // Track popup shown
    trackEvent('exit_intent_popup', 'conversion', 'shown')
  }
}

const closePopup = () => {
  showPopup.value = false
  localStorage.setItem('exit_intent_dismissed', Date.now().toString())
  
  // Track popup dismissed
  trackEvent('exit_intent_popup', 'conversion', 'dismissed')
}

const handleSubmit = async () => {
  try {
    // Track conversion
    trackEvent('exit_intent_popup', 'conversion', 'email_submitted')
    trackConversion('exit_intent', 'signup')
    
    // Submit email
    const response = await fetch('/api/beta-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    
    if (response.ok) {
      // Redirect to signup page with email pre-filled
      window.location.href = `/signup?email=${encodeURIComponent(email.value)}&source=exit_intent`
    }
  } catch (error) {
    console.error('Failed to submit email:', error)
  }
}

onMounted(() => {
  // Only enable on landing page
  if (window.location.pathname === '/') {
    document.addEventListener('mouseleave', handleMouseLeave)
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
  font-size: 32px;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.subtext {
  font-size: 18px;
  color: #666;
  margin: 0 0 30px 0;
}

.subtext strong {
  color: #6366f1;
}

.email-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.email-input {
  flex: 1;
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

.submit-btn {
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
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
    font-size: 24px;
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
</style>
