<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const userAgent = ref('')

const parsedInfo = computed(() => {
  const ua = userAgent.value || (typeof navigator !== 'undefined' ? navigator.userAgent : '')

  const browserPatterns = [
    { name: 'Edge', pattern: /Edge\/(\d+)/ },
    { name: 'Opera', pattern: /OPR\/(\d+)/ },
    { name: 'Chrome', pattern: /Chrome\/(\d+)/ },
    { name: 'Firefox', pattern: /Firefox\/(\d+)/ },
    { name: 'Safari', pattern: /Version\/(\d+).*Safari/ },
    { name: 'IE', pattern: /MSIE (\d+)/ },
  ]
  
  const osPatterns = [
    { name: 'Windows 11', pattern: /Windows NT 11/ },
    { name: 'Windows 10', pattern: /Windows NT 10/ },
    { name: 'Windows', pattern: /Windows/ },
    { name: 'macOS', pattern: /Mac OS X/ },
    { name: 'Linux', pattern: /Linux/ },
    { name: 'Android', pattern: /Android/ },
    { name: 'iOS', pattern: /iPhone|iPad/ },
  ]
  
  const devicePatterns = [
    { name: 'Mobile', pattern: /Mobile/ },
    { name: 'Tablet', pattern: /Tablet|iPad/ },
    { name: 'Desktop', pattern: /./ },
  ]
  
  let browser = 'Unknown'
  let browserVersion = ''
  for (const { name, pattern } of browserPatterns) {
    const match = ua.match(pattern)
    if (match) {
      browser = name
      browserVersion = match[1] ?? ''
      break
    }
  }
  
  let os = 'Unknown'
  for (const { name, pattern } of osPatterns) {
    if (pattern.test(ua)) {
      os = name
      break
    }
  }
  
  let device = 'Unknown'
  for (const { name, pattern } of devicePatterns) {
    if (pattern.test(ua)) {
      device = name
      break
    }
  }
  
  return {
    browser,
    browserVersion,
    os,
    device,
    userAgent: ua
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">User Agent Parser</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Parse User Agent String</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>User Agent String</Label>
          <Input 
            v-model="userAgent" 
            placeholder="Enter user agent or leave empty to use your browser's..." 
          />
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Browser</div>
          <div class="text-2xl font-bold">{{ parsedInfo.browser }}</div>
          <div class="text-sm text-muted-foreground">v{{ parsedInfo.browserVersion }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Operating System</div>
          <div class="text-2xl font-bold">{{ parsedInfo.os }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Device Type</div>
          <div class="text-2xl font-bold">{{ parsedInfo.device }}</div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Full User Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
          {{ parsedInfo.userAgent }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>
