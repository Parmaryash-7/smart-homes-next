// import Privacy from "components/Privacy";
// import api from "lib/api.interceptor";

// // import getPageList from "lib/PageList";

// export default async function PrivacyPolicyPage() {
//     // const pageList = await getPageList();
//     const pageList = await api.PageList();

//     return <Privacy pageList={pageList} />;
// }

export const dynamic = 'force-dynamic';
import Privacy from "components/Privacy";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Privacy Policy | SmartHomes Infrastructure",
    description:
        "Read the Privacy Policy of SmartHomes Infrastructure to understand how we collect, use, and protect your personal information while ensuring data security and confidentiality.",
    keywords:
        "Privacy Policy, SmartHomes Infrastructure",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "privacy-policy";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    // console.log(pageList);
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/privacy-policy`;

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

export default async function PrivacyPolicyPage() {
    const pageList = await api.PageList();
    return <Privacy pageList={pageList} />;
}
