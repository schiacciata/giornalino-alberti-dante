import * as z from "zod"

export const userUpdateSchema = z.object({
  name: z.string().min(3).max(32),
})

export type userUpdateFormData = z.infer<typeof userUpdateSchema>;