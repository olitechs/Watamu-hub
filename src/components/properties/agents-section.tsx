import { Languages, MapPin } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { agents } from "@/lib/agents";

/**
 * Agent profiles: initials monogram avatar (no photos of real people),
 * name, role, languages, areas covered and a prefilled "Chat on WhatsApp"
 * button. Server component — the WhatsApp button is a plain link.
 */
export function AgentsSection() {
  return (
    <section id="agents" className="scroll-mt-20 bg-sand-deep px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
            Meet the team
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-night sm:text-4xl">
            Agents who know which palm marks the plot boundary
          </h2>
          <p className="mt-3 max-w-xl text-night/70">
            Chat directly — no call centre between you and the person holding
            the keys.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, i) => (
            <Reveal key={agent.id} delay={i * 100}>
              <article className="flex h-full flex-col rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgb(11_42_60/0.12)]">
                {/* Monogram avatar */}
                <span
                  aria-hidden
                  className="inline-flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-lagoon to-lagoon-deep font-heading text-xl font-semibold text-white"
                >
                  {agent.initials}
                </span>

                <h3 className="mt-4 text-lg font-semibold text-night">{agent.name}</h3>
                <p className="text-sm font-medium text-lagoon">{agent.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-night/70">{agent.blurb}</p>

                <dl className="mt-4 space-y-2 text-sm text-night/70">
                  <div className="flex items-start gap-2">
                    <dt className="inline-flex shrink-0 items-center gap-1.5 font-medium text-night/80">
                      <Languages aria-hidden className="size-4 text-lagoon" />
                      <span className="sr-only">Languages</span>
                    </dt>
                    <dd>{agent.languages.join(", ")}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="inline-flex shrink-0 items-center gap-1.5 font-medium text-night/80">
                      <MapPin aria-hidden className="size-4 text-lagoon" />
                      <span className="sr-only">Areas covered</span>
                    </dt>
                    <dd>{agent.areas.join(", ")}</dd>
                  </div>
                </dl>

                <div className="mt-6 pt-2">
                  <WhatsAppButton
                    number={agent.whatsappNumber}
                    message={`Hello ${agent.name} 👋 I found you on the Watamu Hub properties page and I'd like to chat about a property in ${agent.areas[0]}.`}
                    className="w-full"
                  >
                    Chat on WhatsApp
                  </WhatsAppButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
