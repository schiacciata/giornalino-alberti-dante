import "./src/lib/env/client";
import "./src/lib/env/server";

import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const withSerwist = withSerwistInit({
	swSrc: "src/worker/index.ts",
	swDest: "public/sw.js",
	cacheOnNavigation: true,
});

const nextConfig: NextConfig = {
	reactCompiler: true,
	reactStrictMode: true,
	poweredByHeader: false,
	serverExternalPackages: ["esbuild-wasm"],
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.googleusercontent.com",
			},
		],
	},
	turbopack: {},
	experimental: {
		viewTransition: true,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
};

export default withSerwist(nextConfig);
