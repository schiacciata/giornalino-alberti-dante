import './src/env.mjs'
import pwa from 'next-pwa';

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
    }
}

const withPWA = pwa({
  dest: 'public',
  register: true,
  sw: 'sw.js',
  customWorkerDir: 'src/worker'
});

export default withPWA(nextConfig);