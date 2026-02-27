const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.parkloftsparaguay.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-70473ebb629c4efb93b99bf2e83117da.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'asunciontimes.com',
      },
      {
        protocol: 'https',
        hostname: 'statics.forbes.com.py',
      },
      {
        protocol: 'https',
        hostname: 'proyecta.com.py',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {},
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
    {
      source: '/(.*)\\.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

module.exports = withNextIntl(nextConfig);
