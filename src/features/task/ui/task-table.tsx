'use client'

import type { TaskWithRelations } from '@/entities/task'
import { DataTable } from '@/shared/components/table'
import type { TaskTableConfig } from '../lib/task-table-types'
import { createTaskTableColumns } from './task-table-columns'

interface Props {
  /** Array of tasks to display */
  data: TaskWithRelations[]
  /** Table configuration options */
  config?: TaskTableConfig
  /** Search placeholder text */
  searchPlaceholder?: string
}

/**
 * Task table component with sorting, filtering, and pagination
 *
 * @param data - Array of tasks to display
 * @param config - Table configuration options
 * @param searchPlaceholder - Search placeholder text
 */
export const TaskTable = ({
  data,
  config,
  searchPlaceholder = 'Search tasks...',
}: Props) => {
  const columns = createTaskTableColumns(config)

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey='name'
      searchPlaceholder={searchPlaceholder}
    />
  )
}
