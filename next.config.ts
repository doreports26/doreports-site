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
        hostname: "**",
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
