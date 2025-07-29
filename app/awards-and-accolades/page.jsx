// import Awards from "components/Awards";
// import api from 'lib/api.interceptor'
// // import getPageList from "lib/PageList";
// // import propertyList from "lib/PropertList";

// export default async function AwardsPage() {
//     // const pageList = await getPageList();
//     // const propertylist = await propertyList();

//     const pageList = await api.PageList();
//     const propertylist = await api.Propertylist();

//     return <Awards pageList={pageList} propertylist={propertylist} />;
// }

export const dynamic = 'force-dynamic';
import Awards from "components/Awards";
import api from 'lib/api.interceptor';
import awardsData from "data/awards.json";

const defaultMetadata = {
    title: "Awards & Accolades | SmartHomes Infrastructure's Achievements in Dholera Smart City",
    description:
        "Celebrating the awards and achievements of SmartHomes Infrastructure in Dholera Smart City. See how our excellence in real estate is recognized nationwide.",
    keywords:
        "SmartHomes awards, Dholera awards, real estate recognition, Gujarat smart city achievements",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "awards";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const title = defaultMetadata.title;
    const description = defaultMetadata.description;
    const keywords = defaultMetadata.keywords;
    const ogImage = defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/awards`;

    return {
        title,
        description,
        keywords,

        metadataBase: new URL(siteUrl),
        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: "website",
            siteName: "Smart Homes Infrastructure Pvt. Ltd.",
            locale: "en_US",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title,
            description,
            site: "@Smart Homes Infrastructure Pvt. Ltd.",
            creator: "@Smart Homes Infrastructure Pvt. Ltd.",
            images: [ogImage],
        },

        robots: {
            index: true,
            follow: true,
        },

        authors: [{ name: "Smart Homes Infrastructure Pvt. Ltd." }],
    };
}

export default async function AwardsPage() {
    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    return <Awards pageList={pageList} propertylist={propertylist} awards={awardsData.awards} />;
}
