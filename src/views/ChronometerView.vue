<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const time = ref(0)
const isRunning = ref(false)
const isPaused = ref(false)
let interval: number | null = null

const start = () => {
  isRunning.value = true
  isPaused.value = false
  interval = window.setInterval(() => {
    time.value += 10
  }, 10)
}

const pause = () => {
  isPaused.value = true
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const resume = () => {
  isPaused.value = false
  interval = window.setInterval(() => {
    time.value += 10
  }, 10)
}

const reset = () => {
  isRunning.value = false
  isPaused.value = false
  time.value = 0
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const formatTime = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  const milliseconds = Math.floor((ms % 1000) / 10)

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Chronometer</h1>
    </div>

    <Card>
      <CardContent class="pt-8 pb-8 text-center">
        <div class="text-6xl md:text-8xl font-mono font-bold tracking-tight">
          {{ formatTime(time) }}
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardContent class="pt-6">
        <div class="flex gap-2 justify-center flex-wrap">
          <Button v-if="!isRunning" @click="start" size="lg" aria-label="Start chronometer">Start</Button>
          <Button v-if="isRunning && !isPaused" @click="pause" variant="secondary" size="lg"
            aria-label="Pause chronometer">Pause</Button
          >
          <Button v-if="isRunning && isPaused" @click="resume" size="lg" aria-label="Resume chronometer">Resume</Button>
          <Button v-if="isRunning" @click="reset" variant="destructive" size="lg" aria-label="Reset chronometer">Reset</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
