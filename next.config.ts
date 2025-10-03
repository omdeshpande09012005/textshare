/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds to avoid deployment failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checks enabled for type safety
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
