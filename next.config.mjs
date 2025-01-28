import './src/env.mjs'
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
    swSrc: "src/worker/index.ts",
    swDest: "public/sw.js",
    cacheOnNavigation: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            }
        ]
    },
    webpack: (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    canvas: false,
                },
            },
        };
    },
}

export default withSerwist(nextConfig);