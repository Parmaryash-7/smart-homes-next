export const dynamic = 'force-dynamic';
import React from "react";
import DholeraSir from "components/DholeraSir";
import api from 'lib/api.interceptor'


const defaultMetadata = {
    title: "Dholera SIR | India's First Greenfield Smart City | SmartHomes Infrastructure",
    description:
        "Explore Dholera SIR, India's first and largest planned greenfield smart city, with world-class infrastructure, investment opportunities, and rapid urban development. SmartHomes Infrastructure offers premium residential, commercial, and industrial properties in Dholera SIR.",
    keywords:
        "Dholera SIR, Dholera Smart City, Greenfield Smart City, Dholera SIR Investment, Dholera SIR Properties, Real Estate in Dholera, SmartHomes Infrastructure, Dholera Development",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "dholera-sir";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/dholera-sir`;

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


export default function DholeraSirPage() {
    return <DholeraSir />;
}
