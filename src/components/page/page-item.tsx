import Link from "next/link"
import { Page } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { PageOperations } from "@/components/page/page-operations"

interface PageItemProps {
  page: Pick<Page, "id" | "number" | "updatedAt" | "content">
}

//const MAX_CHARS = 35;

export function PageItem({ page }: PageItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${page.id}`}
          className="font-semibold hover:underline"
        >
          <div>
            <p>Page {page.number}</p>
            {/*<p className={'text-sm text-muted-foreground italic'}>
              {page.content ? page.content.toString().slice(0, MAX_CHARS) : null}
            </p>*/}
          </div>
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            Updated on {formatDate(page.updatedAt?.toDateString())}
          </p>
        </div>
      </div>
      <PageOperations page={{ id: page.id }} />
    </div>
  )
}

PageItem.Skeleton = function PageItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
