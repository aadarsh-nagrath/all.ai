/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS image sources
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:8000/:path*',
          },
          {
            source: '/ws/:path*',
            destination: 'http://localhost:8000/ws/:path*',
          },
          {
            source: '/docs/:path*',
            destination: 'http://localhost:3001/docs/:path*',
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
