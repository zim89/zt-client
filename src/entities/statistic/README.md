# Statistic Entity

## Description

Entity for working with user statistics and analytics in the application. Provides API methods and query keys for retrieving comprehensive statistics about tasks, projects, and productivity metrics.

## API Methods

### HTTP Methods (statisticApi)

- `statisticApi.getOverview()` - Get comprehensive statistics overview

### Query Options (statisticApi)

- `statisticApi.overviewOptions()` - Query options for getting statistics overview

**Note:** Statistics are read-only. There are no mutations for this entity.

## Usage Examples

### In Components

```typescript
import { useQuery } from '@tanstack/react-query'
import { statisticApi } from '@/entities/statistic'

// Get statistics overview
const { data: stats, isLoading } = useQuery(statisticApi.overviewOptions())

// Access specific statistics
if (stats) {
  console.log('Total tasks:', stats.tasks.total)
  console.log('Completed today:', stats.productivity.completedToday)
  console.log('Overdue tasks:', stats.tasks.overdue)
}
```

### In Dashboard

```typescript
import { useQuery } from '@tanstack/react-query'
import { statisticApi } from '@/entities/statistic'

const Dashboard = () => {
  const { data: stats } = useQuery(statisticApi.overviewOptions())

  return (
    <div>
      <h2>Your Statistics</h2>
      <div>
        <p>Total Projects: {stats?.projects.total}</p>
        <p>Active Projects: {stats?.projects.active}</p>
        <p>Tasks Completed Today: {stats?.productivity.completedToday}</p>
        <p>Completion Rate: {stats?.tasks.completionRate}%</p>
      </div>
    </div>
  )
}
```

## Types

### Main Types

- `StatisticOverview` - Complete statistics overview containing tasks, projects, and productivity stats
- `TaskStats` - Task statistics with total, by status, overdue, due dates, and completion rate
- `ProjectStats` - Project statistics with total, active, and favorite counts
- `ProductivityStats` - Productivity metrics with completed tasks today and this week
- `TaskStatusStats` - Record mapping each TaskStatus to its count

### Task Statistics (TaskStats)

- `total: number` - Total number of tasks in user's projects
- `byStatus: TaskStatusStats` - Tasks grouped by status (NOT_STARTED, IN_PROGRESS, COMPLETED, etc.)
- `overdue: number` - Overdue tasks (past due date, not completed/canceled)
- `dueToday: number` - Tasks due today (not completed/canceled)
- `dueThisWeek: number` - Tasks due within the next 7 days (not completed/canceled)
- `completionRate: number` - Percentage of completed tasks (0-100)

### Project Statistics (ProjectStats)

- `total: number` - Total number of projects where user is a member
- `active: number` - Projects with incomplete tasks
- `favorite: number` - Favorite projects

### Productivity Statistics (ProductivityStats)

- `completedToday: number` - Tasks completed today
- `completedThisWeek: number` - Tasks completed in the last 7 days

**Note:**

- All statistics are calculated in real-time on the server
- Statistics are user-specific and filtered by project membership
- `TaskStatus` enum is imported from `@/shared/constants`

## File Structure

```
entities/statistic/
├── statistic-types.ts      // All types and interfaces
├── statistic-keys.ts        // TanStack Query keys
├── statistic-requests.ts    // HTTP methods (StatisticRequests class)
├── statistic-api.ts         // API class with query options
├── index.ts                // Public API exports
└── README.md               // Documentation
```

## Architecture

- **`StatisticRequests`** - Internal class with only HTTP methods (not exported)
- **`StatisticApi`** - Public API class that delegates to StatisticRequests + provides query options
- **Query options** - Only for getOverview request (read-only, no mutations)
- **Types** - Comprehensive interfaces for task, project, and productivity statistics

## Query Keys Structure

```typescript
statisticKeys.root // ['statistics']
statisticKeys.overview() // ['statistics', 'overview']
```

## API Routes

```typescript
apiRoutes.statistic.overview // '/statistics/overview'
```

## Data Refresh Strategy

### Recommended Refresh Intervals

```typescript
// Dashboard with real-time stats
const { data: stats } = useQuery({
  ...statisticApi.overviewOptions(),
  refetchInterval: 30000, // Refetch every 30 seconds
})

// Static overview page
const { data: stats } = useQuery({
  ...statisticApi.overviewOptions(),
  staleTime: 60000, // Consider fresh for 1 minute
})
```

### Invalidation Strategy

Invalidate statistics when related data changes:

```typescript
import { statisticKeys, taskApi } from '@/entities'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

// Invalidate stats after completing a task
const completeTask = useMutation({
  mutationFn: ({ id, data }) =>
    taskApi.updateStatus(id, { status: 'COMPLETED' }),
  onSuccess: () => {
    // Refresh statistics to show updated completion rate
    queryClient.invalidateQueries({ queryKey: statisticKeys.overview() })
  },
})
```

## Response Example

```typescript
{
  tasks: {
    total: 42,
    byStatus: {
      NOT_STARTED: 10,
      IN_PROGRESS: 8,
      COMPLETED: 20,
      CANCELED: 2,
      DEFERRED: 1,
      FOR_REVISION: 0,
      REJECTED: 1,
      READY_FOR_REVIEW: 0
    },
    overdue: 3,
    dueToday: 5,
    dueThisWeek: 12,
    completionRate: 47.62
  },
  projects: {
    total: 5,
    active: 3,
    favorite: 2
  },
  productivity: {
    completedToday: 4,
    completedThisWeek: 18
  }
}
```

## Use Cases

### Dashboard Overview

Display key metrics on the main dashboard:

```typescript
const { data: stats } = useQuery(statisticApi.overviewOptions())

return (
  <div>
    <StatCard title="Total Tasks" value={stats?.tasks.total} />
    <StatCard title="Overdue" value={stats?.tasks.overdue} alert={stats?.tasks.overdue > 0} />
    <StatCard title="Completed Today" value={stats?.productivity.completedToday} />
    <StatCard title="Completion Rate" value={`${stats?.tasks.completionRate}%`} />
  </div>
)
```

### Progress Charts

Use statistics data for charts and visualizations:

```typescript
const { data: stats } = useQuery(statisticApi.overviewOptions())

const chartData = Object.entries(stats?.tasks.byStatus || {}).map(([status, count]) => ({
  status,
  count,
}))

return <BarChart data={chartData} />
```

### Performance Tracking

Track user productivity over time:

```typescript
const { data: stats } = useQuery(statisticApi.overviewOptions())

return (
  <div>
    <h3>Productivity</h3>
    <p>Completed Today: {stats?.productivity.completedToday}</p>
    <p>Completed This Week: {stats?.productivity.completedThisWeek}</p>
    <p>Average per day: {Math.round((stats?.productivity.completedThisWeek || 0) / 7)}</p>
  </div>
)
```

## Related Entities

- **Task Entity** - Source of task statistics
- **Project Entity** - Source of project statistics
- **Category Entity** - (Future) Category-based statistics
- **Marker Entity** - (Future) Marker-based statistics
