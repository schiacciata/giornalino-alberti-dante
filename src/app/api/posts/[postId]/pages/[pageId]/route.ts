import * as z from "zod"

import { getCurrentUser } from "@/lib/auth/user"
import { db } from "@/lib/db"
import { pagePatchSchema } from "@/lib/validations/page"
import { isEditor } from "@/lib/auth/roles"

const routeContextSchema = z.object({
  params: z.object({
    pageId: z.string(),
    postId: z.string(),
  }),
})

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this page.
    if (!(await verifyCurrentUserHasAccessToPage(params.pageId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the page.
    await db.page.delete({
      where: {
        id: params.pageId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this page.
    if (!(await verifyCurrentUserHasAccessToPage(params.pageId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = pagePatchSchema.parse(json)

    // Update the page.
    // TODO: Implement sanitization for content.
    await db.page.update({
      where: {
        id: params.pageId,
      },
      data: {
        number: body.number,
        content: body.content,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToPage(pageId: string) {
  const user = await getCurrentUser();
  if (!user) return false;
  
  return (isEditor(user));

  /*const count = await db.page.count({
    where: {
      id: pageId,
      authorId: user.id,
    },
  })

  return count > 0*/
}
