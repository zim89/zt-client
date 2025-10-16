'use client'

import { useQuery } from '@tanstack/react-query'
import { markerApi } from '@/entities/marker'

/**
 * Hook for finding a marker by slug
 *
 * @param slug - Marker slug
 * @returns Query result with data, loading, error states
 */
export const useFindMarkerBySlug = (slug: string) => {
  return useQuery({
    ...markerApi.findBySlugOptions(slug),
  })
}
