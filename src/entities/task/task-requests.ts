import { apiRoutes, axiosClient } from '@/shared/api'
import { PaginatedResponse } from '@/shared/types'
import type {
  AssignTaskDto,
  CreateTaskDto,
  Task,
  TaskParams,
  UpdateTaskDto,
  UpdateTaskStatusDto,
} from './task-types'

/**
 * Task requests class
 * Contains all HTTP methods for task operations
 */
class TaskRequests {
  /**
   * Find task by ID
   */
  async findById(id: string): Promise<Task> {
    const response = await axiosClient.get<Task>(apiRoutes.task.findById(id))
    return response.data
  }

  /**
   * Find many tasks with pagination and filtering
   */
  async findMany(params?: TaskParams): Promise<PaginatedResponse<Task>> {
    const searchParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
    }

    const response = await axiosClient.get<PaginatedResponse<Task>>(
      `${apiRoutes.task.findMany}?${searchParams.toString()}`,
    )

    return response.data
  }

  /**
   * Create new task
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await axiosClient.post<Task>(apiRoutes.task.create, data)
    return response.data
  }

  /**
   * Update task
   */
  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await axiosClient.patch<Task>(
      apiRoutes.task.update(id),
      data,
    )
    return response.data
  }

  /**
   * Delete task
   */
  async delete(id: string): Promise<void> {
    await axiosClient.delete(apiRoutes.task.delete(id))
  }

  /**
   * Update task status
   */
  async updateStatus(id: string, data: UpdateTaskStatusDto): Promise<Task> {
    const response = await axiosClient.patch<Task>(
      apiRoutes.task.updateStatus(id),
      data,
    )
    return response.data
  }

  /**
   * Assign task to user
   */
  async assign(id: string, data: AssignTaskDto): Promise<Task> {
    const response = await axiosClient.patch<Task>(
      apiRoutes.task.assign(id),
      data,
    )
    return response.data
  }

  /**
   * Add marker to task
   */
  async addMarker(id: string, markerId: string): Promise<Task> {
    const response = await axiosClient.post<Task>(
      apiRoutes.task.addMarker(id, markerId),
    )
    return response.data
  }

  /**
   * Remove marker from task
   */
  async removeMarker(id: string, markerId: string): Promise<void> {
    await axiosClient.delete(apiRoutes.task.removeMarker(id, markerId))
  }
}

export const taskRequests = new TaskRequests()
