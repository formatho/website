<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const username = ref('')
const password = ref('')
const header = ref('')

const generate = () => {
  const credentials = btoa(`${username.value}:${password.value}`)
  header.value = `Authorization: Basic ${credentials}`
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">HTTP Basic Auth Generator</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Generate Basic Auth Header</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label>Username</Label>
            <Input v-model="username" placeholder="Enter username..." />
          </div>
          <div class="grid gap-2">
            <Label>Password</Label>
            <Input v-model="password" type="password" placeholder="Enter password..." />
          </div>
        </div>

        <Button @click="generate" class="w-full md:w-auto" aria-label="Generate Basic Auth credentials">Generate</Button>

        <div v-if="header" class="space-y-2">
          <Label>Authorization Header</Label>
          <div class="p-4 rounded-lg bg-muted font-mono text-sm break-all">
            {{ header }}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
