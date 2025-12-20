'use client'

import { BriefcaseBusinessIcon } from 'lucide-react'
import { useFindProjectBySlug } from '@/features/project'
import { CreateTaskDialog, TaskTable, useFindTasks } from '@/features/task'
import { EmptyData } from '@/shared/components'

type Props = {
  projectSlug: string
}

export const TasksByProjectPage = ({ projectSlug }: Props) => {
  const { data: project } = useFindProjectBySlug(projectSlug)
  const {
    data: tasksData,
    isLoading,
    error,
  } = useFindTasks({ projectSlug, limit: 10000 })

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
        <h1 className='page-title'>{project?.name ?? 'Project'}</h1>
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
      <h1 className='page-title'>{project?.name}</h1>

      {tasks.length === 0 ? (
        <EmptyData
          title='No tasks in this project'
          description='Create a new task to get started'
          icon={BriefcaseBusinessIcon}
          action={
            <CreateTaskDialog
              buttonText='Create Task'
              defaultValues={{
                project: project
                  ? { id: project.id, name: project.name, slug: project.slug }
                  : undefined,
              }}
            />
          }
        />
      ) : (
        <TaskTable
          data={tasks}
          searchPlaceholder={`Search tasks in ${project?.name}...`}
        />
      )}
    </div>
  )
}
