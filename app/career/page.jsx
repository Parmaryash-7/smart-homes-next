// app/careers/page.jsx

import React from 'react';
import Career from '../../components/Career';
import InquiryCareer from '../../components/InquiryCareer';
import api from '../../lib/api.interceptor';

// export const dynamic = 'force-dynamic';

const defaultMetadata = {
    title: "Career",
    description:
        "Career",
    keywords:
        "Career",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "career";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);
    // console.log(page);
    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = "https://www.smarthomesinfra.com/images/og-image.png";
    const canonicalUrl = `${siteUrl}/career`;

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

const CareersPage = async () => {
    const career_full_list = await api.CareerPage();
    const pageList = await api.PageList();

    return (
        <>
            <Career
                career_full_list={career_full_list}
                pageList={pageList}
            />
            <InquiryCareer />
        </>
    );
};

export default CareersPage;
