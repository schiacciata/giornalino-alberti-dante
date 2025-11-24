import type { FC } from "react";
import type { Comment, Post, User } from "@/generated/prisma/client";
import { getScopedI18n } from "@/lib/i18n/server";
import PostComment from "./post-comment";
import PostInsertComment from "./post-insert-comment";

interface PostCommentSectionProps {
	post: Pick<Post, "id" | "authorId" | "title">;
	comments: Pick<
		Comment & { author: Pick<User, "id" | "image" | "name" | "role"> },
		"id" | "author" | "content" | "updatedAt"
	>[];
}

const PostCommentSection: FC<PostCommentSectionProps> = async ({
	post,
	comments,
}) => {
	const t = await getScopedI18n("comments");

	return (
		<div>
			<center className="font-bold px-4 text-lg">{t("heading")}</center>
			<PostInsertComment post={{ id: post.id }} />
			<div className="my-3 grid grid-cols-1 gap-y-3 mx-auto w-full md:w-2/3">
				{comments.length > 0 &&
					comments.map((comment, index) => (
						<PostComment
							key={index}
							post={{
								authorId: post.authorId,
								title: post.title,
							}}
							comment={{
								id: comment.id,
								content: comment.content,
								updatedAt: comment.updatedAt,
							}}
							author={{
								id: comment.author.id,
								image: comment.author.image,
								name: comment.author.name,
								role: comment.author.role,
							}}
						/>
					))}
			</div>
		</div>
	);
};

export default PostCommentSection;
