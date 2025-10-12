import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { features } from '../lib/constants'

export const FeaturesSection = () => {
  return (
    <section
      id='features'
      className='relative bg-slate-100 py-12 md:py-20 dark:bg-slate-800'
    >
      {/* Subtle darker background - Section 2 for contrast */}
      <div className='container'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>
            Built for your personal productivity
          </h2>
          <p className='text-muted-foreground mt-6 text-lg leading-8 sm:text-xl'>
            Everything you need to organize your life and achieve your goals.
            Team features included when you need them.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-6xl'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='group border-2 transition-all hover:border-cyan-500/50 hover:shadow-lg'
              >
                <CardHeader>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-cyan-600 text-2xl shadow-sm'>
                    {feature.icon}
                  </div>
                  <CardTitle className='text-xl'>{feature.title}</CardTitle>
                  <CardDescription className='text-base leading-relaxed'>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
