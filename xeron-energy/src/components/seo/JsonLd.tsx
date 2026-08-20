import { site, services, faqs, projects } from "@/lib/site";

/**
 * Structured data for Google.
 *
 * Rules that keep this valid in Search Console:
 *  - Never emit a rating, review or aggregateRating. Self-issued review markup
 *    is a manual-action offence, and there are no third-party reviews to cite.
 *  - `sameAs` lists only social profiles that exist; empty entries are dropped.
 *  - `foundingDate` is omitted because Xeron is newly incorporated — the 18
 *    years belongs to the founders' careers, not the company.
 */
export default function JsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const ogImage = `${site.url}/opengraph-image`;

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/icon-128.png`,
    image: ogImage,
    telephone: site.phone,
    description: site.description,
    areaServed: { "@type": "State", name: "Gujarat, India" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ElectricalContractor",
    "@id": `${site.url}/#business`,
    name: site.name,
    image: ogImage,
    logo: `${site.url}/brand/icon-128.png`,
    url: site.url,
    telephone: site.phone,
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    parentOrganization: { "@id": `${site.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "State", name: "Gujarat, India" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.hours.days,
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar EPC services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${site.url}/services`,
          areaServed: { "@type": "State", name: "Gujarat, India" },
        },
      })),
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#organization` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Only published once there is a real, commissioned portfolio to point at.
  const portfolio =
    projects.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${site.name} solar installations`,
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Project",
              name: p.title,
              location: p.location,
              description: `${p.capacity} ${p.category.toLowerCase()} solar installation in ${p.location}.`,
            },
          })),
        }
      : null;

  const graphs = [org, localBusiness, website, faqSchema, portfolio].filter(Boolean);

  return (
    <>
      {graphs.map((g, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(g) }}
        />
      ))}
    </>
  );
}
