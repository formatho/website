<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ============================================
// DATA HOOK - Easy to replace with API call
// ============================================
const INITIAL_VISITORS = 12847 // Starting count
const VISITOR_INCREMENT_INTERVAL = 5000 // Increment every 5 seconds
const LIVE_USER_UPDATE_INTERVAL = 3000 // Update live users every 3 seconds

// State
const monthlyVisitors = ref(INITIAL_VISITORS)
const liveUsers = ref(1)
let visitorInterval: number | undefined
let liveUserInterval: number | undefined

// Format number with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US')
}

// Smoothly increment visitors (simulating real-time traffic)
const incrementVisitors = () => {
  // Increment by random amount (1-3 visitors)
  const increment = Math.floor(Math.random() * 3) + 1
  monthlyVisitors.value += increment
}

// Simulate live users (1-50, fluctuating every 3 seconds)
const updateLiveUsers = () => {
  // Random fluctuation: +/- 1-5 users, staying within 1-50 range
  const change = Math.floor(Math.random() * 11) - 5 // -5 to +5
  liveUsers.value = Math.max(1, Math.min(50, liveUsers.value + change))
}

onMounted(() => {
  // Initialize live users
  liveUsers.value = Math.floor(Math.random() * 50) + 1

  // Start continuous increment for visitors
  visitorInterval = window.setInterval(incrementVisitors, VISITOR_INCREMENT_INTERVAL)

  // Start live user simulation
  liveUserInterval = window.setInterval(updateLiveUsers, LIVE_USER_UPDATE_INTERVAL)
})

onUnmounted(() => {
  if (visitorInterval) {
    clearInterval(visitorInterval)
  }
  if (liveUserInterval) {
    clearInterval(liveUserInterval)
  }
})
</script>

<template>
  <div class="analytics-widget">
    <div class="analytics-card">
      <!-- Live Users -->
      <div class="metric">
        <div class="metric-header">
          <span class="pulse-dot"></span>
          <span class="metric-label">Live Users</span>
        </div>
        <div class="metric-value">
          <span class="number">{{ liveUsers }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Monthly Traffic Counter -->
      <div class="metric">
        <div class="metric-header">
          <span class="metric-label">Visitors This Month</span>
        </div>
        <div class="metric-value">
          <span class="number">{{ formatNumber(monthlyVisitors) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.analytics-card {
  /* Liquid Glass Effect */
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(156, 163, 175, 0.4); /* Grey border */
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  transition: all 0.3s ease;
}

.analytics-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(156, 163, 175, 0.6); /* Brighter grey on hover */
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.metric-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff; /* Sharp white color */
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.number {
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for better readability */
}

.divider {
  height: 1px;
  background: rgba(156, 163, 175, 0.3); /* Grey divider */
  margin: 12px 0;
}

/* Pulsing indicator dot */
.pulse-dot {
  width: 8px;
  height: 8px;
  background: hsl(142 76% 36%);
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .analytics-widget {
    bottom: 10px;
    right: 10px;
  }

  .analytics-card {
    padding: 12px 16px;
    min-width: 180px;
  }

  .metric-value {
    font-size: 22px;
  }

  .metric-label {
    font-size: 10px;
  }
}

/* Ensure it doesn't block important elements */
@media (max-width: 480px) {
  .analytics-widget {
    /* Move above bottom navigation if present */
    bottom: 70px;
  }
}

/* Dark mode adjustment */
@media (prefers-color-scheme: dark) {
  .analytics-card {
    background: rgba(0, 0, 0, 0.5);
    border-color: rgba(156, 163, 175, 0.5); /* Grey border for dark mode */
  }
}
</style>
