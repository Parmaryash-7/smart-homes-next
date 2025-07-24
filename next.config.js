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
  },

  async redirects() {
    return [
      {
        source: '/sitemap.php',
        destination: '/sitemap',
        permanent: true, 
      }
    ]
  }
}

export default nextConfig
