/** @type {import('next').NextConfig} */
const nextConfig = {
  //distribution directory path is required for the SSR function
  distDir: "../.next",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'storage.googleapis.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
    ],
  },
};
module.exports = nextConfig;
