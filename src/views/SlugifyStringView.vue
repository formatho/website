<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputText = ref('')

const slug = computed(() => {
  return inputText.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Slugify String</h1>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Generate URL-Friendly Slug</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>Input Text</Label>
          <Input v-model="inputText" aria-label="Text to slugify" placeholder="Enter text to slugify..." />
        </div>

        <div v-if="slug" class="grid gap-2">
          <Label>Slug</Label>
          <div class="p-4 rounded-lg bg-muted font-mono text-lg break-all">
            {{ slug }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
