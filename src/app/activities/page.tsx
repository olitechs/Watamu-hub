import type { Metadata } from "next";
export const instant = false;
import Link from "next/link";
import { ActivityCard } from "@/components/activities/activity-card";
import { ActivityFilterTabs } from "@/components/activities/activity-filter-tabs";
import { HeroZoom } from "@/components/activities/hero-zoom";
import { activities, filterByArea } from "@/lib/activities";

const ACTIVITIES_OG_IMAGE = {
  url: "/images/activities/marine-park-snorkelling/1.jpg",
  width: 1200,
  height: 900,
  alt: "Snorkeller over coral in clear shallow water",
};

export const metadata: Metadata = {
  title: "Things to do in Watamu, Malindi and Marafa",
  description:
    "Handpicked things to do along the Kenyan coast: snorkelling, dhow cruises, bird walks, the Gedi Ruins, the Marafa stone hills and Malindi's night market. Ask on WhatsApp for details.",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "Things to do in Watamu, Malindi and Marafa — Watamu Hub",
    description: "Handpicked things to do along the Kenyan coast. Ask on WhatsApp for details.",
    url: "/activities",
    images: [ACTIVITIES_OG_IMAGE],
  },
};

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const params = await searchParams;
  const area = params.area ?? "";
  const filtered = filterByArea(activities, area as "watamu" | "malindi" | "marafa" | "");

  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate flex min-h-[55svh] flex-col justify-end overflow-hidden bg-night">
        <HeroZoom />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/80 via-night/45 to-night/95" />
        <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-14 sm:px-6 sm:pb-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">Things to do</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            Watamu, Malindi and Marafa
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Snorkel the marine park, sail a dhow at sunset, walk the mangroves of Mida Creek, explore the Gedi Ruins and the Marafa stone hills — ask on WhatsApp for the details.
          </p>
        </div>
      </section>

      {/* Area filter + grid */}
      <section className="bg-sand px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <ActivityFilterTabs current={area} />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((activity, i) => (
              <ActivityCard key={activity.slug} activity={activity} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Cross-link into properties */}
      <section className="on-dark relative isolate overflow-hidden bg-night px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
            Stay for the season — not just the weekend
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/75">
            Browse villas, beachfront homes and land plots so you&apos;re never far from the water.
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
        Activity photography: Wikimedia Commons and placeholder images marked in the page. Replace placeholders with your own photos when you have them.
      </p>
    </>
  );
}
