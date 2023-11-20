import * as z from "zod"

export const pageCreateSchema = z.object({
    postId: z.string().min(1),
    number: z.number().positive(),
    content: z.any().optional(),
})

export type pageCreateFormData = z.infer<typeof pageCreateSchema>;

export const pagePatchSchema = z.object({
  number: z.coerce.number().optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})

export type pageUpdateFormData = z.infer<typeof pagePatchSchema>;