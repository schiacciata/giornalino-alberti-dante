"use client";

import type { FC } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import site from "@/config/site";
import type { Comment, Post, User } from "@/generated/prisma/client";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import useIsMobile from "@/hooks/use-is-mobile";
import { useI18n } from "@/lib/i18n/client";
import { Icon } from "../icons";

interface CommentShareProps {
	comment: Pick<Comment, "id">;
	author: Pick<User, "name">;
	post: Pick<Post, "title">;
}

const ShareButton: FC<React.HtmlHTMLAttributes<HTMLButtonElement>> = ({
	onClick,
}) => {
	return (
		<Button variant="ghost" size={"sm"} className="w-full" onClick={onClick}>
			<Icon icon="share2" />
			Share
		</Button>
	);
};

const CommentShare: FC<CommentShareProps> = ({ comment, author, post }) => {
	const t = useI18n();
	const [, copyToClipboard] = useCopyToClipboard();
	const { isMobile } = useIsMobile();

	const { origin, pathname } = window.location;
	const commentUrl = `${origin}${pathname}#${comment.id}`;

	const shareData: ShareData = {
		url: commentUrl,
		title: site.title,
		text: t("comments.share", {
			authorName: author.name,
			postName: post.title,
		}),
	};

	if (navigator.canShare(shareData) && isMobile) {
		return <ShareButton onClick={() => navigator.share(shareData)} />;
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<ShareButton />
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" defaultValue={commentUrl} readOnly />
					</div>
					<Button
						type="submit"
						size="sm"
						className="px-3"
						onClick={() => {
							copyToClipboard(commentUrl);
						}}
					>
						<span className="sr-only">Copy</span>
						<Icon icon="copy" className="m-0" />
					</Button>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CommentShare;
