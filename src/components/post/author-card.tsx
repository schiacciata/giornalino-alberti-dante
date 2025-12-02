"use client";

import Link from "next/link";
import { type FC, memo } from "react";
import { featuresConfig } from "@/config/features";
import type { User } from "@/generated/prisma/client";
import { cn } from "@/lib/utils";
import { backdrop } from "@/styles/backdrop";
import { UserAvatar } from "../user/user-avatar";

interface AuthorCardProps {
	author: Pick<User, "image" | "name" | "id">;
	publishDate: string | Date;
}

const AuthorCard: FC<AuthorCardProps> = ({ author, publishDate }) => {
	const dateString = new Date(publishDate).toLocaleDateString();

	return (
		<div
			id="#author"
			className={cn("flex flex-col gap-2", backdrop, "p-3 rounded-xl")}
		>
			<Link
				href={featuresConfig.enableAuthorPage ? `/author/${author.id}` : "#"}
				rel="prev"
				prefetch={false}
				className="flex items-center gap-2 group"
			>
				<UserAvatar
					user={{ name: author.name, image: author.image }}
					className="h-8 w-8"
				/>
				<span className="group-hover:underline">{author.name}</span>
				<span>•</span>
				<span>{dateString}</span>
			</Link>
		</div>
	);
};

export default memo(AuthorCard);
