# Marker Entity

## Description

Entity for working with markers (tags/labels) in the application. Provides API methods, query keys, and request functions for managing task markers with pagination, filtering, and CRUD operations. Markers can be default (system-wide) or personal (user-specific).

## API Methods

### HTTP Methods (markerApi)

- `markerApi.findById(id: string)` - Find marker by ID
- `markerApi.findBySlug(slug: string)` - Find marker by slug
- `markerApi.findMany(params?: MarkerParams)` - Find many markers with pagination and filtering
- `markerApi.create(data: CreateMarkerDto)` - Create new marker
- `markerApi.update(id: string, data: UpdateMarkerDto)` - Update marker
- `markerApi.delete(id: string)` - Delete marker

### Query Options (markerApi)

- `markerApi.findByIdOptions(id: string)` - Query options for finding by ID
- `markerApi.findBySlugOptions(slug: string)` - Query options for finding by slug
- `markerApi.findManyOptions(params?: MarkerParams)` - Query options for finding many

**Note:** Mutation options are handled in custom hooks, not in the API class.

## Usage Examples

### In Components

```typescript
import { useQuery } from '@tanstack/react-query'
import { markerApi } from '@/entities/marker'

// Using query options
const { data: marker, isLoading } = useQuery(markerApi.findByIdOptions(id))

// Using query options with params (get only default markers)
const { data: markers } = useQuery(
  markerApi.findManyOptions({
    page: 1,
    limit: 20,
    isDefault: true,
  }),
)
```

### In Custom Hooks

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { markerApi, markerKeys } from '@/entities/marker'

const queryClient = useQueryClient()

// Create marker mutation
const createMarkerMutation = useMutation({
  mutationFn: markerApi.create,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: markerKeys.all() })
  },
})

// Update marker mutation
const updateMarkerMutation = useMutation({
  mutationFn: ({ id, data }) => markerApi.update(id, data),
  onSuccess: (_, { id }) => {
    queryClient.invalidateQueries({ queryKey: markerKeys.detail(id) })
    queryClient.invalidateQueries({ queryKey: markerKeys.all() })
  },
})
```

## Types

### Main Types

- `Marker` - Main entity type
- `MarkerWithCount` - Marker with `_count` field containing related entities count:
  - `_count.tasks: number` - Number of tasks with this marker

### Request Parameters

- `MarkerParams` - Request parameters for filtering and pagination
  - `page?: number`
  - `limit?: number`
  - `search?: string`
  - `sortBy?: string`
  - `sortOrder?: 'asc' | 'desc'`
  - `isDefault?: boolean` - Filter by default/personal markers

### DTO Types

- `CreateMarkerDto` - Creation data
  - `name: string` (required, max 50 chars)
  - `fontColor?: string` (hex color, e.g., #FFFFFF)
  - `bgColor?: string` (hex color, e.g., #000000)
- `UpdateMarkerDto` - Update data (all fields optional)
  - `name?: string` (max 50 chars)
  - `fontColor?: string` (hex color)
  - `bgColor?: string` (hex color)

**Note:**

- Slug is auto-generated on the backend and cannot be set via DTO
- Color values must be valid hex colors (e.g., #FFFFFF)
- `isDefault` and `userId` are managed by the backend
- For paginated responses, use `PaginatedResponse<Marker>` from `@/shared/types`

## File Structure

```
entities/marker/
├── marker-types.ts      // All types and interfaces
├── marker-keys.ts       // TanStack Query keys
├── marker-requests.ts   // HTTP methods (MarkerRequests class)
├── marker-api.ts        // API class with query options
├── index.ts            // Public API exports
└── README.md           // Documentation
```

## Architecture

- **`MarkerRequests`** - Internal class with only HTTP methods (not exported)
- **`MarkerApi`** - Public API class that delegates to MarkerRequests + provides query options
- **Query options** - Only for requests (findById, findBySlug, findMany), mutations handled in custom hooks
- **Types** - Use common `PaginatedResponse<T>` from `@/shared/types` for paginated responses

## Query Keys Structure

```typescript
markerKeys.root // ['marker']
markerKeys.all() // ['marker', 'list']
markerKeys.lists() // ['marker', 'list']
markerKeys.list(filters) // ['marker', 'list', { filters }]
markerKeys.details() // ['marker', 'detail']
markerKeys.detail(id) // ['marker', 'detail', id]
markerKeys.detailBySlug(slug) // ['marker', 'detail', 'slug', slug]
```

## API Routes

```typescript
apiRoutes.marker.findMany // '/markers'
apiRoutes.marker.findById(id) // '/markers/:id'
apiRoutes.marker.findBySlug(slug) // '/markers/slug/:slug'
apiRoutes.marker.create // '/markers'
apiRoutes.marker.update(id) // '/markers/:id'
apiRoutes.marker.delete(id) // '/markers/:id'
```

## Marker Types

- **Default Markers** - System-wide markers available to all users (`isDefault: true`, `userId: null`)
- **Personal Markers** - User-specific markers (`isDefault: false`, `userId: <user-id>`)
