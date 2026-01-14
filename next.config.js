/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Use SWC for faster and more efficient minification
  compress: true, // Enable Gzip compression for smaller file transfers
  poweredByHeader: false, // Remove X-Powered-By header for security and slight size reduction
  compiler: {
    // Remove console.log in production to reduce bundle size
    removeConsole: process.env.NODE_ENV === 'production',
    // Remove testing attributes like data-testid from production builds
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-testid$'] } : false,
  },
  experimental: {
    // Optimize imports for heavy libraries to ensure only used modules are included (Tree Shaking)
    optimizePackageImports: ['lucide-react', 'date-fns', 'recharts'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|mp4|webm)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
