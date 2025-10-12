import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { appRoutes } from '@/shared/config'

export const CTASection = () => {
  return (
    <section className='bg-background relative overflow-hidden py-12 md:py-20'>
      {/* Light background - Section 3 */}
      <div className='from-accent/10 to-primary/5 absolute inset-0 -z-10 bg-gradient-to-br' />

      <div className='container'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
            Start organizing your life today
          </h2>
          <p className='text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-xl'>
            Join thousands of users who trust ZenTask to stay productive and
            achieve their goals.
          </p>
          <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
            <Button size='lg' className='w-full sm:w-auto' asChild>
              <Link href={appRoutes.auth.register}>
                Get started free
                <span className='ml-2'>→</span>
              </Link>
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='w-full sm:w-auto'
              asChild
            >
              <Link href='/hub'>View demo</Link>
            </Button>
          </div>
          <p className='text-muted-foreground mt-8 text-sm'>
            No credit card required • Free forever plan • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
