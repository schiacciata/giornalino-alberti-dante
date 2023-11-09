import * as React from "react"

import linksConfig from "@/config/links"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/icons"
import Link from "next/link"

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <Link href={linksConfig.github} className="text-secondary underline font-bold">
            Built with <Icon icon="heart" className="text-red-500"/>
          </Link>
      </div>
    </footer>
  )
}