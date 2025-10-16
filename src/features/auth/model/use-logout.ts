'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authApi, type LogoutResponse } from '@/entities/auth'
import { appRoutes } from '@/shared/config'
import { logError } from '@/shared/utils'
import { useAuthStore } from './auth-store-provider'

type UseLogoutOptions = {
  onSuccess?: (data: LogoutResponse) => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

/**
 * Hook for user logout
 * Handles logout, state cleanup, and navigation
 *
 * @param options - Options for configuring hook behavior
 * @returns Mutation object with logout method and states
 *
 * @example
 * ```tsx
 * const logout = useLogout({
 *   onSuccess: () => console.log('Logged out')
 * })
 *
 * logout.mutate()
 * ```
 */
export const useLogout = (options: UseLogoutOptions = {}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = useAuthStore(state => state.logout)

  return useMutation({
    mutationFn: authApi.logout,

    // No retry for logout
    retry: false,

    onSuccess: (response, _variables, _context) => {
      // Clear auth state
      logout()

      // Toast success notification
      toast.success('You have been logged out')

      // Clear all queries
      queryClient.clear()

      // Redirect to public page
      router.push(appRoutes.public.index)

      // Call success callback
      options.onSuccess?.(response)
    },

    onError: (error, _variables, _context) => {
      // Log error
      logError('❌ [useLogout] Logout error:', error)

      // Even on error, clear local state
      logout()
      queryClient.clear()

      // Toast error notification
      toast.error('Logout failed, but local session was cleared')

      // Redirect anyway
      router.push(appRoutes.public.index)

      // Call error callback
      options.onError?.(error)
    },

    onSettled: () => {
      // Call settled callback
      options.onSettled?.()
    },
  })
}
