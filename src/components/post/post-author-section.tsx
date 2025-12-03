"use client";

import type { Post, User } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { backdrop } from "@/styles/backdrop";
import { BackButton } from "../ui/back-button";
import { LikePostButton } from "./like-post-button";
import PostShare from "./post-share";

interface PostAuthorSectionProps {
	author: Pick<User, "name">;
	post: Pick<Post, "updatedAt" | "likesUserIDs" | "id" | "title">;
}

export function PostAuthorSection({ author, post }: PostAuthorSectionProps) {
	return (
		<div className="flex gap-3 text-md text-muted-foreground items-center justify-between">
			<BackButton
				rel="prev"
				className={cn(
					"flex items-center gap-2 hover:underline rounded-md",
					backdrop,
					"p-1 px-3",
				)}
			/>
			<div className={cn("flex items-center rounded-md", backdrop, "p-0")}>
				<LikePostButton
					post={{ id: post.id, likesUserIDs: post.likesUserIDs }}
				/>
				<PostShare
					author={{
						name: author.name,
					}}
					post={{
						title: post.title,
					}}
				/>
			</div>
		</div>
	);
}
