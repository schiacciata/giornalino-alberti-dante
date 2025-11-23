"use client";

import * as React from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { newPost } from "@/actions/post";
import { Icons } from "@/components/icons";
import {
	Button,
	type ButtonProps,
	buttonVariants,
} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
	className,
	variant,
	...props
}: PostCreateButtonProps) {
	const t = useI18n();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	async function onCreate(formData: FormData) {
		setIsLoading(true);

		toast.promise(newPost(formData), {
			loading: "Loading...",
			success: () => {
				return `Post creato`;
			},
			error: (error) => {
				return error.message;
			},
		});

		setIsLoading(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button
					type="submit"
					className={cn(
						buttonVariants({ variant }),
						{
							"cursor-not-allowed opacity-60": isLoading,
						},
						className,
					)}
					disabled={isLoading}
					{...props}
				>
					{isLoading ? (
						<Icons.spinner className="mr-2 size-4 animate-spin" />
					) : (
						<Icons.add className="mr-2 size-4" />
					)}
					New post
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New post</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<form action={onCreate} id="createPost" className="space-y-8">
					<div className="grid gap-2">
						<div className="flex flex-col gap-y-4 py-4">
							<div>
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									name="title"
									required
									defaultValue={"Untitled Post"}
									form="createPost"
									className="col-span-3"
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button disabled={isLoading} type="submit">
							{isLoading && (
								<Icons.spinner className="mr-2 size-4 animate-spin" />
							)}
							Crea
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
