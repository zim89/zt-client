import { type ReactNode } from 'react'
import { Header } from '../ui/header'

type Props = {
  children: ReactNode
}

export const PublicLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>{children}</main>
    </div>
  )
}
