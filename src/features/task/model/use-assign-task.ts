'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { taskApi, taskKeys, type AssignTaskDto } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseAssignTaskOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: { id: string; data: AssignTaskDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for assigning task to a user
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useAssignTask = (options: UseAssignTaskOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AssignTaskDto }) =>
      taskApi.assign(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Task assigned successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: taskKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useAssignTask] Assign error:', error)

      // Toast error notification
      toast.error('Failed to assign task. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
