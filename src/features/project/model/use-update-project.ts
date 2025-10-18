'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  projectApi,
  projectKeys,
  type Project,
  type UpdateProjectDto,
} from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseUpdateProjectOptions {
  onSuccess?: (data: Project) => void
  onError?: (
    error: Error,
    variables: { id: string; data: UpdateProjectDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating a project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateProject = (options: UseUpdateProjectOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectApi.update(id, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: projectKeys.detail(id) })

      // Snapshot previous value
      const previousProject = queryClient.getQueryData(projectKeys.detail(id))

      // Optimistically update
      if (previousProject) {
        queryClient.setQueryData(projectKeys.detail(id), {
          ...previousProject,
          ...data,
        })
      }

      // Return context for rollback
      return { previousProject }
    },

    onSuccess: (data, variables, _context) => {
      // Toast success notification
      toast.success('Project updated successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.id),
      })
      queryClient.invalidateQueries({ queryKey: projectKeys.all() })

      // Call success callback
      options.onSuccess?.(data)
    },

    onError: (error, variables, context) => {
      // Log error
      logError('❌ [useUpdateProject] Update error:', error)

      // Toast error notification
      toast.error('Failed to update project. Please try again.')

      // Rollback on error
      if (context?.previousProject) {
        queryClient.setQueryData(
          projectKeys.detail(variables.id),
          context.previousProject,
        )
      }

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.id),
      })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
