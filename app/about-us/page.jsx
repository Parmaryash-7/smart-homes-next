import AboutUs from "components/AboutUs";
import api from 'lib/api.interceptor';

const defaultMetadata = {
    title: "About SmartHomes Infrastructure | Leading Real Estate Developer in Dholera Smart City",
    description:
        "Learn more about SmartHomes Infrastructure, a leading real estate developer in Dholera Smart City, shaping smart urban development with sustainability, technology, and innovation.",
    keywords:
        "About SmartHomes, Dholera smart city developers, real estate visionaries, SmartHomes Infrastructure company, Dholera eco-friendly homes",
    image: "https://www.smarthomesinfra.com/assets/images/og-image.png", 
};

export async function generateMetadata() {
    const slug = "about-us";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.in";

    const pageList = await api.PageList();
    const page = pageList.find(p => p.slug === slug);
    // console.log(page);
    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/about-us`;

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

export default async function AboutUsPage() {
    const propertylist = await api.Propertylist();
    // console.log(propertylist);
    const pageList = await api.PageList();
    const aboutDetails = pageList.find((page) => page.slug === "about-us");

    return (
        <AboutUs
            propertyList={propertylist}
            aboutDetails={aboutDetails}
            pageList={pageList}
        />
    );
}
