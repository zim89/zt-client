'use client'

import { useQuery } from '@tanstack/react-query'
import { projectApi, type ProjectNamesParams } from '@/entities/project'

/**
 * Hook for finding project names for sidebar (minimal data with incomplete tasks count)
 *
 * @param params - Query parameters for filtering
 * @returns Query result with data, loading, error states
 */
export const useFindProjectNames = (params?: ProjectNamesParams) => {
  return useQuery({
    ...projectApi.findNamesOptions(params),
  })
}
