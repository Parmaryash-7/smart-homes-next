// import Blog_detail from "components/Blog_detail";
// import api from 'lib/api.interceptor'

// import getPageList from "lib/PageList";
// import getBlogDetail from "lib/BlogDetail";
// import getBlogLatest from "lib/BlogLatest";

// export default async function BlogSlugPage({ params }) {
//     const { slug } = params;

//     const pageList = await getPageList();
//     const blogs_types_list = await getBlogDetail();
//     const recent_blog_init_data = await getBlogLatest();

//     return (
//         <Blog_detail
//             slug={slug}
//             pageList={pageList}
//             blogs_types_list={blogs_types_list}
//             recent_blog_init_data={recent_blog_init_data}
//         />
//     );
// }

import Blog_detail from "components/Blog_detail";
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";
import getBlogLatest from "lib/BlogLatest";

const defaultMetadata = {
    title: "Dholera Smart City News, blogs & Updates | SmartHomes Infrastructure",
    description:
        "Read the latest insights, news, and updates from SmartHomes Infrastructure about Dholera Smart City and sustainable real estate development.",
    keywords:
        "Real Estate News, Real Estate blogs, Dholera Smart City, ",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata({ params }) {
    const { slug } = params;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.in";

    const blogs = await getBlogDetail();
    const blog = blogs.find((b) => b.slug === slug);
    // console.log(blog);
    const title = blog?.seo_title || defaultMetadata.title;
    const description = blog?.seo_description || defaultMetadata.description;
    const keywords = blog?.seo_keywords || defaultMetadata.keywords;
    const ogImage = blog?.seo_image ? `${siteUrl}${blog.image}` : defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/blogs/${slug}`;

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
            type: "article",
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

export default async function BlogSlugPage({ params }) {
    const { slug } = params;

    const pageList = await getPageList();
    const blogs_types_list = await getBlogDetail();
    const recent_blog_init_data = await getBlogLatest();

    return (
        <Blog_detail
            slug={slug}
            pageList={pageList}
            blogs_types_list={blogs_types_list}
            recent_blog_init_data={recent_blog_init_data}
        />
    );
}

