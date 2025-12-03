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
import type { Post, User } from "@/generated/prisma/client";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import useIsMobile from "@/hooks/use-is-mobile";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { backdrop } from "@/styles/backdrop";
import { Icon } from "../icons";

interface PostShareProps {
	post: Pick<Post, "title">;
	author: Pick<User, "name">;
}

type ButtonProps = React.HtmlHTMLAttributes<HTMLButtonElement>;

const ShareButton: FC<ButtonProps> = ({
	ref,
	className,
	...props
}: ButtonProps & {
	ref?: React.RefObject<HTMLButtonElement>;
}) => {
	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			className={cn(backdrop, className)}
			{...props}
		>
			<Icon icon="share" className="m-0" />
		</Button>
	);
};

ShareButton.displayName = "ShareButton";

const PostShare: FC<PostShareProps> = ({ post, author }) => {
	const t = useI18n();
	const [, copyToClipboard] = useCopyToClipboard();
	const { isMobile } = useIsMobile();

	const location = typeof window !== "undefined" ? window.location : null;
	const postUrl = `${location?.origin}${location?.pathname}`;

	const shareData: ShareData = {
		url: postUrl,
		title: site.title,
		text: t("posts.share", {
			authorName: author.name,
			postName: post.title,
		}),
	};

	if (location && isMobile) {
		return (
			<ShareButton
				onClick={() => {
					if (!navigator.canShare(shareData)) return;
					navigator.share(shareData);
				}}
			/>
		);
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
						<Input id="link" defaultValue={postUrl} readOnly />
					</div>
					<Button
						type="submit"
						size="sm"
						className="px-3"
						onClick={() => {
							copyToClipboard(postUrl);
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

export default PostShare;
