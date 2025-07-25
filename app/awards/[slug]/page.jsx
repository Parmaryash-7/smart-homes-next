// import AwardsDetail from "components/AwardsDetail";
// import api from 'lib/api.interceptor'
// // import getPageList from "lib/PageList";
// // import getPropertyList from "lib/PropertList";
// import { notFound } from "next/navigation";
// import awardsData from "data/awards.json";


// export default async function AwardsSlugPage({ params }) {
//     const { slug } = params;

//     // console.log("Slug from URL:", slug);

//     // const pageList = await getPageList();
//     const pageList = await api.PageList();
//     // const propertylist = await getPropertyList();
//     const propertylist = await api.Propertylist();

//     const matchedAward = awardsData.awards.find((a) => a.slug === slug);

//     // console.log("Matched Award:", matchedAward);

//     if (!matchedAward) return notFound();

//     return (
//         <AwardsDetail
//             pageList={pageList}
//             propertylist={propertylist}
//             awardObj={matchedAward}
//         />
//     );
// }


import AwardsDetail from "components/AwardsDetail";
import api from 'lib/api.interceptor';
import { notFound } from "next/navigation";
import awardsData from "data/awards.json";

const defaultMetadata = {
    title: "Awards & Recognitions | SmartHomes Infrastructure Dholera",
    description: "Explore our prestigious awards recognizing our excellence in real estate development and smart city innovation at Dholera Smart City.",
    keywords: "SmartHomes awards, Dholera real estate, achievements, real estate recognition, Gujarat property awards",
    image: "https://www.smarthomesinfra.com/images/og-image.png", 
};

export async function generateMetadata({ params }) {
    const { slug } = params;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const matchedAward = awardsData.awards.find((a) => a.slug === slug);

    if (!matchedAward) return {
        title: defaultMetadata.title,
        description: defaultMetadata.description,
        keywords: defaultMetadata.keywords,
    };

    const title = matchedAward.page_title || matchedAward.name || defaultMetadata.title;
    const description = matchedAward.description?.replace(/<[^>]*>/g, '') || defaultMetadata.description;
    const keywords = defaultMetadata.keywords;
    const ogImage = `${siteUrl}${matchedAward.image || defaultMetadata.image}`;
    const canonicalUrl = `${siteUrl}/awards/${slug}`;

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

// ✅ Page component
export default async function AwardsSlugPage({ params }) {
    const { slug } = params;

    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    const matchedAward = awardsData.awards.find((a) => a.slug === slug);

    if (!matchedAward) return notFound();

    return (
        <AwardsDetail
            pageList={pageList}
            propertylist={propertylist}
            awardObj={matchedAward}
        />
    );
}
