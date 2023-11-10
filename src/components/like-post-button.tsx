"use client"

import * as React from "react"
import { Button } from "./ui/button"
import { Post } from "@prisma/client"
import { Icon } from "./icons"

interface LikePostButtonProps {
    post: Pick<Post, 'likes'>
}

export function LikePostButton({ }: LikePostButtonProps) {

  return (
    <form action="">
        <Button type="submit">
            <Icon icon="heart"/>
            Like
        </Button>
    </form>
  )
}