import { createSerwistRoute } from "@serwist/turbopack";

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
	createSerwistRoute({
		swSrc: "public/sw.js",
		nextConfig: {
			basePath: "/",
		},
	});
