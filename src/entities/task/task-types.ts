import type { TaskStatus } from '@/shared/constants'

// ==============================
// REQUEST PARAMETERS
// ==============================

/** Parameters for task requests */
export type TaskParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  projectId?: string
  status?: TaskStatus
  assigneeId?: string
  categoryId?: string
  contactId?: string
  creatorId?: string
  dueDateFrom?: string
  dueDateTo?: string
  isOverdue?: boolean
  hasAssignee?: boolean
}

// ==============================
// MAIN TYPES
// ==============================

/** Main task entity */
export type Task = {
  id: string
  createdAt: string
  updatedAt: string

  name: string
  description: string | null
  status: TaskStatus
  note: string | null
  dueDate: string | null
  projectId: string
  categoryId: string | null
  contactId: string | null
  creatorId: string
  assigneeId: string | null
}

/** Task with related entities */
export type TaskWithRelations = Task & {
  project?: {
    id: string
    name: string
    slug: string
  }
  category?: {
    id: string
    name: string
    slug: string
  } | null
  creator?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  assignee?: {
    id: string
    email: string
    firstName: string
    lastName: string
  } | null
  contact?: {
    id: string
    name: string
    email: string | null
    phone: string | null
  } | null
  markers?: Array<{
    id: string
    markerId: string
    marker: {
      id: string
      name: string
      slug: string
      fontColor: string | null
      bgColor: string | null
    }
  }>
}

// ==============================
// DTO TYPES
// ==============================

/** Create task */
export type CreateTaskDto = {
  name: string
  description?: string
  status: TaskStatus
  note?: string
  dueDate?: string
  projectId: string
  categoryId?: string
  contactId?: string
  assigneeId?: string
}

/** Update task */
export type UpdateTaskDto = {
  name?: string
  description?: string
  status?: TaskStatus
  note?: string
  dueDate?: string
  projectId?: string
  categoryId?: string
  contactId?: string
  assigneeId?: string
}

/** Update task status */
export type UpdateTaskStatusDto = {
  status: TaskStatus
}

/** Assign task to user */
export type AssignTaskDto = {
  assigneeId?: string | null
}
