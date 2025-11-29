import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'apps.lucidcentral.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.promusa.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ctahr.hawaii.edu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'agritech.tnau.ac.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plantix.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
