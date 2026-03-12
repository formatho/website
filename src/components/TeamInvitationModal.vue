<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TeamMember {
  id: string
  user_email: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  invited_at: string
  joined_at?: string
}

const props = defineProps<{
  isOpen: boolean
  organizationId: string
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'memberAdded', member: TeamMember): void
}>()

const email = ref('')
const role = ref<'admin' | 'member'>('member')
const isInviting = ref(false)
const teamMembers = ref<TeamMember[]>([])
const loadingMembers = ref(true)

const close = () => {
  emit('update:isOpen', false)
  email.value = ''
}

const fetchTeamMembers = async () => {
  try {
    const response = await fetch(`/api/team/${props.organizationId}/members`)
    if (!response.ok) throw new Error('Failed to fetch team members')
    
    const data = await response.json()
    if (data.success && Array.isArray(data.data)) {
      teamMembers.value = data.data as TeamMember[]
    }
  } catch (error) {
    console.error('Error fetching team members:', error)
  } finally {
    loadingMembers.value = false
  }
}

const inviteMember = async () => {
  if (!email.value) return
  
  isInviting.value = true
  
  try {
    const response = await fetch(`/api/team/${props.organizationId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: email.value,
        role: role.value,
      }),
    })
    
    if (!response.ok) throw new Error('Failed to invite member')
    
    const data = await response.json()
    if (data.success) {
      emit('memberAdded', {
        id: 'pending-' + Date.now(),
        user_email: email.value,
        role: role.value,
        invited_at: new Date().toISOString(),
      })
      
      email.value = ''
      fetchTeamMembers()
    }
  } catch (error) {
    console.error('Error inviting member:', error)
  } finally {
    isInviting.value = false
  }
}

const removeMember = async (memberId: string) => {
  try {
    const response = await fetch(`/api/team/${props.organizationId}/members/${memberId}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) throw new Error('Failed to remove member')
    
    fetchTeamMembers()
  } catch (error) {
    console.error('Error removing member:', error)
  }
}

onMounted(() => {
  if (props.isOpen && props.organizationId) {
    fetchTeamMembers()
  }
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h2 class="text-2xl font-bold text-gray-900">Team Management</h2>
        <button 
          @click="close"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Invite Form -->
        <div class="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-3">Invite Team Member</h3>
          <div class="flex gap-4 items-end">
            <div class="flex-1">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                v-model="email"
                type="email"
                placeholder="colleague@example.com"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :disabled="isInviting"
              />
            </div>
            <div class="w-48">
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                v-model="role"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :disabled="isInviting"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              @click="inviteMember"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              :disabled="isInviting || !email"
            >
              {{ isInviting ? 'Inviting...' : 'Invite' }}
            </button>
          </div>
        </div>

        <!-- Team Members List -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Current Team Members</h3>
          
          <div v-if="loadingMembers" class="text-center py-8 text-gray-500">
            Loading team members...
          </div>

          <div v-else-if="teamMembers.length === 0" class="text-center py-8 text-gray-500">
            No team members yet. Invite someone to get started!
          </div>

          <div v-else class="space-y-3">
            <div 
              v-for="member in teamMembers" 
              :key="member.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  {{ member.user_email.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ member.user_email }}</p>
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': member.role === 'admin',
                      'bg-blue-100 text-blue-800': member.role === 'member',
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium capitalize"
                  >
                    {{ member.role }}
                  </span>
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <span v-if="member.joined_at" class="text-sm text-gray-500">
                  Joined: {{ new Date(member.joined_at).toLocaleDateString() }}
                </span>
                <button
                  @click="removeMember(member.id)"
                  class="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Role Descriptions -->
        <div class="mt-6 pt-4 border-t">
          <h4 class="font-semibold text-gray-900 mb-2">Role Permissions:</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><strong>Admin:</strong> Can manage team members, view all analytics, and configure agents</li>
            <li><strong>Member:</strong> Can create tasks, run agents, and view basic analytics</li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end p-6 border-t">
        <button
          @click="close"
          class="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles can be added here */
</style>
