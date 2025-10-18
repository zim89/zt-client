'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  markerApi,
  markerKeys,
  type CreateMarkerDto,
  type Marker,
} from '@/entities/marker'
import { logError } from '@/shared/utils'

interface UseCreateMarkerOptions {
  onSuccess?: (data: Marker) => void
  onError?: (error: Error, variables: CreateMarkerDto) => void
  onSettled?: () => void
}

/**
 * Hook for creating a new marker
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useCreateMarker = (options: UseCreateMarkerOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: markerApi.create,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, _variables, _context) => {
      // Toast success notification
      toast.success('Marker created successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: markerKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useCreateMarker] Create error:', error)

      // Toast error notification
      toast.error('Failed to create marker. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
