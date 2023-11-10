"use client"

import * as React from "react"
// @ts-ignore
import { useFormStatus } from 'react-dom';

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { createPost } from '@/actions/post'

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { pending } = useFormStatus();
  
  async function onCreate(formData: any) {
    const res = await createPost(formData);
    
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: res.error,
    });
  }

  return (
    <form action={onCreate}>
      <input hidden={true} type="text" id="title" readOnly value="Untitled Post" />
      <button
        type='submit'
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
        New post
      </button>
    </form>
  )
}
