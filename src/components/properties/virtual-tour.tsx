"use client";

import Image from "next/image";
import { Play, View } from "lucide-react";
import { useState } from "react";
import { TourModal } from "./tour-modal";

/** Tiny base64 JPEG (20px wide) for the blur-up placeholder. */
const TOUR_POSTER_BLUR =
  "data:image/jpeg;base64,/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAeQABAQEAAAAAAAAAAAAAAAAABgMFAQEBAQEBAAAAAAAAAAAAAAAEBQACARAAAQMBBgUCBwEAAAAAAAAAAQIAERITIVExAwRh4UGiVLEwEUJCcnIzU5RUREQACAgEFAQAAAAAAAAAAAAAAEQIBA3ETEqHRMkF/9oADAMBAAIRAxEAPwDMbWmamVJqefK2HFa+VKZaRnTFu3c2hihVaE7RTRzgPmzw6E07YesYum+VUIzL8Yx1NN0x0sL+Wgtal5pSQ1+wec+FbJ4xb+Wb96xkr0IRLU51UPpJCRkBE+9c5vyDz179J2z//2Q==";

/**
 * Virtual tour preview: a large framed poster with a play button that opens
 * the accessible modal. To wire a real tour, pass `embedUrl` (Matterport
 * share link or YouTube embed) to <TourModal> below — e.g.
 *
 *   <TourModal ... embedUrl="https://www.youtube.com/embed/VIDEO_ID" />
 */
export function VirtualTourPreview() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-sand px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-lagoon uppercase">
            Virtual tours
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-night sm:text-4xl">
            Walk through before you fly in
          </h2>
          <p className="mt-4 max-w-md text-night/70">
            Selected listings include a 360° walkthrough, so you can shortlist
            from Nairobi, Berlin or anywhere else — then book the real viewing
            with an agent.
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-lagoon/25 bg-lagoon/10 px-4 py-2 text-sm font-semibold text-lagoon">
            <View aria-hidden className="size-4" />
            Look for the 360° tour badge on cards
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className="group relative block w-full overflow-hidden rounded-3xl border-8 border-white shadow-[0_24px_60px_rgb(11_42_60/0.25)] transition-transform duration-300 hover:-translate-y-1"
        >
          <Image
            src="/images/tour/poster.jpg"
            alt="Aerial view of a beachfront resort with pools and palms — virtual tour preview"
            width={1400}
            height={934}
            placeholder="blur"
            blurDataURL={TOUR_POSTER_BLUR}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-20 items-center justify-center rounded-full bg-coral/95 shadow-[0_12px_40px_rgb(255_107_74/0.5)] transition-transform duration-300 group-hover:scale-110">
              <Play aria-hidden className="ml-1 size-8 fill-night text-night" />
            </span>
          </span>
          <span className="glass-strong absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold text-white">
            <View aria-hidden className="size-4" />
            360° tour preview
          </span>
          <span className="sr-only">Open the virtual tour preview (dialog)</span>
        </button>
      </div>

      <TourModal
        open={open}
        onClose={() => setOpen(false)}
        title="Watamu coast — 360° tour preview"
        // embedUrl — drop a Matterport or YouTube URL here to go live.
      />
    </section>
  );
}
