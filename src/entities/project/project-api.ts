import { projectKeys } from './project-keys'
import { projectRequests } from './project-requests'
import type { ProjectNamesParams, ProjectParams } from './project-types'

/**
 * API class for project operations
 * Contains HTTP methods and query options
 */
class ProjectApi {
  findById = projectRequests.findById
  findBySlug = projectRequests.findBySlug
  findMany = projectRequests.findMany
  findNames = projectRequests.findNames
  create = projectRequests.create
  update = projectRequests.update
  delete = projectRequests.delete
  addMember = projectRequests.addMember
  removeMember = projectRequests.removeMember
  updateMemberRole = projectRequests.updateMemberRole

  /**
   * Query options for finding project by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: projectKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding project by slug
   */
  findBySlugOptions(slug: string) {
    return {
      queryKey: projectKeys.detailBySlug(slug),
      queryFn: () => this.findBySlug(slug),
      enabled: !!slug,
    }
  }

  /**
   * Query options for finding many projects
   */
  findManyOptions(params?: ProjectParams) {
    return {
      queryKey: projectKeys.list(params || {}),
      queryFn: () => this.findMany(params),
    }
  }

  /**
   * Query options for finding project names
   */
  findNamesOptions(params?: ProjectNamesParams) {
    return {
      queryKey: projectKeys.names(params || {}),
      queryFn: () => this.findNames(params),
    }
  }
}

export const projectApi = new ProjectApi()
