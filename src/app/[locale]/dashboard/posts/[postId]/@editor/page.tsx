import { db } from "@/lib/db"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { PageCreateButton } from "@/components/page/page-create-button"
import { PageItem } from "@/components/page/page-item"

export interface IndexPageProps {
    params: Promise<{
        postId: string;
    }>
}

export default async function EditorPagePage(props: IndexPageProps) {
  const params = await props.params;
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
