import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hey Mamdani",
  description:
    "12 recommendations for how civic technology could improve the everyday lives of New Yorkers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-brand-navy antialiased">
      <body className="flex min-h-full flex-col bg-brand-navy">{children}</body>
    </html>
  );
}
