import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DropletOff, RefreshCw, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ReportForm } from "@/components/status/report-form";
import { ReportList } from "@/components/status/report-list";
import { WhatsAppButton } from "@/components/whatsapp-button";
import {
  ageLabel,
  outageReports,
  utilityMeta,
  utilityOverview,
  vendors,
  type Utility,
} from "@/lib/status";

// searchParams is read below outside <Suspense>; allow the blocking read
// so prerendering/navigation stays instant (same as the other routes).
export const instant = false;

export const metadata: Metadata = {
  title: "Status Board — water, power and gas in Watamu",
  description:
    "Live water, power and LPG status for Watamu, Malindi and Marafa — report an outage, see who's fixed, and find the vendors that deliver.",
  openGraph: {
    title: "Status Board — Watamu Hub",
    description:
      "Water, power and gas status for Watamu — report an outage or share that it's back.",
    url: "/status",
  },
};

const filters: { value: Utility | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "water", label: "Water" },
  { value: "power", label: "Power" },
  { value: "gas", label: "Gas" },
];

const steps = [
  {
    icon: DropletOff,
    title: "Spot it",
    body: "You notice water, power or gas is out in your area.",
  },
  {
    icon: RefreshCw,
    title: "Report it",
    body: "One short form — or tap through on WhatsApp — takes seconds.",
  },
  {
    icon: Users,
    title: "Everyone sees it",
    body: "Neighbours and villas check the same board before calling anyone.",
  },
];

const isUtility = (v: string | undefined): v is Utility =>
  v === "water" || v === "power" || v === "gas";

/**
 * Status Board module (Phase 2). Reports are seeded mock data with TTLs;
 * the list client component auto-expires stale entries, and the report
 * form saves to Supabase when configured (WhatsApp fallback otherwise).
 */
export default async function StatusPage({
  searchParams,
}: {
  searchParams: Promise<{ utility?: string }>;
}) {
  const { utility } = await searchParams;
  const activeFilter = isUtility(utility) ? utility : "all";
  const overview = utilityOverview();

  const visibleReports =
    activeFilter === "all"
      ? outageReports
      : outageReports.filter((r) => r.utility === activeFilter);

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
          className="absolute inset-0 -z-10 size-full object-cover opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-night/75 via-night/55 to-night/95"
        />
        <div className="mx-auto max-w-6xl px-4 pt-36 pb-16 sm:px-6 sm:pt-44 sm:pb-20">
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Status Board
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
            Water, power and gas — what&apos;s out right now
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85">
            One live board for Watamu, Malindi and Marafa. Check it before you
            call anyone — and add thirty seconds when you spot something.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#report"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
            >
              Report an outage
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href="#vendors"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
            >
              Who delivers?
            </a>
          </div>
        </div>
      </section>

      {/* Utility overview */}
      <section className="bg-sand px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {(Object.keys(utilityMeta) as Utility[]).map((u) => {
            const o = overview[u];
            return (
              <Reveal key={u}>
                <div className="h-full rounded-2xl border border-night/8 bg-white p-5 shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-heading text-lg font-semibold text-night">
                      {utilityMeta[u].label}
                    </h2>
                    <span
                      className={
                        o.status === "ok"
                          ? "rounded-full bg-mangrove/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-mangrove"
                          : "rounded-full bg-coral/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-coral-deep"
                      }
                    >
                      {o.status === "ok" ? "OK" : "Outage"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-night/70">
                    {o.headline}
                  </p>
                  <p className="mt-3 text-xs text-night/50">
                    {utilityMeta[u].blurb}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Reports + filter tabs */}
      <section className="bg-sand px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-night sm:text-4xl">
                  What neighbours are seeing
                </h2>
                <p className="mt-3 max-w-xl text-night/70">
                  Fresh reports up top of each utility. Every entry shows its
                  window and drops off by itself once it expires.
                </p>
              </div>
              <nav
                aria-label="Filter by utility"
                className="flex flex-wrap gap-2"
              >
                {filters.map((f) => {
                  const href = f.value === "all" ? "/status" : `/status?utility=${f.value}`;
                  const active = activeFilter === f.value;
                  return (
                    <Link
                      key={f.value}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "rounded-full bg-night px-4 py-2 text-sm font-semibold text-white"
                          : "rounded-full border border-night/15 bg-white px-4 py-2 text-sm font-semibold text-night/70 transition-colors hover:border-night/30 hover:text-night"
                      }
                    >
                      {f.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </Reveal>

          <div className="mt-8">
            <ReportList reports={visibleReports} />
          </div>

          <p className="mt-4 text-xs text-night/50">
            Showing {visibleReports.length}{" "}
            {activeFilter === "all" ? "report(s)" : `${activeFilter} report(s)`}
            {outageReports.length > 0 && (
              <> · last confirmed: {ageLabel(Math.min(...outageReports.map((r) => r.ageHours)))}</>
            )}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand-deep px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-2xl font-semibold text-night sm:text-3xl">
              How the board keeps itself tidy
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-night/8 bg-white/70 p-5">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lagoon/15 text-lagoon">
                    <s.icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-night">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-night/70">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Report form */}
      <section id="report" className="bg-sand px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
                Add to the board
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-night sm:text-4xl">
                Report an outage — or that it&apos;s back
              </h2>
              <p className="mt-4 text-night/70">
                No account needed. Pick the utility, name your area, and send.
                Confirmed reports appear on the board above and expire on
                their own once the window passes.
              </p>
              <div className="mt-6 rounded-2xl border border-night/10 bg-white/70 p-5 text-sm text-night/70">
                <p className="font-semibold text-night">In a real emergency</p>
                <p className="mt-1.5">
                  For downed lines or flooding, contact the utility directly
                  first — then add it here so nobody else makes the same trip.
                </p>
              </div>
              <div className="mt-6">
                <WhatsAppButton
                  message="Hello Watamu Hub 👋 I'd like to report a water/power/gas issue in Watamu."
                  variant="solid"
                >
                  Rather chat on WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ReportForm />
          </Reveal>
        </div>
      </section>

      {/* Vendors */}
      <section id="vendors" className="on-dark relative isolate overflow-hidden bg-night px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
              Who delivers
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              When supply is out, these are the names people use
            </h2>
            <p className="mt-4 max-w-xl text-white/75">
              Water tankers, LPG exchange, ice and emergency power — all
              reachable through the hub on WhatsApp.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {vendors.map((v, i) => (
              <Reveal key={v.id} delay={(i % 2) * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-sm text-lagoon-soft">{v.service}</p>
                  <p className="mt-1 text-xs text-white/50">{v.area}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {v.delivers.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/80"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                    {v.note}
                  </p>
                  <div className="mt-5">
                    <WhatsAppButton
                      size="sm"
                      variant="outline"
                      message={`Hello Watamu Hub 👋 Please connect me with ${v.name} (${v.service}, ${v.area}).`}
                    >
                      Ask the hub to reach {v.name.split(" ")[0]}…
                    </WhatsAppButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}