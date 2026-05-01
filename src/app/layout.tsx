import type { Metadata, Viewport } from "next";
import "./globals.css";

import partnersData from "@/data/partners.json";
import LetterModal from "./LetterModal";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.heymamdani.nyc";
const title = "Hey Mamdani!";
const description =
  "NOW is the time to reimagine our city's relationship with technology.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Hey Mamdani!",
  },
  description,
  applicationName: title,
  keywords: [
    "Hey Mamdani",
    "Zohran Mamdani",
    "NYC civic technology",
    "civic tech",
    "Open Assembly",
    "311",
    "OMNY",
    "NYCHA",
    "MyCity",
    "broadband",
    "public internet",
  ],
  authors: [{ name: "Garden3D", url: "https://garden3d.net" }],
  creator: "Garden3D",
  publisher: title,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: { url: "/favicon.png", type: "image/png" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: title,
    locale: "en_US",
    images: [{ url: "/share.jpg", width: 1200, height: 627, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/share.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  category: "civic technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2C3792",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: title,
      description,
      inLanguage: "en-US",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: title,
      alternateName: "Hey Mamdani",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.png`,
        width: 100,
        height: 100,
      },
      email: "hello@heymamdani.nyc",
      description,
      knowsAbout: [
        "Civic technology",
        "311",
        "OMNY",
        "NYCHA",
        "Public broadband",
        "Open government",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: title,
      description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/share.jpg`,
        width: 1200,
        height: 627,
      },
    },
    {
      "@type": "Event",
      name: "Open Assembly: A Prompt Towards Civic Engagement",
      startDate: "2026-03-10",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Index Greenpoint",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Brooklyn",
          addressRegion: "NY",
          addressCountry: "US",
        },
      },
      organizer: partnersData.partners.map((p) => ({
        "@type": "Organization",
        name: p.name,
        url: p.url,
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-brand-navy antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-brand-navy">
        {children}
        <LetterModal />
      </body>
    </html>
  );
}
