import ImportantDocuments from "../../components/ImportantDocuments";
import api from "../../lib/api.interceptor";

const defaultMetadata = {
    title: "Dholera Smart City News, blogs & Updates | SmartHomes Infrastructure",
    description:
        "Real Estate News, Real Estate blogs, Dholera Smart City, ",
    keywords:
        "SmartHomes newsletter, Dholera Smart City updates, real estate newsletter, SmartHomes Infrastructure news",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "newsletter";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/newsletter`;

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

export default async function page() {

    return <ImportantDocuments />;
}
