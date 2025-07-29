// import React from 'react'
// import ThankYou from 'components/ThankYou'

// export default function ThankYouPage() {
//   return <ThankYou pageName="your inquiry" />
// }

export const dynamic = 'force-dynamic';
import React from 'react'
import ThankYou from 'components/ThankYou'
import api from 'lib/api.interceptor'
import getPropertyList from 'lib/PropertList';

import { redirect } from 'next/navigation'



const defaultMetadata = {
  title: "Thank You",
  description:
    "Thank You",
  keywords:
    "Thank You",
  image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
  const slug = "Thankyou";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

  const page = await api.Propertylist(slug);

  const title = page?.seo_title || defaultMetadata.title;
  const description = page?.seo_description || defaultMetadata.description;
  const keywords = page?.seo_keywords || defaultMetadata.keywords;
  const ogImage = page?.seo_image || defaultMetadata.image;
  const canonicalUrl = `${siteUrl}/`;

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

export default async function ThankYouPage({ params }) {
  const { slug } = params

  try {
    const res = await api.PropertyDetail(slug)

    if (res.success == 0) {
      redirect('/')
    }
  } catch (error) {
    console.error('Error fetching project:', error)
  }

  return <ThankYou />
}
