import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'stazhkova.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/youtube',
        destination: '/video',
        permanent: true,
      },
      {
        source: '/videos',
        destination: '/video',
        permanent: true,
      },
      {
        source: '/es/youtube',
        destination: '/es/video',
        permanent: true,
      },
      {
        source: '/ru/youtube',
        destination: '/ru/video',
        permanent: true,
      },
      {
        source: '/guides-en',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/guides-en/:path*',
        destination: '/guides/:path*',
        permanent: true,
      },
      {
        source: '/es/guides-esp',
        destination: '/es/guides',
        permanent: true,
      },
      {
        source: '/es/guides-esp/:path*',
        destination: '/es/guides/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
