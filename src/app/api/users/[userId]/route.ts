import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { userUpdateSchema } from "@/lib/validations/user";

const routeParamsSchema = z.object({
	userId: z.string(),
});
type RouteParams = z.infer<typeof routeParamsSchema>;

export async function PATCH(req: Request, c: { params: Promise<RouteParams> }) {
	try {
		const params = routeParamsSchema.parse(await c.params);

		// Ensure user is authentication and has access to this user.
		const user = await getCurrentUser();
		if (!user || params.userId !== user.id) {
			return new Response(null, { status: 403 });
		}

		// Get the request body and validate it.
		const body = await req.json();
		const payload = userUpdateSchema.parse(body);

		// Update the user.
		await db.user.update({
			where: {
				id: user.id,
			},
			data: {
				name: payload.name,
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
