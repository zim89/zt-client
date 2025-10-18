/**
 * Query keys for statistic operations
 * Used by TanStack Query for caching and invalidation
 */
export const statisticKeys = {
  root: ['statistics'] as const,

  overview: () => [...statisticKeys.root, 'overview'] as const,
} as const
