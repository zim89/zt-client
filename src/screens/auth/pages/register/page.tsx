import { Suspense } from 'react'
import { RegisterForm } from '@/features/auth'

export const RegisterPage = () => {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  )
}
