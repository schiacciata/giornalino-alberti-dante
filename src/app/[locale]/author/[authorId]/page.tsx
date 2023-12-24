import { PostCard } from "@/components/post-card";
import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { getScopedI18n } from "@/lib/i18n/server";

type AuthorPostPageProps = {
    params: {
        authorId: string;
    }
}

export default async function AuthorPostPage({ params }: AuthorPostPageProps) {
    const scopedT = await getScopedI18n('author');

    const author = await db.user.findUnique({
        where: {
            id: params.authorId,
        },
        select: {
            name: true,
            createdAt: true,
        }
    });

    if (!author) return notFound();

    const posts = await db.post.findMany({
        where: {
            published: true,
            authorId: params.authorId,
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
            <Header heading={scopedT('heading', { name: author.name })} text={scopedT('headingDescription', { date: formatDate(author.createdAt.toDateString()) })} />
            <div className="divide-border-200 divide-y rounded-md border">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} comments={post.comments}/>
                ))}
            </div>
        </Shell>
    )
}
