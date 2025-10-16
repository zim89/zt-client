'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  taskApi,
  taskKeys,
  type Task,
  type UpdateTaskDto,
} from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseUpdateTaskOptions {
  onSuccess?: (data: Task) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateTaskDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating a task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateTask = (options: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      taskApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) })

      // Snapshot previous value
      const previousTask = queryClient.getQueryData(taskKeys.detail(id))

      // Optimistically update
      if (previousTask) {
        queryClient.setQueryData(taskKeys.detail(id), {
          ...previousTask,
          ...data,
        })
      }

      // Return context for rollback
      return { previousTask }
    },

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Task updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: taskKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, context) => {
      // Log error
      logError('❌ [useUpdateTask] Update error:', error)

      // Toast error notification
      toast.error('Failed to update task. Please try again.')

      // Rollback on error
      if (context?.previousTask) {
        queryClient.setQueryData(
          taskKeys.detail(variables.id),
          context.previousTask,
        )
      }

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
