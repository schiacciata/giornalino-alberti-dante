'use client'

// PostContent.tsx
import { FC, useState } from 'react';
import { Page, Post } from '@prisma/client';
import { PDFViewer } from './pdf-viewer'; // Assuming you export your component as PostContent from PDFViewer.tsx
import { PageSwitcher } from './page-switcher'; // Import the PageSwitcher component

interface PostContentProps {
  pages: Pick<Page, 'number' | 'content'>[];
  post: Pick<Post, 'pdfPath'>;
}

export const PostContent: FC<PostContentProps> = ({ pages, post }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const handlePageChange = (increment: number) => {
    const newPageIndex = pageIndex + increment;
    if (newPageIndex >= 0 && newPageIndex < pages.length) {
      setPageIndex(newPageIndex);
    }
  };

  return (
    <>
      {post.pdfPath ? (
        <PDFViewer path={post.pdfPath} />
      ) : (
        <>
            <PageSwitcher pageIndex={pageIndex} pageCount={pages.length} onPageChange={handlePageChange} />
            WIP
            {/*<Parser data={pages[pageIndex].content as any}/>*/}
        </>
      )}
    </>
  );
};
