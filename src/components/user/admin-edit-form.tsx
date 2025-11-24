"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { editUser } from "@/actions/user";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Role, type User } from "@/generated/prisma/client";
import { userUpdateSchema } from "@/lib/validations/user";

interface AdminEditFormProps extends React.HTMLAttributes<HTMLFormElement> {
	user: Pick<
		User,
		"id" | "name" | "role" | "email" | "image" | "isTwoFactorEnabled"
	>;
	disabled: boolean;
}

type FormData = z.infer<typeof userUpdateSchema>;

const AdminEditForm: FC<AdminEditFormProps> = ({
	user,
	disabled,
	...props
}) => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormData>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			email: user.email || "",
			name: user.name || "",
			image: user.image || "",
			isTwoFactorEnabled: user.isTwoFactorEnabled,
			role: user.role,
		},
	});

	const onSubmit = (values: FormData) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			if (disabled) return;
			editUser(user.id, values)
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}

					if (data.success) {
						toast.success(data.success);
					}
				})
				.catch(toast.error);
		});
	};

	return (
		<div>
			<Form {...form}>
				<form
					{...props}
					className="space-y-6"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="space-y-4">
						<FormField
							disabled={disabled}
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>Public display name.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={disabled}
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							disabled={disabled}
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
											disabled={disabled}
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							disabled={disabled}
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select
										onValueChange={field.onChange}
										disabled={disabled}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent align="center">
											<SelectGroup>
												{Object.values(Role).map((role) => (
													<SelectItem
														key={role}
														value={role}
														className="capitalize"
													>
														{role}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button disabled={isPending} type="submit" className="w-full">
						Save
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default AdminEditForm;
