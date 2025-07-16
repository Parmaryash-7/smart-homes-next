import '../public/css/globals.css'
import Header from 'components/Header'
import Footer from 'components/Footer'
import api from 'lib/api.interceptor'
import { Providers } from '../store/Providers'
import AOSInitializer from '../components/AOSInitializer'
import InquiryPopup from '../components/InquiryPopup'
import { ToastContainer } from 'react-toastify'
import Script from 'next/script'

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
        <link rel='preload' href='public/css/globals.css' />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          property="og:image"
          content="https://smarthomesinfra.onrender.com/images/smart-homes.png"
        />
      </head>
      <body>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R31YX2E1Y8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R31YX2E1Y8');
          `}
        </Script>

        {/* Google Tag Manager Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K7HHNXQQ');
          `}
        </Script>

        {/* Google reCAPTCHA */}
        <Script src="https://www.google.com/recaptcha/api.js"
          strategy="afterInteractive"
        />

        <AOSInitializer />
        <Providers>
          <main>
            <Header propertylist={propertylist} socialList={socialList} />
            <div className="page">
              {children}
              <InquiryPopup />
              <Footer
                propertylist={propertylist}
                socialList={socialList}
                homeDetails={homeDetails}
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
