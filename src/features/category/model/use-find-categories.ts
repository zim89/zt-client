'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi, type CategoryParams } from '@/entities/category'

/**
 * Hook for finding categories with filtering and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with data, loading, error states
 */
export const useFindCategories = (params?: CategoryParams) => {
  return useQuery({
    ...categoryApi.findManyOptions(params),
  })
}
