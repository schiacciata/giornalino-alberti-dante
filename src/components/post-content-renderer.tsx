import { FC, useState } from 'react';

import { Page } from '@prisma/client'
import { PageSwitcher } from './page-switcher';
import { Progress } from "@/components/ui/progress";
import { Button, buttonVariants } from '@/components/ui/button';
import { Icon } from './icons';
import EditorContentRender from './editor-content-render';

interface PostContentRendererProps {
    pages: Pick<Page, 'number' | 'content'>[];
}

export const PostContentRenderer: FC<PostContentRendererProps> = ({ pages }) => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    if (pages.length === 0) return null;

    const numPages = pages.length;

    const handlePageChange = (increment: number) => {
        const newPageIndex = pageIndex + increment;
        if (newPageIndex >= 0 && newPageIndex < numPages) {
          setPageIndex(newPageIndex);
        }
    };

    const getOperations = (pageIndex: number): any[] => {
        const { content } = pages[pageIndex] as Page & { content: any };
        return content?.ops ?? [];
    } 
    
    return (
        <>
            <Progress value={(pageIndex+1)/numPages*100} />
            <PageSwitcher pageIndex={pageIndex} pageCount={numPages} onPageChange={handlePageChange} />
            <EditorContentRender operations={getOperations(pageIndex)}/>
            <PageSwitcher pageIndex={pageIndex} pageCount={numPages} onPageChange={handlePageChange} />
        </>
    )
};