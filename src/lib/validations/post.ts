import * as z from "zod"

export const postCreateSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
})

export type postCreateFormData = z.infer<typeof postCreateSchema>;

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  id: z.string().optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
  published: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
})

export type postUpdateFormData = z.infer<typeof postPatchSchema>;

export const postLikeSchema = z.object({
  id: z.string().min(1),
  liked: z.coerce.boolean(),
})

export type postLikeFormData = z.infer<typeof postLikeSchema>;