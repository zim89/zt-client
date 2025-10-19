'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  projectApi,
  projectKeys,
  type CreateProjectDto,
  type Project,
} from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseCreateProjectOptions {
  onSuccess?: (data: Project) => void
  onError?: (error: Error, variables: CreateProjectDto) => void
  onSettled?: () => void
}

/**
 * Hook for creating a new project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useCreateProject = (options: UseCreateProjectOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: projectApi.create,

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (data, _variables, _context) => {
      // Toast success notification
      toast.success('Project created successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: projectKeys.all() })
      queryClient.invalidateQueries({ queryKey: projectKeys.names({}) })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useCreateProject] Create error:', error)

      // Toast error notification
      toast.error('Failed to create project. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
