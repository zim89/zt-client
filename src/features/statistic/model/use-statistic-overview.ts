'use client'

import { useQuery } from '@tanstack/react-query'
import { statisticApi } from '@/entities/statistic'

/**
 * Hook for fetching statistics overview
 *
 * @returns Query result with data, loading, error states
 */
export const useStatisticOverview = () => {
  return useQuery({
    ...statisticApi.overviewOptions(),
  })
}
