'use client'

import { useQuery } from '@tanstack/react-query'
import { projectApi } from '@/entities/project'
import { regexHelpers } from '@/shared/constants'

/**
 * Hook for finding a project by ID
 *
 * @param id - Project ID
 * @returns Query result with data, loading, error states
 */
export const useFindProjectById = (id: string) => {
  return useQuery({
    ...projectApi.findByIdOptions(id),
    enabled: !!id && id.trim() !== '' && regexHelpers.isCuid(id),
  })
}
