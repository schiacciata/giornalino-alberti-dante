'use client'

import { FC } from 'react';
import { Page, Post } from '@prisma/client';
import { PDFViewer } from './pdf-viewer';
import { PostContentRenderer } from './post-content-renderer';

interface PostContentProps {
  pages: Pick<Page, 'number' | 'content'>[];
  post: Pick<Post, 'pdfPath'>;
}

export const PostContent: FC<PostContentProps> = ({ pages, post }) => {
  return (
    <>
      {post.pdfPath ? (
        <PDFViewer path={post.pdfPath} />
      ) : (
        <PostContentRenderer pages={pages}/>
      )}
    </>
  );
};
