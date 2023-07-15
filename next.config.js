/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiBaseUrl: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
