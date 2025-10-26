'use client'

import { useEffect, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formModes, type FormMode } from '@/shared/constants'
import {
  categoryDefaultValues,
  categoryFormSchema,
  CategoryFormValues,
} from '../lib'
import { useCreateCategory } from './use-create-category'
import { useFindCategoryById } from './use-find-category-by-id'
import { useUpdateCategory } from './use-update-category'

type Props = {
  mode: FormMode
  categoryId?: string
  onSuccess?: () => void
}

/**
 * Hook for managing category form state and logic
 *
 * @param props - Configuration for the form
 * @returns Form state, handlers, and UI helpers
 */
export const useCategoryForm = ({ mode, categoryId, onSuccess }: Props) => {
  const { data: category } = useFindCategoryById(categoryId ?? '')

  // Default values based on mode
  const defaultValues = useMemo(() => {
    if (mode === formModes.create) {
      return categoryDefaultValues
    }

    // For edit mode, use category data if available
    if (mode === formModes.edit && category) {
      return {
        name: category.name,
        description: category.description || '',
      }
    }

    return categoryDefaultValues
  }, [mode, category])

  // Form instance
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  })

  // Reset form when category data changes (for edit mode)
  useEffect(() => {
    if (mode === formModes.edit && category) {
      form.reset({
        name: category.name,
        description: category.description || '',
      })
    }
  }, [form, mode, category])

  // Mutations
  const createCategory = useCreateCategory({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  const updateCategory = useUpdateCategory({
    onSuccess: () => {
      form.reset()
      onSuccess?.()
    },
  })

  // Submit handler
  const onSubmit = (values: CategoryFormValues) => {
    if (mode === formModes.create) {
      createCategory.mutate(values)
    } else if (mode === formModes.edit && categoryId) {
      updateCategory.mutate({ id: categoryId, data: values })
    }
  }

  // UI helpers
  const isLoading = createCategory.isPending || updateCategory.isPending

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
    isCreating: createCategory.isPending,
    isUpdating: updateCategory.isPending,

    // UI helpers
    buttonText,

    // Mutations (for advanced usage)
    createCategory,
    updateCategory,
  }
}
