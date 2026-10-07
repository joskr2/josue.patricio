import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // Allow images from public folder
    unoptimized: false,
  },
}

export default nextConfig
