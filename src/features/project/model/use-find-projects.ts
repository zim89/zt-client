'use client'

import { useQuery } from '@tanstack/react-query'
import { projectApi, type ProjectParams } from '@/entities/project'

/**
 * Hook for finding projects with filtering and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with data, loading, error states
 */
export const useFindProjects = (params?: ProjectParams) => {
  return useQuery({
    ...projectApi.findManyOptions(params),
  })
}
