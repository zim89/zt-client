import { categoryKeys } from './category-keys'
import { categoryRequests } from './category-requests'
import type { CategoryNamesParams, CategoryParams } from './category-types'

/**
 * API class for category operations
 * Contains HTTP methods and query options
 */
class CategoryApi {
  findById = categoryRequests.findById
  findBySlug = categoryRequests.findBySlug
  findMany = categoryRequests.findMany
  findNames = categoryRequests.findNames
  create = categoryRequests.create
  update = categoryRequests.update
  delete = categoryRequests.delete

  /**
   * Query options for finding category by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: categoryKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding category by slug
   */
  findBySlugOptions(slug: string) {
    return {
      queryKey: categoryKeys.detailBySlug(slug),
      queryFn: () => this.findBySlug(slug),
      enabled: !!slug,
    }
  }

  /**
   * Query options for finding many categories
   */
  findManyOptions(params?: CategoryParams) {
    return {
      queryKey: categoryKeys.list(params || {}),
      queryFn: () => this.findMany(params),
    }
  }

  /**
   * Query options for finding category names
   */
  findNamesOptions(params?: CategoryNamesParams) {
    return {
      queryKey: categoryKeys.names(params || {}),
      queryFn: () => this.findNames(params),
    }
  }
}

export const categoryApi = new CategoryApi()
