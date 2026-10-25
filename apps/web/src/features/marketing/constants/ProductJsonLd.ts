import { site } from "@/shared/seo/site";

export const productJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/Nova.svg`,
      sameAs: ["https://github.com/Pachared/Nova-Cloud"],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "th-TH",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "th-TH",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#application` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}/#application`,
      name: site.name,
      url: site.url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};
