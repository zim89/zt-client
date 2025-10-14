'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { toast } from 'sonner'
import {
  authApi,
  authKeys,
  type AuthResponse,
  type LoginDto,
} from '@/entities/auth'
import { appRoutes } from '@/shared/config'
import { queryParamsKeys } from '@/shared/constants'
import { logError } from '@/shared/utils'
import { useAccessToken, useAuthStore, useUserId } from './auth-store-provider'

type UseLoginOptions = {
  onSuccess?: (data: AuthResponse) => void
  onError?: (error: Error, variables: LoginDto) => void
  onSettled?: () => void
}

/**
 * Hook for user login
 * Handles authentication, state update, and navigation
 *
 * @param options - Options for configuring hook behavior
 * @returns Mutation object with login method and states
 *
 * @example
 * ```tsx
 * const login = useLogin({
 *   onSuccess: (data) => console.log('Logged in:', data.user.email)
 * })
 *
 * login.mutate({ email: 'user@example.com', password: '123456' })
 * ```
 */
export const useLogin = (options: UseLoginOptions = {}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [redirect] = useQueryState(queryParamsKeys.redirect)
  const setAuth = useAuthStore(state => state.setAuth)

  const userId = useUserId()
  const accessToken = useAccessToken()

  return useMutation({
    mutationFn: authApi.login,

    // Retry logic for login - more attempts as it's a critical operation
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),

    onMutate: async () => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: authKeys.index })

      // Save previous state for rollback
      const previousAuth = {
        userId,
        accessToken,
      }

      return { previousAuth }
    },

    onSuccess: (response, _variables, _context) => {
      // Toast success notification
      toast.success('You have successfully logged in')

      // Save authentication to store and cookies
      setAuth({
        userId: response.user.id,
        accessToken: response.accessToken,
      })

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: authKeys.profile() })

      // Redirect to hub or previous page
      const redirectTo = redirect ?? appRoutes.app.index
      router.push(redirectTo)

      // Call success callback
      options.onSuccess?.(response)
    },

    onError: (error, _variables, context) => {
      // Log error
      logError('❌ [useLogin] Login error:', error)

      // Toast error notification
      toast.error('Failed to log in. Please check your email and password.')

      // Rollback on error - only if previous state was valid
      if (context?.previousAuth?.userId && context.previousAuth.accessToken) {
        setAuth({
          userId: context.previousAuth.userId,
          accessToken: context.previousAuth.accessToken,
        })
      }

      // Call error callback
      options.onError?.(error, _variables)
    },

    onSettled: () => {
      // Always invalidate auth queries after completion
      queryClient.invalidateQueries({ queryKey: authKeys.index })

      // Call settled callback
      options.onSettled?.()
    },
  })
}
