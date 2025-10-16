import type { MarkerParams } from './marker-types'

export const markerKeys = {
  root: ['marker'] as const,

  all: () => [...markerKeys.root, 'list'] as const,
  lists: () => [...markerKeys.all()] as const,
  list: (filters: MarkerParams) =>
    [...markerKeys.lists(), { filters }] as const,

  details: () => [...markerKeys.root, 'detail'] as const,
  detail: (id: string) => [...markerKeys.details(), id] as const,
  detailBySlug: (slug: string) =>
    [...markerKeys.details(), 'slug', slug] as const,
} as const
