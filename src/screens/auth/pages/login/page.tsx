import { Suspense } from 'react'
import { LoginForm } from '@/features/auth'

export const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
