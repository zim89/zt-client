import { apiRoutes, axiosClient } from '@/shared/api'
import type {
  AuthResponse,
  LoginDto,
  LogoutResponse,
  RefreshResponse,
  RegisterDto,
  User,
} from './auth-types'

/**
 * API class for authentication operations
 * Handles all HTTP requests related to auth
 */
class AuthApi {
  /**
   * User login
   * @param data - Login credentials
   * @returns User data with access token
   */
  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      apiRoutes.auth.login,
      data,
    )
    return response.data
  }

  /**
   * New user registration
   * @param data - Registration data
   * @returns User data with access token
   */
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await axiosClient.post<AuthResponse>(
      apiRoutes.auth.register,
      data,
    )
    return response.data
  }

  /**
   * Refresh authentication token
   * Uses httpOnly cookie for refresh token
   * @returns New access token
   */
  async refresh(): Promise<RefreshResponse> {
    const response = await axiosClient.post<RefreshResponse>(
      apiRoutes.auth.refresh,
      {},
    )
    return response.data
  }

  /**
   * User logout
   * Clears httpOnly refresh token cookie
   * @returns Success message
   */
  async logout(): Promise<LogoutResponse> {
    const response = await axiosClient.get<LogoutResponse>(
      apiRoutes.auth.logout,
    )
    return response.data
  }

  /**
   * Get current user profile
   * Requires valid access token
   * @returns Current user data
   */
  async getProfile(): Promise<User> {
    const response = await axiosClient.get<User>(apiRoutes.auth.profile)
    return response.data
  }
}

export const authApi = new AuthApi()
