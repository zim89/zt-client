import { ProjectRole } from '@/shared/constants'

// ==============================
// REQUEST PARAMETERS
// ==============================

/** Parameters for project requests */
export type ProjectParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  isFavorite?: boolean
  isActive?: boolean
  isHidden?: boolean
  userId?: string
}

// ==============================
// MAIN TYPES
// ==============================

/** Main project entity */
export type Project = {
  id: string
  slug: string
  createdAt: string
  updatedAt: string

  name: string
  description: string | null
  isActive: boolean
  isFavorite: boolean
  isHidden: boolean
  userId: string
}

/** Membership entity */
export type Membership = {
  id: string
  projectId: string
  userId: string
  roles: ProjectRole[]
  joinedAt: string
}

/** Project with count of related entities */
export type ProjectWithCount = Project & {
  _count: {
    members: number
    tasks: number
    categories: number
  }
}

/** Project with membership information */
export type ProjectWithMembership = Project & {
  membership?: Membership
}

// ==============================
// DTO TYPES
// ==============================

/** Create project */
export type CreateProjectDto = {
  name: string
  description?: string
  isFavorite?: boolean
  isHidden?: boolean
}

/** Update project */
export type UpdateProjectDto = {
  name?: string
  description?: string
  isFavorite?: boolean
  isHidden?: boolean
}

/** Add member to project */
export type AddMemberDto = {
  userId: string
  roles?: ProjectRole[]
}

/** Update member role */
export type UpdateMemberRoleDto = {
  roles: ProjectRole[]
}
