<template>
  <section class="trust-signals">
    <div class="container">
      <div class="signals-grid">
        <div v-for="signal in signals" :key="signal.id" class="signal-card">
          <div class="icon">{{ signal.icon }}</div>
          <div class="content">
            <h3>{{ signal.title }}</h3>
            <p>{{ signal.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const signals = ref([
  {
    id: 'security',
    icon: '🔒',
    title: 'Enterprise-Grade Security',
    description: '256-bit SSL encryption. Your data never leaves your control.'
  },
  {
    id: 'privacy',
    icon: '🛡️',
    title: 'Privacy First',
    description: 'No tracking cookies. No data selling. GDPR compliant.'
  },
  {
    id: 'uptime',
    icon: '⚡',
    title: '99.9% Uptime',
    description: 'Built on enterprise infrastructure. Always available.'
  },
  {
    id: 'support',
    icon: '💬',
    title: 'Priority Support',
    description: 'Direct access to founders. Response in < 4 hours.'
  }
])
</script>

<style scoped>
.trust-signals {
  padding: 60px 0;
  background: linear-gradient(180deg, #f9fafb 0%, #ffffff 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.signals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.signal-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.signal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 36px;
  flex-shrink: 0;
}

.content h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 6px 0;
}

.content p {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 640px) {
  .trust-signals {
    padding: 40px 0;
  }

  .signals-grid {
    grid-template-columns: 1fr;
  }
}
</style>
