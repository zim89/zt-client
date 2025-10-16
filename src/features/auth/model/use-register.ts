'use client'

import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  authApi,
  authKeys,
  type AuthResponse,
  type RegisterDto,
} from '@/entities/auth'
import { appRoutes } from '@/shared/config'
import { logError } from '@/shared/utils'
import { useAuthStore } from './auth-store-provider'

type UseRegisterOptions = {
  onSuccess?: (data: AuthResponse) => void
  onError?: (error: Error, variables: RegisterDto) => void
  onSettled?: () => void
}

/**
 * Hook for user registration
 * Handles registration, state update, and navigation
 *
 * @param options - Options for configuring hook behavior
 * @returns Mutation object with register method and states
 *
 * @example
 * ```tsx
 * const register = useRegister({
 *   onSuccess: (data) => console.log('Registered:', data.user.email)
 * })
 *
 * register.mutate({
 *   email: 'user@example.com',
 *   password: '123456',
 *   firstName: 'John',
 *   lastName: 'Doe'
 * })
 * ```
 */
export const useRegister = (options: UseRegisterOptions = {}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setAuth = useAuthStore(state => state.setAuth)

  return useMutation({
    mutationFn: authApi.register,

    // Retry logic for registration
    retry: 1,
    retryDelay: 1000,

    onMutate: async () => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: authKeys.index })
    },

    onSuccess: (response, _variables, _context) => {
      // Toast success notification
      toast.success('Account created successfully! Welcome to ZenTask.')

      // Save authentication to store and cookies
      setAuth({
        userId: response.user.id,
        accessToken: response.accessToken,
      })

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: authKeys.profile() })

      // Redirect to app
      router.push(appRoutes.app.index)

      // Call success callback
      options.onSuccess?.(response)
    },

    onError: (error, _variables, _context) => {
      // Log error
      logError('❌ [useRegister] Registration error:', error)

      // Toast error notification
      toast.error('Failed to create account. Please try again.')

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
