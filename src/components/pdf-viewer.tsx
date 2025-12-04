"use client";

import { useCallback, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Progress } from "@/components/ui/progress";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "@/styles/pdf.css";

import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { AnimatePresence, motion } from "motion/react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { toast } from "sonner";
import { PageSwitcher } from "./page/page-switcher";
import { Skeleton } from "./ui/skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

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
	const [pageRect, setPageRect] = useState<DOMRect | null>(null);

	const isLoading = renderedPageIndex !== pageIndex;
	const options = useMemo<React.ComponentProps<typeof Document>["options"]>(
		() => ({
			cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
			standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
			wasmUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/wasm/`,
		}),
		[],
	);

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
		<Skeleton className="h-[400px] md:h-[1100px] w-[300px] md:w-[800px] rounded-xl mx-auto" />
	);

	const measurePage = (node?: HTMLElement | null) => {
		if (!node) return;

		const rect = node.getBoundingClientRect();
		if (rect.height) {
			return;
		}

		setPageRect(rect);
	};

	return (
		<div className="Example__container__document" ref={setContainerRef}>
			<Progress value={((pageIndex + 1) / numPages) * 100} />
			<PageSwitcher
				pageIndex={pageIndex}
				pageCount={numPages}
				onPageChange={handlePageChange}
			/>
			<Document
				key={`${file}-${numPages}`}
				loading={loadingDiv}
				file={file}
				onLoadSuccess={onDocumentLoadSuccess}
				onSourceError={onError}
				onLoadError={onError}
				options={options}
				className={"h-fit"}
			>
				<div
					style={{
						height: pageRect ? `${pageRect.height}px` : "auto",
						width: pageRect ? `${pageRect.width}px` : "auto",
						position: "relative",
					}}
					ref={measurePage}
				>
					<AnimatePresence initial={false}>
						{isLoading && renderedPageIndex !== null ? (
							<motion.div
								key={`prev_${renderedPageIndex}`}
								exit={{ opacity: 0 }}
							>
								<Page
									pageNumber={renderedPageIndex + 1}
									className="prevPage rounded-md"
									width={
										containerWidth
											? Math.min(containerWidth, maxWidth)
											: maxWidth
									}
								/>
							</motion.div>
						) : null}
						<motion.div
							key={`current_${pageIndex}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<Page
								pageNumber={pageIndex + 1}
								onRenderSuccess={() => setRenderedPageIndex(pageIndex)}
								className="rounded-md"
								width={
									containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
								}
							/>
						</motion.div>
					</AnimatePresence>
				</div>
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
