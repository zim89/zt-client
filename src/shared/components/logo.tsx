import { cn } from '../utils'

type Props = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

export const Logo = ({ size = 'md', className = '' }: Props) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className,
      )}
    >
      <div className='relative'>
        {/* Hexagon base */}
        <div className='h-8 w-8 rotate-45 transform rounded-lg bg-gradient-to-br from-blue-700 to-cyan-600 shadow-lg'></div>

        {/* Inner elements */}
        <div className='absolute inset-0 flex items-center justify-center'>
          {/* Task list representation */}
          <div className='flex -rotate-45 transform flex-col space-y-0.5'>
            <div className='h-1 w-3 rounded-full bg-white/90'></div>
            <div className='h-1 w-2.5 rounded-full bg-white/80'></div>
            <div className='h-1 w-2 rounded-full bg-white/70'></div>
          </div>
        </div>

        {/* Floating checkmark */}
        <div className='ring-background absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-500 shadow-md ring-2'>
          <div className='bg-background h-1.5 w-1.5 rounded-full'></div>
        </div>

        {/* Glow effect */}
        <div className='absolute inset-0 h-8 w-8 rotate-45 transform rounded-lg bg-gradient-to-br from-blue-600/40 to-cyan-500/40 opacity-70 blur-sm'></div>
      </div>
    </div>
  )
}
