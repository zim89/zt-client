# Task Entity

## Description

Entity for working with tasks in the application. Provides API methods, query keys, and request functions for managing tasks with pagination, filtering, and CRUD operations. Includes support for task assignment, status management, and marker operations.

## API Methods

### HTTP Methods (taskApi)

- `taskApi.findById(id: string)` - Find task by ID
- `taskApi.findMany(params?: TaskParams)` - Find many tasks with pagination and filtering
- `taskApi.create(data: CreateTaskDto)` - Create new task
- `taskApi.update(id: string, data: UpdateTaskDto)` - Update task
- `taskApi.delete(id: string)` - Delete task
- `taskApi.updateStatus(id: string, data: UpdateTaskStatusDto)` - Update task status
- `taskApi.assign(id: string, data: AssignTaskDto)` - Assign task to user
- `taskApi.addMarker(id: string, markerId: string)` - Add marker to task
- `taskApi.removeMarker(id: string, markerId: string)` - Remove marker from task

### Query Options (taskApi)

- `taskApi.findByIdOptions(id: string)` - Query options for finding by ID
- `taskApi.findManyOptions(params?: TaskParams)` - Query options for finding many

**Note:** Mutation options are handled in custom hooks, not in the API class.

## Usage Examples

### In Components

```typescript
import { useQuery } from '@tanstack/react-query'
import { taskApi } from '@/entities/task'

// Using query options
const { data: task, isLoading } = useQuery(taskApi.findByIdOptions(id))

// Using query options with params (filter by project and status)
const { data: tasks } = useQuery(
  taskApi.findManyOptions({
    page: 1,
    limit: 20,
    projectId: 'project-id',
    status: 'IN_PROGRESS',
  }),
)
```

### In Custom Hooks

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi, taskKeys } from '@/entities/task'

const queryClient = useQueryClient()

// Create task mutation
const createTaskMutation = useMutation({
  mutationFn: taskApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: taskKeys.all() })
  },
})

// Update task mutation
const updateTaskMutation = useMutation({
  mutationFn: ({ id, data }) => taskApi.update(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: taskKeys.all() })
  },
})

// Update task status mutation
const updateStatusMutation = useMutation({
  mutationFn: ({ id, data }) => taskApi.updateStatus(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: taskKeys.all() })
  },
})

// Assign task mutation
const assignTaskMutation = useMutation({
  mutationFn: ({ id, data }) => taskApi.assign(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) })
  },
})
```

## Types

### Main Types

- `Task` - Main entity type
- `TaskWithRelations` - Task with related entities (project, category, creator, assignee, contact, markers)
- `TaskStatus` - Task status type (imported from `@/shared/constants`)

### Request Parameters

- `TaskParams` - Request parameters for filtering and pagination
  - `page?: number`
  - `limit?: number`
  - `search?: string`
  - `sortBy?: string`
  - `sortOrder?: 'asc' | 'desc'`
  - `projectId?: string`
  - `status?: TaskStatus`
  - `assigneeId?: string`
  - `categoryId?: string`
  - `contactId?: string`
  - `creatorId?: string`
  - `dueDateFrom?: string`
  - `dueDateTo?: string`
  - `isOverdue?: boolean`
  - `hasAssignee?: boolean`

### DTO Types

- `CreateTaskDto` - Creation data
  - `name: string` (required, max 200 chars)
  - `description?: string` (max 500 chars)
  - `status: TaskStatus` (required)
  - `note?: string` (max 1000 chars)
  - `dueDate?: string` (ISO date string)
  - `projectId: string` (required)
  - `categoryId?: string`
  - `contactId?: string`
  - `assigneeId?: string`
- `UpdateTaskDto` - Update data (all fields optional)
  - `name?: string` (max 200 chars)
  - `description?: string` (max 500 chars)
  - `status?: TaskStatus`
  - `note?: string` (max 1000 chars)
  - `dueDate?: string` (ISO date string)
  - `projectId?: string`
  - `categoryId?: string`
  - `contactId?: string`
  - `assigneeId?: string`
- `UpdateTaskStatusDto` - Update task status
  - `status: TaskStatus` (required)
- `AssignTaskDto` - Assign task to user
  - `assigneeId?: string | null` (null to unassign)

**Note:**

- For paginated responses, use `PaginatedResponse<Task>` from `@/shared/types`
- `TaskStatus` enum is imported from `@/shared/constants`
- Date fields should be in ISO format (e.g., "2025-01-15T12:00:00Z")

## File Structure

```
entities/task/
├── task-types.ts      // All types and interfaces
├── task-keys.ts       // TanStack Query keys
├── task-requests.ts   // HTTP methods (TaskRequests class)
├── task-api.ts        // API class with query options
├── index.ts          // Public API exports
└── README.md         // Documentation
```

## Architecture

- **`TaskRequests`** - Internal class with only HTTP methods (not exported)
- **`TaskApi`** - Public API class that delegates to TaskRequests + provides query options
- **Query options** - Only for requests (findById, findMany), mutations handled in custom hooks
- **Types** - Use common `PaginatedResponse<T>` from `@/shared/types` for paginated responses
- **Enums** - Use shared enums like `TaskStatus` from `@/shared/constants` for type safety

## Query Keys Structure

```typescript
taskKeys.root // ['tasks']
taskKeys.all() // ['tasks', 'list']
taskKeys.lists() // ['tasks', 'list']
taskKeys.list(filters) // ['tasks', 'list', { filters }]
taskKeys.details() // ['tasks', 'detail']
taskKeys.detail(id) // ['tasks', 'detail', id]
```

## API Routes

```typescript
apiRoutes.task.findMany // '/tasks'
apiRoutes.task.findById(id) // '/tasks/:id'
apiRoutes.task.create // '/tasks'
apiRoutes.task.update(id) // '/tasks/:id'
apiRoutes.task.delete(id) // '/tasks/:id'
apiRoutes.task.updateStatus(id) // '/tasks/:id/status'
apiRoutes.task.assign(id) // '/tasks/:id/assign'
apiRoutes.task.addMarker(id, markerId) // '/tasks/:id/markers/:markerId'
apiRoutes.task.removeMarker(id, markerId) // '/tasks/:id/markers/:markerId'
```

## Task Statuses

Available task statuses from `@/shared/constants`:

- `NOT_STARTED` - Task has not been started yet
- `IN_PROGRESS` - Task is currently being worked on
- `DEFERRED` - Task has been postponed
- `CANCELED` - Task has been canceled
- `COMPLETED` - Task has been completed
- `FOR_REVISION` - Task needs revision
- `REJECTED` - Task has been rejected
- `READY_FOR_REVIEW` - Task is ready for review
