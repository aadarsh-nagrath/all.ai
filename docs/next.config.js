// Import nextra properly for newer Node.js versions
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  basePath: '/docs',
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/:path*',
      },
    ]
  },
})
