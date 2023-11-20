import * as z from "zod"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth/user"
import { isEditor } from "@/lib/auth/roles"
import { pageCreateSchema } from "@/lib/validations/page";

const routeContextSchema = z.object({
  params: z.object({
    postId: z.string(),
  }),
})

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)
    const user = await getCurrentUser();

    if (!user || !isEditor(user)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const pages = await db.page.findMany({
      select: {
        id: true,
        number: true,
        updatedAt: true,
        createdAt: true,
      },
      where: {
        postId: params.postId
      },
    })

    return new Response(JSON.stringify(pages))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}

export async function POST(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    const user = await getCurrentUser();

    if (!user || !isEditor(user)) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = pageCreateSchema.parse(json)

    const page = await db.page.create({
      data: {
        number: body.number,
        postId: params.postId
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(page))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
