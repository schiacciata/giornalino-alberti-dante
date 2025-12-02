import { notFound } from "next/navigation";
import { Shell } from "@/components/dashboard/shell";
import { Header } from "@/components/header";
import AuthorCard from "@/components/post/author-card";
import { PostAuthorSection } from "@/components/post/post-author-section";
import PostCommentSection from "@/components/post/post-comment-section";
import { PostContent } from "@/components/post/post-content";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

type BlogPostPageProps = {
	params: Promise<{
		postId: string;
	}>;
};

export default async function BlogPostPage(props: BlogPostPageProps) {
	const { postId } = await props.params;
	const post = await db.post.findFirst({
		where: {
			id: postId,
		},
		include: {
			author: {
				select: {
					id: true,
					image: true,
					name: true,
				},
			},
			pages: {
				select: {
					content: true,
					number: true,
				},
				take: 20,
			},
			comments: {
				include: {
					author: {
						select: {
							id: true,
							image: true,
							name: true,
							role: true,
						},
					},
				},
				orderBy: {
					updatedAt: "desc",
				},
			},
		},
	});

	if (!post) return notFound();

	const author = {
		id: post.authorId,
		image: post.author.image || "",
		name: post.author.name || "Unknown Author",
	};

	const pages = post.pages
		.sort((a, b) => a.number - b.number)
		.map((p) => {
			return {
				content: p.content,
				number: p.number,
			};
		});

	return (
		<Shell className="gap-1">
			<Header heading={post.title}>
				<AuthorCard
					author={{ id: author.id, image: author.image, name: author.name }}
					publishDate={post.updatedAt}
				/>
			</Header>

			<div className="grid grid-cols-1 gap-y-4">
				<PostAuthorSection
					author={{ name: author.name }}
					post={{
						updatedAt: post.updatedAt,
						likesUserIDs: post.likesUserIDs,
						id: post.id,
						title: post.title,
					}}
				/>
				<PostContent pages={pages} post={{ pdfPath: post.pdfPath }} />
				<Separator />
				<PostCommentSection
					post={{ id: post.id, authorId: post.authorId, title: post.title }}
					comments={post.comments}
				/>
			</div>
		</Shell>
	);
}
