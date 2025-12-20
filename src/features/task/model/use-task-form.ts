'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  formModes,
  taskStatuses,
  type FormMode,
  type TaskStatus,
} from '@/shared/constants'
import { useCreateTask, useFindTaskById, useUpdateTask } from './'

// Project picker object type
const projectPickerType = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})

// Category picker object type
const categoryPickerType = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})

// Form schema
const taskFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(200, 'Task name is too long'),
  description: z.string().optional(),
  status: z.enum(Object.values(taskStatuses) as [TaskStatus, ...TaskStatus[]], {
    message: 'Status is required',
  }),
  note: z.string().optional(),
  dueDate: z.date().optional(),
  project: projectPickerType.nullable().optional(),
  category: categoryPickerType.nullable().optional(),
  contactId: z.string().optional(),
  assigneeId: z.string().optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

// Default values
export const taskDefaultValues: TaskFormValues = {
  name: '',
  description: '',
  status: taskStatuses.notStarted,
  note: '',
  dueDate: undefined,
  project: null,
  category: null,
  contactId: undefined,
  assigneeId: undefined,
}

type Props = {
  mode: FormMode
  taskId?: string
  onSuccess?: () => void
  defaultValues?: {
    project?: { id: string; name: string; slug: string } | null
    category?: { id: string; name: string; slug: string } | null
  }
}

/**
 * Hook for managing task form state and logic
 *
 * @param props - Configuration for the form
 * @returns Form state, handlers, and UI helpers
 */
export const useTaskForm = ({
  mode,
  taskId,
  onSuccess,
  defaultValues,
}: Props) => {
  const { data: task } = useFindTaskById(taskId ?? '')

  // Default values based on mode and props
  const formDefaultValues = useMemo(() => {
    if (mode === formModes.create) {
      return {
        ...taskDefaultValues,
        ...defaultValues,
        project: defaultValues?.project ?? null,
        category: defaultValues?.category ?? null,
      }
    }

    // For edit mode, use task data if available
    if (mode === formModes.edit && task) {
      return {
        name: task.name,
        description: task.description || '',
        status: task.status,
        note: task.note || '',
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        project: task.project,
        category: task.category,
        contactId: task.contactId || undefined,
        assigneeId: task.assigneeId || undefined,
      }
    }

    return {
      ...taskDefaultValues,
      ...defaultValues,
    }
  }, [mode, task, defaultValues])

  // Form instance
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: formDefaultValues,
  })

  // Reset form when task data changes (for edit mode)
  useEffect(() => {
    if (mode === formModes.edit && task) {
      form.reset({
        name: task.name,
        description: task.description || '',
        status: task.status,
        note: task.note || '',
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        project: task.project,
        category: task.category,
        contactId: task.contactId || undefined,
        assigneeId: task.assigneeId || undefined,
      })
    }
  }, [form, mode, task])

  // Update project and category when defaultValues change (for create mode)
  useEffect(() => {
    if (mode === formModes.create) {
      const currentProject = form.getValues('project')
      const currentCategory = form.getValues('category')
      const newProject = defaultValues?.project ?? null
      const newCategory = defaultValues?.category ?? null

      // Only update if values actually changed
      if (
        currentProject?.id !== newProject?.id ||
        currentCategory?.id !== newCategory?.id
      ) {
        form.reset({
          ...form.getValues(),
          project: newProject,
          category: newCategory,
        })
      }
    }
  }, [form, mode, defaultValues])

  // Mutations
  const createTask = useCreateTask({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  const updateTask = useUpdateTask({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  // Submit handler
  const onSubmit = (values: TaskFormValues) => {
    const taskData = {
      name: values.name,
      description: values.description,
      status: values.status,
      note: values.note,
      dueDate: values.dueDate?.toISOString(),
      projectId: values.project?.id ?? null,
      categoryId: values.category?.id ?? undefined,
      contactId: values.contactId,
      assigneeId: values.assigneeId,
    }

    if (mode === formModes.create) {
      createTask.mutate(taskData)
    } else if (mode === formModes.edit && taskId) {
      updateTask.mutate({ id: taskId, data: taskData })
    }
  }

  // UI helpers
  const isLoading = createTask.isPending || updateTask.isPending

  const buttonText = isLoading
    ? 'Processing...'
    : mode === formModes.create
      ? 'Create'
      : 'Update'

  return {
    // Form state
    form,
    defaultValues: formDefaultValues,

    // Handlers
    onSubmit,

    // Loading states
    isLoading,
    isCreating: createTask.isPending,
    isUpdating: updateTask.isPending,

    // UI helpers
    buttonText,

    // Mutations (for advanced usage)
    createTask,
    updateTask,
  }
}
