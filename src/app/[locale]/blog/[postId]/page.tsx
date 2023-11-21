import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { notFound } from "next/navigation";
import { PostAuthorSection } from "@/components/post-author-section";
import { getScopedI18n } from "@/lib/i18n/server";
import { LikePostButton } from "@/components/like-post-button";
import { PostContent } from "@/components/post-content";

type BlogPostPageProps = {
    params: {
        postId: string;
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const scopedT = await getScopedI18n('post');
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
    include: {
      author: true,
      pages: {
        select: {
          content: true,
          number: true,
        },
        take: 20,
      },
    },
  });

  if (!post) return notFound();

  const { author } = post;
  const pages = post.pages
    .sort((a, b) => (a.number) - b.number)
    .map(p => {
      return {
        content: p.content,
        number: p.number,
      };
    })

  return (
    <Shell className="gap-1">
      <Header heading={post.title} text={scopedT('headingDescription')}>
        <LikePostButton post={{ id: post.id, likesUserIDs: post.likesUserIDs }}/>
      </Header>

      <PostAuthorSection
        author={{ image: author.image, name: author.name, id: author.id }}
        post={{ updatedAt: post.updatedAt, likesUserIDs: post.likesUserIDs }}
      />
      <PostContent pages={pages}/>
    </Shell>
  )
}
