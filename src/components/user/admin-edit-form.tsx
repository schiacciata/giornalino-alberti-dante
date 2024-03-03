"use client"

import { FC, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userUpdateSchema } from '@/lib/validations/user'
import { z } from 'zod'
import { Role, User } from '@prisma/client'
import { editUser, } from '@/actions/user'
import { toast } from 'sonner'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface AdminEditFormProps {
    user: Pick<User, 'id' | 'name' | 'role' | 'email' | 'image' | 'isTwoFactorEnabled' | 'password'>;
    disabled: boolean;
}

const AdminEditForm: FC<AdminEditFormProps> = ({ user, disabled }) => {
  const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof userUpdateSchema>>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
            email: user.email || '',
            name: user.name || '',
            image: user.image || '',
            isTwoFactorEnabled: user.isTwoFactorEnabled,
            password: user.password || '',
            role: user.role,
        },
    });

    async function onSubmit(values: z.infer<typeof userUpdateSchema>) {
        startTransition(() => {
            editUser(user.id, {
                ...values,
                newPassword: values.password,
            })
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        toast.error(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                <Input type='email' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={disabled}
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
                                    disabled={disabled}
                                />
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent align="center">
                                    <SelectGroup>
                                        {Object.values(Role).map((role) => (
                                            <SelectItem key={role} value={role} className="capitalize">
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
                {!disabled && (<Button type="submit" disabled={isPending}>Submit</Button>)}
            </form>
        </Form>
    )
}

export default AdminEditForm