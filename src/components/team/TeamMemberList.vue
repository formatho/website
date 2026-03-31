<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { SearchIcon, UsersIcon, Loader2Icon } from 'lucide-vue-next'
import TeamMemberCard from './TeamMemberCard.vue'
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

interface Props {
  members: TeamMember[]
  organizationId: string
  currentUserId?: string
  isLoading?: boolean
  canManage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  canManage: false
})

const emit = defineEmits<{
  (e: 'update-role', payload: { memberId: string; role: Role }): void
  (e: 'remove', memberId: string): void
  (e: 'resend-invite', memberId: string): void
}>()

const searchQuery = ref('')
const roleFilter = ref<Role | 'all'>('all')
const statusFilter = ref<Status | 'all'>('all')
const sortBy = ref<'recent' | 'name' | 'role'>('recent')

const filteredMembers = computed(() => {
  let result = [...props.members]

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(m => 
      m.email.toLowerCase().includes(query) ||
      m.name?.toLowerCase().includes(query)
    )
  }

  // Role filter
  if (roleFilter.value !== 'all') {
    result = result.filter(m => m.role === roleFilter.value)
  }

  // Status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(m => m.status === statusFilter.value)
  }

  // Sort
  switch (sortBy.value) {
    case 'recent':
      result.sort((a, b) => {
        const dateA = new Date(a.joinedAt || a.invitedAt).getTime()
        const dateB = new Date(b.joinedAt || b.invitedAt).getTime()
        return dateB - dateA
      })
      break
    case 'name':
      result.sort((a, b) => {
        const nameA = a.name || a.email
        const nameB = b.name || b.email
        return nameA.localeCompare(nameB)
      })
      break
    case 'role':
      const roleOrder: Role[] = ['owner', 'admin', 'member', 'viewer']
      result.sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role))
      break
  }

  return result
})

const memberCount = computed(() => props.members.length)
const filteredCount = computed(() => filteredMembers.value.length)

const handleUpdateRole = (memberId: string, role: Role) => {
  emit('update-role', { memberId, role })
}

const handleRemove = (memberId: string) => {
  emit('remove', memberId)
}

const handleResendInvite = (memberId: string) => {
  emit('resend-invite', memberId)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <UsersIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Team Members
          <span class="text-gray-500 dark:text-gray-400 font-normal">
            ({{ memberCount }})
          </span>
        </h3>
      </div>

      <!-- Search -->
      <div class="relative">
        <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search members..."
          :class="cn(
            'pl-9 pr-4 py-2 rounded-lg border transition-colors w-full sm:w-64',
            'bg-white dark:bg-gray-900 text-gray-900 dark:text-white',
            'border-gray-300 dark:border-gray-600',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          )"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <select
        v-model="roleFilter"
        :class="cn(
          'px-3 py-1.5 rounded-lg border text-sm transition-colors',
          'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )"
      >
        <option value="all">All Roles</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="viewer">Viewer</option>
      </select>

      <select
        v-model="statusFilter"
        :class="cn(
          'px-3 py-1.5 rounded-lg border text-sm transition-colors',
          'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )"
      >
        <option value="all">Any Status</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="inactive">Inactive</option>
      </select>

      <select
        v-model="sortBy"
        :class="cn(
          'px-3 py-1.5 rounded-lg border text-sm transition-colors',
          'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300',
          'border-gray-300 dark:border-gray-600',
          'focus:outline-none focus:ring-2 focus:ring-blue-500'
        )"
      >
        <option value="recent">Most Recent</option>
        <option value="name">Name</option>
        <option value="role">Role</option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <Loader2Icon class="w-8 h-8 text-blue-600 animate-spin" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="members.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <UsersIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
        No team members yet
      </h4>
      <p class="text-gray-500 dark:text-gray-400 max-w-sm">
        Invite team members to collaborate on agents and tasks.
      </p>
    </div>

    <!-- No Results State -->
    <div
      v-else-if="filteredMembers.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <SearchIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
        No members found
      </h4>
      <p class="text-gray-500 dark:text-gray-400 max-w-sm">
        Try adjusting your search or filters.
      </p>
    </div>

    <!-- Member List -->
    <div v-else class="space-y-2">
      <TeamMemberCard
        v-for="member in filteredMembers"
        :key="member.id"
        :member="member"
        :can-manage="canManage"
        :is-current-user="member.id === currentUserId"
        @update-role="(role) => handleUpdateRole(member.id, role)"
        @remove="handleRemove(member.id)"
        @resend-invite="handleResendInvite(member.id)"
      />
    </div>

    <!-- Results count -->
    <p
      v-if="filteredMembers.length > 0 && (searchQuery || roleFilter !== 'all' || statusFilter !== 'all')"
      class="text-sm text-gray-500 dark:text-gray-400 text-center"
    >
      Showing {{ filteredCount }} of {{ memberCount }} members
    </p>
  </div>
</template>
