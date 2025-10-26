'use client'

import { useState } from 'react'
import type { TaskWithRelations } from '@/entities/task'
import { DataTable } from '@/shared/components/table'
import type { TaskTableConfig } from '../lib/task-table-types'
import { CreateTaskInline } from './create-task-inline'
import { createTaskTableColumns } from './task-table-columns'

interface Props {
  /** Array of tasks to display */
  data: TaskWithRelations[]
  /** Table configuration options */
  config?: TaskTableConfig
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Whether to show inline task creator */
  showTaskCreator?: boolean
  /** Handler for creating a new task */
  onCreateTask?: (name: string) => void
  /** Whether task creation is loading */
  isCreatingTask?: boolean
  /** Placeholder text for task creation input */
  taskCreatorPlaceholder?: string
  /** Button text for task creation */
  taskCreatorButtonText?: string
}

/**
 * Task table component with sorting, filtering, and pagination
 *
 * @param data - Array of tasks to display
 * @param config - Table configuration options
 * @param searchPlaceholder - Search placeholder text
 * @param showTaskCreator - Whether to show inline task creator
 * @param onCreateTask - Handler for creating a new task
 * @param isCreatingTask - Whether task creation is loading
 * @param taskCreatorPlaceholder - Placeholder text for task creation input
 * @param taskCreatorButtonText - Button text for task creation
 */
export const TaskTable = ({
  data,
  config,
  searchPlaceholder = 'Search tasks...',
  showTaskCreator = false,
  onCreateTask,
  isCreatingTask = false,
  taskCreatorPlaceholder = 'Enter task name...',
  taskCreatorButtonText = 'Add Task',
}: Props) => {
  const [isTaskCreatorActive, setIsTaskCreatorActive] = useState(false)
  const columns = createTaskTableColumns(config)

  const handleCreateTask = (name: string) => {
    if (onCreateTask) {
      onCreateTask(name)
      setIsTaskCreatorActive(false)
    }
  }

  const handleCancelTask = () => {
    setIsTaskCreatorActive(false)
  }

  const taskCreatorComponent = showTaskCreator ? (
    <CreateTaskInline
      isActive={isTaskCreatorActive}
      onActivate={() => setIsTaskCreatorActive(true)}
      onSave={handleCreateTask}
      onCancel={handleCancelTask}
      isLoading={isCreatingTask}
      placeholder={taskCreatorPlaceholder}
      buttonText={taskCreatorButtonText}
    />
  ) : null

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='name'
      searchPlaceholder={searchPlaceholder}
      taskCreatorComponent={taskCreatorComponent}
    />
  )
}
