import type { ProjectNamesParams, ProjectParams } from './project-types'

export const projectKeys = {
  root: ['project'] as const,

  all: () => [...projectKeys.root, 'list'] as const,
  lists: () => [...projectKeys.all()] as const,
  list: (filters: ProjectParams) =>
    [...projectKeys.lists(), { filters }] as const,

  names: (filters: ProjectNamesParams) =>
    [...projectKeys.root, 'names', { filters }] as const,

  details: () => [...projectKeys.root, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  detailBySlug: (slug: string) =>
    [...projectKeys.details(), 'slug', slug] as const,
} as const
