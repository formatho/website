<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)
const isRecording = ref(false)
const recordedChunks = ref<Blob[]>([])
const mediaRecorder = ref<MediaRecorder | null>(null)
const recordedVideoUrl = ref('')
const facingMode = ref<'user' | 'environment'>('user')

const startCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facingMode.value },
      audio: true
    })
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
    }
  } catch (e) {
    console.error('Failed to start camera:', e)
  }
}

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
    stream.value = null
  }
}

const toggleCamera = async () => {
  facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
  stopCamera()
  await startCamera()
}

const startRecording = () => {
  if (!stream.value) return

  recordedChunks.value = []
  mediaRecorder.value = new MediaRecorder(stream.value)

  mediaRecorder.value.ondataavailable = (e) => {
    if (e.data.size > 0) {
      recordedChunks.value.push(e.data)
    }
  }

  mediaRecorder.value.onstop = () => {
    const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
    recordedVideoUrl.value = URL.createObjectURL(blob)
  }

  mediaRecorder.value.start()
  isRecording.value = true
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}

const downloadRecording = () => {
  const a = document.createElement('a')
  a.href = recordedVideoUrl.value
  a.download = `recording-${Date.now()}.webm`
  a.click()
}

onMounted(() => {
  startCamera()
})

onUnmounted(() => {
  stopCamera()
})
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Camera Recorder</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
      <Card class="flex flex-col min-h-0">
        <CardHeader>
          <CardTitle>Camera</CardTitle>
        </CardHeader>
        <CardContent class="flex-1 min-h-0 space-y-4">
          <video
            ref="videoRef"
            autoplay
            playsinline
            class="w-full rounded-lg bg-black"
            style="max-height: 400px"
          ></video>
          <div class="flex gap-2 flex-wrap">
            <Button @click="startCamera" variant="outline" size="sm" aria-label="Start camera">Start Camera</Button>
            <Button @click="toggleCamera" variant="outline" size="sm" aria-label="Toggle front/back camera">Toggle Camera</Button>
            <Button
              v-if="!isRecording"
              @click="startRecording"
              size="sm"
              class="bg-red-500 hover:bg-red-600"
            >
              Start Recording
            </Button>
            <Button v-else @click="stopRecording" size="sm" aria-label="Stop recording"> Stop Recording </Button>
          </div>
        </CardContent>
      </Card>

      <Card v-if="recordedVideoUrl" class="flex flex-col min-h-0">
        <CardHeader class="flex-row items-center justify-between">
          <CardTitle>Recording</CardTitle>
          <Button variant="outline" size="sm" @click="downloadRecording" aria-label="Download recording">Download</Button>
        </CardHeader>
        <CardContent class="flex-1 min-h-0">
          <video
            :src="recordedVideoUrl"
            controls
            class="w-full rounded-lg"
            style="max-height: 400px"
          ></video>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
