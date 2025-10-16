'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/entities/category'

/**
 * Hook for finding a category by slug
 *
 * @param slug - Category slug
 * @returns Query result with data, loading, error states
 */
export const useFindCategoryBySlug = (slug: string) => {
  return useQuery({
    ...categoryApi.findBySlugOptions(slug),
  })
}
