"use client";

import { type FC, useTransition } from "react";
import { toast } from "sonner";
import { newComment } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/generated/prisma/client";
import { authClient } from "@/lib/auth/client";
import { useI18n, useScopedI18n } from "@/lib/i18n/client";
import { Icons } from "../icons";

interface PostInsertCommentProps {
	post: Pick<Post, "id">;
	disabled?: boolean;
}

const PostInsertComment: FC<PostInsertCommentProps> = ({ post, disabled }) => {
	const t = useI18n();
	const [isLoading, startTransition] = useTransition();
	const scopedT = useScopedI18n("comments");
	const { data: session } = authClient.useSession();

	const handleCommentSubmit = async (formData: FormData) => {
		startTransition(() => {
			if (!session?.user) {
				toast.error(t("errors.unauthenticated"));
				return;
			}

			if (!formData.get("content")) {
				toast.error(t("errors.general"));
				return;
			}

			toast.promise(newComment(formData), {
				success(data) {
					return data.success;
				},
				error(data) {
					return data.message ?? t("errors.general");
				},
			});
		});
	};

	return (
		<form
			className="mx-auto w-[50%] my-5 grid gap-y-4 grid-cols-1"
			action={handleCommentSubmit}
		>
			<Label htmlFor="content">{scopedT("insert.label")}</Label>
			<Textarea
				placeholder={scopedT("insert.placeholder")}
				id="content"
				name="content"
				disabled={disabled}
			/>

			<input
				id="postId"
				name="postId"
				value={post.id}
				hidden
				readOnly
				disabled={disabled}
			/>
			<Button type="submit" disabled={disabled || isLoading}>
				{isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
				{t("submit")}
			</Button>
		</form>
	);
};

export default PostInsertComment;
