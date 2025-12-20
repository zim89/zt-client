import {
  BanIcon,
  CheckIcon,
  CircleIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
  RotateCwIcon,
  XIcon,
  type LucideIcon,
} from 'lucide-react'
import { TaskStatus, taskStatuses } from './enums'

/** Task status option configuration with value, icon and label */
export type TaskStatusOption = {
  value: TaskStatus
  icon: LucideIcon
  label: string
}

/** Task status options mapped by status value for quick lookup */
export const taskStatusOptions: Record<TaskStatus, TaskStatusOption> = {
  [taskStatuses.notStarted]: {
    value: taskStatuses.notStarted,
    icon: CircleIcon,
    label: 'Not Started',
  },
  [taskStatuses.inProgress]: {
    value: taskStatuses.inProgress,
    icon: PlayIcon,
    label: 'In Progress',
  },
  [taskStatuses.deferred]: {
    value: taskStatuses.deferred,
    icon: PauseIcon,
    label: 'Deferred',
  },
  [taskStatuses.canceled]: {
    value: taskStatuses.canceled,
    icon: XIcon,
    label: 'Canceled',
  },
  [taskStatuses.completed]: {
    value: taskStatuses.completed,
    icon: CheckIcon,
    label: 'Completed',
  },
  [taskStatuses.forRevision]: {
    value: taskStatuses.forRevision,
    icon: RotateCwIcon,
    label: 'For Revision',
  },
  [taskStatuses.rejected]: {
    value: taskStatuses.rejected,
    icon: BanIcon,
    label: 'Rejected',
  },
  [taskStatuses.readyForReview]: {
    value: taskStatuses.readyForReview,
    icon: EyeIcon,
    label: 'Ready for Review',
  },
} as const
