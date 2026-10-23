import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
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
