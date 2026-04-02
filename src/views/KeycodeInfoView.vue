<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const keyInfo = ref<{
  key: string
  keyCode: number
  code: string
  which: number
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  metaKey: boolean
  location: number
} | null>(null)

const handleKeyDown = (e: KeyboardEvent) => {
  keyInfo.value = {
    key: e.key,
    keyCode: e.keyCode,
    code: e.code,
    which: e.which,
    altKey: e.altKey,
    ctrlKey: e.ctrlKey,
    shiftKey: e.shiftKey,
    metaKey: e.metaKey,
    location: e.location
  }
  e.preventDefault()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Keycode Info</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Press Any Key</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Click here and press any key..."
          aria-label="Keycode detector - press any key"
          class="text-center text-xl h-16"
          readonly
          :model-value="keyInfo?.key || ''"
        />
      </CardContent>
    </Card>

    <div v-if="keyInfo" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Key</div>
          <div class="text-3xl font-mono font-bold">{{ keyInfo.key }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">KeyCode (deprecated)</div>
          <div class="text-3xl font-mono font-bold">{{ keyInfo.keyCode }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Code</div>
          <div class="text-xl font-mono font-bold">{{ keyInfo.code }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Which (deprecated)</div>
          <div class="text-3xl font-mono font-bold">{{ keyInfo.which }}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6 text-center">
          <div class="text-sm text-muted-foreground">Location</div>
          <div class="text-3xl font-mono font-bold">{{ keyInfo.location }}</div>
          <div class="text-xs text-muted-foreground mt-1">
            {{
              keyInfo.location === 0
                ? 'Standard'
                : keyInfo.location === 1
                  ? 'Left'
                  : keyInfo.location === 2
                    ? 'Right'
                    : 'Numpad'
            }}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="pt-6">
          <div class="text-sm text-muted-foreground mb-3">Modifiers</div>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div
              :class="[
                'p-2 rounded text-center',
                keyInfo.ctrlKey ? 'bg-green-500/10 text-green-600' : 'bg-muted'
              ]"
            >
              Ctrl: {{ keyInfo.ctrlKey ? 'Yes' : 'No' }}
            </div>
            <div
              :class="[
                'p-2 rounded text-center',
                keyInfo.altKey ? 'bg-green-500/10 text-green-600' : 'bg-muted'
              ]"
            >
              Alt: {{ keyInfo.altKey ? 'Yes' : 'No' }}
            </div>
            <div
              :class="[
                'p-2 rounded text-center',
                keyInfo.shiftKey ? 'bg-green-500/10 text-green-600' : 'bg-muted'
              ]"
            >
              Shift: {{ keyInfo.shiftKey ? 'Yes' : 'No' }}
            </div>
            <div
              :class="[
                'p-2 rounded text-center',
                keyInfo.metaKey ? 'bg-green-500/10 text-green-600' : 'bg-muted'
              ]"
            >
              Meta: {{ keyInfo.metaKey ? 'Yes' : 'No' }}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
