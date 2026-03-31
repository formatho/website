<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { XIcon, InfoIcon, Loader2Icon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

type Role = 'admin' | 'member' | 'viewer'

interface Props {
  isOpen: boolean
  organizationId: string
  isLoading?: boolean
  defaultRole?: Role
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  defaultRole: 'member'
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'invite', payload: { email: string; role: Role }): void
  (e: 'error', error: Error): void
}>()

const email = ref('')
const role = ref<Role>(props.defaultRole)
const emailError = ref('')
const modalRef = ref<HTMLDivElement | null>(null)

const isValidEmail = computed(() => {
  if (!email.value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const canSubmit = computed(() => {
  return isValidEmail.value && !props.isLoading
})

const roleDescriptions: Record<Role, string> = {
  admin: 'Can manage team members, view all analytics, and configure agents',
  member: 'Can create tasks, run agents, and view basic analytics',
  viewer: 'Can only view dashboards and reports, no write access'
}

const handleEmailBlur = () => {
  if (email.value && !isValidEmail.value) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

const handleSubmit = () => {
  if (!canSubmit.value) return
  
  emailError.value = ''
  emit('invite', { email: email.value, role: role.value })
}

const close = () => {
  emit('update:isOpen', false)
}

const resetForm = () => {
  email.value = ''
  role.value = props.defaultRole
  emailError.value = ''
}

// Reset form when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    resetForm()
    // Focus email input when modal opens
    setTimeout(() => {
      const emailInput = modalRef.value?.querySelector('input[type="email"]') as HTMLInputElement
      emailInput?.focus()
    }, 100)
  }
})

// Handle Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    close()
  }
  if (e.key === 'Enter' && canSubmit.value) {
    handleSubmit()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="close"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            ref="modalRef"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 id="modal-title" class="text-xl font-semibold text-gray-900 dark:text-white">
                Invite Team Member
              </h2>
              <button
                @click="close"
                class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <XIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="handleSubmit" class="px-6 py-4 space-y-4">
              <!-- Email Field -->
              <div>
                <label for="invite-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="invite-email"
                  v-model="email"
                  type="email"
                  placeholder="colleague@example.com"
                  :disabled="isLoading"
                  :class="cn(
                    'w-full px-4 py-2.5 rounded-lg border transition-colors',
                    'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
                    'placeholder-gray-400 dark:placeholder-gray-500',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    emailError
                      ? 'border-red-300 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600'
                  )"
                  @blur="handleEmailBlur"
                />
                <p v-if="emailError" class="mt-1 text-sm text-red-600 dark:text-red-400">
                  {{ emailError }}
                </p>
              </div>

              <!-- Role Field -->
              <div>
                <label for="invite-role" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Role
                </label>
                <select
                  id="invite-role"
                  v-model="role"
                  :disabled="isLoading"
                  :class="cn(
                    'w-full px-4 py-2.5 rounded-lg border transition-colors',
                    'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
                    'border-gray-300 dark:border-gray-600',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <!-- Role Info -->
              <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="flex items-start gap-2">
                  <InfoIcon class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p class="text-sm text-blue-800 dark:text-blue-200">
                    {{ roleDescriptions[role] }}
                  </p>
                </div>
              </div>
            </form>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                type="button"
                @click="close"
                :disabled="isLoading"
                :class="cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  'text-gray-700 dark:text-gray-300',
                  'hover:bg-gray-200 dark:hover:bg-gray-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="!canSubmit"
                @click="handleSubmit"
                :class="cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  'bg-blue-600 text-white',
                  'hover:bg-blue-700',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'flex items-center gap-2'
                )"
              >
                <Loader2Icon v-if="isLoading" class="w-4 h-4 animate-spin" />
                {{ isLoading ? 'Sending...' : 'Send Invite' }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
