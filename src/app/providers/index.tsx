'use client'

import { QueryProvider } from './query-provider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>
}
