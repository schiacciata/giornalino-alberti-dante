import { PostCard } from "@/components/post-card";
import { db } from "@/lib/db"
import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";

type AuthorPostPageProps = {
    params: {
        authorId: string;
    }
}

export default async function AuthorPostPage({ params }: AuthorPostPageProps) {
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
            updatedAt: true,
            likes: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    });

    return (
        <Shell>
            <Header heading={`Post di ${author.name}`} text={`Registrato il ${formatDate(author.createdAt.toDateString())}`} />
            <div className="divide-border-200 divide-y rounded-md border">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </Shell>
    )
}
