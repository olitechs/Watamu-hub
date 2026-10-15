import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MapPin, Mountain, Ruler, View } from "lucide-react";
import { SaveButton } from "./save-button";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { formatKes, type Property } from "@/lib/properties";
import { propertyWhatsappMessage } from "@/lib/whatsapp";

const statusStyles: Record<Property["status"], { label: string; className: string }> = {
  "for-sale": {
    label: "For sale",
    className: "bg-lagoon text-white",
  },
  "for-rent": {
    label: "For rent",
    className: "bg-sun text-night",
  },
  "just-listed": {
    label: "Just listed",
    className: "bg-coral text-night",
  },
};

/**
 * Glassmorphism property card.
 *
 * Frosted panel (backdrop-blur-xl, white/12→white/20 tints, 1px white/25
 * border, soft shadow, rounded-2xl, inner highlight) sitting on the night
 * gradient of the listings band — that dark backdrop is what keeps white
 * text at WCAG AA over the blur. Browsers without backdrop-filter fall back
 * to a solid night tint (see .glass in globals.css).
 */
export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const status = statusStyles[property.status];
  const specs = [
    property.beds !== null && { icon: BedDouble, label: `${property.beds} bed` },
    property.baths !== null && { icon: Bath, label: `${property.baths} bath` },
    {
      icon: property.type === "land" ? Mountain : Ruler,
      label:
        property.type === "land"
          ? `${(property.sizeSqm / 4047).toFixed(1)} acres`
          : `${property.sizeSqm} m²`,
    },
  ].filter(Boolean) as { icon: typeof Bath; label: string }[];

  return (
    <article className="glass group relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image.src}
          alt={property.image.alt}
          width={property.image.width}
          height={property.image.height}
          placeholder="blur"
          blurDataURL={property.image.blurDataURL}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Tint keeps badges readable on any photo */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night/70 to-transparent"
        />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${status.className}`}
          >
            {status.label}
          </span>
          {property.hasVirtualTour && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-night/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              <View aria-hidden className="size-3.5" />
              360 tour
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <SaveButton propertyId={property.id} title={property.title} />
        </div>

        <p className="absolute right-3 bottom-3 left-3">
          <span className="glass-strong inline-block rounded-xl px-3 py-1.5 font-heading text-lg font-semibold text-white">
            {formatKes(property.priceKes, property.isMonthly)}
          </span>
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg leading-snug font-semibold text-white">
          <Link
            href={`/properties/${property.slug}`}
            className="rounded-md transition-colors hover:text-sun after:absolute after:inset-0 after:content-['']"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-white/75">
          <MapPin aria-hidden className="size-4 text-sun" />
          {property.area}, Watamu
        </p>

        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
          {specs.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-1.5">
              <Icon aria-hidden className="size-4 text-white/60" />
              {label}
            </li>
          ))}
        </ul>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {property.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs text-white/85"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Actions sit above the stretched card link */}
        <div className="relative z-10 mt-5 flex items-center gap-2 pt-1">
          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            View details
          </Link>
          <WhatsAppButton
            size="sm"
            message={propertyWhatsappMessage(property.title, property.area)}
            className="px-3"
          >
            <span className="sr-only sm:not-sr-only">WhatsApp</span>
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
