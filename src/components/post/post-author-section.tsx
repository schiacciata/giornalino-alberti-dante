"use client";

import { Link } from "next-view-transitions";
import * as React from "react";
import type { Post, User } from "@/generated/prisma/client";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { backdrop } from "@/styles/backdrop";
import { Button } from "../ui/button";
import { LikePostButton } from "./like-post-button";
import PostShare from "./post-share";

interface PostAuthorSectionProps {
	author: Pick<User, "name">;
	post: Pick<Post, "updatedAt" | "likesUserIDs" | "id" | "title">;
}

export function PostAuthorSection({ author, post }: PostAuthorSectionProps) {
	const t = useI18n();

	return (
		<div className="flex gap-3 text-md text-muted-foreground items-center justify-between">
			<Button
				variant={"link"}
				onClick={() => {
					window.history.back();
				}}
				rel="prev"
				className={cn(
					"flex items-center gap-2 hover:underline rounded-md",
					backdrop,
					"p-1 px-3",
				)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-arrow-left w-4 h-4"
				>
					<path d="m12 19-7-7 7-7"></path>
					<path d="M19 12H5"></path>
				</svg>
				<span className="hidden md:block">{t("back")}</span>
			</Button>
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
