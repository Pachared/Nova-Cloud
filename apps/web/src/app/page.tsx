import Home from "@/features/marketing/pages/Home";
import { productJsonLd } from "@/features/marketing/constants/ProductJsonLd";
import type { Metadata } from "next";
import { site } from "@/shared/seo/site";

export const metadata: Metadata = {
  alternates: { canonical: site.url },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
      <Home />
    </>
  );
}
