/** @type {import('next').NextConfig} */
const nextConfig = {
  // This lets the build finish even if there are TS errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // This lets the build finish even if there are Lint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;