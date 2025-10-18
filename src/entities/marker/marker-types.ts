// ==============================
// REQUEST PARAMETERS
// ==============================

/** Parameters for marker requests */
export type MarkerParams = {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  isDefault?: boolean
}

// ==============================
// MAIN TYPES
// ==============================

/** Main marker entity */
export type Marker = {
  id: string
  slug: string
  createdAt: string
  updatedAt: string

  name: string
  fontColor: string | null
  bgColor: string | null
  isDefault: boolean
  userId: string | null
}

/** Marker with count of related entities */
export type MarkerWithCount = Marker & {
  _count: {
    tasks: number
  }
}

// ==============================
// DTO TYPES
// ==============================

/** Create marker */
export type CreateMarkerDto = {
  name: string
  fontColor?: string
  bgColor?: string
}

/** Update marker */
export type UpdateMarkerDto = {
  name?: string
  fontColor?: string
  bgColor?: string
}
