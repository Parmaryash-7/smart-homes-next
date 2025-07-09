import '../public/css/globals.css';
import Header from 'components/Header';
import Footer from 'components/Footer';
import getPropertyList from 'lib/PropertList';
import getSocialMediaList from 'lib/SocialMediaList';
import getHomeDetail from 'lib/HomeDetail';
import { Providers } from "../store/Providers";
import AOSInitializer from '../components/AOSInitializer';

export default async function RootLayout({ children }) {
  const propertylist = await getPropertyList();
  const socialList = await getSocialMediaList();
  const homeDetails = await getHomeDetail();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,0,0"
        />
      </head>
      <body>
        <AOSInitializer />
        <Providers>
          <main>
            <Header propertylist={propertylist} socialList={socialList} />
            <div className="page">
              {children}
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
  );
}
