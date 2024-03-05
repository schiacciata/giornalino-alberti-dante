import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PostCreateButton } from "@/components/post/post-create-button"
import { PostItem } from "@/components/post/post-item"

export interface IndexPageProps {
}

export default async function EditorPostsPage({  }: IndexPageProps) {

    const posts = await db.post.findMany({
        select: {
            id: true,
            title: true,
            published: true,
            createdAt: true,
            pdfPath: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    if (posts.length === 0) {
        return (
            <EmptyPlaceholder>
                <EmptyPlaceholder.Icon name="post" />
                <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                    You don&apos;t have any posts yet. Start creating content.
                </EmptyPlaceholder.Description>
                <PostCreateButton variant="outline" />
            </EmptyPlaceholder>
        )
    };

    return (
        <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    )
}
