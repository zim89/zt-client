import type { TaskWithRelations } from '@/entities/task'
import { taskStatuses } from '@/shared/constants'

/**
 * Format task status for display
 *
 * @param status - Task status
 * @returns Formatted status string
 */
export const formatTaskStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

/**
 * Format task due date for display
 *
 * @param dueDate - Task due date string
 * @returns Formatted date string or "No due date"
 */
export const formatTaskDueDate = (dueDate: string | null): string => {
  if (!dueDate) return ''

  try {
    const date = new Date(dueDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format task creation date for display
 *
 * @param createdAt - Task creation date string
 * @returns Formatted relative date string
 */
export const formatTaskCreatedAt = (createdAt: string): string => {
  try {
    const date = new Date(createdAt)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  } catch {
    return 'Unknown'
  }
}

/**
 * Format task update date for display
 *
 * @param updatedAt - Task update date string
 * @returns Formatted relative date string
 */
export const formatTaskUpdatedAt = (updatedAt: string): string => {
  try {
    const date = new Date(updatedAt)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  } catch {
    return 'Unknown'
  }
}

/**
 * Get user display name
 *
 * @param user - User object with firstName and lastName
 * @returns Formatted user name
 */
export const getUserDisplayName = (
  user: { firstName: string; lastName: string } | null | undefined,
): string => {
  if (!user) return ''
  return `${user.firstName} ${user.lastName}`.trim()
}

/**
 * Get project display name
 *
 * @param project - Project object with name
 * @returns Project name or "No project"
 */
export const getProjectDisplayName = (
  project: { name: string } | null | undefined,
): string => {
  return project?.name ?? 'No project'
}

/**
 * Get category display name
 *
 * @param category - Category object with name
 * @returns Category name or "No category"
 */
export const getCategoryDisplayName = (
  category: { name: string } | null | undefined,
): string => {
  return category?.name ?? ''
}

/**
 * Get contact display name
 *
 * @param contact - Contact object with name
 * @returns Contact name or "No contact"
 */
export const getContactDisplayName = (
  contact: { name: string } | null | undefined,
): string => {
  return contact?.name ?? ''
}

/**
 * Check if task is overdue
 *
 * @param task - Task object with dueDate
 * @returns True if task is overdue
 */
export const isTaskOverdue = (task: TaskWithRelations): boolean => {
  if (!task.dueDate) return false

  try {
    const dueDate = new Date(task.dueDate)
    const now = new Date()
    return dueDate < now && task.status !== taskStatuses.completed
  } catch {
    return false
  }
}
