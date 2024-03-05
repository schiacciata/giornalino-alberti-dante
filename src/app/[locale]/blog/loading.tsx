import { Header } from "@/components/header"
import { PostItem } from "@/components/post/post-item"
import { Shell } from "@/components/dashboard/shell"
import { getScopedI18n } from "@/lib/i18n/server";

export default async function BlogLoading() {
  const scopedT = await getScopedI18n('blog');

  return (
    <Shell>
      <Header heading="Blog" text={scopedT('headingDescription')}/>
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
