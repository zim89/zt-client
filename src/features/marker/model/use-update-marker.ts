'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  markerApi,
  markerKeys,
  type Marker,
  type UpdateMarkerDto,
} from '@/entities/marker'
import { logError } from '@/shared/utils'

interface UseUpdateMarkerOptions {
  onSuccess?: (data: Marker) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateMarkerDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating a marker
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateMarker = (options: UseUpdateMarkerOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMarkerDto }) =>
      markerApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: markerKeys.detail(id) })

      // Snapshot previous value
      const previousMarker = queryClient.getQueryData(markerKeys.detail(id))

      // Optimistically update
      if (previousMarker) {
        queryClient.setQueryData(markerKeys.detail(id), {
          ...previousMarker,
          ...data,
        })
      }

      // Return context for rollback
      return { previousMarker }
    },

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Marker updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: markerKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: markerKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, context) => {
      // Log error
      logError('❌ [useUpdateMarker] Update error:', error)

      // Toast error notification
      toast.error('Failed to update marker. Please try again.')

      // Rollback on error
      if (context?.previousMarker) {
        queryClient.setQueryData(
          markerKeys.detail(variables.id),
          context.previousMarker,
        )
      }

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: markerKeys.detail(variables.id),
      })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
