'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { categoryApi, categoryKeys } from '@/entities/category'
import { logError } from '@/shared/utils'

interface UseDeleteCategoryOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting a category
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteCategory = (options: UseDeleteCategoryOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),

    // No retry for delete operations
    retry: false,

    onMutate: async id => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: categoryKeys.detail(id) })

      // Snapshot previous value
      const previousCategory = queryClient.getQueryData(categoryKeys.detail(id))

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: categoryKeys.detail(id) })

      // Return context for rollback
      return { previousCategory, id }
    },

    onSuccess: (_data, _id, _context) => {
      // Toast success notification
      toast.success('Category deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, id, context) => {
      // Log error
      logError('❌ [useDeleteCategory] Delete error:', error)

      // Toast error notification
      toast.error('Failed to delete category. Please try again.')

      // Rollback on error
      if (context?.previousCategory) {
        queryClient.setQueryData(
          categoryKeys.detail(id),
          context.previousCategory,
        )
      }

      // Call error callback
      options.onError?.(error, id)
    },

    onSettled: (_data, _error, _id) => {
      // Always invalidate after error or success
      queryClient.invalidateQueries({ queryKey: categoryKeys.all() })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
