<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const deviceInfo = ref({
  userAgent: '',
  platform: '',
  vendor: '',
  language: '',
  languages: [] as string[],
  cookieEnabled: false,
  onLine: false,
  screenWidth: 0,
  screenHeight: 0,
  viewportWidth: 0,
  viewportHeight: 0,
  colorDepth: 0,
  pixelRatio: 1,
  hardwareConcurrency: 0,
  deviceMemory: 0,
  maxTouchPoints: 0,
  timezone: '',
  timezoneOffset: '',
  connection: {
    effectiveType: '',
    downlink: 0,
    rtt: 0,
    saveData: false
  }
})

const browserName = computed(() => {
  const ua = deviceInfo.value.userAgent
  if (ua.includes('Edg/')) return 'Microsoft Edge'
  if (ua.includes('OPR/') || ua.includes('Opera')) return 'Opera'
  if (ua.includes('Chrome/') && !ua.includes('Edg/')) return 'Google Chrome'
  if (ua.includes('Firefox/')) return 'Mozilla Firefox'
  if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari'
  return 'Unknown'
})

const osName = computed(() => {
  const ua = deviceInfo.value.userAgent
  const platform = deviceInfo.value.platform
  if (/Win/i.test(platform) || /Windows/i.test(ua)) return 'Windows'
  if (/Mac/i.test(platform) || /Macintosh/i.test(ua)) return 'macOS'
  if (/Linux/i.test(platform) || /Linux/i.test(ua)) return 'Linux'
  if (/Android/i.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS'
  return platform || 'Unknown'
})

const deviceType = computed(() => {
  const ua = deviceInfo.value.userAgent
  if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile'
  if (/iPad|Tablet/i.test(ua)) return 'Tablet'
  return 'Desktop'
})

const copied = ref(false)

const copyAll = async () => {
  const info = deviceInfo.value
  const text = `Device Information
==================
Browser: ${browserName.value}
OS: ${osName.value}
Device Type: ${deviceType.value}
Vendor: ${info.vendor}
Languages: ${info.languages.join(', ') || info.language}
Cookies: ${info.cookieEnabled ? 'Enabled' : 'Disabled'}
Online: ${info.onLine ? 'Yes' : 'No'}

Screen: ${info.screenWidth} x ${info.screenHeight}
Viewport: ${info.viewportWidth} x ${info.viewportHeight}
Color Depth: ${info.colorDepth}-bit
Pixel Ratio: ${info.pixelRatio}x

CPU Cores: ${info.hardwareConcurrency}
Memory: ${info.deviceMemory || 'Unknown'} GB
Touch Points: ${info.maxTouchPoints}

Network: ${info.connection.effectiveType} (${info.connection.downlink} Mbps, ${info.connection.rtt}ms RTT)
Save Data: ${info.connection.saveData ? 'On' : 'Off'}

Timezone: ${info.timezone} (UTC${info.timezoneOffset})

User Agent: ${info.userAgent}`

  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (e) {
    // fallback
  }
}

const updateViewport = () => {
  deviceInfo.value.viewportWidth = window.innerWidth
  deviceInfo.value.viewportHeight = window.innerHeight
}

onMounted(() => {
  const nav = navigator as any
  const offset = -new Date().getTimezoneOffset() / 60
  deviceInfo.value = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: navigator.languages ? [...navigator.languages] : [navigator.language],
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenWidth: screen.width,
    screenHeight: screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: nav.deviceMemory || 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: offset >= 0 ? `+${offset}` : `${offset}`,
    connection: {
      effectiveType: nav.connection?.effectiveType || 'Unknown',
      downlink: nav.connection?.downlink || 0,
      rtt: nav.connection?.rtt || 0,
      saveData: nav.connection?.saveData || false
    }
  }

  window.addEventListener('resize', updateViewport)
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Device Information</h1>
        <p class="text-sm text-muted-foreground mt-1">
          {{ browserName }} · {{ osName }} · {{ deviceType }}
        </p>
      </div>
      <Button variant="outline" size="sm" @click="copyAll">
        {{ copied ? '✓ Copied!' : 'Copy All' }}
      </Button>
    </div>

    <p class="text-xs text-muted-foreground">
      All data is displayed locally in your browser. Nothing is sent to any server.
    </p>

    <!-- Summary Banner -->
    <div class="flex flex-wrap gap-2">
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium">
        {{ browserName }}
      </span>
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium">
        {{ osName }}
      </span>
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium">
        {{ deviceType }}
      </span>
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium">
        {{ deviceInfo.screenWidth }} × {{ deviceInfo.screenHeight }}
      </span>
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium">
        {{ deviceInfo.hardwareConcurrency }} CPU cores
      </span>
      <span class="px-3 py-1.5 rounded-lg bg-foreground/5 border border-foreground/10 text-xs font-medium" :class="{ 'opacity-50': !deviceInfo.onLine }">
        {{ deviceInfo.onLine ? '🟢 Online' : '🔴 Offline' }}
      </span>
      <span v-if="deviceInfo.connection.saveData" class="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-600">
        Data Saver On
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Browser -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">🌐 Browser</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Browser</span><span class="font-medium text-right">{{ browserName }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Vendor</span><span class="font-medium">{{ deviceInfo.vendor }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Language</span><span class="font-medium">{{ deviceInfo.language }}</span></div>
          <div v-if="deviceInfo.languages.length > 1" class="flex justify-between"><span class="text-muted-foreground">All Languages</span><span class="font-medium text-right text-xs">{{ deviceInfo.languages.join(', ') }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Cookies</span><span class="font-medium">{{ deviceInfo.cookieEnabled ? '✅ Enabled' : '❌ Disabled' }}</span></div>
        </CardContent>
      </Card>

      <!-- Display -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">🖥️ Display</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Screen</span><span class="font-medium">{{ deviceInfo.screenWidth }} × {{ deviceInfo.screenHeight }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Viewport</span><span class="font-medium">{{ deviceInfo.viewportWidth }} × {{ deviceInfo.viewportHeight }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Color Depth</span><span class="font-medium">{{ deviceInfo.colorDepth }}-bit</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Pixel Ratio</span><span class="font-medium">{{ deviceInfo.pixelRatio }}x</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Touch Points</span><span class="font-medium">{{ deviceInfo.maxTouchPoints }}</span></div>
        </CardContent>
      </Card>

      <!-- Hardware -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">⚙️ Hardware</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">OS</span><span class="font-medium">{{ osName }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Platform</span><span class="font-medium text-xs text-right">{{ deviceInfo.platform }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">CPU Cores</span><span class="font-medium">{{ deviceInfo.hardwareConcurrency || 'Unknown' }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Memory</span><span class="font-medium">{{ deviceInfo.deviceMemory ? deviceInfo.deviceMemory + ' GB' : 'Unknown' }}</span></div>
        </CardContent>
      </Card>

      <!-- Network -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">📡 Network</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Type</span><span class="font-medium uppercase">{{ deviceInfo.connection.effectiveType }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Downlink</span><span class="font-medium">{{ deviceInfo.connection.downlink }} Mbps</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Latency (RTT)</span><span class="font-medium">{{ deviceInfo.connection.rtt }} ms</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Save Data</span><span class="font-medium">{{ deviceInfo.connection.saveData ? 'On' : 'Off' }}</span></div>
        </CardContent>
      </Card>

      <!-- Location & Time -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">🕐 Location & Time</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Timezone</span><span class="font-medium">{{ deviceInfo.timezone }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">UTC Offset</span><span class="font-medium">UTC{{ deviceInfo.timezoneOffset }}</span></div>
        </CardContent>
      </Card>

      <!-- Status -->
      <Card>
        <CardHeader>
          <CardTitle class="text-sm">✅ Status</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2.5 text-sm">
          <div class="flex justify-between"><span class="text-muted-foreground">Connection</span><span class="font-medium">{{ deviceInfo.onLine ? '🟢 Online' : '🔴 Offline' }}</span></div>
          <div class="flex justify-between"><span class="text-muted-foreground">Cookies</span><span class="font-medium">{{ deviceInfo.cookieEnabled ? 'Enabled' : 'Disabled' }}</span></div>
        </CardContent>
      </Card>
    </div>

    <!-- User Agent -->
    <Card>
      <CardHeader>
        <CardTitle class="text-sm">User Agent String</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="p-3 rounded bg-muted font-mono text-xs break-all text-muted-foreground">
          {{ deviceInfo.userAgent }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
