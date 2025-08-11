// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // In development, you might want to disable PWA for faster rebuilds:
  disable: process.env.NODE_ENV === 'development',
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
    domains: ["localhost", "abic-consultancy.com"], // Allow images from localhost and your domain
    unoptimized: true,
  },
}

module.exports = withPWA(nextConfig)
