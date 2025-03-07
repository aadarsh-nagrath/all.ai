import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.pexels.com', "blog.knitto.co.id", "th.bing.com","www.mx-xz.com","encrypted-tbn0.gstatic.com"],
  },
};

export default nextConfig;
