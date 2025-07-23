// import DholeraForestEstate from "components/DholeraForestEstate";
// // import getPropertyList from "lib/PropertList";
// // import getPageList from "lib/PageList";
// import api from "lib/api.interceptor";


// export default async function DholeraForestEstatePage() {

//     // const pageList = await getPageList();
//     // const propertylist = await getPropertyList();
//     const pageList = await api.PageList();
//     const propertylist = await api.Propertylist();

//     const projectData = propertylist.find(
//         (p) => p.slug === "dholera-forest-estate"
//     );

//     return (
//         <DholeraForestEstate
//             projectData={projectData}
//             propertylist={propertylist}
//             pageList={pageList}
//         // isAmenityOpen={false}
//         // setAmenityToggle={() => { }}
//         // inquiryPopupObj={{}}
//         // setInquiryPopupObj={() => { }}
//         // inquiryPopup={false}
//         // setInquiryPopup={() => { }}
//         />
//     );
// }


import DholeraForestEstate from "components/DholeraForestEstate";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Dholera Forest Estate | Serviced Villas & Plots in Dholera Smart City",
    description:
        "Dholera Forest Estate offers serviced villas, residential and commercial plots in Dholera Smart City. Spread across 2 Lakh Sq. Yards, it’s Dholera’s first forest-themed township with world-class amenities.",
    keywords:
        "Dholera Forest Estate, Serviced Villas, Residential and Commercial Plots in Dholera, forest estate, dholera investment",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "dholera-forest-estate";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.in";

    const propertylist = await api.Propertylist();
    const pageList = await api.PageList();
    const projectData = propertylist.find((p) => p.slug === slug);

    const title = projectData?.seo_title || defaultMetadata.title;
    const description = projectData?.seo_description || defaultMetadata.description;
    const keywords = projectData?.seo_keywords || defaultMetadata.keywords;
    const ogImage = projectData?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/dholera-forest-estate`;

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

export default async function DholeraForestEstatePage() {
    const pageList = await api.PageList();
    const propertylist = await api.Propertylist();

    const projectData = propertylist.find(
        (p) => p.slug === "dholera-forest-estate"
    );

    return (
        <DholeraForestEstate
            projectData={projectData}
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}
