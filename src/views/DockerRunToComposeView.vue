<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import CodeEditor from '@/components/CodeEditor.vue'

const dockerRunInput = ref('')
const dockerComposeOutput = ref('')

const convertToCompose = () => {
  if (!dockerRunInput.value.trim()) {
    dockerComposeOutput.value = ''
    return
  }

  const args = parseDockerRun(dockerRunInput.value)
  const compose = generateCompose(args)
  dockerComposeOutput.value = compose
}

interface DockerArgs {
  image: string
  name?: string
  ports: string[]
  volumes: string[]
  environment: string[]
  network?: string
  restart?: string
  command?: string
}

const parseDockerRun = (cmd: string): DockerArgs => {
  const tokens = cmd.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || []
  const args: DockerArgs = {
    image: '',
    ports: [],
    volumes: [],
    environment: []
  }

  let i = 0
  while (i < tokens.length) {
    const token = tokens[i]
    if (!token) {
      i++
      continue
    }

    if (token === '-p' || token === '--publish') {
      const port = tokens[++i]
      if (port) args.ports.push(port)
    } else if (token === '-v' || token === '--volume') {
      const vol = tokens[++i]
      if (vol) args.volumes.push(vol)
    } else if (token === '-e' || token === '--env') {
      const env = tokens[++i]
      if (env) args.environment.push(env)
    } else if (token === '--name') {
      args.name = tokens[++i]
    } else if (token === '--network') {
      args.network = tokens[++i]
    } else if (token === '--restart') {
      args.restart = tokens[++i]
    } else if (!token.startsWith('-') && !args.image) {
      args.image = token
    } else if (args.image && i === tokens.length - 1) {
      args.command = token
    }

    i++
  }

  return args
}

const generateCompose = (args: DockerArgs): string => {
  const imageParts = args.image.split('/')
  const namePart = (imageParts[0] ?? args.image).split(':')[0] ?? args.image
  const serviceName = args.name || namePart

  let compose = `version: '3.8'\n\nservices:\n  ${serviceName}:\n`
  compose += `    image: ${args.image}\n`

  if (args.name) {
    compose += `    container_name: ${args.name}\n`
  }

  if (args.restart) {
    compose += `    restart: ${args.restart}\n`
  }

  if (args.ports.length > 0) {
    compose += '    ports:\n'
    args.ports.forEach((p) => {
      compose += `      - "${p}"\n`
    })
  }

  if (args.volumes.length > 0) {
    compose += '    volumes:\n'
    args.volumes.forEach((v) => {
      compose += `      - ${v}\n`
    })
  }

  if (args.environment.length > 0) {
    compose += '    environment:\n'
    args.environment.forEach((e) => {
      compose += `      - ${e}\n`
    })
  }

  if (args.command) {
    compose += `    command: ${args.command}\n`
  }

  return compose
}

const copyOutput = () => {
  navigator.clipboard.writeText(dockerComposeOutput.value)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Docker Run to Compose</h1>
    </div>

    <Card class="flex flex-col min-h-0">
      <CardHeader>
        <CardTitle>Docker Run Command</CardTitle>
      </CardHeader>
      <CardContent class="flex-1 min-h-0 space-y-4">
        <CodeEditor
          v-model="dockerRunInput"
          language="plaintext"
          class="min-h-[80px]"
          placeholder="docker run -d -p 80:80 --name nginx nginx:latest"
        />
        <Button @click="convertToCompose" aria-label="Convert Docker run command to docker-compose format">Convert</Button>
      </CardContent>
    </Card>

    <Card v-if="dockerComposeOutput" class="flex flex-col min-h-0">
      <CardHeader class="flex-row items-center justify-between">
        <CardTitle>docker-compose.yml</CardTitle>
        <Button variant="outline" size="sm" @click="copyOutput" aria-label="Copy docker-compose output">Copy</Button>
      </CardHeader>
      <CardContent class="flex-1 min-h-0">
        <CodeEditor
          :model-value="dockerComposeOutput"
          language="yaml"
          readonly
          class="min-h-[400px]"
        />
      </CardContent>
    </Card>
  </div>
</template>
