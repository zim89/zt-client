import type { ColumnDef } from '@tanstack/react-table'
import type { TaskWithRelations } from '@/entities/task'

/**
 * Column configuration for task table
 */
export type TaskTableColumn = ColumnDef<TaskWithRelations>

/**
 * Task table configuration options
 */
export interface TaskTableConfig {
  /** Enable/disable specific columns */
  showProject?: boolean
  showCategory?: boolean
  showAssignee?: boolean
  showCreator?: boolean
  showContact?: boolean
  showMarkers?: boolean
  showDueDate?: boolean
  showCreatedAt?: boolean
  showUpdatedAt?: boolean
  showActions?: boolean
}

/**
 * Default task table configuration
 */
export const defaultTaskTableConfig: TaskTableConfig = {
  showProject: true,
  showCategory: true,
  showAssignee: true,
  showCreator: false,
  showContact: true,
  showMarkers: true,
  showDueDate: true,
  showCreatedAt: false,
  showUpdatedAt: false,
  showActions: true,
}
