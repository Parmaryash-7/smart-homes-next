/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/Home'
      }
    ]
  }
}

module.exports = nextConfig
