import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageCreateButton } from "@/components/page-create-button"
import { PageItem } from "@/components/page-item"

export interface IndexPageProps {
    params: {
        postId: string;
    }
}

export default async function EditorPagePage({ params }: IndexPageProps) {
    const pages = await db.page.findMany({
        where: {
            postId: params.postId,
        },
        select: {
            id: true,
            number: true,
            updatedAt: true,
            content: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
      });

      if (pages.length === 0) {
        return (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="page" />
            <EmptyPlaceholder.Title>No pages created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              This page doesn&apos;t have any pages yet. Start creating content.
            </EmptyPlaceholder.Description>
            <PageCreateButton postId={params.postId} variant="outline" />
          </EmptyPlaceholder>
        );
      }

      return (
        <div className="divide-y divide-border rounded-md border">
          {pages.map((page) => (
            <PageItem key={page.id} page={page} />
          ))}
        </div>
      );
}
