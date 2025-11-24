"use client";

import type { FC } from "react";
import { toast } from "sonner";
import { deletePostPDF } from "@/actions/post";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Post } from "@/generated/prisma/client";
import { useI18n } from "@/lib/i18n/client";

interface PostDeleteButtonProps extends React.ComponentProps<typeof Button> {
	post: Pick<Post, "id">;
}

const PostDeletePDFButton: FC<PostDeleteButtonProps> = ({ post, ...props }) => {
	const t = useI18n();

	const handlePostDelete = async () => {
		toast.promise(deletePostPDF(post.id), {
			loading: "Loading...",
			success: (data) => {
				return `Deleted pdf "${data.pdfPath}" of post "${data.title}"`;
			},
			error: (error) => {
				return error.message;
			},
		});
	};

	return (
		<form
			id="deletePostPDF"
			action={handlePostDelete}
			className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
		>
			<input
				id="id"
				name="id"
				value={post.id}
				hidden
				readOnly
				form="deletePostPDF"
			/>
			<Button
				type="submit"
				form="deletePostPDF"
				variant="destructive"
				{...props}
			>
				<Icon icon="trash" className="mr-0" />
				Elimina PDF
			</Button>
		</form>
	);
};

export default PostDeletePDFButton;
