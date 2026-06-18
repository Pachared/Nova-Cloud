import "../index.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nova - Deployment Platform",
    template: "%s | Nova",
  },
  description:
    "Nova is a deployment platform for GitHub workflows, CI automation, and deployment pipelines.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nova - Deployment Platform",
    description:
      "Build, automate, and deploy software with a modern deployment platform.",
    url: "/",
    siteName: "Nova",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nova deployment platform",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova - Deployment Platform",
    description:
      "Build, automate, and deploy software with a modern deployment platform.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
