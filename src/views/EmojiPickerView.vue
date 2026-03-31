<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const searchQuery = ref('')
const selectedEmoji = ref('')
const copied = ref(false)

const emojiCategories = [
  {
    name: 'Smileys',
    emojis: [
      { emoji: '😀', name: 'Grinning Face' },
      { emoji: '😃', name: 'Grinning Face with Big Eyes' },
      { emoji: '😄', name: 'Grinning Face with Smiling Eyes' },
      { emoji: '😁', name: 'Beaming Face with Smiling Eyes' },
      { emoji: '😅', name: 'Grinning Face with Sweat' },
      { emoji: '😂', name: 'Face with Tears of Joy' },
      { emoji: '🤣', name: 'Rolling on the Floor Laughing' },
      { emoji: '😊', name: 'Smiling Face with Smiling Eyes' },
      { emoji: '😇', name: 'Smiling Face with Halo' },
      { emoji: '🙂', name: 'Slightly Smiling Face' },
      { emoji: '😉', name: 'Winking Face' },
      { emoji: '😍', name: 'Heart Eyes' },
      { emoji: '🥰', name: 'Smiling Face with Hearts' },
      { emoji: '😘', name: 'Face Blowing a Kiss' },
      { emoji: '😎', name: 'Smiling Face with Sunglasses' },
      { emoji: '🤔', name: 'Thinking Face' },
      { emoji: '😴', name: 'Sleeping Face' },
      { emoji: '🥺', name: 'Pleading Face' }
    ]
  },
  {
    name: 'Gestures',
    emojis: [
      { emoji: '👍', name: 'Thumbs Up' },
      { emoji: '👎', name: 'Thumbs Down' },
      { emoji: '👏', name: 'Clapping Hands' },
      { emoji: '🙌', name: 'Raising Hands' },
      { emoji: '🤝', name: 'Handshake' },
      { emoji: '✌️', name: 'Victory Hand' },
      { emoji: '🤞', name: 'Crossed Fingers' },
      { emoji: '👌', name: 'OK Hand' },
      { emoji: '🤙', name: 'Call Me Hand' },
      { emoji: '💪', name: 'Flexed Biceps' },
      { emoji: '✋', name: 'Raised Hand' },
      { emoji: '👋', name: 'Waving Hand' }
    ]
  },
  {
    name: 'Hearts',
    emojis: [
      { emoji: '❤️', name: 'Red Heart' },
      { emoji: '🧡', name: 'Orange Heart' },
      { emoji: '💛', name: 'Yellow Heart' },
      { emoji: '💚', name: 'Green Heart' },
      { emoji: '💙', name: 'Blue Heart' },
      { emoji: '💜', name: 'Purple Heart' },
      { emoji: '🖤', name: 'Black Heart' },
      { emoji: '🤍', name: 'White Heart' },
      { emoji: '💔', name: 'Broken Heart' },
      { emoji: '❣️', name: 'Heart Exclamation' },
      { emoji: '💕', name: 'Two Hearts' },
      { emoji: '💖', name: 'Sparkling Heart' }
    ]
  },
  {
    name: 'Animals',
    emojis: [
      { emoji: '🐶', name: 'Dog Face' },
      { emoji: '🐱', name: 'Cat Face' },
      { emoji: '🐭', name: 'Mouse Face' },
      { emoji: '🐹', name: 'Hamster' },
      { emoji: '🐰', name: 'Rabbit Face' },
      { emoji: '🦊', name: 'Fox' },
      { emoji: '🐻', name: 'Bear' },
      { emoji: '🐼', name: 'Panda' },
      { emoji: '🦁', name: 'Lion' },
      { emoji: '🐯', name: 'Tiger Face' },
      { emoji: '🦄', name: 'Unicorn' },
      { emoji: '🐸', name: 'Frog' }
    ]
  },
  {
    name: 'Objects',
    emojis: [
      { emoji: '💻', name: 'Laptop' },
      { emoji: '📱', name: 'Mobile Phone' },
      { emoji: '⌨️', name: 'Keyboard' },
      { emoji: '🖥️', name: 'Desktop Computer' },
      { emoji: '🖱️', name: 'Computer Mouse' },
      { emoji: '💾', name: 'Floppy Disk' },
      { emoji: '📷', name: 'Camera' },
      { emoji: '📚', name: 'Books' },
      { emoji: '📝', name: 'Memo' },
      { emoji: '📎', name: 'Paperclip' },
      { emoji: '✂️', name: 'Scissors' },
      { emoji: '📦', name: 'Package' }
    ]
  }
]

const filteredCategories = computed(() => {
  if (!searchQuery.value) return emojiCategories

  return emojiCategories
    .map((cat) => ({
      ...cat,
      emojis: cat.emojis.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }))
    .filter((cat) => cat.emojis.length > 0)
})

const copyEmoji = (emoji: string) => {
  navigator.clipboard.writeText(emoji)
  selectedEmoji.value = emoji
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="h-full flex flex-col p-4 gap-4 bg-muted/30 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold tracking-tight">Emoji Picker</h1>
      <div v-if="copied" class="text-sm text-green-600">Copied!</div>
    </div>

    <Card>
      <CardContent class="pt-6">
        <Input v-model="searchQuery" placeholder="Search emojis..." class="w-full" />
      </CardContent>
    </Card>

    <div v-for="category in filteredCategories" :key="category.name" class="space-y-2">
      <h3 class="text-lg font-semibold">{{ category.name }}</h3>
      <Card>
        <CardContent class="pt-4">
          <div class="flex flex-wrap gap-2">
            <Button
              v-for="item in category.emojis"
              :key="item.emoji"
              @click="copyEmoji(item.emoji)"
              variant="ghost"
              size="icon"
              class="text-2xl p-2"
              :title="item.name"
            >
              {{ item.emoji }}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
