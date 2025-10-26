export const queryParamKeys = {
  redirect: 'redirect',
  projectSlug: 'projectSlug',
  categorySlug: 'categorySlug',
} as const

export type QueryParamKey = (typeof queryParamKeys)[keyof typeof queryParamKeys]
