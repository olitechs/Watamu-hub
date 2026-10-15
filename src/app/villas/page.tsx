import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Layers, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Villa Sync — one live calendar for your Watamu villa",
  description:
    "Merge Airbnb, Booking.com and manual bookings into one calendar for your Watamu villa. Part of Watamu Hub.",
};

const features = [
  {
    icon: Layers,
    title: "One merged calendar",
    body: "Airbnb, Booking.com and manual entries side by side — no more double bookings.",
  },
  {
    icon: CalendarDays,
    title: "Owner dashboard",
    body: "Block dates, add direct guests, and see occupancy at a glance.",
  },
  {
    icon: Sparkles,
    title: "Self-running",
    body: "iCal syncs update automatically; nothing to babysit.",
  },
];

/**
 * Villa Sync module page. The module itself is a stub in this build — the
 * page exists to route villa owners and link into the live /properties
 * experience.
 */
export default function VillasPage() {
  return (
    <>
      <section className="on-dark relative isolate overflow-hidden bg-night">
        <Image
          src="/images/properties/lagoon-bungalow.jpg"
          alt="Thatched bungalow beside calm turquoise water"
          width={1400}
          height={788}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/50 to-night/95"
        />
        <div className="mx-auto max-w-6xl px-4 pt-36 pb-20 sm:px-6 sm:pt-44 sm:pb-28">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Villa Sync
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            One live calendar for your Watamu villa
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Merge Airbnb, Booking.com and manual bookings into a single source
            of truth — so your villa never gets double booked again.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
            >
              Browse properties
            </Link>
            <a
              href="https://wa.me/254745043121?text=Hello%20Watamu%20Hub%20%F0%9F%91%8B%20I%27d%20like%20to%20set%20up%20Villa%20Sync%20for%20my%20villa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </section>

      <section className="bg-sand px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold text-night sm:text-4xl">
              Built for owners, not spreadsheets
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-night/8 bg-white p-6">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-lagoon/12 text-lagoon">
                    <feature.icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-night">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-night/70">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Cross-link into the properties module */}
          <Reveal>
            <div className="mt-16 rounded-3xl bg-night px-8 py-12 text-center sm:px-12">
              <h2 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
                Looking to buy or rent instead?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/75">
                The properties page lists verified villas, beachfront homes and
                land across Watamu — with virtual tours and local agents.
              </p>
              <Link
                href="/properties"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5"
              >
                View properties
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
