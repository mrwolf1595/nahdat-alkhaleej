// next.config.js or next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const, // Explicitly typed as 'https'
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http' as const, // Explicitly typed as 'http'
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'i3.ytimg.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);