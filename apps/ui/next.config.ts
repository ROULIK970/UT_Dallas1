import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "localhost",
      "ut-dallas-5poh.onrender.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  /* config options here */
}

export default nextConfig
