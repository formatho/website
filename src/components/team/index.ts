// Team Collaboration Components
// Export all team-related components for easy importing

export { default as InvitationModal } from './InvitationModal.vue'
export { default as TeamMemberList } from './TeamMemberList.vue'
export { default as TeamMemberCard } from './TeamMemberCard.vue'
export { default as RoleBadge } from './RoleBadge.vue'

// Types
export type { Role, Status, TeamMember } from './types'

// Re-export types for convenience
export interface Role {
  type: 'owner' | 'admin' | 'member' | 'viewer'
}

export interface Status {
  type: 'active' | 'pending' | 'inactive'
}

export interface TeamMember {
  id: string
  email: string
  name?: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  status: 'active' | 'pending' | 'inactive'
  joinedAt?: string
  invitedAt: string
  lastActive?: string
}
