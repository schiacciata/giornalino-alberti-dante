import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { notFound } from "next/navigation";
import { Parser } from '@alkhipce/editorjs-react';
import { PostAuthorSection } from "@/components/post-author-section";
import { getScopedI18n } from "@/lib/i18n/server";

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
    }
  });

  if (!post || !post.content) return notFound();
  const { author } = post;

  return (
    <Shell className="gap-1">
      <Header heading={post.title} text={scopedT('headingDescription')}>
        {/*<LikePostButton post={{ likes: post.likes }}/>*/}
      </Header>

      <PostAuthorSection author={{ image: author.image, name: author.name, id: author.id }} post={{ updatedAt: post.updatedAt }}/>
      <Parser data={post.content as any}/>
    </Shell>
  )
}
