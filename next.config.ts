import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/', // Root path
      destination: '/Xeon/home', // Redirect to the /home page
      permanent: true, // Permanent redirect (301)
    },
  ],
};
export default nextConfig;
