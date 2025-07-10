/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', 

  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

module.exports = nextConfig;
