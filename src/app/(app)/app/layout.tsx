import { type ReactNode } from 'react'
import { AppLayout } from '@/screens/app'

const Layout = ({ children }: { children: ReactNode }) => {
  return <AppLayout>{children}</AppLayout>
}

export default Layout
