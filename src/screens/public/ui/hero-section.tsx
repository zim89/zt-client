import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { appRoutes } from '@/shared/config'

export const HeroSection = () => {
  return (
    <section className='bg-background relative overflow-hidden py-12 md:py-20'>
      {/* Light background - Section 1 */}
      <div className='from-primary/5 to-accent/5 absolute inset-0 -z-10 bg-gradient-to-br' />

      <div className='container'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <div className='bg-background/60 mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm'>
            <span className='text-muted-foreground'>
              ✨ Personal task manager for everyone
            </span>
          </div>

          {/* Main heading */}
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Your personal productivity with{' '}
            <span className='bg-gradient-to-r from-blue-700 via-cyan-600 to-zinc-900 bg-clip-text text-transparent'>
              ZenTask
            </span>
          </h1>

          {/* Description */}
          <p className='text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-xl'>
            Organize your personal tasks, track your goals, and stay productive.
            Plus team collaboration when you need it.
          </p>

          {/* CTA buttons */}
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
            <Button size='lg' className='w-full sm:w-auto' asChild>
              <Link href={appRoutes.auth.register}>
                Get started free
                <span className='ml-2'>→</span>
              </Link>
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='w-full sm:w-auto'
              asChild
            >
              <Link href={appRoutes.app.index}>
                <span>View demo</span>
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className='text-muted-foreground mt-12 flex items-center justify-center gap-8 text-sm'>
            <div className='flex items-center gap-2'>
              <span className='text-2xl'>⭐</span>
              <span>No credit card required</span>
            </div>
            <div className='hidden items-center gap-2 sm:flex'>
              <span className='text-2xl'>🚀</span>
              <span>Free forever plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
