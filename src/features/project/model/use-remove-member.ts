'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { projectApi, projectKeys } from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseRemoveMemberOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: { projectId: string; userId: string },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for removing a member from a project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useRemoveMember = (options: UseRemoveMemberOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      userId,
    }: {
      projectId: string
      userId: string
    }) => projectApi.removeMember(projectId, userId),

    // No retry for remove operations
    retry: false,

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Member removed successfully')

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.projectId),
      })
      queryClient.invalidateQueries({ queryKey: projectKeys.all() })

      // Call success callback
      options.onSuccess?.()
    },

    onError: (error, variables, _context) => {
      // Log error
      logError('❌ [useRemoveMember] Remove member error:', error)

      // Toast error notification
      toast.error('Failed to remove member. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
