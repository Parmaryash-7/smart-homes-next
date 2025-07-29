// import CompletedProjects from "components/CompletedProjects";

// // import api from 'lib/api.interceptor'
// import getPageList from "lib/PageList";
// import getCompletedPropertyList from "lib/CompletedPropertyList";

// export default async function CompletedProjectsPage() {


//     // const pageList = await api.PageList();
//     // const completedPropertylist = await api.CompletedPropertyList();
//     const pageList = await getPageList();
//     const completedPropertylist = await getCompletedPropertyList();

//     return (
//         <CompletedProjects
//             completedPropertylist={completedPropertylist}
//             pageList={pageList}
//         />
//     );
// }

export const dynamic = 'force-dynamic';
import CompletedProjects from "components/CompletedProjects";
import api from "lib/api.interceptor";
import getCompletedPropertyList from "lib/CompletedPropertyList";

const defaultMetadata = {
    title: "SmartHomes Infrastructure | Completed Projects in Dholera Smart City",
    description:
        "Discover SmartHomes Infrastructure's completed projects in Dholera Smart City. All projects are NA, NOC approved, and clear title properties—offering a safe and reliable investment for the future.",
    keywords:
        "completed projects Dholera, SmartHomes developments, Dholera smart city projects, real estate achievements, infrastructure progress",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "completed-projects";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/completed-projects`;

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

export default async function CompletedProjectsPage() {
    const pageList = await api.PageList();
    const completedPropertylist = await getCompletedPropertyList();
    // console.log(completedPropertylist);
    return (
        <CompletedProjects
            completedPropertylist={completedPropertylist}
            pageList={pageList}
        />
    );
}

