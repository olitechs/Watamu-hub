import Image from "next/image";
import { BadgeCheck, CalendarCheck, ShieldCheck } from "lucide-react";
import { HeroVideo } from "./hero-video";
import { SearchBar } from "./search-bar";

const trustItems = [
  { icon: BadgeCheck, label: "Verified listings" },
  { icon: ShieldCheck, label: "Local agents" },
  { icon: CalendarCheck, label: "Secure viewings" },
];

/**
 * Cinematic video hero.
 *
 * Video source: Mixkit free licence clip "Turquoise blue water bay from
 * above"
 * (https://mixkit.co/free-stock-video/turquoise-blue-water-bay-from-above-5008/)
 * — a drone view over a turquoise coastal bay, standing in for the Watamu
 * coastline. Re-encoded locally to 15s / 1080p / ~1.4 MB. Never hotlinked.
 *
 * Behaviour:
 *  - autoplay + muted + loop + playsInline, preload="metadata"
 *  - poster image fallback (also the reduced-motion visual)
 *  - dark-teal gradient overlay for text contrast
 *  - <HeroVideo> re-asserts muted + play() after hydration and fades the
 *    video in only once it is actually playing
 *  - prefers-reduced-motion never starts the video (globals.css hides it)
 */
export function VideoHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-night">
      {/* Poster layer — always painted (LCP), the video fades in above it */}
      <Image
        src="/videos/hero-poster.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      <HeroVideo />

      {/* Dark-teal gradient overlay (WCAG AA text contrast over any frame) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-night/80 via-night/45 to-night/95"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pb-20">
        <p className="text-sm font-semibold tracking-[0.2em] text-sun uppercase">
          Watamu · Kilifi County · Kenya
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-white text-balance sm:text-6xl">
          Find your place on the Watamu coast
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/85">
          Verified villas, beachfront homes and land — handpicked by agents who
          live here.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#featured"
            className="inline-flex items-center justify-center rounded-full bg-coral px-7 py-3.5 text-base font-semibold text-night shadow-[0_12px_36px_rgb(255_107_74/0.45)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white"
          >
            View properties
          </a>
          <a
            href="#enquire"
            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white/20"
          >
            Book a viewing
          </a>
        </div>

        {/* Trust strip */}
        <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="inline-flex items-center gap-2">
              <Icon aria-hidden className="size-4 text-sun" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
