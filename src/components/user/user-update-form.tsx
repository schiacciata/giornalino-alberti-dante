"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { updateUser } from "@/actions/user";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { authClient } from "@/lib/auth/client";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import { userUpdateSchema } from "@/lib/validations/user";

interface UserUpdateFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof userUpdateSchema>;

export function UserUpdateForm({ className, ...props }: UserUpdateFormProps) {
	const t = useI18n();
	const user = useCurrentUser();

	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const { refetch: update } = authClient.useSession();
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			name: user?.name || undefined,
			email: user?.email || undefined,
			isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
		},
	});

	const onSubmit = (values: FormData) => {
		startTransition(() => {
			updateUser(values)
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}

					if (data.success) {
						update();
						toast.success(data.success);
					}
				})
				.catch(() => toast.error(t("errors.general")));
		});
	};

	return (
		<Card className={cn(className)}>
			<CardContent>
				<Form {...form}>
					<form
						className="space-y-6"
						onSubmit={form.handleSubmit(onSubmit)}
						{...props}
					>
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="John Doe"
												disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{user?.isOAuth === false && (
								<>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="john.doe@example.com"
														type="email"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="******"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>New Password</FormLabel>
												<FormControl>
													<Input
														{...field}
														placeholder="******"
														type="password"
														disabled={isPending}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}
							{user?.isOAuth === false && (
								<FormField
									control={form.control}
									name="isTwoFactorEnabled"
									render={({ field }) => (
										<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
											<div className="space-y-0.5">
												<FormLabel>Two Factor Authentication</FormLabel>
												<FormDescription>
													Enable two factor authentication for your account
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							)}
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button disabled={isPending} type="submit">
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
