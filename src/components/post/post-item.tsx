import { Link } from "next-view-transitions";
import { PostOperations } from "@/components/post/post-operations";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@/generated/prisma/client";
import { formatDate } from "@/lib/utils";

interface PostItemProps {
	post: Pick<Post, "id" | "title" | "published" | "createdAt" | "pdfPath">;
}

export function PostItem({ post }: PostItemProps) {
	return (
		<div className="flex items-center justify-between p-4">
			<div className="grid gap-1">
				<Link
					href={`/dashboard/posts/${post.id}`}
					className="font-semibold hover:underline"
				>
					<div>
						<p>{post.title}</p>
						<p
							className={
								post.published ? "text-green-500" : "text-orange-500 italic"
							}
						>
							{post.published ? "Published" : "Not published"}
						</p>
						<p>{post.pdfPath ? "PDF 📰" : ""}</p>
					</div>
				</Link>
				<div>
					<p className="text-sm text-muted-foreground">
						{formatDate(post.createdAt?.toDateString())}
					</p>
				</div>
			</div>
			<PostOperations
				post={{ id: post.id, title: post.title, pdfPath: post.pdfPath }}
			/>
		</div>
	);
}

PostItem.Skeleton = function PostItemSkeleton() {
	return (
		<div className="p-4">
			<div className="space-y-3">
				<Skeleton className="h-5 w-2/5" />
				<Skeleton className="size-4/5" />
			</div>
		</div>
	);
};
