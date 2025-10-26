import React from 'react'
import { LucideIcon } from 'lucide-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/shared/components/ui/empty'

type Props = {
  title: string
  description: string
  icon: LucideIcon
  action?: React.ReactNode
}

export function EmptyData({ title, description, icon, action }: Props) {
  return (
    <Empty className='bg-muted/30 mx-auto w-1/2 border border-dashed'>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          {React.createElement(icon, { className: 'size-5' })}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent>
          <div className='flex gap-2'>{action}</div>
        </EmptyContent>
      )}
    </Empty>
  )
}
