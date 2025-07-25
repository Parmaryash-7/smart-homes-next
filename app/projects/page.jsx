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


import Projects from "components/Projects";
import getPageList from "lib/PageList";
import getPropertyList from "lib/PropertList";

const defaultMetadata = {
    title: "Projects | SmartHomes Infrastructure in Dholera Smart City",
    description:
        "Discover the innovative real estate projects by SmartHomes Infrastructure in Dholera Smart City. Browse through residential and commercial developments shaping the future.",
    keywords:
        "SmartHomes projects, Dholera Smart City real estate, property development Dholera, SmartHomes Infrastructure projects",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png",
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
