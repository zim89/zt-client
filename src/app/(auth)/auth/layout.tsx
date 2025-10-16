import { AuthLayout } from '@/screens/auth'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
