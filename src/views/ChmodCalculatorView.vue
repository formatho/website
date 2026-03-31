<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const permissions = ref({
  owner: { read: false, write: false, execute: false },
  group: { read: false, write: false, execute: false },
  others: { read: false, write: false, execute: false }
})

const chmodValue = computed(() => {
  const calcSection = (p: { read: boolean; write: boolean; execute: boolean }) => {
    return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0)
  }

  return (
    String(calcSection(permissions.value.owner)) +
    String(calcSection(permissions.value.group)) +
    String(calcSection(permissions.value.others))
  )
})

const symbolicValue = computed(() => {
  const calcSection = (p: { read: boolean; write: boolean; execute: boolean }) => {
    return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-')
  }

  return (
    calcSection(permissions.value.owner) +
    calcSection(permissions.value.group) +
    calcSection(permissions.value.others)
  )
})

const copyChmod = () => {
  navigator.clipboard.writeText(chmodValue.value)
}

const presetPermissions = [
  {
    name: '755',
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true }
  },
  {
    name: '644',
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    others: { read: true, write: false, execute: false }
  },
  {
    name: '777',
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: true, execute: true },
    others: { read: true, write: true, execute: true }
  },
  {
    name: '700',
    owner: { read: true, write: true, execute: true },
    group: { read: false, write: false, execute: false },
    others: { read: false, write: false, execute: false }
  }
]

const applyPreset = (preset: (typeof presetPermissions)[0]) => {
  permissions.value = JSON.parse(JSON.stringify(preset))
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Chmod Calculator</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <table class="w-full text-center">
            <thead>
              <tr>
                <th></th>
                <th>Read</th>
                <th>Write</th>
                <th>Execute</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(perm, category) in permissions" :key="category">
                <td class="py-2 font-semibold capitalize text-left">{{ category }}</td>
                <td class="py-2">
                  <input type="checkbox" v-model="perm.read" class="w-5 h-5" />
                </td>
                <td class="py-2">
                  <input type="checkbox" v-model="perm.write" class="w-5 h-5" />
                </td>
                <td class="py-2">
                  <input type="checkbox" v-model="perm.execute" class="w-5 h-5" />
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="text-center">
            <div class="text-gray-900">{{ chmodValue }}</div>
            <div class="text-2xl font-mono text-muted-foreground mt-2">{{ symbolicValue }}</div>
          </div>
          <Button @click="copyChmod" class="w-full" aria-label="Copy chmod command">Copy chmod {{ chmodValue }}</Button>

          <div class="space-y-2">
            <div class="text-sm font-semibold">Command:</div>
            <div class="p-3 rounded bg-muted font-mono text-sm">
              chmod {{ chmodValue }} file.txt
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Common Presets</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2 flex-wrap">
          <Button
            v-for="preset in presetPermissions"
            :key="preset.name"
            variant="outline"
            @click="applyPreset(preset)"
          >
            {{ preset.name }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
