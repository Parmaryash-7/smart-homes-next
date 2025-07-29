export const dynamic = 'force-dynamic';
import React from 'react'
import SiteMap from 'components/SiteMap'
import api from "lib/api.interceptor";

const defaultMetadata = {
  title: "SmartHomes Infrastructure | Sitemap",
  description:
    "Smart Homes Infrastructure Sitemap",
  keywords:
    "Smart Homes Infrastructure Sitemap",
  image: "https://www.smarthomesinfra.com/images/og-image.png",
};

export async function generateMetadata() {
  const slug = "sitemap";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.smarthomesinfra.com";

  const pageList = await api.PageList();
  const page = pageList.find((p) => p.slug === slug);

  const title = page?.seo_title || defaultMetadata.title;
  const description = page?.seo_description || defaultMetadata.description;
  const keywords = page?.seo_keywords || defaultMetadata.keywords;
  const ogImage = page?.seo_image || defaultMetadata.image;
  const canonicalUrl = `${siteUrl}/sitemap`;

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

export default function SitemapPage() {
  return <SiteMap />
}
