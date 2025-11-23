import { z } from "zod"

import authOptions from "@/lib/auth/config"
import { db } from "@/lib/db"
import { userUpdateSchema } from "@/lib/validations/user"
import { getCurrentUser } from "@/lib/auth/user"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(/* @next-codemod-error 'context' is passed as an argument. Any asynchronous properties of 'props' must be awaited when accessed. */
    context)

    // Ensure user is authentication and has access to this user.
    const user = await getCurrentUser();
    if (!user || params.userId !== user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = userUpdateSchema.parse(body)

    // Update the user.
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: payload.name,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
