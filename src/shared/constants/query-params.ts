export const queryParamKeys = {
  redirect: 'redirect',
} as const

export type QueryParamKey = (typeof queryParamKeys)[keyof typeof queryParamKeys]
