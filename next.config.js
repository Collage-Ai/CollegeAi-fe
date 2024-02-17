/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: []
    // serverComponentsExternalPackages: ['@prisma/client'] // prisma support
  },
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `http://localhost:3000/api/:slug*`
      }
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }]
      }
    ];
  }
};

module.exports = nextConfig;
