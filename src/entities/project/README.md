# Project Entity

## Description

Entity for working with projects in the application. Provides API methods, query keys, and request functions for managing projects with pagination, filtering, and CRUD operations.

## API Methods

### HTTP Methods (projectApi)

- `projectApi.findById(id: string)` - Find project by ID
- `projectApi.findBySlug(slug: string)` - Find project by slug
- `projectApi.findMany(params?: ProjectParams)` - Find many projects with pagination and filtering
- `projectApi.create(data: CreateProjectDto)` - Create new project
- `projectApi.update(id: string, data: UpdateProjectDto)` - Update project
- `projectApi.delete(id: string)` - Delete project
- `projectApi.addMember(id: string, data: AddMemberDto)` - Add member to project
- `projectApi.removeMember(id: string, memberId: string)` - Remove member from project
- `projectApi.updateMemberRole(id: string, memberId: string, data: UpdateMemberRoleDto)` - Update member role

### Query Options (projectApi)

- `projectApi.findByIdOptions(id: string)` - Query options for finding by ID
- `projectApi.findBySlugOptions(slug: string)` - Query options for finding by slug
- `projectApi.findManyOptions(params?: ProjectParams)` - Query options for finding many

**Note:** Mutation options are handled in custom hooks, not in the API class.

## Usage Examples

### In Components

```typescript
import { useQuery } from '@tanstack/react-query'
import { projectApi } from '@/entities/project'

// Using query options
const { data: project, isLoading } = useQuery(projectApi.findByIdOptions(id))

// Using query options with params
const { data: projects } = useQuery(
  projectApi.findManyOptions({
    page: 1,
    limit: 20,
    isFavorite: true,
  }),
)

// Direct HTTP call
const project = await projectApi.findById(id)
```

### In Custom Hooks

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { projectApi, projectKeys } from '@/entities/project'

const queryClient = useQueryClient()

// Create project mutation
const createProjectMutation = useMutation({
  mutationFn: projectApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: projectKeys.all() })
  },
})

// Update project mutation
const updateProjectMutation = useMutation({
  mutationFn: ({ id, data }) => projectApi.update(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: projectKeys.all() })
  },
})

// Add member mutation
const addMemberMutation = useMutation({
  mutationFn: ({ id, data }) => projectApi.addMember(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) })
  },
})
```

## Types

### Main Types

- `Project` - Main entity type
- `ProjectWithCount` - Project with `_count` field containing related entities count:
  - `_count.members: number` - Number of project members
  - `_count.tasks: number` - Number of tasks in this project
  - `_count.categories: number` - Number of categories in this project
- `ProjectWithMembership` - Project with membership information
- `Membership` - Membership entity with user roles
- `ProjectRole` - Project role type (imported from `@/shared/constants`)

### Request Parameters

- `ProjectParams` - Request parameters for filtering and pagination
  - `page?: number`
  - `limit?: number`
  - `search?: string`
  - `sortBy?: string`
  - `sortOrder?: 'asc' | 'desc'`
  - `isFavorite?: boolean`
  - `isActive?: boolean`
  - `isHidden?: boolean`
  - `userId?: string`

### DTO Types

- `CreateProjectDto` - Creation data
  - `name: string` (required)
  - `description?: string`
  - `isFavorite?: boolean`
  - `isHidden?: boolean`
- `UpdateProjectDto` - Update data (all fields optional)
  - `name?: string`
  - `description?: string`
  - `isFavorite?: boolean`
  - `isHidden?: boolean`
- `AddMemberDto` - Add member data
  - `userId: string` (required)
  - `roles?: ProjectRole[]`
- `UpdateMemberRoleDto` - Update member role data
  - `roles: ProjectRole[]` (required)

**Note:**

- Slug is auto-generated on the backend and cannot be set via DTO
- For paginated responses, use `PaginatedResponse<Project>` from `@/shared/types`
- `ProjectRole` enum is imported from `@/shared/constants` (OWNER, ADMIN, MEMBER, VIEWER)

## File Structure

```
entities/project/
├── project-types.ts      // All types and interfaces
├── project-keys.ts       // TanStack Query keys
├── project-requests.ts   // HTTP methods (ProjectRequests class)
├── project-api.ts        // API class with query options
├── index.ts             // Public API exports
└── README.md            // Documentation
```

## Architecture

- **`ProjectRequests`** - Internal class with only HTTP methods (not exported)
- **`ProjectApi`** - Public API class that delegates to ProjectRequests + provides query options
- **Query options** - Only for requests (findById, findBySlug, findMany), mutations handled in custom hooks
- **Types** - Use common `PaginatedResponse<T>` from `@/shared/types` for paginated responses
- **Enums** - Use shared enums like `ProjectRole` from `@/shared/constants` for type safety

## Query Keys Structure

```typescript
projectKeys.root // ['project']
projectKeys.all() // ['project', 'list']
projectKeys.lists() // ['project', 'list']
projectKeys.list(filters) // ['project', 'list', { filters }]
projectKeys.details() // ['project', 'detail']
projectKeys.detail(id) // ['project', 'detail', id]
projectKeys.detailBySlug(slug) // ['project', 'detail', 'slug', slug]
```

## API Routes

```typescript
apiRoutes.project.findMany // '/projects'
apiRoutes.project.findById(id) // '/projects/:id'
apiRoutes.project.findBySlug(slug) // '/projects/slug/:slug'
apiRoutes.project.create // '/projects'
apiRoutes.project.update(id) // '/projects/:id'
apiRoutes.project.delete(id) // '/projects/:id'
apiRoutes.project.addMember(id) // '/projects/:id/members'
apiRoutes.project.removeMember(id, memberId) // '/projects/:id/members/:memberId'
apiRoutes.project.updateMemberRole(id, memberId) // '/projects/:id/members/:memberId/role'
```
