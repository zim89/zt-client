'use client'

import { useQuery } from '@tanstack/react-query'
import { categoryApi, type CategoryNamesParams } from '@/entities/category'

/**
 * Hook for finding category names for sidebar (minimal data with incomplete tasks count)
 *
 * @param params - Query parameters for filtering
 * @returns Query result with data, loading, error states
 */
export const useFindCategoryNames = (params?: CategoryNamesParams) => {
  return useQuery({
    ...categoryApi.findNamesOptions(params),
  })
}
