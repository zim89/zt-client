'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  categoryApi,
  categoryKeys,
  type Category,
  type UpdateCategoryDto,
} from '@/entities/category'
import { logError } from '@/shared/utils'

interface UseUpdateCategoryOptions {
  onSuccess?: (data: Category) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateCategoryDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating a category
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateCategory = (options: UseUpdateCategoryOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoryApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: categoryKeys.detail(id) })

      // Snapshot previous value
      const previousCategory = queryClient.getQueryData(categoryKeys.detail(id))

      // Optimistically update
      if (previousCategory) {
        queryClient.setQueryData(categoryKeys.detail(id), {
          ...previousCategory,
          ...data,
        })
      }

      // Return context for rollback
      return { previousCategory }
    },

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Category updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: categoryKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, context) => {
      // Log error
      logError('❌ [useUpdateCategory] Update error:', error)

      // Toast error notification
      toast.error('Failed to update category. Please try again.')

      // Rollback on error
      if (context?.previousCategory) {
        queryClient.setQueryData(
          categoryKeys.detail(variables.id),
          context.previousCategory,
        )
      }

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
