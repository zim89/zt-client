'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  projectApi,
  projectKeys,
  type UpdateMemberRoleDto,
} from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseUpdateMemberRoleOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: {
      projectId: string
      userId: string
      data: UpdateMemberRoleDto
    },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for updating a member's role in a project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useUpdateMemberRole = (
  options: UseUpdateMemberRoleOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      userId,
      data,
    }: {
      projectId: string
      userId: string
      data: UpdateMemberRoleDto
    }) => projectApi.updateMemberRole(projectId, userId, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Member role updated successfully')

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
      logError('❌ [useUpdateMemberRole] Update role error:', error)

      // Toast error notification
      toast.error('Failed to update member role. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
