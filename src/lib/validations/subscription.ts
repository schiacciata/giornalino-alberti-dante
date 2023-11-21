import * as z from "zod"

export const subscriptionCreateSchema = z.object({
    endpoint: z.string(),
    p256dh: z.string(),
    auth: z.string(),
})
  
export type subscriptionCreateFormData = z.infer<typeof subscriptionCreateSchema>;