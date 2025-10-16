'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore } from 'zustand'
import { createAuthStore, type AuthStore } from './auth-store'

type AuthStoreApi = ReturnType<typeof createAuthStore>

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined)

type Props = {
  children: ReactNode
  initialUserId?: string | null
  initialAccessToken?: string | null
}

/**
 * Auth Store Provider
 * Provides auth state to the application
 */
export const AuthStoreProvider = ({
  children,
  initialUserId = null,
  initialAccessToken = null,
}: Props) => {
  const storeRef = useRef<AuthStoreApi | null>(null)

  if (storeRef.current === null) {
    storeRef.current = createAuthStore({
      userId: initialUserId,
      accessToken: initialAccessToken,
    })
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  )
}

/**
 * Hook to access auth store
 * Must be used within AuthStoreProvider
 */
export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error('useAuthStore must be used within AuthStoreProvider')
  }

  return useStore(authStoreContext, selector)
}

// ==============================
// SELECTORS
// ==============================

const selectAuth = (state: AuthStore) => ({
  userId: state.userId,
  accessToken: state.accessToken,
  setAuth: state.setAuth,
  updateAccessToken: state.updateAccessToken,
  logout: state.logout,
})

// ==============================
// CONVENIENT HOOKS
// ==============================

/** Hook to get full auth state and actions */
export const useAuth = () => useAuthStore(selectAuth)

/** Hook to get current user ID */
export const useUserId = () => useAuthStore(state => state.userId)

/** Hook to get current access token */
export const useAccessToken = () => useAuthStore(state => state.accessToken)
