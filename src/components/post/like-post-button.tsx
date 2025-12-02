"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { likePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { featuresConfig } from "@/config/features";
import type { Post } from "@/generated/prisma/client";
import { authClient } from "@/lib/auth/client";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { Icon, type TIcon } from "../icons";

interface LikePostButtonProps {
	post: Pick<Post, "id" | "likesUserIDs">;
}

export function LikePostButton({ post }: LikePostButtonProps) {
	const t = useI18n();

	const [isPending, startTransition] = useTransition();
	const [isLiked, setIsLiked] = useState<boolean>(false);

	const { data: session, isPending: isLoading } = authClient.useSession();
	useEffect(() => {
		if (!session) return;
		const { id } = session.user;

		setIsLiked(post.likesUserIDs.some((userId) => userId === id));
	}, [session?.user]);

	async function handleAction() {
		startTransition(() => {
			likePost({
				id: post.id,
				liked: !isLiked,
			})
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}

					if (data.success) {
						toast.success(data.success);
						setIsLiked(!isLiked);
					}
				})
				.catch(() => toast.error(t("errors.general")));
		});
	}

	const getIcon = (): TIcon => {
		if (isLoading || isPending) return "spinner";

		return "heart";
	};

	if (!featuresConfig.enableLikes) {
		return null;
	}

	return (
		<form action={handleAction}>
			<Button variant="link" size="icon" type="submit" disabled={isLoading}>
				<Icon
					icon={getIcon()}
					className={cn("m-0", isLiked ? "fill-red-500" : "")}
				/>
			</Button>
		</form>
	);
}
