"use client"

import * as React from "react"
// @ts-ignore
import { useFormStatus } from 'react-dom';

import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PageCreateForm } from "./page-create-form";

interface PageCreateButtonProps extends ButtonProps {
    postId: string;
}

export function PageCreateButton({
    postId,
    className,
    variant,
    ...props
}: PageCreateButtonProps) {
    const { pending } = useFormStatus();

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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crea pagina</DialogTitle>
                </DialogHeader>
                <PageCreateForm post={{id: postId}}/>
                <DialogFooter>
                    <Button type="submit">Crea</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
