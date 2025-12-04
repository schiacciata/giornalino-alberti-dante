import * as z from "zod";
import { isEditor } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { pagePatchSchema } from "@/lib/validations/page";

const routeParamsSchema = z.object({
	pageId: z.string(),
	postId: z.string(),
});
type RouteParams = z.infer<typeof routeParamsSchema>;

export async function DELETE(
	_req: Request,
	c: { params: Promise<RouteParams> },
) {
	try {
		const params = routeParamsSchema.parse(await c.params);

		// Check if the user has access to this page.
		if (!(await verifyCurrentUserHasAccessToPage(params.pageId))) {
			return new Response(null, { status: 403 });
		}

		// Delete the page.
		await db.page.delete({
			where: {
				id: params.pageId as string,
			},
		});

		return new Response(null, { status: 204 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}

export async function PATCH(req: Request, c: { params: Promise<RouteParams> }) {
	try {
		const params = routeParamsSchema.parse(await c.params);

		// Check if the user has access to this page.
		if (!(await verifyCurrentUserHasAccessToPage(params.pageId))) {
			return new Response(null, { status: 403 });
		}

		// Get the request body and validate it.
		const json = await req.json();
		const body = pagePatchSchema.parse(json);

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
		});

		return new Response(null, { status: 200 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}

async function verifyCurrentUserHasAccessToPage(_pageId: string) {
	const user = await getCurrentUser();
	if (!user) return false;

	return isEditor(user);

	/*const count = await db.page.count({
    where: {
      id: pageId,
      authorId: user.id,
    },
  })

  return count > 0*/
}
