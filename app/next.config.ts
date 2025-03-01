import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com', "blog.knitto.co.id"],
  },
};

export default nextConfig;
