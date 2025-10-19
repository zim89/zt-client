import { apiRoutes, axiosClient } from '@/shared/api'
import { PaginatedResponse } from '@/shared/types'
import type {
  AddMemberDto,
  CreateProjectDto,
  Membership,
  ProjectNameResponse,
  ProjectNamesParams,
  ProjectParams,
  ProjectWithCount,
  UpdateMemberRoleDto,
  UpdateProjectDto,
} from './project-types'

/**
 * Project requests class
 * Contains all HTTP methods for project operations
 */
class ProjectRequests {
  /**
   * Find project by ID
   */
  async findById(id: string): Promise<ProjectWithCount> {
    const response = await axiosClient.get<ProjectWithCount>(
      apiRoutes.project.findById(id),
    )
    return response.data
  }

  /**
   * Find project by slug
   */
  async findBySlug(slug: string): Promise<ProjectWithCount> {
    const response = await axiosClient.get<ProjectWithCount>(
      apiRoutes.project.findBySlug(slug),
    )
    return response.data
  }

  /**
   * Find many projects with pagination and filtering
   */
  async findMany(
    params?: ProjectParams,
  ): Promise<PaginatedResponse<ProjectWithCount>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<PaginatedResponse<ProjectWithCount>>(
      `${apiRoutes.project.findMany}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Find project names for sidebar (minimal data with incomplete tasks count)
   */
  async findNames(params?: ProjectNamesParams): Promise<ProjectNameResponse[]> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<ProjectNameResponse[]>(
      `${apiRoutes.project.findNames}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Create new project
   */
  async create(data: CreateProjectDto): Promise<ProjectWithCount> {
    const response = await axiosClient.post<ProjectWithCount>(
      apiRoutes.project.create,
      data,
    )
    return response.data
  }

  /**
   * Update project
   */
  async update(id: string, data: UpdateProjectDto): Promise<ProjectWithCount> {
    const response = await axiosClient.patch<ProjectWithCount>(
      apiRoutes.project.update(id),
      data,
    )
    return response.data
  }

  /**
   * Delete project
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.project.delete(id))
  }

  /**
   * Add member to project
   */
  async addMember(id: string, data: AddMemberDto): Promise<Membership> {
    const response = await axiosClient.post<Membership>(
      apiRoutes.project.addMember(id),
      data,
    )
    return response.data
  }

  /**
   * Remove member from project
   */
  async removeMember(id: string, memberId: string): Promise<void> {
    await axiosClient.delete(apiRoutes.project.removeMember(id, memberId))
  }

  /**
   * Update member role in project
   */
  async updateMemberRole(
    id: string,
    memberId: string,
    data: UpdateMemberRoleDto,
  ): Promise<Membership> {
    const response = await axiosClient.patch<Membership>(
      apiRoutes.project.updateMemberRole(id, memberId),
      data,
    )
    return response.data
  }
}

export const projectRequests = new ProjectRequests()
