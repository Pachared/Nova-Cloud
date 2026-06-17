import Home from "@/features/marketing/pages/Home.jsx";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Nova",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Nova is a deployment platform for GitHub workflows, CI automation, and deployment pipelines.",
};

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
