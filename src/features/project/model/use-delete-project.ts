'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { projectApi, projectKeys } from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseDeleteProjectOptions {
  onSuccess?: () => void
  onError?: (error: Error, variables: string) => void
  onSettled?: () => void
}

/**
 * Hook for deleting a project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useDeleteProject = (options: UseDeleteProjectOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectApi.delete(id),

    // No retry for delete operations
    retry: false,

    onMutate: async id => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: projectKeys.detail(id) })

      // Snapshot previous value
      const previousProject = queryClient.getQueryData(projectKeys.detail(id))

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) })

      // Return context for rollback
      return { previousProject, id }
    },

    onSuccess: (_data, _id, _context) => {
      // Toast success notification
      toast.success('Project deleted successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: projectKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, id, context) => {
      // Log error
      logError('❌ [useDeleteProject] Delete error:', error)

      // Toast error notification
      toast.error('Failed to delete project. Please try again.')

      // Rollback on error
      if (context?.previousProject) {
        queryClient.setQueryData(
          projectKeys.detail(id),
          context.previousProject,
        )
      }

      // Call error callback
      options.onError?.(error, id)
    },

    onSettled: (_data, _error, _id) => {
      // Always invalidate after error or success
      queryClient.invalidateQueries({ queryKey: projectKeys.all() })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
