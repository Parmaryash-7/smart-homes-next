// import Blogs from "components/Blogs";
// import getPageList from "lib/PageList";
// import getBlogDetail from "lib/BlogDetail";

// export default async function BlogsPage() {
//     const pageList = await getPageList();
//     const blogDetailData = await getBlogDetail();

//     return (
//         <Blogs
//             pageList={pageList}
//             blogs_types_list={blogDetailData}
//         />
//     );
// }

// import Blogs from "components/Blogs";
import BlogsTab from "components/BlogsTab";
import api from 'lib/api.interceptor';
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";

const defaultMetadata = {
    title: "Dholera Smart City News, blogs & Updates | SmartHomes Infrastructure",
    description:
        "Stay updated with the latest blog posts from SmartHomes Infrastructure covering Dholera Smart City, sustainable development, and real estate trends.",
    keywords:
        "SmartHomes blog, real estate news, Dholera updates, smart city development, green infrastructure",
    image: "https://www.smarthomesinfra.in/assets/images/default-og-image.jpg",
};

export async function generateMetadata() {
    const slug = "blogs"; 
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.in";

    const pageList = await api.PageList();
    const page = pageList.find(p => p.slug === slug);
    // console.log(page);
    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/blogs`;

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

export default async function BlogsPage() {
    const pageList = await getPageList();
    const blogDetailData = await getBlogDetail();

    return (
        <BlogsTab
            pageList={pageList}
            blogs_types_list={blogDetailData}
        />
    );
}
