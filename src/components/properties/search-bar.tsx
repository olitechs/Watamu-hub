import { Search } from "lucide-react";
import { watamuAreas, propertyTypes, budgetBands } from "@/lib/properties";

/**
 * Glass search bar overlaid on the video hero: location, type, budget range.
 *
 * Progressive enhancement: a plain GET form — without JS it submits to
 * `/properties?area=…&type=…&budget=…` and the server component filters the
 * listings. With JS it behaves identically (full navigation keeps results
 * shareable/bookmarkable, which matters more than a client-side filter here).
 */
export function SearchBar() {
  return (
    <form
      action="/properties"
      method="get"
      aria-label="Search properties"
      className="glass-strong w-full rounded-2xl p-4 sm:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sb-area" className="text-xs font-semibold tracking-wide text-white/85">
            Location
          </label>
          <select
            id="sb-area"
            name="area"
            defaultValue=""
            className="w-full rounded-lg border border-white/25 bg-white/15 px-3 py-2.5 text-sm text-white backdrop-blur transition-colors hover:bg-white/20 focus:border-white/50 [&>option]:text-night"
          >
            <option value="">Anywhere in Watamu</option>
            {watamuAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sb-type" className="text-xs font-semibold tracking-wide text-white/85">
            Property type
          </label>
          <select
            id="sb-type"
            name="type"
            defaultValue=""
            className="w-full rounded-lg border border-white/25 bg-white/15 px-3 py-2.5 text-sm text-white backdrop-blur transition-colors hover:bg-white/20 focus:border-white/50 [&>option]:text-night"
          >
            <option value="">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="sb-budget" className="text-xs font-semibold tracking-wide text-white/85">
            Budget
          </label>
          <select
            id="sb-budget"
            name="budget"
            defaultValue=""
            className="w-full rounded-lg border border-white/25 bg-white/15 px-3 py-2.5 text-sm text-white backdrop-blur transition-colors hover:bg-white/20 focus:border-white/50 [&>option]:text-night"
          >
            <option value="">Any budget</option>
            {budgetBands.map((band) => (
              <option key={band.value} value={band.value}>
                {band.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral px-6 py-3 text-base font-semibold text-night shadow-[0_10px_30px_rgb(255_107_74/0.4)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white sm:mt-4 sm:w-auto"
      >
        <Search aria-hidden className="size-5" />
        Search properties
      </button>
    </form>
  );
}
