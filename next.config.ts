import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  redirects: async () => [
    {
      source: '/', 
      destination: '/Xeon/home', 
      permanent: false, 
    },
  ],
};
export default nextConfig;
