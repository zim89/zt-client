'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/entities/category'

/**
 * Hook for finding a category by ID
 *
 * @param id - Category ID
 * @returns Query result with data, loading, error states
 */
export const useFindCategoryById = (id: string) => {
  return useQuery({
    ...categoryApi.findByIdOptions(id),
  })
}
