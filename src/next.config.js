/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "../.next",
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;
