import { z } from 'zod'

export const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Required field' })
    .max(100, { message: 'Maximum 100 characters' }),
  description: z
    .string()
    .max(500, { message: 'Maximum 500 characters' })
    .optional(),
  isFavorite: z.boolean().optional(),
  isHidden: z.boolean().optional(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
