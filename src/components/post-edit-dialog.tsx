'use client'

import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Post } from "@prisma/client";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { editPost } from "@/actions/post";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
// @ts-ignore
import { useFormStatus } from 'react-dom';
import { Icons } from "./icons";
import { Switch } from "./ui/switch";
import { isAdmin } from "@/lib/auth/roles";
import { useSession } from "next-auth/react"
import { useI18n } from "@/lib/i18n/client";

type PostEditDialogProps = {
    post: Pick<Post, "id" | "title" | "published" | "pdfPath" | "authorId">,
}

export function PostEditDialog({ post }: PostEditDialogProps) {
    const t = useI18n();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(post.published);
    const { pending } = useFormStatus();
    const { data: session } = useSession();

    const onSubmit = async (formData: FormData) => {
        formData.set('published', isPublished.toString());

        const res = await editPost(formData);
        setIsOpen(false);
    
        if ('error' in res) {
          return toast.error(t('errors.general'), {
            description: res.error,
          });
        }
        
        return toast.success(t('success'), {
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
                        <div className="flex flex-col gap-y-4 py-4">
                            <div>
                                <Label htmlFor="title">
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
                            </div>
                            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="title" className={isPublished ? `text-green-500` : 'text-orange-500'}>
                                    {isPublished ? 'Published' : 'Not published'}
                                </Label>

                                <Switch
                                    checked={isPublished}
                                    onCheckedChange={setIsPublished}
                                />
                            </div>
                            <div>
                                <Label htmlFor="pdfFile">
                                    Carica PDF
                                </Label>
                                <Input
                                  type="file"
                                  id={`pdfFile`}
                                  accept=".pdf"
                                  form="editPost"
                                  className="col-span-3"
                                />
                            </div>

                            {session && isAdmin(session.user) && (
                                <>
                                    <div>
                                        <Label htmlFor="pdfPath">
                                            PDF path
                                        </Label>
                                        <Input
                                            id="pdfPath"
                                            name="pdfPath"
                                            defaultValue={post.pdfPath || undefined}
                                            form="editPost"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="authorId">
                                            Author Id
                                        </Label>
                                        <Input
                                            id="authorId"
                                            name="authorId"
                                            defaultValue={post.authorId || undefined}
                                            form="editPost"
                                            className="col-span-3"
                                        />
                                    </div>
                                </>
                            )}

                            <input
                                id="id"
                                name="id"
                                value={post.id}
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
