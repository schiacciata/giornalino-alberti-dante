import { Header } from "@/components/header"
import { PostItem } from "@/components/post-item"
import { Shell } from "@/components/shell"

export default function BlogLoading() {
  return (
    <Shell>
      <Header heading="Blog" text="Leggi tutti i post"/>
      <div className="divide-border-200 divide-y rounded-md border">
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
        <PostItem.Skeleton />
      </div>
    </Shell>
  )
}
