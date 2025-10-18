import { taskKeys } from './task-keys'
import { taskRequests } from './task-requests'
import type { TaskParams } from './task-types'

/**
 * API class for task operations
 * Contains HTTP methods and query options
 */
class TaskApi {
  findById = taskRequests.findById
  findMany = taskRequests.findMany
  create = taskRequests.create
  update = taskRequests.update
  delete = taskRequests.delete
  updateStatus = taskRequests.updateStatus
  assign = taskRequests.assign
  addMarker = taskRequests.addMarker
  removeMarker = taskRequests.removeMarker

  /**
   * Query options for finding task by ID
   */
  findByIdOptions(id: string) {
    return {
      queryKey: taskKeys.detail(id),
      queryFn: () => this.findById(id),
      enabled: !!id,
    }
  }

  /**
   * Query options for finding many tasks
   */
  findManyOptions(params?: TaskParams) {
    return {
      queryKey: taskKeys.list(params || {}),
      queryFn: () => this.findMany(params),
    }
  }
}

export const taskApi = new TaskApi()
