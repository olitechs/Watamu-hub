import type { Metadata } from "next";
import Link from "next/link";
import { VideoHero } from "@/components/properties/video-hero";
import { FeaturedListings } from "@/components/properties/featured-listings";
import { VirtualTourPreview } from "@/components/properties/virtual-tour";
import { TrustSection } from "@/components/properties/trust-section";
import { AgentsSection } from "@/components/properties/agents-section";
import { EnquiryForm } from "@/components/properties/enquiry-form";
import { properties, filterProperties, type Property } from "@/lib/properties";
import { buildEnquiryJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Properties in Watamu — villas, beachfront homes & land",
  description:
    "Verified villas, beachfront homes and land plots for sale and rent in Watamu, Kenya. Browse featured listings, take a virtual tour and book a viewing with a local agent.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Properties in Watamu — villas, beachfront homes & land",
    description:
      "Verified villas, beachfront homes and land plots for sale and rent in Watamu, Kenya.",
    url: "/properties",
    images: [
      {
        url: "/images/hero-poster.jpg",
        width: 1600,
        height: 900,
        alt: "Turquoise water on the Watamu coastline",
      },
    ],
  },
};

interface SearchParams {
  area?: string;
  type?: string;
  budget?: string;
}

/**
 * This route filters listings from `searchParams` (?area=…&type=…&budget=…),
 * so it renders per-request instead of being prerendered. That's the
 * "blocking route" opt-out Next.js prescribes for search-driven pages.
 */
export const instant = false;

/**
 * The real-estate landing page. Server component by default; only the hero
 * video, the tour modal and the enquiry form hydrate on the client.
 *
 * Search-bar filters come from the query string so results are linkable and
 * shareable (`/properties?area=Turtle+Bay&type=villa`).
 */
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const matches = filterProperties(properties, params);
  const hasFilters = Boolean(params.area || params.type || params.budget);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEnquiryJsonLd()) }}
      />

      <VideoHero />

      <FeaturedListings
        properties={matches}
        hasFilters={hasFilters}
        activeArea={params.area}
        activeType={params.type}
        activeBudget={params.budget}
      />

      <VirtualTourPreview />

      <TrustSection />

      <AgentsSection />

      {/* Contact / booking */}
      <section id="enquire" className="scroll-mt-24 bg-sand px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-lagoon uppercase">
            Book a viewing
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-night sm:text-4xl">
            Tell us what you&apos;re looking for
          </h2>
          <p className="mt-3 max-w-xl text-night/70">
            Send an enquiry and an agent replies on WhatsApp the same day. Prefer chat?
            Tap any WhatsApp button on this page — your message comes prefilled.
          </p>
          <div className="mt-10">
            <EnquiryForm properties={properties as Property[]} />
          </div>
        </div>
      </section>

      {/* JSON-LD: one RealEstateListing per property (ItemList on the page) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Watamu Hub featured properties",
            itemListElement: properties.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "RealEstateListing",
                name: p.title,
                url: `/properties/${p.slug}`,
                description: p.description,
                image: p.image.src,
                datePosted: "2026-09-01",
                offers: {
                  "@type": "Offer",
                  price: p.priceKes,
                  priceCurrency: "KES",
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: p.area,
                  addressRegion: "Kilifi County",
                  addressCountry: "KE",
                },
              },
            })),
          }),
        }}
      />

      <p className="bg-sand px-4 pb-16 text-center text-sm text-night/60 sm:px-6">
        Looking for something specific?{" "}
        <Link href="/properties#enquire" className="font-semibold text-lagoon underline underline-offset-4">
          Ask an agent
        </Link>{" "}
        — we check the market daily.
      </p>
    </>
  );
}
