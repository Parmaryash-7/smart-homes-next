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
        source: '/latest-news',
        destination: '/blogs?tab=latest-news',
        permanent: true, 
      },
      {
        source: '/dholera-Forest-Estate-Phase-2',
        destination: '/dholera-forest-estate',
        permanent: true, 
      },
       {
        source: '/article/dholera-smart-city-news-by-smart-homes-vol-06',
        destination: '/images/pdf/DHOLERA-SMART-CITY-NEWS-BY-SMART-HOMES-VOL-05.pdf',
        permanent: true, 
      },
       {
        source: '/India-Dedicated-Freight-Corridor-Augment-Manufacturing-Development-Smart-Cities.php',
        destination: '/blogs/indias-dedicated-freight-corridor-augment-manufacturing-development-smart-cities',
        permanent: true, 
      },
       {
        source: '/project/mulberry-park',
        destination: '/mulberry-park',
        permanent: true, 
      },
       {
        source: '/project/abcd-enclave-4',
        destination: '/abcd-enclave-4',
        permanent: true, 
      },
       {
        source: '/project/maple-garden',
        destination: '/maple-garden',
        permanent: true, 
      },
       {
        source: '/article/empowering-tomorrow-pm-modis-semiconductor-vision-ignites-dholera-smart-citys-growth',
        destination: '/blogs/empowering-tomorrow-pm-modis-semiconductor-vision-ignites-dholera-smart-citys-growth',
        permanent: true, 
      },
      {
        source: '/project/mulberry-park/:path*',
        destination: '/mulberry-park',
        permanent: true,
      },
       {
        source: '/project/abcd-enclave-3',
        destination: '/abcd-enclave-3',
        permanent: true, 
      },
       {
        source: '/project/piccadilly-square-2',
        destination: '/piccadilly-square-2',
        permanent: true, 
      },
       {
        source: '/project/olive-garden:path*/:path*',
        destination: '/olive-garden/',
        permanent: true, 
      },

       {
        source: '/project/olive-garden:path*',
        destination: '/olive-garden/',
        permanent: true, 
      },
       {
        source: '/nri-section.html',
        destination: '/nri-corner',
        permanent: true, 
      },
       {
        source: '/project/abcd-greens-1',
        destination: '/abcd-greens-1',
        permanent: true, 
      },
       {
        source: '/project/orange-county',
        destination: '/orange-county',
        permanent: true, 
      },
       {
        source: '/project/abcd-enclave-I',
        destination: '/abcd-enclave-I',
        permanent: true, 
      },
       {
        source: '/project/abcd-greens-1',
        destination: '/abcd-greens-1',
        permanent: true, 
      },
       {
        source: '/project/abcd-enclave-I',
        destination: '/abcd-enclave-I',
        permanent: true, 
      },
       {
        source: '/file/Draft-DPR-for-development-of-Dholera-Solar-Park.pdf',
        destination: '/images/document-pdf/Draft-DPR-for-development-of-Dholera-Solar-Park.pdf',
        permanent: true, 
      },
       {
        source: '/file/prelim-dholerasir-town-planning-4A-OPFP.pdf',
        destination: '/images/document-pdf/prelim-dholerasir-town-planning-4A-OPFP.pdf',
        permanent: true, 
      },
       {
        source: '/file/ABCD-ENCLAVE-3_Bhadiyad-286-Gam-no-6-hak-patrak.pdf',
        destination: '/abcd-enclave-3',
        permanent: true, 
      },
       {
        source: '/file/Ambli-665-Brochure-Website.pdf',
        destination: '/important-documents',
        permanent: true, 
      },
      // {
      //   source: '/book_plot/dholera-expressway-city-township/',
      //   destination: '/dholera-expressway-city-township',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-international-airport-city-1/',
      //   destination: '/dholera-international-airport-city-1',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-international-airport-city-2-commercial-plots/',
      //   destination: '/dholera-international-airport-city-2-commercial-plots',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-forest-estate/',
      //   destination: '/dholera-forest-estate',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-expressway-city-I/',
      //   destination: '/dholera-expressway-city-I',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-expressway-avenue-1-commercial-plots/',
      //   destination: '/dholera-expressway-avenue-1-commercial-plots',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-forest-estate-commercial-plots/',
      //   destination: '/dholera-forest-estate-commercial-plots',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-international-airport-city-2/',
      //   destination: '/dholera-international-airport-city-2',
      //   permanent: true,
      // },
      // {
      //   source: '/book-plot-now/dholera-expressway-avenue-1/',
      //   destination: '/dholera-expressway-avenue-1',
      //   permanent: true,
      // }
    ]
  }
}

export default nextConfig
