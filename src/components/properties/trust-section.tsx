import { BadgeCheck, Eye, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const proofPoints = [
  {
    icon: BadgeCheck,
    title: "Verified listings",
    body: "Every property is visited and its title status confirmed before it goes live.",
  },
  {
    icon: ShieldCheck,
    title: "Secure viewings",
    body: "Viewings are accompanied by a known local agent — no strangers, no surprises.",
  },
  {
    icon: MapPin,
    title: "Local agents",
    body: "Our team lives in Watamu. They know the tides, the tracks and the neighbours.",
  },
  {
    icon: Eye,
    title: "Honest advice",
    body: "If a plot floods in long rains or a 'sea view' is one street off, we say so.",
  },
];

const stats = [
  { value: "12", suffix: "+", label: "years on the coast" },
  { value: "180", suffix: "+", label: "properties placed" },
  { value: "400", suffix: "+", label: "happy clients" },
  { value: "100", suffix: "%", label: "title-checked listings" },
];

/**
 * Why trust us: four short proof points, agency stats and verified badges.
 */
export function TrustSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
            Why Watamu Hub
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-night sm:text-4xl">
            A boutique agency, not a classifieds board
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-night/8 bg-sand/60 p-6 transition-colors duration-300 hover:border-lagoon/30 hover:bg-lagoon/5">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-lagoon/12 text-lagoon">
                  <point.icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-night">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-night/70">{point.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats band */}
        <Reveal>
          <dl className="mt-14 grid grid-cols-2 gap-8 rounded-3xl bg-night px-8 py-10 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="font-heading text-4xl font-semibold text-sun">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="mt-1 block text-sm text-white/70">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-night/60">
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck aria-hidden className="size-4 text-mangrove" />
              Title deeds verified
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck aria-hidden className="size-4 text-mangrove" />
              Agents KRA-registered
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck aria-hidden className="size-4 text-mangrove" />
              Viewing appointments confirmed on WhatsApp
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
