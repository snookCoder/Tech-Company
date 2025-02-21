/** @type {import('next').NextConfig} */
const nextConfig = {
  server: {
    port: process.env.PORT || 3000, // Use Render's PORT or default to 3000
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
