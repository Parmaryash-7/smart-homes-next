// import NriCorner from "components/NriCorner";
// import getPageList from "lib/PageList";
// import api from "lib/api.interceptor";

// export default async function NriCornerPage() {
//     // const pageList = await getPageList();
//     const pageList = await api.PageList();

//     return <NriCorner pageList={pageList} />;
// }


import NriCorner from "components/NriCorner";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "NRI Investment in Dholera Smart City | Trusted by Global Investors",
    description:
        "SmartHomes Infrastructure specializes in high-value NRI investments in Dholera Smart City, with a strong client base across the USA, UAE, UK, Australia, and Canada. Benefit from well-planned entry and exit strategies to ensure maximum appreciation and high returns.",
    keywords:
        "NRI Investment, Dholera Smart City, Global Investors, High Returns",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "nricorner";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const page = await api.PageList(slug);
    // console.log(page);
    // console.log(page);
    // const page = pageList.find((p) => p.slug === slug);
    // console.log(page);
    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/nri-corner`;

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

export default async function NriCornerPage() {
    const pageList = await api.PageList();

    return <NriCorner pageList={pageList} />;
}
