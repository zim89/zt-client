'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { taskApi, taskKeys } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseRemoveMarkerOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: { taskId: string; markerId: string },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for removing a marker from a task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useRemoveMarker = (options: UseRemoveMarkerOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, markerId }: { taskId: string; markerId: string }) =>
      taskApi.removeMarker(taskId, markerId),

    // No retry for remove operations
    retry: false,

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Marker removed successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.taskId),
      })
      queryClient.invalidateQueries({ queryKey: taskKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useRemoveMarker] Remove marker error:', error)

      // Toast error notification
      toast.error('Failed to remove marker. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
