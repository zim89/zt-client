'use client'

import { useQuery } from '@tanstack/react-query'
import { markerApi, type MarkerParams } from '@/entities/marker'

/**
 * Hook for finding markers with filtering and pagination
 *
 * @param params - Query parameters for filtering and pagination
 * @returns Query result with data, loading, error states
 */
export const useFindMarkers = (params?: MarkerParams) => {
  return useQuery({
    ...markerApi.findManyOptions(params),
  })
}
