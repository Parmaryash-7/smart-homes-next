// import ContactUs from "components/ContactUs";
// import api from "lib/api.interceptor";
// // import getPageList from "lib/PageList";
// import getContactDetails from "lib/ContactDetail";

// export default async function ContactUsPage() {
//     // const pageList = await getPageList();
//     const pageList = await api.PageList();
//     const contactDetails = await api.ContactFData();

//     // const contactDetails = await getContactDetails();

//     return (
//         <ContactUs
//             pageList={pageList}
//             contactDetails={contactDetails}
//         />
//     );
// }

export const dynamic = 'force-dynamic';
import ContactUs from "components/ContactUs";
import api from "lib/api.interceptor";

const defaultMetadata = {
    title: "Contact SmartHomes Infrastructure | Get in Touch for Dholera Smart City Investments",
    description:
        "Connect with SmartHomes Infrastructure for expert guidance on investing in Dholera Smart City. Reach out for inquiries on residential, commercial, and industrial properties. Let’s build your future today!",
    keywords:
        "Dholera Smart City, Residential properties in Dholera, Commercial properties in Dholera, Industrial properties in Dholera",
    image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
    const slug = "contact-us";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

    const pageList = await api.PageList();
    const page = pageList.find((p) => p.slug === slug);

    const title = page?.seo_title || defaultMetadata.title;
    const description = page?.seo_description || defaultMetadata.description;
    const keywords = page?.seo_keywords || defaultMetadata.keywords;
    const ogImage = page?.seo_image || defaultMetadata.image;
    const canonicalUrl = `${siteUrl}/contact-us`;

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

export default async function ContactUsPage() {
    const pageList = await api.PageList();
    const contactDetails = await api.ContactFData();
    // console.log(contactDetails)

    return (
        <ContactUs
            pageList={pageList}
            contactDetails={contactDetails}
        />
    );
}
