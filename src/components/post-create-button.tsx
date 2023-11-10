"use client"

import * as React from "react"
// @ts-ignore
import { useFormStatus } from 'react-dom';
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { createPost } from '@/actions/post'

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const { pending } = useFormStatus();
  const { toast } = useToast()
  
  async function onCreate(formData: FormData) {
    const res = await createPost(formData);
    toast({
      variant: res.success ? 'default' :"destructive",
      title: res.success ? 'Success!' : "Uh oh! Something went wrong.",
      description: res.message,
    });
  }

  return (
    <form action={onCreate}>
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
