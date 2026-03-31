<script setup lang="ts">
import { ref } from 'vue'
import Papa from 'papaparse'
import { FileJson, FileSpreadsheet, Download } from 'lucide-vue-next'
import FileSaver from 'file-saver'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

const jsonInput = ref('')
const csvInput = ref('')
const error = ref('')

const convertToCsv = () => {
  error.value = ''
  try {
    const obj = JSON.parse(jsonInput.value)
    const data = Array.isArray(obj) ? obj : [obj]
    csvInput.value = Papa.unparse(data)
  } catch (e: any) {
    error.value = 'Invalid JSON: ' + e.message
  }
}

const convertToJson = () => {
  error.value = ''
  try {
    const result = Papa.parse(csvInput.value, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true
    })

    if (result.errors && result.errors.length > 0) {
      error.value = 'CSV Error: ' + (result.errors?.[0]?.message || 'Unknown error')
      return
    }

    jsonInput.value = JSON.stringify(result.data, null, 2)
  } catch (e: any) {
    error.value = 'Conversion Error: ' + e.message
  }
}

const downloadCsv = () => {
  if (!csvInput.value) return
  const blob = new Blob([csvInput.value], { type: 'text/csv;charset=utf-8' })
  FileSaver.saveAs(blob, 'export.csv')
}

// Sample data
const fillSample = () => {
  jsonInput.value = JSON.stringify(
    [
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'London' },
      { name: 'Bob Johnson', age: 35, city: 'Paris' }
    ],
    null,
    2
  )
  convertToCsv()
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">JSON &lt;-&gt; CSV Converter</h1>
      <Button variant="ghost" @click="fillSample" aria-label="Load sample JSON data">Load Sample</Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- JSON Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileJson class="h-4 w-4" /> JSON (Array)
          </CardTitle>
          <Button size="sm" @click="convertToCsv"> To CSV -&gt; </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="jsonInput"
            language="json"
            class="h-full"
            placeholder='[{"name": "Alice", "age": 25}, ...]'
          />
        </CardContent>
        <CardDescription class="px-6 pb-4">
          Convert JSON data to CSV format and vice versa.
        </CardDescription>
      </Card>

      <!-- CSV Column -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            <FileSpreadsheet class="h-4 w-4" /> CSV
          </CardTitle>
          <div class="flex gap-2">
            <Button size="sm" @click="convertToJson" variant="secondary"> &lt;- To JSON </Button>
            <Button size="icon" variant="outline" @click="downloadCsv" :disabled="!csvInput">
              <Download class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <CodeEditor
            v-model="csvInput"
            language="plaintext"
            class="h-full"
            placeholder="name,age,city..."
          />
        </CardContent>
      </Card>
    </div>

    <div v-if="error" class="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>
</template>
