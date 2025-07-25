// import Franchise_opportunities from "components/Franchise_opportunities";

// export default function FranchiseOpportunitiesPage() {
//     return <Franchise_opportunities />;
// }


import Franchise_opportunities from "components/Franchise_opportunities";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Franchise Opportunities | Partner with SmartHomes Infrastructure in Dholera Smart City",
    description:
        "Join SmartHomes Infrastructure, the most trusted real estate brand in Dholera Smart City. Become a franchise partner and benefit from a proven business model, legally clear properties, and a high-growth investment opportunity.",
    keywords:
        "Partner with SmartHomes Infrastructure, Franchise Opportunity, Dholera Smart City, ",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "franchise-opportunities";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/franchise-opportunities`;

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

export default function FranchiseOpportunitiesPage() {
    return <Franchise_opportunities />;
}
