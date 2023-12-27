"use client"

import * as React from "react"
// @ts-ignore
import { useFormStatus } from 'react-dom';

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "./ui/use-toast";
import { newPage } from "@/actions/page";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useI18n } from "@/lib/i18n/client";

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
    const { pending } = useFormStatus();

    const onSubmit = async (formData: FormData) => {
        const res = await newPage(formData);

        if ('error' in res) {
            return toast({
                variant: "destructive",
                title: t('errors.general'),
                description: res.error,
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={cn(
                        buttonVariants({ variant }),
                        {
                            "cursor-not-allowed opacity-60": pending,
                        },
                        className
                    )}
                    disabled={pending}
                    {...props}
                >
                    {pending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.add className="mr-2 h-4 w-4" />
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
    )
}
