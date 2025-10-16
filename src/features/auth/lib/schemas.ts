import { z } from 'zod'

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Register form validation schema
 */
export const registerSchema = z.object({
  // firstName: z
  //   .string()
  //   .min(1, 'First name is required')
  //   .min(2, 'First name must be at least 2 characters')
  //   .optional(),
  // lastName: z
  //   .string()
  //   .min(1, 'Last name is required')
  //   .min(2, 'Last name must be at least 2 characters')
  //   .optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
