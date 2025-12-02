"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";
import filesConfig from "@/config/files";
import githubConfig from "@/config/github";
import type { Page, Post } from "@/generated/prisma/client";
import { PostContentRenderer } from "./post-content-renderer";

interface PostContentProps {
	pages: Pick<Page, "number" | "content">[];
	post: Pick<Post, "pdfPath">;
}

const PDFViewer = dynamic(() => import("../pdf-viewer"), {
	ssr: false,
});

export const PostContent: FC<PostContentProps> = ({ pages, post }) => {
	if (!post.pdfPath) {
		return <PostContentRenderer pages={pages} />;
	}

	const path = filesConfig.raw
		? `${githubConfig.rawUrl(githubConfig.repo)}${post.pdfPath}`
		: post.pdfPath;

	return <PDFViewer path={path} />;
};
