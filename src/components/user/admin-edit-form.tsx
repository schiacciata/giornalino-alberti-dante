"use client"

import { FC } from 'react'
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
import { User } from '@prisma/client'

interface AdminEditFormProps {
    user: Pick<User, 'name' | 'role' | 'email' | 'image' | 'isTwoFactorEnabled' | 'password'>;
    disabled: boolean;
}

const AdminEditForm: FC<AdminEditFormProps> = ({ user, disabled }) => {
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
        /*setError("");
        setSuccess("");
    
        startTransition(() => {
          login(values, callbackUrl)
            .then((data) => {
              if (data?.error) {
                form.reset();
                setError(data.error);
              }
    
              if (data?.success) {
                form.reset();
                setSuccess(data.success);
              }
    
              if (data?.twoFactor) {
                setShowTwoFactor(true);
              }
            })
            .catch(() => setError("Something went wrong"));
        });*/
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
                {!disabled && (<Button type="submit">Submit</Button>)}
            </form>
        </Form>
    )
}

export default AdminEditForm