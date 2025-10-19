import type { CategoryNamesParams, CategoryParams } from './category-types'

export const categoryKeys = {
  root: ['category'] as const,

  all: () => [...categoryKeys.root, 'list'] as const,
  lists: () => [...categoryKeys.all()] as const,
  list: (filters: CategoryParams) =>
    [...categoryKeys.lists(), { filters }] as const,

  names: (filters: CategoryNamesParams) =>
    [...categoryKeys.root, 'names', { filters }] as const,

  details: () => [...categoryKeys.root, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
  detailBySlug: (slug: string) =>
    [...categoryKeys.details(), 'slug', slug] as const,
} as const
