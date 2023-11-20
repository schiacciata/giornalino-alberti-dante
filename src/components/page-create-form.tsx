"use client"

import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Post } from "@prisma/client"
import { Button } from "./ui/button"
import { newPage } from "@/actions/page"
import { toast } from "./ui/use-toast"

type PageCreateFormProps = {
    post: Pick<Post, 'id'>
}

export function PageCreateForm({ post }: PageCreateFormProps) {

    async function onCreate(formData: FormData) {
        const res = await newPage(formData);

        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: res.error,
        });
    }

   return (
        <form action={onCreate}>
            <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="number" className="text-right">
                                Numero
                            </Label>
                            <Input
                                id="number"
                                placeholder="123"
                                className="col-span-3"
                                type="number"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <input
                                id="postId"
                                value={post.id}
                                className="col-span-3"
                                hidden={true}
                                disabled={true}
                            />
                        </div>
                    </div>
            <Button type="submit">Submit</Button>
        </form>
        )
}