interface Props {
  title: string
  description: string
  icon?: React.ReactNode
}

export const ComingSoonSection = ({ title, description, icon }: Props) => {
  const defaultIcon = (
    <svg
      className='text-muted-foreground h-8 w-8'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4'
      />
    </svg>
  )

  return (
    <div className='flex flex-col items-center justify-center py-6 text-center'>
      <div className='bg-muted mb-4 rounded-full p-4'>
        {icon || defaultIcon}
      </div>
      <h3 className='text-foreground mb-2 text-lg font-semibold'>{title}</h3>
      <p className='text-muted-foreground mb-4 max-w-sm text-sm'>
        {description}
      </p>
      <div className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset'>
        <svg className='mr-1 h-3 w-3' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        Coming Soon
      </div>
    </div>
  )
}
