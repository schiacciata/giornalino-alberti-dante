import { PostCard } from "@/components/post/post-card";
import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/dashboard/shell";
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
    <Shell>
      <Header heading="Blog" text={scopedT('headingDescription')}/>
      <div className="divide-border-200 divide-y rounded-md border">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} comments={post.comments} />
        ))}
      </div>
    </Shell>
  )
}
