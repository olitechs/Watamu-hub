import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles, Sun } from "lucide-react";
import {
  activities,
  activityCategories,
  activityCategoryLabels,
  activityWhatsappMessage,
  filterActivities,
  formatActivityPrice,
  type Activity,
} from "@/lib/activities";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";

export const metadata: Metadata = {
  title: "Watamu activities — snorkelling, dhows, forests & Swahili history",
  description:
    "Handpicked things to do in Watamu, Kenya: Marine Park snorkelling, dhow sunset cruises, deep-sea fishing, kitesurfing, Mida Creek bird walks and the Gedi Ruins. Book on WhatsApp.",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "Watamu activities — sea, nature & culture",
    description:
      "Handpicked things to do in Watamu, Kenya. Book any activity on WhatsApp.",
    url: "/activities",
    images: [
      {
        url: "/images/activities/act-hero.jpg",
        width: 1400,
        height: 1050,
        alt: "White sand and turquoise water on the Watamu coastline",
      },
    ],
  },
};

/** Blocking route opt-out: `searchParams` drives the category filter. */
export const instant = false;

interface SearchParams {
  category?: string;
}

const categoryColors: Record<Activity["category"], string> = {
  sea: "bg-lagoon/12 text-lagoon",
  nature: "bg-mangrove/12 text-mangrove",
  culture: "bg-sun/20 text-night",
};

/**
 * Tourist activities page. Server-rendered; the only client interactivity is
 * the WhatsApp booking links. Category filter is server-side via ?category=,
 * so filtered views are shareable and there's no client state to manage.
 */
export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const matches = filterActivities(activities, params);
  const activeCategory = params.category ?? "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Things to do in Watamu",
            itemListElement: activities.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "TouristTrip",
                name: a.title,
                description: a.description,
                touristType: "Coastal travellers",
                offers: {
                  "@type": "Offer",
                  price: a.priceFromKes,
                  priceCurrency: "KES",
                  priceSpecification: a.priceNote,
                },
                itinerary: {
                  "@type": "ItemList",
                  itemListElement: {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "Place",
                      name: a.location,
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: "Watamu",
                        addressRegion: "Kilifi County",
                        addressCountry: "KE",
                      },
                    },
                  },
                },
              },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="on-dark relative isolate flex min-h-[60svh] flex-col justify-end overflow-hidden bg-night">
        <Image
          src="/images/activities/act-hero.jpg"
          alt="White sand and turquoise water on the Watamu coastline"
          width={1400}
          height={1050}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/45 to-night/95"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-14 sm:px-6 sm:pb-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Things to do
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            Watamu beyond the beach
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Snorkel the Marine Park, sail a dhow at sunset, walk the mangroves
            of Mida Creek — booked in one WhatsApp message.
          </p>
        </div>
      </section>

      {/* Category filter + activity grid */}
      <section className="bg-sand px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Filter activities">
            <ul className="flex flex-wrap gap-2">
              {activityCategories.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <li key={cat.value}>
                    <Link
                      href={cat.value ? `/activities?category=${cat.value}` : "/activities"}
                      aria-current={isActive ? "page" : undefined}
                      className={
                        isActive
                          ? "rounded-full bg-night px-4 py-2 text-sm font-semibold text-white"
                          : "rounded-full border border-night/15 bg-white px-4 py-2 text-sm font-medium text-night/80 transition-colors hover:border-lagoon/40 hover:text-night"
                      }
                    >
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <p className="mt-6 text-sm text-night/60" role="status">
            {matches.length} {matches.length === 1 ? "activity" : "activities"}
            {activeCategory ? ` in “${activityCategoryLabels[activeCategory as Activity["category"]]}”` : ""}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map((activity, i) => (
              <Reveal key={activity.id} delay={(i % 3) * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-night/8 bg-white shadow-[0_8px_30px_rgb(11_42_60/0.06)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgb(11_42_60/0.12)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={activity.image.src}
                      alt={activity.image.alt}
                      width={activity.image.width}
                      height={activity.image.height}
                      placeholder="blur"
                      blurDataURL={activity.image.blurDataURL}
                      priority={i < 3}
                      loading={i < 3 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[activity.category]}`}
                    >
                      {activityCategoryLabels[activity.category]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg leading-snug font-semibold text-night">
                      {activity.title}
                    </h2>

                    <ul className="mt-2 space-y-1 text-sm text-night/70">
                      <li className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden className="size-4 text-lagoon" />
                        {activity.location}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden className="size-4 text-lagoon" />
                        {activity.duration}
                      </li>
                      <li className="inline-flex items-center gap-1.5">
                        <Sun aria-hidden className="size-4 text-lagoon" />
                        {activity.bestTime}
                      </li>
                    </ul>

                    <p className="mt-3 text-sm leading-relaxed text-night/70">
                      {activity.description}
                    </p>

                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {activity.highlights.map((h) => (
                        <li
                          key={h}
                          className="inline-flex items-center gap-1 rounded-full border border-night/10 bg-sand/70 px-2.5 py-0.5 text-xs text-night/70"
                        >
                          <Sparkles aria-hidden className="size-3 text-sun" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-auto pt-4 font-heading text-lg font-semibold text-night">
                      {formatActivityPrice(activity)}
                    </p>

                    <div className="mt-3">
                      <WhatsAppButton
                        message={activityWhatsappMessage(activity)}
                        className="w-full"
                      >
                        Book on WhatsApp
                      </WhatsAppButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link into properties */}
      <section className="on-dark relative isolate overflow-hidden bg-night px-4 py-16 sm:px-6 sm:py-20">
        <Image
          src="/images/properties/reef-aerial.jpg"
          alt="Aerial view of the turquoise reef off the Watamu coast"
          width={1400}
          height={932}
          loading="lazy"
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/40"
        />
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
          Stay for the season — not just the weekend
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/75">
            Browse villas, beachfront homes and land plots so you&apos;re never
            far from the water.
          </p>
          <Link
            href="/properties"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5"
          >
            View properties
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <p className="bg-sand px-4 pb-16 text-center text-xs leading-relaxed text-night/50 sm:px-6">
        Activity photography: Wikimedia Commons — “Watamu Beach, Kenya” by
        Jenny Kellett (CC BY-SA 4.0), “Watamu beach Kenya Sunset” by IBM2024
        (CC BY 4.0), “Watamu Mida Creek 9” and “Gede Gedi Ruins 01” by
        ordercrazy (CC0), “Watamu (DSC02033)” by Nina R (CC BY 2.0). Prices are
        indicative and confirmed on WhatsApp.
      </p>
    </>
  );
}
