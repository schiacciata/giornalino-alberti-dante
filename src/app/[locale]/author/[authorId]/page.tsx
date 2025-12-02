import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { Shell } from "@/components/dashboard/shell";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { Header } from "@/components/header";
import { Icon } from "@/components/icons";
import { PostCard } from "@/components/post/post-card";
import { buttonVariants } from "@/components/ui/button";
import { featuresConfig } from "@/config/features";
import { db } from "@/lib/db";
import { getI18n, getScopedI18n } from "@/lib/i18n/server";
import { cn, formatDate } from "@/lib/utils";

type AuthorPostPageProps = {
	params: Promise<{
		authorId: string;
	}>;
};

export default async function AuthorPostPage(props: AuthorPostPageProps) {
	if (!featuresConfig.enableAuthorPage) {
		return notFound();
	}

	const params = await props.params;
	const t = await getI18n();
	const scopedT = await getScopedI18n("author");

	const author = await db.user.findUnique({
		where: {
			id: params.authorId,
		},
		select: {
			name: true,
			createdAt: true,
		},
	});

	if (!author) return notFound();

	const posts = await db.post.findMany({
		where: {
			published: true,
			authorId: params.authorId,
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			likesUserIDs: true,
			comments: {
				select: {
					id: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<Shell>
			<Header
				heading={scopedT("heading", { name: author.name })}
				text={scopedT("headingDescription", {
					date: formatDate(author.createdAt.toDateString()),
				})}
			/>
			<div className="divide-border-200 divide-y rounded-md border">
				{posts.length === 0 && (
					<EmptyPlaceholder>
						<EmptyPlaceholder.Icon name="cross" />
						<EmptyPlaceholder.Title>No posts found</EmptyPlaceholder.Title>
						<Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
							<>
								<Icon icon="back" />
								{t("back")}
							</>
						</Link>
					</EmptyPlaceholder>
				)}
				{posts.map((post) => (
					<PostCard key={post.id} post={post} comments={post.comments} />
				))}
			</div>
		</Shell>
	);
}
