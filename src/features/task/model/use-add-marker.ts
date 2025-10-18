'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { taskApi, taskKeys } from '@/entities/task'
import { logError } from '@/shared/utils'

interface UseAddMarkerOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: { taskId: string; markerId: string },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for adding a marker to a task
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useAddMarker = (options: UseAddMarkerOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, markerId }: { taskId: string; markerId: string }) =>
      taskApi.addMarker(taskId, markerId),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Marker added successfully')

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
      logError('❌ [useAddMarker] Add marker error:', error)

      // Toast error notification
      toast.error('Failed to add marker. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
