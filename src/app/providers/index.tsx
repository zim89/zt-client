'use client'

import { AuthStoreProvider } from '@/features/auth'
import { QueryProvider } from './query-provider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </QueryProvider>
  )
}
