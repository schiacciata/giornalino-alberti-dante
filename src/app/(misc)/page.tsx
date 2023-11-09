import { Icon } from "@/components/icons";
import { PostCard } from "@/components/post-card";
import { buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db"
import Link from "next/link";

const MAX_DISPLAY = 5

export default async function IndexPage() {
  
  const posts = await db.post.findMany({
    take: MAX_DISPLAY,
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Benvenuto!
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Latest {MAX_DISPLAY} post:
        </p>
      </div>
      <div className="divide-y divide-border rounded-md border">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Link href={'/blog'} className={buttonVariants({ variant: 'link' })}>
        Read more
        <Icon icon={"chevronRight"}/>
      </Link>
    </section>
  )
}
