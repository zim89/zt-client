'use client'

import { useQuery } from '@tanstack/react-query'
import { taskApi, type TaskParams } from '@/entities/task'

/**
 * Hook for finding tasks with filtering and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with data, loading, error states
 */
export const useFindTasks = (params?: TaskParams) => {
  return useQuery({
    ...taskApi.findManyOptions(params),
  })
}
