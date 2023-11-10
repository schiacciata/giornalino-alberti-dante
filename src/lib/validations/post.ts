import * as z from "zod"

export const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export type postCreateFormData = z.infer<typeof postCreateSchema>;

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
  published: z.boolean().optional(),
})

export type postUpdateFormData = z.infer<typeof postPatchSchema>;
