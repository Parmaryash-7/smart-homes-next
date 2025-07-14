import '../public/css/globals.css'
import Header from 'components/Header'
import Footer from 'components/Footer'
import api from 'lib/api.interceptor'
// import getSocialMediaList from 'lib/SocialMediaList'
// import getHomeDetail from 'lib/HomeDetail'
import { Providers } from '../store/Providers'
import AOSInitializer from '../components/AOSInitializer'
import InquiryPopup from '../components/InquiryPopup'

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
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>
      <body>
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
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
