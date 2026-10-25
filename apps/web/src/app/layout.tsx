import "../index.css";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { canIndexSite, site } from "@/shared/seo/site";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
});

const googleSansThai = localFont({
  src: "./fonts/GoogleSans-Thai.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-google-sans-thai",
  declarations: [
    { prop: "unicode-range", value: "U+0E00-0E7F,U+200C-200D,U+25CC" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Nova Cloud",
  },
  icons: {
    icon: [{ url: "/Nova.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/Nova.svg",
  },
  description: site.description,
  applicationName: site.name,
  category: "technology",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: site.imageAlt,
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", alt: site.imageAlt }],
  },
  robots: {
    index: canIndexSite,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${roboto.variable} ${googleSansThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
