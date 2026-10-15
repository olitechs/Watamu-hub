import Link from "next/link";
import { PropertyCard } from "./property-card";
import { Reveal } from "@/components/reveal";
import type { Property } from "@/lib/properties";

interface FeaturedListingsProps {
  properties: Property[];
  hasFilters: boolean;
  activeArea?: string;
  activeType?: string;
  activeBudget?: string;
}

/**
 * Featured listings band. Sits on a night→lagoon gradient so the frosted
 * cards glow; cards enter with a staggered fade+rise (Reveal delays).
 */
export function FeaturedListings({
  properties,
  hasFilters,
  activeArea,
  activeType,
  activeBudget,
}: FeaturedListingsProps) {
  const activeFilters = [activeArea, activeType, activeBudget].filter(Boolean);

  return (
    <section
      id="featured"
      className="scroll-mt-20 bg-gradient-to-b from-night via-night to-lagoon-deep px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
            Featured listings
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Homes our agents would live in themselves
          </h2>
          <p className="mt-3 max-w-xl text-white/75">
            Every listing is visited, measured and title-checked by a local agent
            before it goes up.
          </p>
        </Reveal>

        {properties.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property, i) => (
              <Reveal key={property.id} delay={(i % 3) * 100}>
                <PropertyCard property={property} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="glass mt-12 rounded-2xl p-10 text-center">
            <p className="text-lg font-semibold text-white">
              No listings match those filters — yet.
            </p>
            <p className="mt-2 text-white/75">
              New properties arrive weekly. Clear the filters or ask an agent to
              find one off-market.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/properties"
                className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                Clear filters
              </Link>
              <Link
                href="/properties#enquire"
                className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-night transition-colors hover:bg-coral-deep hover:text-white"
              >
                Ask an agent
              </Link>
            </div>
          </div>
        )}

        {hasFilters && properties.length > 0 && (
          <p className="mt-8 text-center text-sm text-white/70">
            Showing {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"}
            {activeFilters.length > 0 ? ` for “${activeFilters.join(" · ")}”` : ""}.{" "}
            <Link
              href="/properties"
              className="font-semibold text-sun underline underline-offset-4"
            >
              Clear filters
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
