'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'
import type { TaskWithRelations } from '@/entities/task'
import { createSortableColumn } from '@/shared/components/table'
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { taskStatuses } from '@/shared/constants'
import type { TaskTableConfig } from '../lib/task-table-types'
import {
  formatTaskCreatedAt,
  formatTaskDueDate,
  formatTaskStatus,
  formatTaskUpdatedAt,
  getCategoryDisplayName,
  getContactDisplayName,
  getProjectDisplayName,
  getUserDisplayName,
  isTaskOverdue,
} from '../lib/task-table-utils'

/**
 * Create task table columns configuration
 *
 * @param config - Task table configuration options
 * @returns Array of column definitions
 */
export const createTaskTableColumns = (
  config: TaskTableConfig = {},
): ColumnDef<TaskWithRelations>[] => {
  const columns: ColumnDef<TaskWithRelations>[] = []

  // Task name column
  columns.push(
    createSortableColumn('name', 'Task', ({ row }) => {
      const task = row.original
      return (
        <div className='max-w-[200px]'>
          <div className='truncate font-medium'>{task.name}</div>
          {task.description && (
            <div className='text-muted-foreground truncate text-sm'>
              {task.description}
            </div>
          )}
        </div>
      )
    }),
  )

  // Status column
  columns.push(
    createSortableColumn('status', 'Status', ({ row }) => {
      const task = row.original
      const isOverdue = isTaskOverdue(task)

      return (
        <Badge
          variant={
            task.status === taskStatuses.completed ? 'default' : 'secondary'
          }
          className={isOverdue ? 'bg-red-100 text-red-800' : ''}
        >
          {formatTaskStatus(task.status)}
        </Badge>
      )
    }),
  )

  // Project column
  if (config.showProject !== false) {
    columns.push(
      createSortableColumn('project', 'Project', ({ row }) => {
        const project = row.original.project
        return (
          <div className='max-w-[150px]'>
            <div className='truncate'>{getProjectDisplayName(project)}</div>
          </div>
        )
      }),
    )
  }

  // Category column
  if (config.showCategory !== false) {
    columns.push(
      createSortableColumn('category', 'Category', ({ row }) => {
        const category = row.original.category
        return (
          <div className='max-w-[150px]'>
            <div className='truncate'>{getCategoryDisplayName(category)}</div>
          </div>
        )
      }),
    )
  }

  // Assignee column
  if (config.showAssignee !== false) {
    columns.push(
      createSortableColumn('assignee', 'Assignee', ({ row }) => {
        const assignee = row.original.assignee
        if (!assignee) {
          return <span className='text-muted-foreground'>Unassigned</span>
        }

        return (
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarFallback className='text-xs'>
                {assignee.firstName[0]}
                {assignee.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <span className='max-w-[100px] truncate'>
              {getUserDisplayName(assignee)}
            </span>
          </div>
        )
      }),
    )
  }

  // Creator column
  if (config.showCreator) {
    columns.push(
      createSortableColumn('creator', 'Creator', ({ row }) => {
        const creator = row.original.creator
        if (!creator) {
          return <span className='text-muted-foreground'>Unknown</span>
        }

        return (
          <div className='flex items-center space-x-2'>
            <Avatar className='h-6 w-6'>
              <AvatarFallback className='text-xs'>
                {creator.firstName[0]}
                {creator.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <span className='max-w-[100px] truncate'>
              {getUserDisplayName(creator)}
            </span>
          </div>
        )
      }),
    )
  }

  // Contact column
  if (config.showContact !== false) {
    columns.push(
      createSortableColumn('contact', 'Contact', ({ row }) => {
        const contact = row.original.contact
        return (
          <div className='max-w-[150px]'>
            <div className='truncate'>{getContactDisplayName(contact)}</div>
          </div>
        )
      }),
    )
  }

  // Due date column
  if (config.showDueDate !== false) {
    columns.push(
      createSortableColumn('dueDate', 'Due Date', ({ row }) => {
        const task = row.original
        const isOverdue = isTaskOverdue(task)

        return (
          <div
            className={`max-w-[120px] ${isOverdue ? 'font-medium text-red-600' : ''}`}
          >
            {formatTaskDueDate(task.dueDate)}
          </div>
        )
      }),
    )
  }

  // Created at column
  if (config.showCreatedAt) {
    columns.push(
      createSortableColumn('createdAt', 'Created', ({ row }) => {
        return (
          <div className='text-muted-foreground max-w-[120px] text-sm'>
            {formatTaskCreatedAt(row.original.createdAt)}
          </div>
        )
      }),
    )
  }

  // Updated at column
  if (config.showUpdatedAt) {
    columns.push(
      createSortableColumn('updatedAt', 'Updated', ({ row }) => {
        return (
          <div className='text-muted-foreground max-w-[120px] text-sm'>
            {formatTaskUpdatedAt(row.original.updatedAt)}
          </div>
        )
      }),
    )
  }

  // Actions column
  if (config.showActions !== false) {
    columns.push({
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
              >
                Copy task ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit task</DropdownMenuItem>
              <DropdownMenuItem>Delete task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    })
  }

  return columns
}
