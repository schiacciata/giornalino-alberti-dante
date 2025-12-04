import * as z from "zod";
import { isEditor } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { pageCreateSchema } from "@/lib/validations/page";

const routeParamsSchema = z.object({
	postId: z.string(),
});
type RouteParams = z.infer<typeof routeParamsSchema>;

export async function GET(_req: Request, c: { params: Promise<RouteParams> }) {
	try {
		const params = routeParamsSchema.parse(await c.params);
		const user = await getCurrentUser();

		if (!user || !isEditor(user)) {
			return new Response("Unauthorized", { status: 403 });
		}

		const pages = await db.page.findMany({
			select: {
				id: true,
				number: true,
				updatedAt: true,
				createdAt: true,
			},
			where: {
				postId: params.postId,
			},
		});

		return new Response(JSON.stringify(pages));
	} catch (_) {
		return new Response(null, { status: 500 });
	}
}

export async function POST(req: Request, c: { params: Promise<RouteParams> }) {
	try {
		const params = routeParamsSchema.parse(await c.params);

		const user = await getCurrentUser();

		if (!user || !isEditor(user)) {
			return new Response("Unauthorized", { status: 403 });
		}

		const json = await req.json();
		const body = pageCreateSchema.parse(json);

		const page = await db.page.create({
			data: {
				number: body.number,
				postId: params.postId,
			},
			select: {
				id: true,
			},
		});

		return new Response(JSON.stringify(page));
	} catch (error) {
		if (error instanceof z.ZodError) {
			return new Response(JSON.stringify(error.issues), { status: 422 });
		}

		return new Response(null, { status: 500 });
	}
}
