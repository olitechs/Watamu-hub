import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sailboat,
  Car,
  MessageCircle,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  boatRoutes,
  drivers,
  modeCards,
  roadRoutes,
  type RoadMode,
} from "@/lib/transport";

export const metadata: Metadata = {
  title: "Transport Guide — fixed tuk-tuk, boda, taxi & boat prices",
  description:
    "Fair, fixed prices for tuk-tuks, bodas, taxis and boat transfers in Watamu, Malindi and Marafa — plus the drivers people ask for by name.",
  openGraph: {
    title: "Transport Guide — Watamu Hub",
    description:
      "Fixed prices for tuk-tuks, bodas, taxis and boats around Watamu — agree before you ride.",
    url: "/transport",
  },
};

const modeIcon: Record<RoadMode | "boat", typeof Sailboat> = {
  "tuk-tuk": Car,
  boda: Car,
  taxi: Car,
  boat: Sailboat,
};

const promises = [
  {
    icon: Tag,
    title: "Fixed before you ride",
    body: "Every route shows an agreed price range — if the driver quotes higher, show them this page.",
  },
  {
    icon: ShieldCheck,
    title: "Named drivers",
    body: "Ranks and stage names locals actually use, reached through one number.",
  },
  {
    icon: MessageCircle,
    title: "No booking fee",
    body: "The guide is free and every contact is a plain WhatsApp chat — no middleman cut.",
  },
];

/**
 * Transport Guide module (Phase 2): road fare table, boat transfers,
 * mode-by-mode tips and named drivers. All fares are indicative demo data
 * (`// TODO verify` in `src/lib/transport.ts`).
 */
export default function TransportPage() {
  return (
    <>
      {/* Hero */}
      <section className="on-dark relative isolate overflow-hidden bg-night">
        <Image
          src="/images/properties/watamu-beach.jpg"
          alt="Dhow boat on the clear water off Watamu Beach"
          width={1400}
          height={788}
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 size-full object-cover opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/55 to-night/95"
        />
        <div className="mx-auto max-w-6xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Transport Guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            Fair, fixed prices for tuk-tuks, bodas, taxis and boats
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            Agree the price before you ride — here is what locals actually pay
            around Watamu, Malindi and Marafa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#fares"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
            >
              See the prices
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href="#drivers"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              Drivers people ask for
            </a>
          </div>
        </div>
      </section>

      {/* Promises strip */}
      <section className="bg-sand px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-night/8 bg-white p-5 shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lagoon/15 text-lagoon">
                  <p.icon aria-hidden className="size-5" />
                </span>
                <h2 className="mt-4 font-heading text-lg font-semibold text-night">
                  {p.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-night/70">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Road fares */}
      <section id="fares" className="bg-sand px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
              Road fares
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-night sm:text-4xl">
              Prices locals agree on, route by route
            </h2>
            <p className="mt-3 max-w-2xl text-night/70">
              All figures in Kenyan Shillings and indicative for a normal day.
              Show the driver your screen — if they quote well above this,
              politely step to the next tuk-tuk.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-night/8 bg-white shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <caption className="sr-only">
                    Indicative road fares around Watamu in Kenyan Shillings
                  </caption>
                  <thead>
                    <tr className="border-b border-night/10 bg-sand-deep/60 text-xs uppercase tracking-wide text-night/60">
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Route
                      </th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Tuk-tuk
                      </th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Boda
                      </th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Taxi
                      </th>
                      <th scope="col" className="px-5 py-3.5 font-semibold">
                        Typical time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roadRoutes.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-night/6 last:border-0"
                      >
                        <th scope="row" className="px-5 py-4 font-semibold text-night">
                          <span className="block">{r.from}</span>
                          <span className="block text-xs font-normal text-night/50">
                            → {r.to}
                          </span>
                          {r.note && (
                            <span className="mt-1 block text-xs font-normal italic text-night/50">
                              {r.note}
                            </span>
                          )}
                        </th>
                        <td className="px-5 py-4 font-medium text-night/80">
                          {r.fares["tuk-tuk"]}
                        </td>
                        <td className="px-5 py-4 font-medium text-night/80">
                          {r.fares.boda}
                        </td>
                        <td className="px-5 py-4 font-medium text-night/80">
                          {r.fares.taxi}
                        </td>
                        <td className="px-5 py-4 text-night/60">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Boat routes */}
      <section className="bg-sand px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
              By boat
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-night sm:text-4xl">
              Creek taxis and coast transfers
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {boatRoutes.map((b, i) => (
              <Reveal key={b.id} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lagoon/15 text-lagoon">
                    <Sailboat aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-night">
                    {b.name}
                  </h3>
                  <p className="mt-1 text-sm text-night/60">
                    {b.from} → {b.to} · {b.time}
                  </p>
                  <p className="mt-3 font-heading text-2xl font-semibold text-lagoon">
                    KES {b.price}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-night/70">
                    {b.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mode tips */}
      <section className="bg-sand-deep px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-semibold text-night sm:text-4xl">
              Riding smart, mode by mode
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {modeCards.map((m, i) => {
              const Icon = modeIcon[m.id];
              return (
                <Reveal key={m.id} delay={(i % 2) * 80}>
                  <div className="h-full rounded-2xl border border-night/8 bg-white/70 p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-sun/20 text-night">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-night">
                          {m.title}
                        </h3>
                        <p className="text-xs text-night/60">{m.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-4 rounded-lg bg-night/5 px-3 py-2 text-sm font-medium text-night/80">
                      {m.range}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-night/70">
                      {m.tips.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span aria-hidden className="text-lagoon">
                            ✓
                          </span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section
        id="drivers"
        className="on-dark relative isolate overflow-hidden bg-night px-4 py-20 sm:px-6"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
              Drivers
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              The names people ask for at the rank
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              Reach any of them through the hub — we pass the message along so
              nobody&apos;s personal number lives on the internet.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {drivers.map((d, i) => (
              <Reveal key={d.id} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {d.name}
                  </h3>
                  <p className="mt-1 text-sm text-lagoon-soft">{d.vehicle}</p>
                  <p className="mt-1 text-xs text-white/50">{d.base}</p>
                  <p className="mt-3 text-sm text-white/70">{d.languages}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                    {d.note}
                  </p>
                  <div className="mt-5">
                    <WhatsAppButton
                      size="sm"
                      variant="outline"
                      message={`Hello Watamu Hub 👋 Please pass a message to ${d.name} (${d.vehicle}) — I'd like to book a ride.`}
                    >
                      Message via the hub
                    </WhatsAppButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Need a ride sorted before you land?
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Tell us your dates and luggage — we&apos;ll line up a driver
                  for the airport run.
                </p>
              </div>
              <Link
                href="/properties#enquire"
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
              >
                Arrange a pickup
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}