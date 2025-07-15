// import Latestnews from "components/Latestnews";
// import getBlogDetail from "lib/BlogDetail";

// export default async function LatestNewsPage() {
//     const blogDetailData = await getBlogDetail();

//     return <Latestnews blogs_types_list={blogDetailData} />;
// }


import Latestnews from "components/Latestnews";
import getBlogDetail from "lib/BlogDetail";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Dholera Smart City News, blogs & Updates | SmartHomes Infrastructure",
    description:
        "Real Estate News, Real Estate blogs, Dholera Smart City, ",
    keywords:
        "SmartHomes latest news, Dholera updates, real estate news, smart city blog, smart homes infrastructure",
    image: "https://www.smarthomesinfra.in/assets/images/default-og-image.jpg",
};

export async function generateMetadata() {
    const slug = "latest-news";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.in";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/latest-news`;

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

export default async function LatestNewsPage() {
    const blogDetailData = await getBlogDetail();

    return <Latestnews blogs_types_list={blogDetailData} />;
}
