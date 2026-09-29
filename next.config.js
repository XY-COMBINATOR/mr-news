/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.56.1', 'localhost', '127.0.0.1'],
  devIndicators: false,
};

module.exports = nextConfig;
