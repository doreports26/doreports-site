import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/category/trending',
        destination: '/category/important',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
