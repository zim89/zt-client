export const regex = {
  cuid: /^c[a-z0-9]{24}$/i,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const

export const regexHelpers = {
  isCuid: (value: string): boolean => regex.cuid.test(value),
  isSlug: (value: string): boolean => regex.slug.test(value),
  isHexColor: (value: string): boolean => regex.hexColor.test(value),
} as const
