'use client'

import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Post } from "@prisma/client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { editPost } from "@/actions/post";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
// @ts-ignore
import { useFormStatus } from 'react-dom';
import { Icons } from "./icons";
import { Switch } from "./ui/switch";

type PostEditDialogProps = {
    post: Pick<Post, "id" | "title" | "published">,
}

export function PostEditDialog({ post }: PostEditDialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(post.published);
    const { pending } = useFormStatus();

    const onSubmit = async (formData: FormData) => {
        formData.set('published', isPublished.toString());

        const res = await editPost(formData);
        setIsOpen(false);

        if ('error' in res) {
            return toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: res.error,
            });
        }
          
        return toast({
            variant: "default",
            title: "Success!",
            description: res.message,
        });
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    className={cn(
                        buttonVariants({ variant: 'default' }),
                        {
                            "cursor-not-allowed opacity-60": pending,
                        },
                    )}
                    disabled={pending}
                >
                    {pending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.edit className="mr-2 h-4 w-4" />
                    )}
                    Edit post
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit post</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} id="editPost" className="space-y-8">
                    <div className="grid gap-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                defaultValue={post.title}
                                form="editPost"
                                className="col-span-3"
                            />
                            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="title" className={isPublished ? `text-green-500` : 'text-orange-500'}>
                                    {isPublished ? 'Published' : 'Not published'}
                                </Label>

                                <Switch
                                    checked={isPublished}
                                    onCheckedChange={setIsPublished}
                                />
                            </div>

                            <input
                                id="id"
                                name="id"
                                value={post.id}
                                className="col-span-3"
                                form="editPost"
                                hidden
                                readOnly
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
