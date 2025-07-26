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
      },
      {
        source: '/book-plot-now/dholera-expressway-city-township/',
        destination: '/dholera-expressway-city-township',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-international-airport-city-1/',
        destination: '/dholera-international-airport-city-1',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-international-airport-city-2-commercial-plots/',
        destination: '/dholera-international-airport-city-2-commercial-plots',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-forest-estate/',
        destination: '/dholera-forest-estate',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-expressway-city-I/',
        destination: '/dholera-expressway-city-I',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-expressway-avenue-1-commercial-plots/',
        destination: '/dholera-expressway-avenue-1-commercial-plots',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-forest-estate-commercial-plots/',
        destination: '/dholera-forest-estate-commercial-plots',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-international-airport-city-2/',
        destination: '/dholera-international-airport-city-2',
        permanent: true,
      },
      {
        source: '/book-plot-now/dholera-expressway-avenue-1/',
        destination: '/dholera-expressway-avenue-1',
        permanent: true,
      }
    ]
  }
}

export default nextConfig
