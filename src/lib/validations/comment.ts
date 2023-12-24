import * as z from "zod"

export const commentCreateSchema = z.object({
    postId: z.string().min(1),
    content: z.string(),
})

export type commentCreateFormData = z.infer<typeof commentCreateSchema>;

export const commentUpdateSchema = z.object({
  content: z.any().optional(),
})

export type commentUpdateFormData = z.infer<typeof commentUpdateSchema>;