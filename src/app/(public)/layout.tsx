import { type ReactNode } from 'react'
import { PublicLayout } from '@/screens'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return <PublicLayout>{children}</PublicLayout>
}

export default Layout
