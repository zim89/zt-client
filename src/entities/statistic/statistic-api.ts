import { statisticKeys } from './statistic-keys'
import { statisticRequests } from './statistic-requests'

/**
 * API class for statistic operations
 * Contains HTTP methods and query options
 */
class StatisticApi {
  getOverview = statisticRequests.getOverview

  /**
   * Query options for getting statistics overview
   */
  overviewOptions() {
    return {
      queryKey: statisticKeys.overview(),
      queryFn: () => this.getOverview(),
    }
  }
}

export const statisticApi = new StatisticApi()
