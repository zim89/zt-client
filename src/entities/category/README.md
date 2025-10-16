# Category Entity

## Description

Entity for working with categories in the application. Provides API methods, query keys, and request functions for managing task categories with pagination, filtering, and CRUD operations.

## API Methods

### HTTP Methods (categoryApi)

- `categoryApi.findById(id: string)` - Find category by ID
- `categoryApi.findBySlug(slug: string)` - Find category by slug
- `categoryApi.findMany(params?: CategoryParams)` - Find many categories with pagination and filtering
- `categoryApi.create(data: CreateCategoryDto)` - Create new category
- `categoryApi.update(id: string, data: UpdateCategoryDto)` - Update category
- `categoryApi.delete(id: string)` - Delete category

### Query Options (categoryApi)

- `categoryApi.findByIdOptions(id: string)` - Query options for finding by ID
- `categoryApi.findBySlugOptions(slug: string)` - Query options for finding by slug
- `categoryApi.findManyOptions(params?: CategoryParams)` - Query options for finding many

**Note:** Mutation options are handled in custom hooks, not in the API class.

## Usage Examples

### In Components

```typescript
import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '@/entities/category'

// Using query options
const { data: category, isLoading } = useQuery(categoryApi.findByIdOptions(id))

// Using query options with params (filter by project)
const { data: categories } = useQuery(
  categoryApi.findManyOptions({
    page: 1,
    limit: 20,
    projectId: 'project-id',
  }),
)
```

### In Custom Hooks

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi, categoryKeys } from '@/entities/category'

const queryClient = useQueryClient()

// Create category mutation
const createCategoryMutation = useMutation({
  mutationFn: categoryApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: categoryKeys.all() })
  },
})

// Update category mutation
const updateCategoryMutation = useMutation({
  mutationFn: ({ id, data }) => categoryApi.update(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: categoryKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: categoryKeys.all() })
  },
})
```

## Types

### Main Types

- `Category` - Main entity type
- `CategoryWithCount` - Category with `_count` field containing related entities count:
  - `_count.tasks: number` - Number of tasks in this category

### Request Parameters

- `CategoryParams` - Request parameters for filtering and pagination
  - `page?: number`
  - `limit?: number`
  - `search?: string`
  - `sortBy?: string`
  - `sortOrder?: 'asc' | 'desc'`
  - `projectId?: string`

### DTO Types

- `CreateCategoryDto` - Creation data
  - `name: string` (required, max 100 chars)
  - `description?: string` (max 500 chars)
  - `projectId: string` (required)
- `UpdateCategoryDto` - Update data (all fields optional)
  - `name?: string` (max 100 chars)
  - `description?: string` (max 500 chars)

**Note:**

- Slug is auto-generated on the backend and cannot be set via DTO
- For paginated responses, use `PaginatedResponse<Category>` from `@/shared/types`

## File Structure

```
entities/category/
├── category-types.ts     // All types and interfaces
├── category-keys.ts      // TanStack Query keys
├── category-requests.ts  // HTTP methods (CategoryRequests class)
├── category-api.ts       // API class with query options
├── index.ts             // Public API exports
└── README.md            // Documentation
```

## Architecture

- **`CategoryRequests`** - Internal class with only HTTP methods (not exported)
- **`CategoryApi`** - Public API class that delegates to CategoryRequests + provides query options
- **Query options** - Only for requests (findById, findBySlug, findMany), mutations handled in custom hooks
- **Types** - Use common `PaginatedResponse<T>` from `@/shared/types` for paginated responses

## Query Keys Structure

```typescript
categoryKeys.root // ['category']
categoryKeys.all() // ['category', 'list']
categoryKeys.lists() // ['category', 'list']
categoryKeys.list(filters) // ['category', 'list', { filters }]
categoryKeys.details() // ['category', 'detail']
categoryKeys.detail(id) // ['category', 'detail', id]
categoryKeys.detailBySlug(slug) // ['category', 'detail', 'slug', slug]
```

## API Routes

```typescript
apiRoutes.category.findMany // '/categories'
apiRoutes.category.findById(id) // '/categories/:id'
apiRoutes.category.findBySlug(slug) // '/categories/slug/:slug'
apiRoutes.category.create // '/categories'
apiRoutes.category.update(id) // '/categories/:id'
apiRoutes.category.delete(id) // '/categories/:id'
```
