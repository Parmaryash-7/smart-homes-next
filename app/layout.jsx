import '../public/css/globals.css'
import '../components/Header.css'
import '../public/css/jquery.fancybox.min.css'
import Header from 'components/Header'
import Footer from 'components/Footer'
import api from 'lib/api.interceptor'
import { Providers } from '../store/Providers'
import AOSInitializer from '../components/AOSInitializer'
import InquiryPopup from '../components/InquiryPopup'
import { ToastContainer } from 'react-toastify'
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Script from 'next/script'
import projectListJson from "../data/projectList.json"
import DisclaimerPopup from '../components/DisclaimerPopup'

export default async function RootLayout({ children }) {
  const propertylist = await api.Propertylist()
  const socialList = await api.SocialMediaList()
  const homeDetails = await api.HomeDetail()

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
        />
        {/* Style Preload */}

        <link rel='preload' href='/css/globals.css' />
        <link rel="stylesheet" href="/css/globals.css" />


        {/* Fonts Preload */}

        {/* Cabinet Grotesk Fonts */}
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cabinet-grotesk/CabinetGrotesk-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Poppins Fonts */}
        <link rel="preload" href="/fonts/poppins/Poppins-Black.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/Poppins-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/Poppins-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/Poppins-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/Poppins-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/poppins/Poppins-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
        {/* <meta
          property="og:image"
          content="https://www.reecosys.com/api/image-tool/index.php?src=https://www.reecosys.com/assets/uploads/home/seo/image/SEO_1751361308_96.png&h=630&w=1200"
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled"></meta>
      </head>
      <body>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-752745452"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-752745452');
          `}
        </Script>
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W4HMTZND');
          `}
        </Script>


        {/* Google reCAPTCHA */}
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>


        <AOSInitializer />
        <Providers>
          <main>
            <Header propertylist={propertylist} socialList={socialList} projectListJson={projectListJson.list} />
            <div className="page" >
              {children}
              <DisclaimerPopup />
              <InquiryPopup />
              <Footer
                propertylist={propertylist}
                socialList={socialList}
                homeDetails={homeDetails}
                projectListJson={projectListJson.list}
              />
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
              />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
