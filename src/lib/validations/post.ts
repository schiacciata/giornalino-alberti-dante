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
  pdfFile: z
    .any()
    //.instanceof(File)
    //.refine((file) => file.size <= 4 * 1024 * 1024, 'File size must be less than 4MB')
    //.refine((file) => file.type === 'application/pdf', 'File type must be pdf')
    .optional(),
  pdfPath: z
    .string()
    .regex(/^\/pdfs\/(?:gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)_(?:\d{4})\.pdf$/)
    .optional(),
  published: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
  authorId: z.string().optional(),
})

export type postUpdateFormData = z.infer<typeof postPatchSchema>;

export const postLikeSchema = z.object({
  id: z.string().min(1),
  liked: z.coerce.boolean(),
})

export type postLikeFormData = z.infer<typeof postLikeSchema>;