'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { taskApi, taskKeys } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseDeleteTaskOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting a task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteTask = (options: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => taskApi.delete(id),

    // No retry for delete operations
    retry: false,

    onMutate: async id => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) })

      // Snapshot previous value
      const previousTask = queryClient.getQueryData(taskKeys.detail(id))

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(id) })

      // Return context for rollback
      return { previousTask, id }
    },

    onSuccess: (_data, _id, _context) => {
      // Toast success notification
      toast.success('Task deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: taskKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, id, context) => {
      // Log error
      logError('❌ [useDeleteTask] Delete error:', error)

      // Toast error notification
      toast.error('Failed to delete task. Please try again.')

      // Rollback on error
      if (context?.previousTask) {
        queryClient.setQueryData(taskKeys.detail(id), context.previousTask)
      }

      // Call error callback
      options.onError?.(error, id)
    },

    onSettled: (_data, _error, _id) => {
      // Always invalidate after error or success
      queryClient.invalidateQueries({ queryKey: taskKeys.all() })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
