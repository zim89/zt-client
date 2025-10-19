'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formModes, type FormMode } from '@/shared/constants'
import {
  projectDefaultValues,
  projectFormSchema,
  type ProjectFormValues,
} from '../lib'
import { useCreateProject, useFindProjectById, useUpdateProject } from './'

type Props = {
  mode: FormMode
  projectId?: string
  onSuccess?: () => void
}

/**
 * Hook for managing project form state and logic
 *
 * @param props - Configuration for the form
 * @returns Form state, handlers, and UI helpers
 */
export const useProjectForm = ({ mode, projectId, onSuccess }: Props) => {
  const { data: project } = useFindProjectById(projectId ?? '')

  // Default values based on mode
  const defaultValues = useMemo(() => {
    if (mode === formModes.create) {
      return projectDefaultValues
    }

    // For edit mode, use project data if available
    if (mode === formModes.edit && project) {
      return {
        name: project.name,
        description: project.description || '',
        isFavorite: project.isFavorite || false,
        isHidden: project.isHidden || false,
      }
    }

    return projectDefaultValues
  }, [mode, project])

  // Form instance
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  })

  // Reset form when project data changes (for edit mode)
  useEffect(() => {
    if (mode === formModes.edit && project) {
      form.reset({
        name: project.name,
        description: project.description || '',
        isFavorite: project.isFavorite || false,
        isHidden: project.isHidden || false,
      })
    }
  }, [form, mode, project])

  // Mutations
  const createProject = useCreateProject({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  const updateProject = useUpdateProject({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  // Submit handler
  const onSubmit = (values: ProjectFormValues) => {
    if (mode === formModes.create) {
      createProject.mutate(values)
    } else if (mode === formModes.edit && projectId) {
      updateProject.mutate({ id: projectId, data: values })
    }
  }

  // UI helpers
  const isLoading = createProject.isPending || updateProject.isPending

  const buttonText = isLoading
    ? 'Processing...'
    : mode === formModes.create
      ? 'Create'
      : 'Update'

  return {
    // Form state
    form,
    defaultValues,

    // Handlers
    onSubmit,

    // Loading states
    isLoading,
    isCreating: createProject.isPending,
    isUpdating: updateProject.isPending,

    // UI helpers
    buttonText,

    // Mutations (for advanced usage)
    createProject,
    updateProject,
  }
}
