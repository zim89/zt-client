// ==============================
// REQUEST PARAMETERS
// ==============================

/** Parameters for category requests */
export type CategoryParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  projectId?: string
}

/** Parameters for category names requests (sidebar) */
export type CategoryNamesParams = {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ==============================
// MAIN TYPES
// ==============================

/** Main category entity */
export type Category = {
  id: string
  slug: string
  createdAt: string
  updatedAt: string

  name: string
  description: string | null
  projectId: string
}

/** Category with count of related entities */
export type CategoryWithCount = Category & {
  _count: {
    tasks: number
  }
}

// ==============================
// DTO TYPES
// ==============================

/** Create category */
export type CreateCategoryDto = {
  name: string
  description?: string
  projectId: string
}

/** Update category */
export type UpdateCategoryDto = {
  name?: string
  description?: string
}

/** Category name response for sidebar (minimal data with incomplete tasks count) */
export type CategoryNameResponse = {
  id: string
  name: string
  slug: string
  incompleteTasksCount: number
}
