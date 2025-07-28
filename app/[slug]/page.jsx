import Detail from "components/Detail";
import getPropertyList from "lib/PropertList";
import getPageList from "lib/PageList";
import { redirect } from "next/navigation";
import api from 'lib/api.interceptor'
import { notFound } from "next/navigation";
import projectListJson from "../../data/projectList.json"
export default async function ProjectDetailPage({ params }) {
    // const propertylist = await api.Propertylist()
    // const propertylist = await getPropertyList()
    const { slug } = params;
    // const pageList = await api.PageList();
    const pageList = await getPageList();
    let projectData;
    try {
        projectData = await api.PropertyDetail(slug);
    } catch (error) {
        console.error("Error fetching project detail:", error);
        notFound();
    }
    if (!projectData || !projectData[0]) {
        notFound();
    }
    // console.log(projectListJson.list, "list");
    // console.log(projectData[0], "data");
    // console.log(pageList, "page list");
    return (
        <Detail
            projectListJson={projectListJson.list}
            projectDetail={projectData[0]}
            // propertylist={propertylist}
            pageList={pageList}
        />
    );
}
// import Detail from "components/Detail";
// import { redirect } from "next/navigation";
// import api from 'lib/api.interceptor';
export async function generateMetadata({ params }) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smarthomesinfra.com';
    const { slug } = params;
    const propertylistRunning = await api.Propertylist();
    const completedPropertylist = await api.CompletedPropertyList();
    const propertylist = [...propertylistRunning, ...completedPropertylist];
    const project = propertylist.find((p) => p.slug === slug);
    // console.log(project);
    if (!project) {
        return {
            title: 'SmartHomes Infrastructure | Project Not Found',
            description: 'Explore our projects in Dholera Smart City.',
            robots: { index: false, follow: false },
        };
    }
    const metaImage = project.page_image_full || `${siteUrl}/images/og-image.png`;
    // console.log(metaImage)
    return {
        title: project.page_title || project.name || 'SmartHomes Infrastructure',
        description: project.page_description || 'Explore SmartHomes Infrastructure projects and initiatives.',
        keywords: project.page_keywords || 'Dholera smart city, real estate, SmartHomes infrastructure',
        metadataBase: new URL(siteUrl),
        openGraph: {
            title: project.page_title || project.name,
            description: project.page_description || '',
            url: `${siteUrl}/${slug}`,
            type: 'website',
            siteName: 'SmartHomes Infrastructure',
            locale: 'en_US',
            images: [
                {
                    url: metaImage,
                    width: 1200,
                    height: 630,
                    alt: project.page_title || 'SmartHomes OG Image',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.page_title || project.name,
            description: project.page_description || '',
            images: [metaImage],
            site: '@SmartHomesInfra',
            creator: '@SmartHomesInfra',
        },
        robots: {
            index: true,
            follow: true,
        },
        authors: [{ name: 'SmartHomes Infrastructure Pvt. Ltd.' }],
        alternates: {
            canonical: `${siteUrl}/${slug}`,
        },
    };
}
// export default async function ProjectDetailPage({ params }) {
//     const { slug } = params;
//     const propertylist = await api.Propertylist();
//     const pageList = await api.PageList();
//     const projectData = propertylist.find((p) => p.slug === slug);
//     if (!projectData) {
//         redirect('/');
//     }
//     return (
//         <Detail
//             projectDetail={projectData}
//             propertylist={propertylist}
//             pageList={pageList}
//         />
//     );
// }
