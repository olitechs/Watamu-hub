import Image from "next/image";
import Link from "next/link";
import { Anchor, BarChart3, Bus, CheckCircle2, Fish, Search, Sailboat } from "lucide-react";
import { Reveal } from "@/components/reveal";

const modules = [
  {
    href: "/activities",
    icon: Sailboat,
    title: "Activities",
    body: "Snorkelling, dhow cruises, bird walks and Swahili history — booked on WhatsApp.",
    live: true,
    accent: "bg-sun text-night",
  },
  {
    href: "/properties",
    icon: Search,
    title: "Properties",
    body: "Verified villas, beachfront homes and land in Watamu — with virtual tours and local agents.",
    live: true,
    accent: "bg-coral text-night",
  },
  {
    href: "/villas",
    icon: Anchor,
    title: "Villa Sync",
    body: "One live calendar merging Airbnb, Booking.com and manual bookings for villa owners.",
    live: true,
    accent: "bg-lagoon text-white",
  },
  {
    href: "/villas",
    icon: Anchor,
    title: "Villa Sync",
    body: "One live calendar merging Airbnb, Booking.com and manual bookings for villa owners.",
    live: true,
    accent: "bg-lagoon text-white",
  },
  {
    href: "#",
    icon: CheckCircle2,
    title: "Fundi Finder",
    body: "Plumbers, electricians and cleaners who actually show up.",
    live: false,
    accent: "bg-sun text-night",
  },
  {
    href: "#",
    icon: BarChart3,
    title: "Status Board",
    body: "Water, power and gas updates for Watamu, in one place.",
    live: false,
    accent: "bg-lagoon-soft text-night",
  },
  {
    href: "#",
    icon: Bus,
    title: "Transport Guide",
    body: "Fair, fixed prices for tuk-tuks, bodas and boat trips.",
    live: false,
    accent: "bg-lagoon-soft text-night",
  },
  {
    href: "#",
    icon: Fish,
    title: "Catch Board",
    body: "Today's fresh fish and market prices, auto-refreshed daily.",
    live: false,
    accent: "bg-sun text-night",
  },
];

/**
 * Watamu Hub home page. Kept intentionally lean: brand hero, the module
 * grid (Properties and Villa Sync are live), and a featured strip that
 * routes into /properties.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-night">
        <Image
          src="/images/properties/reef-aerial.jpg"
          alt="Aerial view of the turquoise reef and shallows off the Watamu coast"
          width={1400}
          height={932}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/50 to-night/95"
        />
        <div className="mx-auto max-w-6xl px-4 pt-36 pb-20 sm:px-6 sm:pt-44 sm:pb-28">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Watamu, sorted.
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            One hub for life on the Kenyan coast
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            From finding a villa to booking a boat trip — WhatsApp-first tools
            built for residents, owners and visitors of Watamu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
            >
              Explore properties
            </Link>
            <Link
              href="/villas"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              Villa owners → Villa Sync
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-sand px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold text-night sm:text-4xl">
              Everything Watamu, in one calm place
            </h2>
            <p className="mt-3 max-w-xl text-night/70">
              Six tools, each built to run itself. Three are live today.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => (
              <Reveal key={mod.title} delay={(i % 3) * 100}>
                {mod.live ? (
                  <Link
                    href={mod.href}
                    className="group flex h-full flex-col rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-lagoon/30 hover:shadow-[0_16px_48px_rgb(11_42_60/0.12)]"
                  >
                    <ModuleBody mod={mod} />
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-lagoon">
                      Open
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-2xl border border-night/8 bg-white/60 p-6">
                    <ModuleBody mod={mod} />
                    <span className="mt-5 inline-flex w-fit rounded-full bg-night/6 px-3 py-1 text-xs font-semibold text-night/50">
                      Coming soon
                    </span>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Properties teaser */}
      <section className="on-dark relative isolate overflow-hidden bg-night px-4 py-20 sm:px-6 sm:py-24">
        <Image
          src="/images/properties/watamu-beach.jpg"
          alt="Dhow boat on the clear water off Watamu Beach"
          width={1400}
          height={788}
          loading="lazy"
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/40" />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
              Now live
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Find your place on the Watamu coast
            </h2>
            <p className="mt-4 max-w-lg text-white/80">
              Verified villas, beachfront homes and land plots — with a cinematic
              look at the coastline, 360° tours, and agents who live here.
            </p>
            <Link
              href="/properties"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
            >
              View properties
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ModuleBody({
  mod,
}: {
  mod: { icon: typeof Anchor; title: string; body: string; accent: string };
}) {
  return (
    <>
      <span className={`inline-flex size-11 items-center justify-center rounded-xl ${mod.accent}`}>
        <mod.icon aria-hidden className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-night">{mod.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-night/70">{mod.body}</p>
    </>
  );
}
