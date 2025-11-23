"use client";

import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Progress } from "@/components/ui/progress";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "@/styles/pdf.css";

import { useResizeObserver } from "@wojtekmaj/react-hooks";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { toast } from "sonner";
import { PageSwitcher } from "./page/page-switcher";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

const options: React.ComponentProps<typeof Document>["options"] = {
	cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
	standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
	wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
};

interface PDFViewerProps {
	path: string;
}

const resizeObserverOptions = {};
const maxWidth = 800;

function PDFViewer({ path }: PDFViewerProps) {
	const file = decodeURIComponent(path);
	const [numPages, setNumPages] = useState<number>(0);
	const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
	const [containerWidth, setContainerWidth] = useState<number>();
	const [pageIndex, setPageIndex] = useState<number>(0);
	const [renderedPageIndex, setRenderedPageIndex] = useState<number | null>(
		null,
	);

	const isLoading = renderedPageIndex !== pageIndex;

	const handlePageChange = (increment: number) => {
		setPageIndex((prevPageIndex) => {
			const newPageIndex = prevPageIndex + increment;
			if (newPageIndex >= 0 && newPageIndex < numPages) {
				return newPageIndex;
			}
			return prevPageIndex;
		});
	};

	const onResize = useCallback<ResizeObserverCallback>((entries) => {
		const [entry] = entries;

		if (entry) {
			setContainerWidth(entry.contentRect.width);
		}
	}, []);

	useResizeObserver(containerRef, resizeObserverOptions, onResize);

	function onDocumentLoadSuccess({
		numPages: nextNumPages,
	}: PDFDocumentProxy): void {
		setNumPages(nextNumPages);
	}

	function onError(error: Error): void {
		toast.error(error.message);
	}

	const loadingDiv = (
		<p className="text-muted-foreground italic">Loading file...</p>
	);

	return (
		<div className="Example__container__document" ref={setContainerRef}>
			<Progress value={((pageIndex + 1) / numPages) * 100} />
			<PageSwitcher
				pageIndex={pageIndex}
				pageCount={numPages}
				onPageChange={handlePageChange}
			/>
			<Document
				loading={loadingDiv}
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				onSourceError={onError}
				onLoadError={onError}
				options={options}
				className={"h-fit"}
			>
				{isLoading && renderedPageIndex ? (
					<Page
						key={`page_${renderedPageIndex + 1}`}
						pageNumber={renderedPageIndex + 1}
						className="prevPage rounded-md"
						width={
							containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
						}
					/>
				) : null}
				<Page
					key={`page_${pageIndex + 1}`}
					pageNumber={pageIndex + 1}
					onRenderSuccess={() => setRenderedPageIndex(pageIndex)}
					className="rounded-md"
					width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
				/>
			</Document>
			<PageSwitcher
				pageIndex={pageIndex}
				pageCount={numPages}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}

export default PDFViewer;
