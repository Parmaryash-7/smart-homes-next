// import ChannelPartner from "components/ChannelPartner";
// import getPageList from "lib/PageList";
// import api from 'lib/api.interceptor'

// export default async function ChannelPartnersPage() {
//     // const pageList = await getPageList();
//     const pageList = await api.PageList();

//     return <ChannelPartner pageList={pageList} />;
// }


import ChannelPartner from "components/ChannelPartner";
import api from 'lib/api.interceptor';

const defaultMetadata = {
    title: "Become a Channel Partner | Grow with SmartHomes Infrastructure in Dholera Smart City",
    description:
        "Partner with SmartHomes Infrastructure and earn high commissions with consistent payouts. Get full training, live lead tracking, site visit assistance, and end-to-end sales & marketing support. Join us today and grow your real estate business in Dholera Smart City!",
    keywords:
        "Channel Partners, live lead Tracking, Site Visit Assistance, End-to-End Sales & Marketing Support, Dholera Smart City, Real Estate Business",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "channel-partners";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);
    console.log(page);
    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/channel-partners`;

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

export default async function ChannelPartnersPage() {
    const pageList = await api.PageList();

    return <ChannelPartner pageList={pageList} />;
}
