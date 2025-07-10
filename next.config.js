/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home'
      }
    ]
  }
}

export default nextConfig
