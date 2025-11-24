"use client";

import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { toast } from "sonner";
import { deletePost } from "@/actions/post";
import { Icon, Icons } from "@/components/icons";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Post } from "@/generated/prisma/client";

interface PostOperationsProps {
	post: Pick<Post, "id" | "title" | "pdfPath">;
}

export function PostOperations({ post }: PostOperationsProps) {
	const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
	const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

	const handleDeletePost = async () => {
		setIsDeleteLoading(true);

		toast.promise(deletePost(post.id), {
			loading: "Loading...",
			success: (data) => {
				return `${data.title} è stato eliminato`;
			},
			error: (error) => {
				return error.message;
			},
		});

		setIsDeleteLoading(false);
		setShowDeleteAlert(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
					<Icons.ellipsis className="size-4" />
					<span className="sr-only">Open</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{post.pdfPath && (
						<DropdownMenuItem asChild>
							<a href={post.pdfPath} download>
								<Icon icon="download" />
								Download PDF
							</a>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem asChild>
						<Link href={`/dashboard/posts/${post.id}`}>
							<Icon icon="view" />
							View
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
						onSelect={() => setShowDeleteAlert(true)}
					>
						<Icon icon="trash" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to delete this post?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePost}
							className="bg-red-600 focus:ring-red-600"
						>
							{isDeleteLoading ? (
								<Icons.spinner className="mr-2 size-4 animate-spin" />
							) : (
								<Icons.trash className="mr-2 size-4" />
							)}
							<form
								action={async () => {
									handleDeletePost();
								}}
							>
								<span>Delete</span>
							</form>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
