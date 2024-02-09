/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "source.unsplash.com",
      "github.com",
      "s3.us-east-1.wasabisys.com",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
