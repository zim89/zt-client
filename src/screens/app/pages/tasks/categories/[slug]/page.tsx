'use client'

import { FolderIcon } from 'lucide-react'
import { useFindCategoryBySlug } from '@/features/category'
import { CreateTaskDialog, TaskTable, useFindTasks } from '@/features/task'
import { EmptyData } from '@/shared/components'

type Props = {
  categorySlug: string
}

export const TasksByCategoryPage = ({ categorySlug }: Props) => {
  const { data: category } = useFindCategoryBySlug(categorySlug)
  const {
    data: tasksData,
    isLoading,
    error,
  } = useFindTasks({ categorySlug, limit: 10000 })

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='page-title'>Loading...</h1>
        <div className='flex h-64 items-center justify-center'>
          <div className='text-muted-foreground'>Loading tasks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <h1 className='page-title'>{category?.name ?? 'Category'}</h1>
        <div className='flex h-64 items-center justify-center'>
          <div className='text-red-600'>
            Error loading tasks: {error.message}
          </div>
        </div>
      </div>
    )
  }

  const tasks = tasksData?.items ?? []

  return (
    <div className='space-y-6'>
      <h1 className='page-title'>{category?.name}</h1>

      {tasks.length === 0 ? (
        <EmptyData
          title='No tasks in this category'
          description='Create a new task to get started'
          icon={FolderIcon}
          action={
            <CreateTaskDialog
              buttonText='Create Task'
              defaultValues={{ categoryId: category?.id }}
            />
          }
        />
      ) : (
        <TaskTable
          data={tasks}
          searchPlaceholder={`Search tasks in ${category?.name}...`}
        />
      )}
    </div>
  )
}
