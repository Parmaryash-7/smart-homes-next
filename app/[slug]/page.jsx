import Detail from "components/Detail";
import getPropertyList from "lib/PropertList";
import getPageList from "lib/PageList";
import { redirect } from "next/navigation";
import api from 'lib/api.interceptor'

export default async function ProjectDetailPage({ params }) {

    // const propertylist = await api.Propertylist()
    // const propertylist = await getPropertyList()
    const { slug } = params;

    // const pageList = await api.PageList();
    const pageList = await getPageList();

    // const projectData = propertylist.find((p) => p.slug === slug);
    // const projectData = propertylist.find((p) => p.slug.trim().toLowerCase() === slug.trim().toLowerCase());

    const projectData = await api.PropertyDetail(slug)
    // console.log(projectData, 'api');


    if (!projectData) {
        redirect('/');
    }
    

    return (
        <Detail
            projectDetail={projectData[0]}
            // propertylist={propertylist}
            pageList={pageList}
        />
    );
}

// import Detail from "components/Detail";
// import { redirect } from "next/navigation";
// import api from 'lib/api.interceptor';

// export async function generateMetadata({ params }) {
//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smarthomesinfra.in';
//     const { slug } = params;

//     const propertylist = await api.Propertylist();
//     const project = propertylist.find((p) => p.slug === slug);
    
//     if (!project) {
//         return {
//             title: 'SmartHomes Infrastructure | Project Not Found',
//             description: 'Explore our projects in Dholera Smart City.',
//             robots: { index: false, follow: false },
//         };
//     }

//     const metaImage = project.page_image || `${siteUrl}/assets/images/default-og-image.jpg`;

//     return {
//         title: project.page_title || project.name || 'SmartHomes Infrastructure',
//         description: project.page_description || 'Explore SmartHomes Infrastructure projects and initiatives.',
//         keywords: project.page_keywords || 'Dholera smart city, real estate, SmartHomes infrastructure',

//         metadataBase: new URL(siteUrl),

//         openGraph: {
//             title: project.page_title || project.name,
//             description: project.page_description || '',
//             url: `${siteUrl}/${slug}`,
//             type: 'website',
//             siteName: 'SmartHomes Infrastructure',
//             locale: 'en_US',
//             images: [
//                 {
//                     url: metaImage,
//                     width: 1200,
//                     height: 630,
//                     alt: project.page_title || 'SmartHomes OG Image',
//                 },
//             ],
//         },

//         twitter: {
//             card: 'summary_large_image',
//             title: project.page_title || project.name,
//             description: project.page_description || '',
//             images: [metaImage],
//             site: '@SmartHomesInfra',
//             creator: '@SmartHomesInfra',
//         },

//         robots: {
//             index: true,
//             follow: true,
//         },

//         authors: [{ name: 'SmartHomes Infrastructure Pvt. Ltd.' }],

//         alternates: {
//             canonical: `${siteUrl}/${slug}`,
//         },
//     };
// }

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
