'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { projectApi, projectKeys, type AddMemberDto } from '@/entities/project'
import { logError } from '@/shared/utils'

interface UseAddMemberOptions {
  onSuccess?: () => void
  onError?: (
    error: Error,
    variables: { projectId: string; data: AddMemberDto },
  ) => void
  onSettled?: () => void
}

/**
 * Hook for adding a member to a project
 *
 * @param options - Callback options for mutation lifecycle
 * @returns Mutation object with methods and states
 */
export const useAddMember = (options: UseAddMemberOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string
      data: AddMemberDto
    }) => projectApi.addMember(projectId, data),

    // Retry logic
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

    onSuccess: (_data, variables, _context) => {
      // Toast success notification
      toast.success('Member added successfully')

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
      logError('❌ [useAddMember] Add member error:', error)

      // Toast error notification
      toast.error('Failed to add member. Please try again.')

      // Call error callback
      options.onError?.(error, variables)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
