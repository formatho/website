<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'sql-formatter'
import { Copy, RefreshCw } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const inputSql = ref('SELECT * FROM users WHERE id = 1')
const outputSql = ref('')
const dialect = ref('sql')
const error = ref('')

const formatSql = () => {
  try {
    error.value = ''
    outputSql.value = format(inputSql.value, { language: dialect.value as any })
  } catch (e: any) {
    error.value = e.message
  }
}

const copyToClipboard = async () => {
  if (!outputSql.value) return
  await navigator.clipboard.writeText(outputSql.value)
}

// Initial format
formatSql()
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">SQL Formatter</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Input Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Input SQL</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 flex flex-col gap-4 min-h-0">
          <div class="flex gap-4">
            <div class="flex-1 space-y-2">
              <Label>Dialect</Label>
              <Select v-model="dialect">
                <SelectTrigger>
                  <SelectValue placeholder="Select dialect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sql">Standard SQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="sqlite">SQLite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-end">
              <Button @click="formatSql"> <RefreshCw class="mr-2 h-4 w-4" /> Format </Button>
            </div>
          </div>
          <CodeEditor
            v-model="inputSql"
            language="sql"
            class="flex-1 min-h-0"
            placeholder="Paste your SQL here..."
          />
        </CardContent>
      </Card>

      <!-- Output Column -->
      <Card class="flex flex-col min-h-0 bg-muted/50">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Formatted Output</CardTitle>
          <Button variant="ghost" size="icon" @click="copyToClipboard" :disabled="!outputSql">
            <Copy class="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent class="flex-1 flex flex-col min-h-0 pt-6">
          <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
            {{ error }}
          </div>
          <CodeEditor
            :model-value="outputSql"
            language="sql"
            readonly
            class="flex-1 min-h-0"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
