/**
 * JSON-LD helpers for the /properties module.
 * Kept tiny on purpose — structured data is stringified inline in server
 * components, no runtime client JS involved.
 */

export function buildAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Watamu Hub",
    description:
      "Boutique coastal agency for villas, beachfront homes and land in Watamu, Kenya.",
    areaServed: "Watamu, Kilifi County, Kenya",
    telephone: "+254745043121",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Watamu",
      addressRegion: "Kilifi County",
      addressCountry: "KE",
    },
  };
}

/** Per-listing RealEstateListing for /properties/[slug] detail pages. */
export function buildListingJsonLd(property: {
  title: string;
  slug: string;
  description: string;
  image: { src: string; alt: string };
  priceKes: number;
  isMonthly: boolean;
  area: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    url: `/properties/${property.slug}`,
    description: property.description,
    image: property.image.src,
    datePosted: "2026-09-01",
    offers: {
      "@type": "Offer",
      price: property.priceKes,
      priceCurrency: "KES",
      ...(property.isMonthly ? { priceSpecification: "per month" } : {}),
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.area,
      addressRegion: "Kilifi County",
      addressCountry: "KE",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Properties", item: "/properties" },
        { "@type": "ListItem", position: 3, name: property.title },
      ],
    },
  };
}

export { buildAgencyJsonLd as buildEnquiryJsonLd };
