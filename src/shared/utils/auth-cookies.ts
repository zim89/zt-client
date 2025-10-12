import { persistKeys } from '@/shared/constants'
import { createCookieStorage } from './cookie-storage'

/**
 * Secure attributes for auth cookies
 */
const secureAuthCookieAttrs = {
  httpOnly: false, // Client-side needs to read these
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  expires: 7,
}

/**
 * Creates storage for access token
 */
export const accessTokenStorage = createCookieStorage(
  persistKeys.accessToken,
  secureAuthCookieAttrs,
)

/**
 * Creates storage for refresh token (read-only on client)
 */
export const refreshTokenStorage = createCookieStorage(
  persistKeys.refreshToken,
  secureAuthCookieAttrs,
)

/**
 * Creates storage for user ID
 */
export const userIdStorage = createCookieStorage(
  persistKeys.userId,
  secureAuthCookieAttrs,
)

/**
 * Interface for auth cookies
 */
export interface AuthCookies {
  accessToken: string
  refreshToken: string
  userId: string
}

/**
 * Utilities for working with auth cookies
 */
export const authCookies = {
  /**
   * Sets access token and user ID
   */
  set(auth: Omit<AuthCookies, 'refreshToken'>) {
    accessTokenStorage.set(auth.accessToken)
    userIdStorage.set(auth.userId.toString())
  },

  /**
   * Gets all auth cookies
   */
  get(): AuthCookies | null {
    const accessToken = accessTokenStorage.get()
    const refreshToken = refreshTokenStorage.get()
    const userId = userIdStorage.get()

    if (!accessToken || !refreshToken || !userId) {
      return null
    }

    return {
      accessToken,
      refreshToken,
      userId,
    }
  },

  /**
   * Clears access token and user ID
   */
  clear() {
    accessTokenStorage.clear()
    userIdStorage.clear()
  },

  /**
   * Checks if all auth cookies are present
   */
  hasAuth(): boolean {
    return authCookies.get() !== null
  },

  /**
   * Gets only access token
   */
  getAccessToken(): string | null {
    return accessTokenStorage.get()
  },

  /**
   * Gets only refresh token
   */
  getRefreshToken(): string | null {
    return refreshTokenStorage.get()
  },

  /**
   * Gets only user ID
   */
  getUserId(): string | null {
    return userIdStorage.get()
  },
}
