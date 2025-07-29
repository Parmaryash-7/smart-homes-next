// import Projects from "components/Projects";
// // import api from "lib/api.interceptor";
// import getPageList from "lib/PageList";
// import getPropertyList from "lib/PropertList";

// export default async function ProjectsPage() {
//     const pageList = await getPageList();
//     const propertylist = await getPropertyList();
//     // const pageList = await api.PageList();
//     // const propertylist = await api.Propertylist();

//     return (
//         <Projects
//             propertylist={propertylist}
//             pageList={pageList}
//         />
//     );
// }

export const dynamic = 'force-dynamic';
import Projects from "components/Projects";
import getPageList from "lib/PageList";
import getPropertyList from "lib/PropertList";

const defaultMetadata = {
    title: "SmartHomes Infrastructure Projects | Premium Properties in Dholera Smart City",
    description:
        "Explore premium residential, commercial, and industrial projects by SmartHomes Infrastructure in Dholera Smart City. Discover legally clear, NA/NOC-approved, RERA-registered properties for secure investments.",
    keywords:
        "RERA-Registered Properties, NA/NOC Clear Title Properties, Premium Residential Projects, Commercial Projects, Industrial Projects",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "projects";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await getPageList();
    // console.log(pageList);
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/projects`;

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

export default async function ProjectsPage() {
    const pageList = await getPageList();
    const propertylist = await getPropertyList();

    return (
        <Projects
            propertylist={propertylist}
            pageList={pageList}
        />
    );
}
