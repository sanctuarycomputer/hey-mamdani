import type { Metadata, Viewport } from "next";
import "./globals.css";

import LetterModal from "./LetterModal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heymamdani.nyc";
const title = "Hey Mamdani!";
const description =
  "NOW is the time to reimagine our city's relationship with technology.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: title,
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
    images: [
      { url: "/share.jpg", width: 1200, height: 627, alt: title },
    ],
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
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2C3792",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-brand-navy antialiased">
      <body className="flex min-h-full flex-col bg-brand-navy">
        {children}
        <LetterModal />
      </body>
    </html>
  );
}
