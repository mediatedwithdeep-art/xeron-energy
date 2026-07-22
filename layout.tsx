import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import SpaceBackground from "@/components/ui/SpaceBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import JsonLd from "@/components/seo/JsonLd";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Solar EPC in Gujarat`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "solar EPC Gujarat",
    "rooftop solar Rajkot",
    "commercial solar",
    "industrial solar plant",
    "PM Surya Ghar subsidy",
    "solar installation India",
    "Xeron Energy",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Premium Solar EPC in Gujarat`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium Solar EPC`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: site.url },
  category: "Renewable Energy",
  icons: {
    icon: [{ url: "/brand/icon-128.png", type: "image/png" }],
    apple: [{ url: "/brand/icon-128.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd />
        <SpaceBackground />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
