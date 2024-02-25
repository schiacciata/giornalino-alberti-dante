'use client';

import { FC, useCallback, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Progress } from "@/components/ui/progress"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '@/styles/pdf.css'

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { PageSwitcher } from './page-switcher';
import { toast } from 'sonner';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

interface PDFViewerProps {
  path: string;
}

const resizeObserverOptions = {};
const maxWidth = 800;

export const PDFViewer: FC<PDFViewerProps> = ({ path }) => {
  const file = decodeURIComponent(path);
  const [numPages, setNumPages] = useState<number>(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const [pageIndex, setPageIndex] = useState<number>(0);

  const handlePageChange = (increment: number) => {
    const newPageIndex = pageIndex + increment;
    if (newPageIndex >= 0 && newPageIndex < numPages) {
      setPageIndex(newPageIndex);
    }
  };

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  function onError(error: Error): void {
    console.log('h')
    toast.error(error.message);
  }

  const loadingDiv = (
    <p className='text-muted-foreground italic'>Loading file...</p>
  )

  return (
    <div className="Example__container__document" ref={setContainerRef}>
      <Progress value={(pageIndex+1)/numPages*100} />
      <PageSwitcher pageIndex={pageIndex} pageCount={numPages} onPageChange={handlePageChange} />
      <Document loading={loadingDiv} file={file} onLoadSuccess={onDocumentLoadSuccess} onSourceError={onError} onLoadError={onError} options={options}>
          <Page
            key={`page_${pageIndex + 1}`}
            pageNumber={pageIndex + 1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            className='rounded-md'
          />
      </Document>
      <PageSwitcher pageIndex={pageIndex} pageCount={numPages} onPageChange={handlePageChange} />
    </div>
  );
};