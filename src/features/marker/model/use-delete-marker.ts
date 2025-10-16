'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { markerApi, markerKeys } from '@/entities/marker'
import { logError } from '@/shared/utils'

interface UseDeleteMarkerOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting a marker
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteMarker = (options: UseDeleteMarkerOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markerApi.delete(id),

    // No retry for delete operations
    retry: false,

    onMutate: async id => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: markerKeys.detail(id) })

      // Snapshot previous value
      const previousMarker = queryClient.getQueryData(markerKeys.detail(id))

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: markerKeys.detail(id) })

      // Return context for rollback
      return { previousMarker, id }
    },

    onSuccess: (_data, _id, _context) => {
      // Toast success notification
      toast.success('Marker deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: markerKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, id, context) => {
      // Log error
      logError('❌ [useDeleteMarker] Delete error:', error)

      // Toast error notification
      toast.error('Failed to delete marker. Please try again.')

      // Rollback on error
      if (context?.previousMarker) {
        queryClient.setQueryData(markerKeys.detail(id), context.previousMarker)
      }

      // Call error callback
      options.onError?.(error, id)
    },

    onSettled: (_data, _error, _id) => {
      // Always invalidate after error or success
      queryClient.invalidateQueries({ queryKey: markerKeys.all() })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
