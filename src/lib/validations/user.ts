import { Role } from "@prisma/client";
import * as z from "zod"

const roles = ['USER', 'EDITOR', 'ADMIN'] as const satisfies Role[];

export const userUpdateSchema = z.object({
  name: z.optional(z.string().min(3).max(32)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
  image: z.optional(z.string()),
  role: z.optional(z.enum(roles)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export type userUpdateFormData = z.infer<typeof userUpdateSchema>;