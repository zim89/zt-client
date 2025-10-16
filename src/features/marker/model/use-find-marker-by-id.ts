'use client'

import { useQuery } from '@tanstack/react-query'
import { markerApi } from '@/entities/marker'

/**
 * Hook for finding a marker by ID
 *
 * @param id - Marker ID
 * @returns Query result with data, loading, error states
 */
export const useFindMarkerById = (id: string) => {
  return useQuery({
    ...markerApi.findByIdOptions(id),
  })
}
