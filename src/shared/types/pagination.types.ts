/**
 * Pagination metadata
 */
export type PaginationMeta = {
  page: number
  pages: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

/**
 * Paginated response wrapper
 */
export type PaginatedResponse<T> = {
  total: number
  items: T[]
  pagination: PaginationMeta
}
