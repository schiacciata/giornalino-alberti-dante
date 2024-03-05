import * as React from "react"

import links from "@/config/links"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/icons"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <Link href={links.github} className={buttonVariants({ variant: 'link' })}>
            Built with <Icon icon="heart" className="text-red-500 fill-red-500 inline-flex"/>
          </Link>
      </div>
    </footer>
  )
}