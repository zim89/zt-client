'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  categoryApi,
  categoryKeys,
  type Category,
  type CreateCategoryDto,
} from '@/entities/category'
import { logError } from '@/shared/utils'

interface UseCreateCategoryOptions {
  onSuccess?: (data: Category) => void
  onError?: (error: Error, variables: CreateCategoryDto) => void
  onSettled?: () => void
}

/**
 * Hook for creating a new category
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useCreateCategory = (options: UseCreateCategoryOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.create,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, _variables, _context) => {
      // Toast success notification
      toast.success('Category created successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: categoryKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useCreateCategory] Create error:', error)

      // Toast error notification
      toast.error('Failed to create category. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
