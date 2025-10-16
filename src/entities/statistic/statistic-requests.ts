import { apiRoutes, axiosClient } from '@/shared/api'
import type { StatisticOverview } from './statistic-types'

/**
 * Statistic requests class
 * Contains all HTTP methods for statistic operations
 */
class StatisticRequests {
  /**
   * Get statistics overview
   */
  async getOverview(): Promise<StatisticOverview> {
    const response = await axiosClient.get<StatisticOverview>(
      apiRoutes.statistic.overview,
    )
    return response.data
  }
}

export const statisticRequests = new StatisticRequests()
