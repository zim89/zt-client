/** User role enum */
export const userRoles = {
  owner: 'OWNER',
  admin: 'ADMIN',
  member: 'MEMBER',
  viewer: 'VIEWER',
} as const

export type UserRole = (typeof userRoles)[keyof typeof userRoles]

/** User status enum */
export const userStatuses = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
  pending: 'PENDING',
  suspended: 'SUSPENDED',
} as const

export type UserStatus = (typeof userStatuses)[keyof typeof userStatuses]

/** Project role enum */
export const projectRoles = {
  owner: 'OWNER',
  admin: 'ADMIN',
  member: 'MEMBER',
  viewer: 'VIEWER',
} as const

export type ProjectRole = (typeof projectRoles)[keyof typeof projectRoles]

/** Task status enum */
export const taskStatuses = {
  notStarted: 'NOT_STARTED',
  inProgress: 'IN_PROGRESS',
  deferred: 'DEFERRED',
  canceled: 'CANCELED',
  completed: 'COMPLETED',
  forRevision: 'FOR_REVISION',
  rejected: 'REJECTED',
  readyForReview: 'READY_FOR_REVIEW',
} as const

export type TaskStatus = (typeof taskStatuses)[keyof typeof taskStatuses]
