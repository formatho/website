<script setup lang="ts">
import { computed, ref } from 'vue'
import { MoreVerticalIcon, UserMinusIcon, MailIcon, ShieldIcon, EyeIcon, UserIcon } from 'lucide-vue-next'
import RoleBadge from './RoleBadge.vue'
import { cn } from '@/lib/utils'

type Role = 'owner' | 'admin' | 'member' | 'viewer'
type Status = 'active' | 'pending' | 'inactive'

interface TeamMember {
  id: string
  email: string
  name?: string
  avatar?: string
  role: Role
  status: Status
  joinedAt?: string
  invitedAt: string
  lastActive?: string
}

const props = withDefaults(defineProps<{
  member: TeamMember
  canManage?: boolean
  isCurrentUser?: boolean
}>(), {
  canManage: false,
  isCurrentUser: false
})

const emit = defineEmits<{
  (e: 'update-role', role: Role): void
  (e: 'remove'): void
  (e: 'resend-invite'): void
}>()

const showMenu = ref(false)

const displayName = computed(() => {
  return props.member.name || props.member.email.split('@')[0]
})

const initials = computed(() => {
  const name = displayName.value
  return name.charAt(0).toUpperCase()
})

const statusColor = computed(() => {
  switch (props.member.status) {
    case 'active': return 'bg-green-500'
    case 'pending': return 'bg-yellow-500'
    case 'inactive': return 'bg-gray-400'
    default: return 'bg-gray-400'
  }
})

const formattedDate = computed(() => {
  const date = props.member.joinedAt || props.member.invitedAt
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const statusText = computed(() => {
  switch (props.member.status) {
    case 'active': return 'Active'
    case 'pending': return 'Pending'
    case 'inactive': return 'Inactive'
    default: return ''
  }
})

const canChangeRole = computed(() => {
  return props.canManage && !props.isCurrentUser && props.member.role !== 'owner'
})

const availableRoles: Role[] = ['admin', 'member', 'viewer']

const roleIcons = {
  owner: ShieldIcon,
  admin: ShieldIcon,
  member: UserIcon,
  viewer: EyeIcon
}

const handleRoleChange = (role: Role) => {
  emit('update-role', role)
  showMenu.value = false
}

const handleRemove = () => {
  emit('remove')
  showMenu.value = false
}

const handleResendInvite = () => {
  emit('resend-invite')
  showMenu.value = false
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = () => {
  showMenu.value = false
}
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg',
      'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group'
    )"
  >
    <!-- Member Info -->
    <div class="flex items-center gap-3">
      <!-- Avatar -->
      <div class="relative">
        <div
          v-if="member.avatar"
          class="w-10 h-10 rounded-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${member.avatar})` }"
        />
        <div
          v-else
          :class="cn(
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
            'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
          )"
        >
          {{ initials }}
        </div>
        <!-- Status Indicator -->
        <span
          :class="cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800',
            statusColor
          )"
        />
      </div>

      <!-- Details -->
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-900 dark:text-white">
            {{ displayName }}
          </span>
          <RoleBadge :role="member.role" size="sm" />
        </div>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ member.email }}
        </span>
        <span class="text-xs text-gray-400 dark:text-gray-500">
          {{ member.joinedAt ? 'Joined' : 'Invited' }} {{ formattedDate }} • {{ statusText }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="canManage && !isCurrentUser && member.role !== 'owner'" class="relative">
      <button
        @click="toggleMenu"
        @blur="closeMenu"
        :class="cn(
          'p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity',
          'hover:bg-gray-200 dark:hover:bg-gray-700',
          'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
        )"
        aria-label="Member actions"
      >
        <MoreVerticalIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="showMenu"
        class="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10"
      >
        <!-- Role Change Options -->
        <div class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
          Change Role
        </div>
        <button
          v-for="role in availableRoles"
          :key="role"
          @click="handleRoleChange(role)"
          :class="cn(
            'w-full flex items-center gap-2 px-3 py-2 text-sm',
            'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
            member.role === role && 'bg-gray-100 dark:bg-gray-700'
          )"
        >
          <component :is="roleIcons[role]" class="w-4 h-4" />
          <span class="capitalize">{{ role }}</span>
          <span v-if="member.role === role" class="ml-auto text-blue-600">✓</span>
        </button>

        <div class="border-t border-gray-200 dark:border-gray-700 my-1" />

        <!-- Resend Invite (for pending) -->
        <button
          v-if="member.status === 'pending'"
          @click="handleResendInvite"
          :class="cn(
            'w-full flex items-center gap-2 px-3 py-2 text-sm',
            'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
          )"
        >
          <MailIcon class="w-4 h-4" />
          <span>Resend Invite</span>
        </button>

        <!-- Remove Member -->
        <button
          @click="handleRemove"
          :class="cn(
            'w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600',
            'hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors'
          )"
        >
          <UserMinusIcon class="w-4 h-4" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  </div>
</template>
