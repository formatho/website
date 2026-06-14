<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, Download, Maximize2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-vue-next'
import mermaid from 'mermaid'

// Mermaid init
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
})

const mermaidId = ref(0)

const defaultDiagram = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[Result]
    D --> E
    E --> F[End]`

const codeInput = ref(defaultDiagram)
const renderedSvg = ref('')
const error = ref('')
const zoomLevel = ref(100)
const isFullscreen = ref(false)

const themes = ['default', 'dark', 'forest', 'neutral', 'base'] as const
const currentTheme = ref<typeof themes[number]>('default')

const sampleDiagrams = [
  {
    name: 'Flowchart',
    code: `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[Result]
    D --> E
    E --> F[End]`
  },
  {
    name: 'Sequence',
    code: `sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant DB
    User->>Frontend: Click button
    Frontend->>API: POST /api/data
    API->>DB: INSERT query
    DB-->>API: Success
    API-->>Frontend: 201 Created
    Frontend-->>User: Show success`
  },
  {
    name: 'Class Diagram',
    code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +fetch()
    }
    class Cat {
        +String color
        +purr()
    }
    Animal <|-- Dog
    Animal <|-- Cat`
  },
  {
    name: 'Gantt Chart',
    code: `gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Research       :a1, 2024-01-01, 30d
    Design         :after a1, 20d
    section Development
    Frontend       :2024-02-20, 45d
    Backend        :2024-02-20, 40d
    section Testing
    QA Testing     :2024-04-15, 20d`
  },
  {
    name: 'Pie Chart',
    code: `pie title Technology Stack
    "JavaScript" : 40
    "TypeScript" : 25
    "Python" : 20
    "Rust" : 15`
  },
  {
    name: 'State Diagram',
    code: `stateDiagram-v2
    [*] --> Idle
    Idle --> Processing : Submit
    Processing --> Success : OK
    Processing --> Error : Fail
    Success --> Idle : Reset
    Error --> Idle : Retry`
  },
  {
    name: 'ER Diagram',
    code: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string email
    }
    ORDER ||--|{ LINE_ITEM : contains
    ORDER {
        int id
        date created
    }
    LINE_ITEM {
        string product
        int quantity
        float price
    }`
  },
  {
    name: 'Git Graph',
    code: `gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit`
  }
]

const renderDiagram = async () => {
  error.value = ''
  if (!codeInput.value.trim()) {
    renderedSvg.value = ''
    return
  }

  try {
    const id = `mermaid-${++mermaidId.value}`
    const { svg } = await mermaid.render(id, codeInput.value)
    renderedSvg.value = svg
  } catch (e: any) {
    // Mermaid puts errors in the DOM; clean up
    const errEl = document.getElementById(`dmermaid-${mermaidId.value}`)
    if (errEl) errEl.remove()
    error.value = e?.message || 'Invalid Mermaid syntax. Check your diagram code.'
    renderedSvg.value = ''
  }
}

// Debounced render
let renderTimeout: ReturnType<typeof setTimeout>
const debouncedRender = () => {
  clearTimeout(renderTimeout)
  renderTimeout = setTimeout(renderDiagram, 500)
}

watch(codeInput, debouncedRender)

watch(currentTheme, () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: currentTheme.value,
    securityLevel: 'loose',
    fontFamily: 'inherit',
  })
  renderDiagram()
})

const zoomIn = () => {
  if (zoomLevel.value < 300) zoomLevel.value += 25
}
const zoomOut = () => {
  if (zoomLevel.value > 25) zoomLevel.value -= 25
}
const resetZoom = () => {
  zoomLevel.value = 100
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const previewStyle = computed(() => ({
  transform: `scale(${zoomLevel.value / 100})`,
  transformOrigin: 'top center',
}))

const _copySvgToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(renderedSvg.value)
  } catch {
    error.value = 'Failed to copy to clipboard'
    setTimeout(() => { error.value = '' }, 2000)
  }
}

const downloadSvg = () => {
  const blob = new Blob([renderedSvg.value], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'diagram.svg'
  a.click()
  URL.revokeObjectURL(url)
}

const downloadPng = async () => {
  if (!renderedSvg.value) return

  const svgBlob = new Blob([renderedSvg.value], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const scale = 2
    canvas.width = img.width * scale
    canvas.height = img.height * scale
    const ctx = canvas.getContext('2d')!
    ctx.scale(scale, scale)
    ctx.drawImage(img, 0, 0)
    canvas.toBlob((blob) => {
      if (!blob) return
      const pngUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = pngUrl
      a.download = 'diagram.png'
      a.click()
      URL.revokeObjectURL(pngUrl)
    }, 'image/png')
    URL.revokeObjectURL(url)
  }
  img.src = url
}

const loadSample = (code: string) => {
  codeInput.value = code
}

onMounted(() => {
  renderDiagram()
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Mermaid Diagram Viewer</h1>
        <p class="text-sm text-muted-foreground mt-1">Render diagrams from Mermaid.js syntax — the same format AI tools like ChatGPT, Claude &amp; Copilot use natively</p>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <select
          v-model="currentTheme"
          class="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option v-for="t in themes" :key="t" :value="t">
            {{ t.charAt(0).toUpperCase() + t.slice(1) }} theme
          </option>
        </select>
      </div>
    </div>

    <!-- AI Context Banner -->
    <div class="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-foreground/5 border border-foreground/10">
      <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">🤖 AI Diagram Tips</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Paste ChatGPT/Claude Mermaid output directly</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Ask AI: "draw a flowchart using mermaid"</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">Ask AI: "create an ER diagram in mermaid syntax"</span>
      <span class="px-2.5 py-1 rounded-md bg-background text-[11px] text-muted-foreground font-medium border border-foreground/10">100% client-side</span>
    </div>

    <!-- Sample Diagrams -->
    <div class="flex gap-2 flex-wrap">
      <Button
        v-for="sample in sampleDiagrams"
        :key="sample.name"
        size="sm"
        variant="outline"
        @click="loadSample(sample.code)"
        class="text-xs"
      >
        {{ sample.name }}
      </Button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
      <!-- Code Editor -->
      <Card class="flex flex-col min-h-0">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium flex items-center gap-2">
            Mermaid Code
          </CardTitle>
          <Button
            size="icon"
            variant="outline"
            @click="async () => { await navigator.clipboard.writeText(codeInput); }"
            class="h-8 w-8"
          >
            <Copy class="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <Textarea
            v-model="codeInput"
            class="h-full resize-none font-mono text-sm"
            placeholder="Enter Mermaid diagram code..."
            spellcheck="false"
          />
        </CardContent>
      </Card>

      <!-- Preview -->
      <Card class="flex flex-col min-h-0" :class="{ 'fixed inset-0 z-50 rounded-none': isFullscreen }">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Preview</CardTitle>
          <div class="flex items-center gap-1">
            <Button size="icon" variant="ghost" @click="zoomOut" class="h-8 w-8">
              <ZoomOut class="h-4 w-4" />
            </Button>
            <span class="text-xs text-muted-foreground w-12 text-center">{{ zoomLevel }}%</span>
            <Button size="icon" variant="ghost" @click="zoomIn" class="h-8 w-8">
              <ZoomIn class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" @click="resetZoom" class="h-8 w-8">
              <RotateCcw class="h-4 w-4" />
            </Button>
            <div class="w-px h-5 bg-border mx-1" />
            <Button size="icon" variant="ghost" @click="downloadSvg" :disabled="!renderedSvg" class="h-8 w-8" title="Download SVG">
              <Download class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" @click="downloadPng" :disabled="!renderedSvg" class="h-8 w-8" title="Download PNG">
              <Download class="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" @click="toggleFullscreen" class="h-8 w-8" :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'">
              <Maximize2 class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 overflow-auto bg-white dark:bg-zinc-900 rounded-lg flex items-start justify-center p-4">
          <div
            v-if="renderedSvg"
            v-html="renderedSvg"
            class="transition-transform duration-200"
            :style="previewStyle"
          />
          <div v-else-if="!error" class="text-muted-foreground text-sm flex items-center justify-center h-full">
            Diagram preview will appear here...
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Error -->
    <div v-if="error" class="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
      {{ error }}
    </div>
  </div>

  <!-- Fullscreen backdrop click to close -->
  <div
    v-if="isFullscreen"
    class="fixed inset-0 z-40 bg-black/20 -inset-4"
    style="pointer-events: none;"
  />
</template>
