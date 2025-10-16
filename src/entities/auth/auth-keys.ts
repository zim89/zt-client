/**
 * Query keys for auth entity
 * Used for TanStack Query cache management
 */
export const authKeys = {
  index: ['auth'] as const,

  login: () => [...authKeys.index, 'login'] as const,
  register: () => [...authKeys.index, 'register'] as const,
  refresh: () => [...authKeys.index, 'refresh'] as const,
  logout: () => [...authKeys.index, 'logout'] as const,
  profile: () => [...authKeys.index, 'profile'] as const,
} as const
