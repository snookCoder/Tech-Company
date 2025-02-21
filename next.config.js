/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**", // Ensure this matches the path of your images
      },
    ],
  },
  reactStrictMode: true, // Enable React Strict Mode in development
};

module.exports = nextConfig;
