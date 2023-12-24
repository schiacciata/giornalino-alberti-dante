import { Icon } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db"
import Link from "next/link";
import config from "@/config/site"
import { getI18n, getScopedI18n } from "@/lib/i18n/server";

export default async function IndexPage() {
  const t = await getI18n();
  const scopedT = await getScopedI18n('homepage');
  
  const posts = await db.post.findMany({
    take: config.homeMaxPosts,
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      likesUserIDs: true,
      comments: {
        select: {
          id: true,
        }
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {t('welcome')}!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {scopedT('headingDescription', { postsNumber: config.homeMaxPosts })}
        </p>
      </div>
      <div className="divide-y divide-border rounded-md border">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} comments={post.comments} />
        ))}
      </div>

      <Link href={'/blog'} className={buttonVariants({ variant: 'link' })}>
        {scopedT('readMore')}
        <Icon icon={"chevronRight"}/>
      </Link>
    </section>
  )
}
