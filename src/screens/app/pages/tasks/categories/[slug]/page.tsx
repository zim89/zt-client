'use client'

import { FolderIcon } from 'lucide-react'
import { useFindCategoryBySlug } from '@/features/category'
import {
  CreateTaskDialog,
  TaskTable,
  useCreateTask,
  useFindTasks,
} from '@/features/task'
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

  const createTaskMutation = useCreateTask({
    onSuccess: () => {
      // Task will be automatically added to the list via query invalidation
    },
  })

  const handleCreateTask = async (name: string) => {
    if (!category?.id) return

    try {
      await createTaskMutation.mutateAsync({
        name,
        categoryId: category.id,
        status: 'NOT_STARTED',
      })
    } catch {
      // Error handling is done in the mutation hook
    }
  }

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <h1 className='page-title'>Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <h1 className='page-title'>Error loading tasks</h1>
        <p className='text-muted-foreground'>
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
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
          showTaskCreator={true}
          onCreateTask={handleCreateTask}
          isCreatingTask={createTaskMutation.isPending}
          taskCreatorPlaceholder={`Add task to ${category?.name}...`}
          taskCreatorButtonText='Add Task'
        />
      )}
    </div>
  )
}
