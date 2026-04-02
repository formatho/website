<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const password = ref('')

interface AnalysisResult {
  score: number
  level: string
  color: string
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
    noCommon: boolean
  }
  entropy: number
  crackTime: string
}

const analysis = computed<AnalysisResult>(() => {
  const pwd = password.value
  if (!pwd) {
    return {
      score: 0,
      level: 'None',
      color: 'bg-gray-400',
      checks: {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        noCommon: true
      },
      entropy: 0,
      crackTime: 'Instant'
    }
  }

  const checks = {
    length: pwd.length >= 12,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    numbers: /[0-9]/.test(pwd),
    symbols: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    noCommon: !['password', '123456', 'qwerty', 'admin', 'letmein'].includes(pwd.toLowerCase())
  }

  let poolSize = 0
  if (checks.lowercase) poolSize += 26
  if (checks.uppercase) poolSize += 26
  if (checks.numbers) poolSize += 10
  if (checks.symbols) poolSize += 32

  const entropy = pwd.length * Math.log2(poolSize || 1)

  let score = 0
  if (checks.length) score++
  if (checks.uppercase) score++
  if (checks.lowercase) score++
  if (checks.numbers) score++
  if (checks.symbols) score++
  if (checks.noCommon) score++

  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-emerald-500'
  ]
  const levelIndex = Math.min(Math.floor(score), 5)
  const level = levels[levelIndex] ?? 'Very Weak'
  const color = colors[levelIndex] ?? 'bg-red-500'

  // Estimate crack time (assuming 10 billion guesses per second)
  const combinations = Math.pow(2, entropy)
  const seconds = combinations / 10000000000
  let crackTime = ''
  if (seconds < 1) crackTime = 'Instant'
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`
  else if (seconds < 31536000 * 100) crackTime = `${Math.round(seconds / 31536000)} years`
  else if (seconds < 31536000 * 1000000)
    crackTime = `${Math.round(seconds / 31536000 / 1000)} thousand years`
  else crackTime = 'Millions of years+'

  return {
    score,
    level,
    color,
    checks,
    entropy: Math.round(entropy),
    crackTime
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Password Strength Analyzer</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Analyze Password</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 space-y-6">
        <div class="grid gap-2">
          <Label>Password</Label>
          <Input v-model="password" type="password" aria-label="Password to analyze" placeholder="Enter password to analyze..." />
        </div>

        <div v-if="password" class="space-y-4">
          <!-- Strength Bar -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span>Strength: {{ analysis.level }}</span>
              <span>{{ analysis.score }}/6 checks passed</span>
            </div>
            <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                :class="[analysis.color, 'h-full transition-all duration-300']"
                :style="{ width: `${(analysis.score / 6) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Entropy</div>
              <div class="text-2xl font-bold">{{ analysis.entropy }} bits</div>
            </div>
            <div class="p-4 rounded-lg bg-muted">
              <div class="text-sm text-muted-foreground">Estimated Crack Time</div>
              <div class="text-2xl font-bold">{{ analysis.crackTime }}</div>
            </div>
          </div>

          <!-- Checks -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.length
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.length ? '✓' : '✗' }}</span>
              <span class="text-sm">12+ characters</span>
            </div>
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.uppercase
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.uppercase ? '✓' : '✗' }}</span>
              <span class="text-sm">Uppercase</span>
            </div>
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.lowercase
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.lowercase ? '✓' : '✗' }}</span>
              <span class="text-sm">Lowercase</span>
            </div>
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.numbers
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.numbers ? '✓' : '✗' }}</span>
              <span class="text-sm">Numbers</span>
            </div>
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.symbols
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.symbols ? '✓' : '✗' }}</span>
              <span class="text-sm">Symbols</span>
            </div>
            <div
              :class="[
                'p-3 rounded-lg flex items-center gap-2',
                analysis.checks.noCommon
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-red-500/10 text-red-600'
              ]"
            >
              <span>{{ analysis.checks.noCommon ? '✓' : '✗' }}</span>
              <span class="text-sm">Not common</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
