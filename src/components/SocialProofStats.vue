<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users, Wrench, Activity, Shield } from 'lucide-vue-next'

const stats = ref([
  {
    icon: Users,
    value: 15000,
    target: 15000,
    suffix: '+',
    label: 'Monthly Users',
    prefix: ''
  },
  {
    icon: Wrench,
    value: 100,
    target: 100,
    suffix: '+',
    label: 'Developer Tools',
    prefix: ''
  },
  {
    icon: Activity,
    value: 99.9,
    target: 99.9,
    suffix: '%',
    label: 'Uptime',
    prefix: ''
  },
  {
    icon: Shield,
    value: 0,
    target: 0,
    suffix: '',
    label: 'Data Leaks',
    prefix: ''
  }
])

const animateCounters = () => {
  stats.value.forEach((stat) => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = stat.target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= stat.target) {
        stat.value = stat.target
        clearInterval(timer)
      } else {
        stat.value = Math.floor(current)
      }
    }, stepDuration)
  })
}

onMounted(() => {
  // Trigger animation when component is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )

  const element = document.querySelector('#social-proof-stats')
  if (element) {
    observer.observe(element)
  }
})
</script>

<template>
  <div id="social-proof-stats" class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      class="text-center"
      data-aos="fade-up"
      :data-aos-delay="index * 100"
    >
      <div class="flex justify-center mb-3">
        <div class="p-3 rounded-full bg-primary/10">
          <component :is="stat.icon" class="w-6 h-6 text-primary" />
        </div>
      </div>
      <div class="text-3xl md:text-4xl font-bold text-foreground mb-2">
        {{ stat.prefix }}{{ stat.value }}{{ stat.suffix }}
      </div>
      <div class="text-sm text-muted-foreground font-medium">
        {{ stat.label }}
      </div>
    </div>
  </div>
</template>
