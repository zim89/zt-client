import { type ReactNode } from 'react'
import { Header } from '../ui/header'

type Props = {
  children: ReactNode
}

export const PublicLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
      <Header />
      {children}
    </div>
  )
}
