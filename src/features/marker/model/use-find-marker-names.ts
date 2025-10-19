'use client'

import { useQuery } from '@tanstack/react-query'
import { markerApi, type MarkerNamesParams } from '@/entities/marker'

/**
 * Hook for finding marker names for sidebar (minimal data without task count)
 *
 * @param params - Query parameters for filtering
 * @returns Query result with data, loading, error states
 */
export const useFindMarkerNames = (params?: MarkerNamesParams) => {
  return useQuery({
    ...markerApi.findNamesOptions(params),
  })
}
