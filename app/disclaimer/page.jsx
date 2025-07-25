// import Disclaimer from "components/Disclaimer";
// // import getPageList from "lib/PageList";
// import api from "lib/api.interceptor";

// export default async function DisclaimerPage() {

//     // const pageList = await getPageList();
//     const pageList = await api.PageList();

//     return <Disclaimer pageList={pageList} />;
// }


import Disclaimer from "components/Disclaimer";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Disclaimer | SmartHomes Infrastructure",
    description:
        "Read the Disclaimer of SmartHomes Infrastructure to understand the limitations, liabilities, and terms regarding the information provided on our website and services.",
    keywords:
        "Disclaimer of Smarthomes Infrastructure",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "disclaimer";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/disclaimer`;

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

export default async function DisclaimerPage() {
    const pageList = await api.PageList();

    return <Disclaimer pageList={pageList} />;
}
