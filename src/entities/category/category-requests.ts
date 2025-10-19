import { apiRoutes, axiosClient } from '@/shared/api'
import { PaginatedResponse } from '@/shared/types'
import type {
  CategoryNameResponse,
  CategoryNamesParams,
  CategoryParams,
  CategoryWithCount,
  CreateCategoryDto,
  UpdateCategoryDto,
} from './category-types'

/**
 * Category requests class
 * Contains all HTTP methods for category operations
 */
class CategoryRequests {
  /**
   * Find category names for sidebar (minimal data with incomplete tasks count)
   */
  async findNames(
    params?: CategoryNamesParams,
  ): Promise<CategoryNameResponse[]> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<CategoryNameResponse[]>(
      `${apiRoutes.category.findNames}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Find category by ID
   */
  async findById(id: string): Promise<CategoryWithCount> {
    const response = await axiosClient.get<CategoryWithCount>(
      apiRoutes.category.findById(id),
    )
    return response.data
  }

  /**
   * Find category by slug
   */
  async findBySlug(slug: string): Promise<CategoryWithCount> {
    const response = await axiosClient.get<CategoryWithCount>(
      apiRoutes.category.findBySlug(slug),
    )
    return response.data
  }

  /**
   * Find many categories with pagination and filtering
   */
  async findMany(
    params?: CategoryParams,
  ): Promise<PaginatedResponse<CategoryWithCount>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<
      PaginatedResponse<CategoryWithCount>
    >(`${apiRoutes.category.findMany}?${searchParams.toString()}`)

    return response.data
  }

  /**
   * Create new category
   */
  async create(data: CreateCategoryDto): Promise<CategoryWithCount> {
    const response = await axiosClient.post<CategoryWithCount>(
      apiRoutes.category.create,
      data,
    )
    return response.data
  }

  /**
   * Update category
   */
  async update(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryWithCount> {
    const response = await axiosClient.patch<CategoryWithCount>(
      apiRoutes.category.update(id),
      data,
    )
    return response.data
  }

  /**
   * Delete category
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.category.delete(id))
  }
}

export const categoryRequests = new CategoryRequests()
