# Project Features

Фича для работы с проектами в приложении Zen Task.

## Структура

```
src/features/project/
├── model/                              # Business logic
│   ├── use-find-projects.ts           # Получение списка проектов
│   ├── use-find-project-by-id.ts      # Получение проекта по ID
│   ├── use-find-project-by-slug.ts    # Получение проекта по slug
│   ├── use-create-project.ts          # Создание проекта
│   ├── use-update-project.ts          # Обновление проекта
│   ├── use-delete-project.ts          # Удаление проекта
│   ├── use-add-member.ts              # Добавление участника
│   ├── use-remove-member.ts           # Удаление участника
│   ├── use-update-member-role.ts      # Обновление роли участника
│   └── index.ts                       # Exports
├── index.ts                           # Public API
└── README.md                          # Documentation
```

## Хуки

### Query Hooks (Получение данных)

#### `useFindProjects`

Получение списка проектов с фильтрацией и пагинацией.

```typescript
import { useFindProjects } from '@/features/project'

const ProjectsList = () => {
  const { data, isLoading, isError } = useFindProjects({
    page: 1,
    limit: 10,
    search: 'my project',
    isFavorite: true,
    isActive: true,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading projects</div>

  return (
    <div>
      {data?.items.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  )
}
```

#### `useFindProjectById`

Получение проекта по ID.

```typescript
import { useFindProjectById } from '@/features/project'

const ProjectDetails = ({ projectId }: { projectId: string }) => {
  const { data: project, isLoading } = useFindProjectById(projectId)

  if (isLoading) return <div>Loading...</div>

  return <div>{project?.name}</div>
}
```

#### `useFindProjectBySlug`

Получение проекта по slug.

```typescript
import { useFindProjectBySlug } from '@/features/project'

const ProjectPage = ({ slug }: { slug: string }) => {
  const { data: project, isLoading } = useFindProjectBySlug(slug)

  if (isLoading) return <div>Loading...</div>

  return <div>{project?.name}</div>
}
```

### Mutation Hooks (Изменение данных)

#### `useCreateProject`

Создание нового проекта.

```typescript
import { useCreateProject } from '@/features/project'

const CreateProjectForm = () => {
  const createProject = useCreateProject({
    onSuccess: project => {
      console.log('Project created:', project)
      router.push(`/projects/${project.id}`)
    },
  })

  const handleSubmit = (data: CreateProjectDto) => {
    createProject.mutate(data)
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

#### `useUpdateProject`

Обновление проекта с оптимистичными обновлениями.

```typescript
import { useUpdateProject } from '@/features/project'

const EditProjectForm = ({ projectId }: { projectId: string }) => {
  const updateProject = useUpdateProject({
    onSuccess: project => {
      console.log('Project updated:', project)
    },
  })

  const handleSubmit = (data: UpdateProjectDto) => {
    updateProject.mutate({ id: projectId, data })
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

#### `useDeleteProject`

Удаление проекта с оптимистичными обновлениями.

```typescript
import { useDeleteProject } from '@/features/project'

const DeleteProjectButton = ({ projectId }: { projectId: string }) => {
  const deleteProject = useDeleteProject({
    onSuccess: () => {
      router.push('/projects')
    },
  })

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteProject.mutate(projectId)
    }
  }

  return <button onClick={handleDelete}>Delete</button>
}
```

#### `useAddMember`

Добавление участника в проект.

```typescript
import { useAddMember } from '@/features/project'

const AddMemberForm = ({ projectId }: { projectId: string }) => {
  const addMember = useAddMember({
    onSuccess: () => {
      console.log('Member added successfully')
    },
  })

  const handleSubmit = (data: AddMemberDto) => {
    addMember.mutate({ projectId, data })
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

#### `useRemoveMember`

Удаление участника из проекта.

```typescript
import { useRemoveMember } from '@/features/project'

const RemoveMemberButton = ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const removeMember = useRemoveMember({
    onSuccess: () => {
      console.log('Member removed successfully')
    },
  })

  const handleRemove = () => {
    if (confirm('Are you sure?')) {
      removeMember.mutate({ projectId, userId })
    }
  }

  return <button onClick={handleRemove}>Remove</button>
}
```

#### `useUpdateMemberRole`

Обновление роли участника в проекте.

```typescript
import { useUpdateMemberRole } from '@/features/project'

const UpdateRoleForm = ({
  projectId,
  userId,
}: {
  projectId: string
  userId: string
}) => {
  const updateRole = useUpdateMemberRole({
    onSuccess: () => {
      console.log('Role updated successfully')
    },
  })

  const handleSubmit = (data: UpdateMemberRoleDto) => {
    updateRole.mutate({ projectId, userId, data })
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

## Особенности

### ✅ Реализовано

- **Query Hooks** — хуки для получения данных с TanStack Query
- **Mutation Hooks** — хуки для изменения данных
- **Оптимистичные обновления** — для update и delete операций
- **Обработка ошибок** — логирование и toast уведомления
- **Retry логика** — экспоненциальный backoff для мутаций
- **Инвалидация кэша** — автоматическая при успешных операциях
- **Callback система** — onSuccess, onError, onSettled
- **TypeScript** — полная типизация

### 🔄 Patterns

#### Retry Logic

```typescript
// Mutations with retry
retry: 2,
retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 10000),

// Delete operations without retry
retry: false,
```

#### Optimistic Updates

```typescript
onMutate: async ({ id, data }) => {
  // Cancel outgoing queries
  await queryClient.cancelQueries({ queryKey: projectKeys.detail(id) })

  // Snapshot previous value
  const previousProject = queryClient.getQueryData(projectKeys.detail(id))

  // Optimistically update
  if (previousProject) {
    queryClient.setQueryData(projectKeys.detail(id), {
      ...previousProject,
      ...data,
    })
  }

  return { previousProject }
},
```

#### Rollback on Error

```typescript
onError: (error, variables, context) => {
  // Rollback optimistic update
  if (context?.previousProject) {
    queryClient.setQueryData(
      projectKeys.detail(variables.id),
      context.previousProject,
    )
  }
},
```

### 📋 Toast Notifications

Все мутации показывают toast уведомления:

- ✅ **Success**: "Project created successfully"
- ❌ **Error**: "Failed to create project. Please try again."

### 🔧 Error Handling

Все ошибки логируются с помощью `logError`:

```typescript
logError('❌ [useCreateProject] Create error:', error)
```

## Связанная документация

- [Entity Structure Guide](../../docs/architecture/entity-structure-guide.md)
- [Feature Structure Guide](../../docs/architecture/feature-structure-guide.md)
- [Features Hooks Guide](../../docs/architecture/features-hooks-guide.md)
- [Code Standards](../../docs/code-standards.md)
