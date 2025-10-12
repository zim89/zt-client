import Link from 'next/link'
import { Logo } from '@/shared/components'
import { Button } from '@/shared/components/ui/button'
import { appRoutes } from '@/shared/config'

export const Header = () => {
  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        {/* Logo */}
        <Link
          href={appRoutes.root.index}
          className='flex items-center space-x-3'
        >
          <Logo size='md' />
          <span className='bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-xl font-bold text-transparent'>
            ZenTask
          </span>
        </Link>

        {/* Navigation */}
        <nav className='hidden items-center space-x-6 md:flex'>
          <Link
            href={appRoutes.root.about}
            className='hover:text-primary text-sm font-medium transition-colors'
          >
            About
          </Link>
          <Link
            href={appRoutes.root.features}
            className='hover:text-primary text-sm font-medium transition-colors'
          >
            Features
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className='flex items-center space-x-3'>
          <Button variant='ghost' asChild>
            <Link href={appRoutes.auth.login}>Log in</Link>
          </Button>
          <Button asChild>
            <Link href={appRoutes.auth.register}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
