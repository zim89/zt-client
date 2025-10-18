import { apiRoutes, axiosClient } from '@/shared/api'
import { PaginatedResponse } from '@/shared/types'
import type {
  CreateMarkerDto,
  MarkerParams,
  MarkerWithCount,
  UpdateMarkerDto,
} from './marker-types'

/**
 * Marker requests class
 * Contains all HTTP methods for marker operations
 */
class MarkerRequests {
  /**
   * Find marker by ID
   */
  async findById(id: string): Promise<MarkerWithCount> {
    const response = await axiosClient.get<MarkerWithCount>(
      apiRoutes.marker.findById(id),
    )
    return response.data
  }

  /**
   * Find marker by slug
   */
  async findBySlug(slug: string): Promise<MarkerWithCount> {
    const response = await axiosClient.get<MarkerWithCount>(
      apiRoutes.marker.findBySlug(slug),
    )
    return response.data
  }

  /**
   * Find many markers with pagination and filtering
   */
  async findMany(
    params?: MarkerParams,
  ): Promise<PaginatedResponse<MarkerWithCount>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<PaginatedResponse<MarkerWithCount>>(
      `${apiRoutes.marker.findMany}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Create new marker
   */
  async create(data: CreateMarkerDto): Promise<MarkerWithCount> {
    const response = await axiosClient.post<MarkerWithCount>(
      apiRoutes.marker.create,
      data,
    )
    return response.data
  }

  /**
   * Update marker
   */
  async update(id: string, data: UpdateMarkerDto): Promise<MarkerWithCount> {
    const response = await axiosClient.patch<MarkerWithCount>(
      apiRoutes.marker.update(id),
      data,
    )
    return response.data
  }

  /**
   * Delete marker
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.marker.delete(id))
  }
}

export const markerRequests = new MarkerRequests()
