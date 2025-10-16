import type { UserRole, UserStatus } from '@/shared/constants'

// ==============================
// MAIN TYPES
// ==============================

/** Main user entity */
export type User = {
  id: string
  createdAt: string
  updatedAt: string

  email: string
  firstName: string
  lastName: string
  avatar: string | null
  phone: string | null
  roles: UserRole[]
  status: UserStatus

  emailVerified: boolean
  lastLoginAt: string | null
}

/** Authentication response */
export type AuthResponse = {
  user: User
  accessToken: string
}

// ==============================
// DTO TYPES
// ==============================

/** User login data */
export type LoginDto = {
  email: string
  password: string
}

/** User registration data */
export type RegisterDto = {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

/** Token refresh response */
export type RefreshResponse = {
  accessToken: string
}

/** Logout response */
export type LogoutResponse = {
  message: string
}
