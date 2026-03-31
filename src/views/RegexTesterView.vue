<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { Code, Check, X, Copy } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const pattern = ref('')
const testString = ref('')
const flags = ref({
  g: true,
  i: false,
  m: false,
  s: false,
  u: false
})

const error = ref('')

interface Match {
  match: string
  index: number
  groups?: Record<string, string>
}

// Use a watcher to set errors instead of side effects in computed
const matches = computed<Match[]>(() => {
  if (!pattern.value || !testString.value) {
    return []
  }

  try {
    const flagString = Object.entries(flags.value)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')

    const regex = new RegExp(pattern.value, flagString)
    const results: Match[] = []

    if (flags.value.g) {
      let match
      while ((match = regex.exec(testString.value)) !== null) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.groups
        })
      }
    } else {
      const match = regex.exec(testString.value)
      if (match) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.groups
        })
      }
    }

    return results
  } catch (e: any) {
    // Return empty and let the error be caught by watchEffect
    return []
  }
})

// Watch for pattern changes and update error state
watchEffect(() => {
  if (!pattern.value || !testString.value) {
    error.value = ''
    return
  }
  try {
    const flagString = Object.entries(flags.value)
      .filter(([, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')
    new RegExp(pattern.value, flagString)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
})

const highlightedText = computed(() => {
  if (!pattern.value || !testString.value || matches.value.length === 0) {
    return testString.value
  }

  let result = ''
  let lastIndex = 0

  const sortedMatches = [...matches.value].sort((a, b) => a.index - b.index)

  for (const match of sortedMatches) {
    result += testString.value.slice(lastIndex, match.index)
    result += `<mark class="bg-yellow-300 text-black px-0.5 rounded">${match.match}</mark>`
    lastIndex = match.index + match.match.length
  }

  result += testString.value.slice(lastIndex)

  return result
})

const copyRegex = () => {
  const flagString = Object.entries(flags.value)
    .filter(([_, enabled]) => enabled)
    .map(([flag]) => flag)
    .join('')

  const regexString = `/${pattern.value}/${flagString}`
  navigator.clipboard.writeText(regexString)
}

const examples = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  {
    label: 'URL',
    pattern:
      'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
  },
  {
    label: 'Phone',
    pattern:
      '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}'
  },
  { label: 'IP Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
  { label: 'Hex Color', pattern: '#[0-9a-fA-F]{6}\\b|#[0-9a-fA-F]{3}\\b' }
]

const applyExample = (examplePattern: string) => {
  pattern.value = examplePattern
}
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold flex items-center gap-3">
          <Code class="w-8 h-8" />
          Regex Tester
        </h1>
        <p class="text-muted-foreground mt-2">
          Test regular expressions with real-time matching and highlighting.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Pattern Input -->
        <Card class="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pattern</CardTitle>
            <CardDescription>Regular expression pattern</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <!-- Pattern -->
            <div>
              <label class="block text-sm font-medium mb-2">Regex Pattern</label>
              <input
                v-model="pattern"
                type="text"
                placeholder="Enter regex pattern..."
                class="w-full px-3 py-2 border rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <!-- Flags -->
            <div>
              <label class="block text-sm font-medium mb-2">Flags</label>
              <div class="space-y-2">
                <label
                  v-for="(_enabled, flag) in flags"
                  :key="flag"
                  class="flex items-center gap-2"
                >
                  <input
                    v-model="flags[flag as keyof typeof flags]"
                    type="checkbox"
                    class="rounded"
                  />
                  <span class="font-mono">{{ flag }}</span>
                  <span class="text-sm text-muted-foreground">
                    <template v-if="flag === 'g'">Global</template>
                    <template v-else-if="flag === 'i'">Case insensitive</template>
                    <template v-else-if="flag === 'm'">Multiline</template>
                    <template v-else-if="flag === 's'">Dotall</template>
                    <template v-else-if="flag === 'u'">Unicode</template>
                  </span>
                </label>
              </div>
            </div>

            <!-- Examples -->
            <div>
              <label class="block text-sm font-medium mb-2">Examples</label>
              <div class="flex flex-wrap gap-2">
                <Button
                  v-for="example in examples"
                  :key="example.label"
                  variant="outline"
                  size="sm"
                  @click="applyExample(example.pattern)"
                >
                  {{ example.label }}
                </Button>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p class="text-sm text-red-500">{{ error }}</p>
            </div>

            <!-- Copy -->
            <Button v-if="pattern" @click="copyRegex" variant="outline" class="w-full">
              <Copy class="w-4 h-4 mr-2" />
              Copy Regex
            </Button>
          </CardContent>
        </Card>

        <!-- Test String & Matches -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Test String -->
          <Card>
            <CardHeader>
              <CardTitle>Test String</CardTitle>
              <CardDescription>Enter text to test against the pattern</CardDescription>
            </CardHeader>
            <CardContent>
            <CodeEditor
              v-model="testString"
              language="plaintext"
              class="min-h-[160px]"
              placeholder="Enter test string..."
            />
            </CardContent>
          </Card>

          <!-- Highlighted Result -->
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Highlighted matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                v-if="testString"
                v-html="highlightedText"
                class="w-full min-h-[100px] p-3 bg-surface rounded-md font-mono text-sm whitespace-pre-wrap"
              ></div>
              <div v-else class="text-center py-8 text-muted-foreground">
                <Code class="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Enter a test string to see matches</p>
              </div>
            </CardContent>
          </Card>

          <!-- Matches List -->
          <Card v-if="matches.length > 0">
            <CardHeader>
              <CardTitle>Matches ({{ matches.length }})</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="space-y-2">
                <div
                  v-for="(match, index) in matches"
                  :key="index"
                  class="flex items-start gap-3 p-3 bg-surface-hover rounded border"
                >
                  <div
                    class="text-gray-900"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="font-mono text-sm mb-1">{{ match.match }}</div>
                    <div class="text-xs text-muted-foreground">Index: {{ match.index }}</div>
                    <div v-if="match.groups" class="mt-2 text-xs">
                      <div class="font-medium mb-1">Groups:</div>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="(value, key) in match.groups"
                          :key="key"
                          class="px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs"
                        >
                          {{ key }}: {{ value }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <Check v-if="match" class="w-5 h-5 text-green-500" />
                    <X v-else class="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
