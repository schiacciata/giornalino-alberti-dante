import { Header } from "@/components/header"
import { PostItem } from "@/components/post/post-item"
import { Shell } from "@/components/dashboard/shell"
import { getI18n, getScopedI18n } from "@/lib/i18n/server";
import { buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { PageSwitcher } from '@/components/page/page-switcher';
import { Separator } from "@/components/ui/separator";
import PostInsertComment from '@/components/post/post-insert-comment';

export default async function BlogLoading() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('blog');

  return (
    <Shell className="gap-1">
      <Header heading={<Skeleton className="px-4 h-4 w-[250px]" />} text={scopedT('headingDescription')}>
        <div className="flex">
        </div>
      </Header>

      <div className="grid grid-cols-1 gap-y-4">
        <div className="divide-y divide-border rounded-md border px-4 py-4">
          <div className={buttonVariants({ variant: 'link' })}>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="px-4 h-4 w-[250px]" />
          </div>
          <p className="px-4 py-2 text-muted-foreground italic">
            <Skeleton className="h-4 w-[200px]" />
          </p>
        </div>
        <div>
          <Skeleton className="h-4 w-full" />
          <PageSwitcher pageIndex={0} pageCount={0} />
          <Skeleton className="h-[400px] md:h-[1100px] w-[300px] md:w-[800px] rounded-xl" />
          <PageSwitcher pageIndex={0} pageCount={0} />
        </div>
        <Separator />
        <div>
          <center className="font-bold px-4 text-lg">{t('comments.heading')}</center>
          <PostInsertComment post={{ id: '0' }} disabled />
        </div>
      </div>
    </Shell>
  )
}
