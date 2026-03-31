<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { Copy, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const count = ref(1)
const uuids = ref<string[]>([])

const generate = () => {
  uuids.value = Array.from({ length: count.value }, () => uuidv4())
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

const copyAll = () => {
  navigator.clipboard.writeText(uuids.value.join('\n'))
}

// Initial Generation
generate()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">UUID Generator</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
      <!-- Controls -->
      <Card class="h-fit">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent class="grid gap-6">
          <div class="grid gap-2">
            <Label>Quantity</Label>
            <Input type="number" v-model.number="count" min="1" max="100" aria-label="Number of UUIDs to generate" />
          </div>
          <Button @click="generate" class="w-full" aria-label="Generate new UUIDs">
            <RefreshCw class="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button
            variant="secondary"
            @click="copyAll"
            class="w-full"
            :disabled="uuids.length === 0"
          >
            <Copy class="mr-2 h-4 w-4" />
            Copy All
          </Button>
        </CardContent>
      </Card>

      <!-- Output List -->
      <Card class="md:col-span-2 h-full flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Generated UUIDs</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-y-auto">
          <div class="space-y-2">
            <div
              v-for="(uuid, index) in uuids"
              :key="index"
              class="flex items-center justify-between p-3 rounded-md border border-border bg-muted/50 text-card-foreground shadow-sm hover:bg-muted transition-colors group"
            >
              <code class="text-sm font-mono">{{ uuid }}</code>
              <Button
                variant="ghost"
                size="icon"
                @click="copyToClipboard(uuid)"
                class="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
