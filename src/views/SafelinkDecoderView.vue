<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const safelinkUrl = ref('')

const decodedUrl = computed(() => {
  if (!safelinkUrl.value) return null

  try {
    const url = new URL(safelinkUrl.value)

    // Outlook safelink format: https://safelink.protection.outlook.com/?url=...
    if (url.hostname.includes('safelink.protection.outlook.com')) {
      const encodedUrl = url.searchParams.get('url')
      if (encodedUrl) {
        return decodeURIComponent(encodedUrl)
      }
    }

    return null
  } catch (e) {
    return null
  }
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Outlook Safelink Decoder</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Decode Safelink</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Outlook Safelink URL</Label>
          <Input
            v-model="safelinkUrl"
            placeholder="Paste Outlook safelink URL here..."
            class="font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>

    <Card v-if="decodedUrl">
      <CardHeader>
        <CardTitle>Decoded URL</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
          <a
            :href="decodedUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-900"
          >
            {{ decodedUrl }}
          </a>
        </div>
      </CardContent>
    </Card>

    <Card v-else-if="safelinkUrl && !decodedUrl">
      <CardContent class="pt-6">
        <div class="p-4 rounded-lg bg-orange-500/10 text-orange-600 text-sm">
          Invalid Outlook safelink or not a safelink URL
        </div>
      </CardContent>
    </Card>
  </div>
</template>
