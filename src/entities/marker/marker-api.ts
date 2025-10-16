import { markerKeys } from './marker-keys'
import { markerRequests } from './marker-requests'
import type { MarkerParams } from './marker-types'

/**
 * API class for marker operations
 * Contains HTTP methods and query options
 */
class MarkerApi {
  findById = markerRequests.findById
  findBySlug = markerRequests.findBySlug
  findMany = markerRequests.findMany
  create = markerRequests.create
  update = markerRequests.update
  delete = markerRequests.delete

  /**
   * Query options for finding marker by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: markerKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding marker by slug
   */
  findBySlugOptions(slug: string) {
    return {
      queryKey: markerKeys.detailBySlug(slug),
      queryFn: () => this.findBySlug(slug),
      enabled: !!slug,
    }
  }

  /**
   * Query options for finding many markers
   */
  findManyOptions(params?: MarkerParams) {
    return {
      queryKey: markerKeys.list(params || {}),
      queryFn: () => this.findMany(params),
    }
  }
}

export const markerApi = new MarkerApi()
