"use client"

import * as React from "react"
// @ts-ignore
import { useFormStatus } from 'react-dom';

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "sonner"
import { Icons } from "@/components/icons"

import { newPost } from '@/actions/post'
import { useI18n } from "@/lib/i18n/client";

interface PostCreateButtonProps extends ButtonProps {}

export function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const t = useI18n();
  const { pending } = useFormStatus();
  
  async function onCreate(formData: FormData) {
    const res = await newPost({
      title: "Untitled Post",
    });
    
    toast.error(t('errors.general'), {
      description: res.error,
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
