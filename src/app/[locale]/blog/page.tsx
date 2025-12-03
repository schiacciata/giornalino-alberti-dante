import { PaginationControls } from "@/components/blog/pagination-controls";
import { Shell } from "@/components/dashboard/shell";
import { Header } from "@/components/header";
import { PostCard } from "@/components/post/post-card";
import { db } from "@/lib/db";

export default async function IndexPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const page = Number((await searchParams).page) || 1;
	const limit = 10;
	const skip = (page - 1) * limit;

	const [posts, total] = await Promise.all([
		db.post.findMany({
			where: { published: true },
			select: {
				id: true,
				title: true,
				createdAt: true,
				likesUserIDs: true,
				comments: { select: { id: true } },
			},
			orderBy: { createdAt: "desc" },
			skip,
			take: limit,
		}),

		db.post.count({
			where: { published: true },
		}),
	]);

	const totalPages = Math.ceil(total / limit);

	return (
		<Shell>
			<Header heading="Blog" />

			<div className="divide-border-200 divide-y rounded-md border mb-4">
				{posts.map((post) => (
					<PostCard key={post.id} post={post} comments={post.comments} />
				))}
			</div>

			<PaginationControls page={page} totalPages={totalPages} />
		</Shell>
	);
}
