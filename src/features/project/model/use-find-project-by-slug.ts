'use client'

import { useQuery } from '@tanstack/react-query'
import { projectApi } from '@/entities/project'

/**
 * Hook for finding a project by slug
 *
 * @param slug - Project slug
 * @returns Query result with data, loading, error states
 */
export const useFindProjectBySlug = (slug: string) => {
  return useQuery({
    ...projectApi.findBySlugOptions(slug),
  })
}
