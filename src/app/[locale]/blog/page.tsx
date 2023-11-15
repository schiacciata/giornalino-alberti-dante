import { PostCard } from "@/components/post-card";
import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { getScopedI18n } from "@/lib/i18n/server";

export default async function IndexPage() {
  const scopedT = await getScopedI18n('blog');

  const posts = await db.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      likesUserIDs: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <Shell>
      <Header heading="Blog" text={scopedT('headingDescription')}/>
      <div className="divide-border-200 divide-y rounded-md border">
        {posts.map((post) => (
            <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Shell>
  )
}
