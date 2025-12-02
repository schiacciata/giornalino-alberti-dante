"use client";

import { useState } from "react";
// @ts-expect-error
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { newPage } from "@/actions/page";
import { Icons } from "@/components/icons";
import {
	Button,
	type ButtonProps,
	buttonVariants,
} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

interface PageCreateButtonProps extends ButtonProps {
	postId: string;
}

export function PageCreateButton({
	postId,
	className,
	variant,
	...props
}: PageCreateButtonProps) {
	const t = useI18n();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = async (formData: FormData) => {
		setIsLoading(true);

		toast.promise(newPage(formData), {
			loading: "Loading...",
			success: () => {
				return `Pagina creata`;
			},
			error: (error) => {
				return error.message;
			},
		});

		setIsLoading(false);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button
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
					New page
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crea pagina</DialogTitle>
				</DialogHeader>
				<form action={onSubmit} className="space-y-8">
					<div className="grid gap-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="number" className="text-right">
								Numero
							</Label>
							<Input
								id="number"
								name="number"
								required
								placeholder="123"
								type="number"
								className="col-span-3"
							/>
							<input
								id="postId"
								name="postId"
								value={postId}
								className="col-span-3"
								hidden
								readOnly
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Crea</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
