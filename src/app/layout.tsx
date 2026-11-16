import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "toko buku",
    "abook store",
    "toko buku bogor timur",
    "toko buku cileungsi",
    "toko buku jonggol",
    "buku murah berkualitas",
    "novel fiksi",
    "buku self improvement",
    "buku edukasi",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero-store.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Toko Buku Bogor Timur`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-paper-canvas text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}

