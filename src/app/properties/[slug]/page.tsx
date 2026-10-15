import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bath, BedDouble, MapPin, Mountain, Ruler, View } from "lucide-react";
import { getPropertyBySlug, properties, formatKes } from "@/lib/properties";
import { getAgent } from "@/lib/agents";
import { buildListingJsonLd } from "@/lib/jsonld";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { propertyWhatsappMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

/** `params` is read per-request for unknown slugs — blocking route opt-out. */
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — ${property.area}`,
    description: property.description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.image.src, width: property.image.width, height: property.image.height, alt: property.image.alt }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const specs = [
    property.beds !== null && { icon: BedDouble, label: `${property.beds} bedrooms` },
    property.baths !== null && { icon: Bath, label: `${property.baths} bathrooms` },
    {
      icon: property.type === "land" ? Mountain : Ruler,
      label:
        property.type === "land"
          ? `${(property.sizeSqm / 4047).toFixed(1)} acres`
          : `${property.sizeSqm} m²`,
    },
  ].filter(Boolean) as { icon: typeof Bath; label: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildListingJsonLd(property)) }}
      />

      <article className="bg-sand">
        {/* Hero image */}
        <div className="relative h-[52svh] min-h-[340px] w-full overflow-hidden bg-night">
          <Image
            src={property.image.src}
            alt={property.image.alt}
            width={property.image.width}
            height={property.image.height}
            placeholder="blur"
            blurDataURL={property.image.blurDataURL}
            priority
            sizes="100vw"
            className="size-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 sm:px-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-coral px-3 py-1 text-xs font-semibold text-night">
              {property.status === "for-rent"
                ? "For rent"
                : property.status === "just-listed"
                  ? "Just listed"
                  : "For sale"}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-white sm:text-5xl">
              {property.title}
            </h1>
            <p className="mt-2 inline-flex items-center gap-1.5 text-white/85">
              <MapPin aria-hidden className="size-4 text-sun" />
              {property.area}, Watamu
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-6">
              <p className="font-heading text-3xl font-semibold text-night">
                {formatKes(property.priceKes, property.isMonthly)}
              </p>
              {property.hasVirtualTour && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-lagoon/25 bg-lagoon/10 px-3 py-1 text-sm font-semibold text-lagoon">
                  <View aria-hidden className="size-4" />
                  360° tour available
                </span>
              )}
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-night/10 py-5">
              {specs.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-night/80">
                  <Icon aria-hidden className="size-5 text-lagoon" />
                  {label}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xl font-semibold text-night">About this property</h2>
            <p className="mt-3 leading-relaxed text-night/75">{property.description}</p>

            <h2 className="mt-8 text-xl font-semibold text-night">Features</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {property.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full border border-night/10 bg-white px-3.5 py-1.5 text-sm text-night/80"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <p className="mt-10">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 text-sm font-semibold text-lagoon underline underline-offset-4"
              >
                <ArrowLeft aria-hidden className="size-4" />
                Back to all properties
              </Link>
            </p>
          </div>

          {/* Sidebar: agent + CTAs */}
          <aside className="h-fit rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
            <p className="text-sm font-semibold tracking-wide text-lagoon uppercase">
              Enquire
            </p>
            <p className="mt-2 text-sm leading-relaxed text-night/70">
              Book a viewing or ask a question — an agent replies on WhatsApp
              the same day.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <WhatsAppButton
                message={propertyWhatsappMessage(property.title, property.area)}
                className="w-full"
              >
                Chat on WhatsApp
              </WhatsAppButton>
              <Link
                href={`/properties#enquire`}
                className="inline-flex items-center justify-center rounded-full bg-coral px-5 py-3 text-sm font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
              >
                Book a viewing
              </Link>
            </div>

            {agent && (
              <div className="mt-6 border-t border-night/10 pt-5">
                <p className="text-xs font-semibold tracking-wide text-night/50 uppercase">
                  Listing agent
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-lagoon to-lagoon-deep font-heading font-semibold text-white"
                  >
                    {agent.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-night">{agent.name}</p>
                    <p className="text-sm text-night/60">{agent.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-night/60">
                  {agent.languages.join(" · ")}
                  <br />
                  Covers {agent.areas.join(", ")}
                </p>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
}
