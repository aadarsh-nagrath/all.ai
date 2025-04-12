/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**',
    }],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*'
      },
      {
        source: '/ws/:path*',
        destination: 'http://localhost:8000/ws/:path*'
      }
    ] : [];
  }
};