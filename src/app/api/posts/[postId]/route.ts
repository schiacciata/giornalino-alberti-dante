import * as z from "zod";
import { isEditor } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { notifications } from "@/lib/notifications";
import { postPatchSchema } from "@/lib/validations/post";

const routeParamsSchema = z.object({
	postId: z.string(),
});
type RouteParams = z.infer<typeof routeParamsSchema>;

export async function DELETE(
	_req: Request,
	c: { params: Promise<RouteParams> },
) {
	try {
		const params = routeParamsSchema.parse(await c.params);

		// Check if the user has access to this post.
		if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
			return new Response(null, { status: 403 });
		}

		// Delete the post.
		await db.post.delete({
			where: {
				id: params.postId as string,
			},
			include: {
				pages: true,
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

		// Check if the user has access to this post.
		if (!(await verifyCurrentUserHasAccessToPost(params.postId))) {
			return new Response(null, { status: 403 });
		}

		// Get the request body and validate it.
		const json = await req.json();
		const body = postPatchSchema.parse(json);

		// Update the post.
		// TODO: Implement sanitization for content.
		const post = await db.post.update({
			where: {
				id: params.postId,
			},
			data: {
				title: body.title,
				published: body.published,
			},
		});

		if (body.published) {
			notifications.sendEveryoneNotification({
				title: "Nuovo post pubblicato",
				body: `Leggi ora ${post.title}`,
				tag: "POST_PUBLISHED",
			});
		}

		return new Response(null, { status: 200 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}

async function verifyCurrentUserHasAccessToPost(_postId: string) {
	const user = await getCurrentUser();
	if (!user) return false;

	return isEditor(user);

	/*const count = await db.post.count({
    where: {
      id: postId,
      authorId: user.id,
    },
  })

  return count > 0*/
}
