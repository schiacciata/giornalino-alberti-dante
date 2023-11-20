"use client"

import { editPost } from "@/actions/post"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Post } from "@prisma/client"
import { Button } from "./ui/button"

type PostEditFormProps = {
  post: Pick<Post, 'id' | 'title'>
}

export function PostEditForm({ post }: PostEditFormProps) {

  return (
    <form action={editPost}>
      <Label htmlFor="title" className="text-right">
        Title
      </Label>
      <Input
        id="title"
        defaultValue={post.title}
        className="col-span-3"
      />
      <input
        id="id"
        value={post.id}
        className="col-span-3"
        hidden={true}
        disabled={true}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}