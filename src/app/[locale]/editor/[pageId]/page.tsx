import { unstable_noStore as noStore } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Editor } from "@/components/editor/editor";
import type { Page } from "@/generated/prisma/client";
import { authPages } from "@/lib/auth/config";
import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";

async function getPageForUser(pageId: Page["id"]) {
	noStore();
	return await db.page.findFirst({
		where: {
			id: pageId,
		},
		select: {
			id: true,
			post: true,
			number: true,
			content: true,
		},
	});
}

interface EditorPageProps {
	params: Promise<{ pageId: string }>;
}

export default async function EditorPage(props: EditorPageProps) {
	const params = await props.params;
	noStore();
	const user = await getCurrentUser();

	if (!user) {
		redirect(authPages.signIn);
	}

	const page = await getPageForUser(params.pageId);

	if (!page) {
		notFound();
	}

	return (
		<Editor
			page={{
				id: page.id,
				number: page.number,
				content: page.content,
			}}
			post={{
				title: page.post.title,
				id: page.post.id,
			}}
		/>
	);
}
