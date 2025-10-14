'use client'

import { useQuery } from '@tanstack/react-query'
import { authApi, authKeys } from '@/entities/auth'
import { useAccessToken } from './auth-store-provider'

type UseProfileOptions = {
  enabled?: boolean
}

/**
 * Hook to get current user profile
 * Automatically fetches when access token is available
 *
 * @param options - Query options
 * @returns Query object with user profile data
 *
 * @example
 * ```tsx
 * const { data: user, isLoading } = useProfile()
 *
 * if (isLoading) return <Spinner />
 * if (!user) return <div>Not authenticated</div>
 *
 * return <div>Hello, {user.firstName}!</div>
 * ```
 */
export const useProfile = (options: UseProfileOptions = {}) => {
  const accessToken = useAccessToken()

  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: options.enabled !== false && Boolean(accessToken),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
