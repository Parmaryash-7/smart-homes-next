export const dynamic = 'force-dynamic';
import Home from "components/Home";
import api from "lib/api.interceptor";
import getHomeDetail from "lib/HomeDetail";
import getPropertyList from 'lib/PropertList';
import getCompletedPropertyList from "lib/CompletedPropertyList";
import getPageList from "lib/PageList";
import getBlogDetail from "lib/BlogDetail";
import projectListJson from "../../data/projectList.json"
const defaultMetadata = {
    title: "SmartHomes Infrastructure | Leading Developer in Dholera Smart City",
    description:
        "Explore SmartHomes Infrastructure's innovative real estate projects in Dholera Smart City. Join us in building a smarter future with eco-friendly infrastructure and modern living solutions.",
    keywords:
        "SmartHomes Infrastructure, Dholera smart city, real estate developer, Dholera projects, sustainable real estate, smart city investment",
    image: "https://www.smarthomesinfra.com/images/og-image.png", 
};
export async function generateMetadata() {
    const slug = "home"; 
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";
    const page = await api.Propertylist(slug);
    const homeDetail = await api.HomeDetail();
    const title = homeDetail?.seo_title || defaultMetadata.title;
    const description = homeDetail?.seo_description || defaultMetadata.description;
    const keywords = homeDetail?.seo_keywords || defaultMetadata.keywords;
    const ogImage = homeDetail?.seo_image_full || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/`;
    // console.log(ogImage);
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
export default async function HomePage() {
    // const homeDetails = await api.HomeDetail();
    // const completedPropertylist = await api.CompletedPropertyList();
    // const pageList = await api.PageList();
    // const blogData = await api.BlogDetail();
    // const propertylist = await api.Propertylist();
    const homeDetails = await getHomeDetail();
    const completedPropertylist = await getCompletedPropertyList();
    const pageList = await getPageList();
    const blogData = await getBlogDetail();
    const propertylist = await getPropertyList();
    // console.log("IN HOME");
    // console.log(propertylist);
    // console.log("IN HOME");
    // console.log(projectListJson.list);
    return (
        <Home
            homeDetails={homeDetails}
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            pageList={pageList}
            blogData={blogData}
            projectListJson={projectListJson.list}
        />
    );
}
