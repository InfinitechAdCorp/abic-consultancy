const withPWA = require("@imbios/next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false, // THIS MUST BE FALSE FOR LOCAL TESTING
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"], // Allow images from localhost
    unoptimized: true,
  },
}

module.exports = withPWA(nextConfig)
