import type { TaskParams } from './task-types'

/**
 * Query keys for task operations
 * Used by TanStack Query for caching and invalidation
 */
export const taskKeys = {
  root: ['tasks'] as const,

  all: () => [...taskKeys.root, 'list'] as const,
  lists: () => [...taskKeys.all()] as const,
  list: (filters: TaskParams) => [...taskKeys.lists(), { filters }] as const,

  details: () => [...taskKeys.root, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
} as const
