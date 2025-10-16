'use client'

import { useQuery } from '@tanstack/react-query'
import { taskApi } from '@/entities/task'

/**
 * Hook for finding a task by ID
 *
 * @param id - Task ID
 * @returns Query result with data, loading, error states
 */
export const useFindTaskById = (id: string) => {
  return useQuery({
    ...taskApi.findByIdOptions(id),
  })
}
