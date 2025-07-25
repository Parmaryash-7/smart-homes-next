import dynamic from 'next/dynamic';
import api from 'lib/api.interceptor';

const defaultMetadata = {
    title: "Plot Booking Form | Smart Homes Infrastructure",
    description:
        "Reserve your dream plot today with SmartHomes Infrastructure in Dholera Smart City. Experience affordable and futuristic living backed by trust and transparency.",
    keywords:
        "book plot Dholera, SmartHomes Infrastructure, plot reservation, Dholera real estate, smart city investment",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "book_plot"; 
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find(p => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/book-plot`;

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

const BookPlot = dynamic(() => import('components/BookPlot'), { ssr: false });

export default async function BookPlotPage({ searchParams }) {
    const propertylist = await api.Propertylist();
    const completedPropertylist = await api.CompletedPropertyList();

    return (
        <BookPlot
            propertylist={propertylist}
            completedPropertylist={completedPropertylist}
            searchParams={searchParams}
        />
    );
}
