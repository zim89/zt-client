import { QueryClient } from '@tanstack/react-query'

/**
 * Check if error is a client error (4xx status code)
 */
const isClientError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status
    return status >= 400 && status < 500
  }
  return false
}

/**
 * Calculate retry delay with exponential backoff
 */
const getRetryDelay = (attemptIndex: number, maxDelay: number): number => {
  return Math.min(1000 * 2 ** attemptIndex, maxDelay)
}

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Data remains fresh for 5 minutes
        staleTime: 1000 * 60 * 5,
        // Cached for 10 minutes (renamed from cacheTime)
        gcTime: 1000 * 60 * 10,
        // Disable automatic refetching for better UX
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: 'always',
        // Retry logic with exponential backoff
        retry: (failureCount, error: unknown) => {
          // Don't retry on 4xx errors (client errors)
          if (isClientError(error)) {
            return false
          }
          // Retry up to 3 times for other errors
          return failureCount < 3
        },
        retryDelay: attemptIndex => getRetryDelay(attemptIndex, 10000),
        // Network mode for better offline support
        networkMode: 'online',
      },
      mutations: {
        // Fewer retries for mutations
        retry: (failureCount, error: unknown) => {
          // Don't retry on 4xx errors
          if (isClientError(error)) {
            return false
          }
          // Retry once for network errors
          return failureCount < 1
        },
        retryDelay: attemptIndex => getRetryDelay(attemptIndex, 5000),
        // Network mode for mutations
        networkMode: 'online',
      },
    },
  })

let browserQueryClient: QueryClient | undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient()
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient()
  }

  return browserQueryClient
}
