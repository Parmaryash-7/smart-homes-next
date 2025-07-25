import Bulk_Land from "components/Bulk_Land";
// import getBulkLand from "lib/BulkLand"; 
import api from "lib/api.interceptor";


export async function generateMetadata({ params }) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.smarthomesinfra.com';
    const { slug } = params;
    // const propertylistRunning = await api.Propertylist();
    // const completedPropertylist = await api.CompletedPropertyList();
    // const propertylist = [...propertylistRunning, ...completedPropertylist];
    // const project = propertylist.find((p) => p.slug === slug);
    // console.log(project);
    // if (!project) {
    //     return {
    //         title: 'Buy Bulk Land in Dholera',
    //         description: 'Buy Bulk Land in Dholera',
    //         robots: { index: false, follow: false },
    //     };
    // }
    const bulkLandList = await api.BulkLand();

    const metaImage = bulkLandList.page_image_full || `https://www.reecosys.com/api/image-tool/index.php?src=https://www.reecosys.com/assets/uploads/project/banner/banner_web_1741341763_72.jpg`;
    // console.log(metaImage, 'sdfjsdf')
    return {
        title: bulkLandList.page_title || bulkLandList.name || 'Buy Bulk Land in Dholera',
        description: bulkLandList.page_description || 'Buy Bulk Land in Dholera',
        keywords: bulkLandList.page_keywords || 'Buy Bulk Land in Dholera',
        metadataBase: new URL(siteUrl),
        openGraph: {
            title: bulkLandList.page_title || bulkLandList.name,
            description: bulkLandList.page_description || '',
            url: `${siteUrl}/${slug}`,
            type: 'website',
            siteName: 'SmartHomes Infrastructure',
            locale: 'en_US',
            images: [
                {
                    url: metaImage,
                    width: 1200,
                    height: 630,
                    alt: bulkLandList.page_title || 'SmartHomes OG Image',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: bulkLandList.page_title || bulkLandList.name,
            description: bulkLandList.page_description || '',
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
export default async function BulkLandPage() {
    // const bulkLandList = await getBulkLand();
    const bulkLandList = await api.BulkLand();

    return (
        <Bulk_Land projects_full_list_detail={bulkLandList[0]} />
    );
}
