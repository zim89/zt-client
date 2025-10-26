'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formModes, taskStatuses, type FormMode } from '@/shared/constants'
import { useCreateTask, useFindTaskById, useUpdateTask } from './'

// Form schema
const taskFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Task name is required')
    .max(200, 'Task name is too long'),
  description: z.string().optional(),
  status: z.string().optional(),
  note: z.string().optional(),
  dueDate: z.date().optional(),
  projectId: z.string().optional(),
  categoryId: z.string().optional(),
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
  projectId: 'none',
  categoryId: 'none',
  contactId: undefined,
  assigneeId: undefined,
}

type Props = {
  mode: FormMode
  taskId?: string
  onSuccess?: () => void
  defaultValues?: {
    projectId?: string
    categoryId?: string
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
        // Convert undefined to 'none' for form fields
        projectId: defaultValues?.projectId || 'none',
        categoryId: defaultValues?.categoryId || 'none',
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
        projectId: task.projectId || 'none',
        categoryId: task.categoryId || 'none',
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
        projectId: task.projectId || 'none',
        categoryId: task.categoryId || 'none',
        contactId: task.contactId || undefined,
        assigneeId: task.assigneeId || undefined,
      })
    }
  }, [form, mode, task])

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
      status: values.status as (typeof taskStatuses)[keyof typeof taskStatuses],
      note: values.note,
      dueDate: values.dueDate?.toISOString(),
      projectId: values.projectId === 'none' ? null : values.projectId,
      categoryId: values.categoryId === 'none' ? undefined : values.categoryId,
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
      ? 'Create Task'
      : 'Update Task'

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
