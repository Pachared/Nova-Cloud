import Home from "@/features/marketing/pages/Home";
import { productJsonLd } from "@/features/marketing/constants/ProductJsonLd";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Home />
    </>
  );
}
