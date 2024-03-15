'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Post, User } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { editPost } from "@/actions/post";
import { toast } from "sonner";
import { ChangeEvent, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
// @ts-ignore
import { useFormStatus } from 'react-dom';
import { Icons } from "../icons";
import { Switch } from "@/components/ui/switch";
import { isAdmin } from "@/lib/auth/roles";
import { useSession } from "next-auth/react"
import { useI18n } from "@/lib/i18n/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PostDeletePDFButton from "./delete-pdf-button";
import { Separator } from "@/components/ui/separator";
import { uploadToGithub } from "@/lib/files";
import filesConfig from "@/config/files";

type PostEditDialogProps = {
    post: Pick<Post, "id" | "title" | "published" | "pdfPath" | "authorId">,
    users: Pick<User, 'id' | 'email' | 'name' | 'image'>[],
}

export function PostEditDialog({ post, users }: PostEditDialogProps) {
    const t = useI18n();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPublished, setIsPublished] = useState<boolean>(post.published);
    const [file, setFile] = useState<File | null>(null);
    const { data: session } = useSession();
    const [isLoading, startTransition] = useTransition();

    const isUserAdmin = session && isAdmin(session.user);

    const onSubmit = async (formData: FormData) => {
        if (file && file.size > 0 && file.type === 'application/pdf') {
            const pdfPath = `/${filesConfig.pdfPath}/${file.name}`;

            const uploadResult = await uploadToGithub({
                path: `public${pdfPath}`,
                content: await file.arrayBuffer(),
            })

            if (!uploadResult) {
                return toast.error(`Could not upload "${file.name}"`);
            }

            toast.success(`"${file.name}" uploaded`);
            
            formData.set('pdfPath', pdfPath);
            formData.delete('pdfFile');
        }

        startTransition(() => {
            formData.set('published', isPublished.toString());

            editPost(formData)
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    }

                    if (data.success) {
                        setIsOpen(false);
                        toast.success(data.success);
                    }
                })
                .catch(() => toast.error(t('errors.general')));
        });
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const file = event.target.files[0];
        if (file.size === 0 || file.type !== 'application/pdf') return;

        setFile(file);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button
                    className={cn(
                        buttonVariants({ variant: 'default' }),
                        {
                            "cursor-not-allowed opacity-60": isLoading,
                        },
                    )}
                    disabled={isLoading}
                >
                    {isLoading ? (
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
                            {post.pdfPath ? (
                                <div>
                                    <Label htmlFor="pdfFile">
                                        PDF caricato
                                    </Label>

                                    <Input
                                        id="pdfFile"
                                        disabled
                                        value={post.pdfPath.split('/').pop()}
                                        className="col-span-3 text-red-500"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Label htmlFor="pdfFile">
                                        Carica PDF
                                    </Label>
                                    <Input
                                        type="file"
                                        name="pdfFile"
                                        id={`pdfFile`}
                                        accept=".pdf"
                                        form="editPost"
                                        className="col-span-3"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}

                            {isUserAdmin && (
                                <>
                                    <Separator />

                                    <div className="flex flex-col gap-y-4 p-4 border-2 border-red-500 rounded-md">
                                        <h1 className="font-bold italic">
                                            Admin
                                        </h1>
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
                                                Author
                                            </Label>
                                            <Select
                                                name="authorId"
                                                defaultValue={post.authorId || undefined}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select Author" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {users.map((user) => (
                                                        <SelectItem key={user.id} value={user.id}>
                                                            {user.name} ({user.email})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
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
                </form>

                <DialogFooter className="gap-y-4">
                    {post.pdfPath && <PostDeletePDFButton post={{ id: post.id }} />}
                    <Button form="editPost" type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
