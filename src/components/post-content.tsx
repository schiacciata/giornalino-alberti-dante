'use client'

import { Parser } from '@alkhipce/editorjs-react'
import { Page } from '@prisma/client'
import { FC, useState } from 'react'
import { Button } from './ui/button';
import { Icon } from './icons';

interface PostContentProps {
  pages: Pick<Page, 'content'>[];
}

export const PostContent: FC<PostContentProps> = ({ pages }) => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    if (pages.length === 0) return null;


    const handleClick = (forth: boolean) => {
        setPageIndex((prev) => {
            if (!forth && prev === 0) return 0;
            if (forth && prev+1 === pages.length) return 0;

            return forth ? 1 : -1 + prev;
        })
    }
    
    return (
        <>
            {<Parser data={pages[pageIndex].content as any}/>}
            <div className='content-center justify-items-center grid grid-cols-3 py-6 max-w-[200px]'>
                <Button onClick={() => handleClick(false)} disabled={pageIndex === 0}>
                    <Icon icon='chevronLeft'/>
                </Button>
                <Button disabled={true}>
                    {pageIndex}
                </Button>
                <Button onClick={() => handleClick(true)} disabled={pageIndex >= pages.length-1}>
                    <Icon icon='chevronRight'/>
                </Button>
            </div>
        </>
    )
}