"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero background video with resilient playback.
 *
 * The hero is layered:
 *  - A static poster <Image> sits underneath and is ALWAYS visible, so the
 *    hero shows the coast scene from the first paint — before hydration,
 *    when autoplay is blocked, or under prefers-reduced-motion (where
 *    globals.css hides .hero-video entirely).
 *  - The <video> sits on top and is faded in only once it is genuinely
 *    playing (`onPlaying`).
 *
 * The SSR markup carries every spec attribute (autoPlay, muted, loop,
 * playsInline, preload="metadata", poster), but browsers evaluate the
 * autoplay policy while parsing — before React hydration — so a
 * not-yet-muted element can be blocked and never retried. This client
 * component re-asserts `muted` and calls `play()` after hydration.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // poster only — don't burn bandwidth on motion
    }

    // Belt and braces: set muted as DOM properties before play().
    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => {
      /* autoplay blocked — the poster layer below stays visible */
    });
  }, []);

  return (
    <>
      <Image
        src="/videos/hero-poster.jpg"
        alt=""
        aria-hidden
        width={1600}
        height={900}
        priority
        sizes="100vw"
        className="hero-poster absolute inset-0 -z-10 size-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn(
          "hero-video absolute inset-0 -z-10 size-full object-cover transition-opacity duration-700",
          playing ? "opacity-100" : "opacity-0",
        )}
      >
        <source src="/videos/watamu-coast-hero.webm" type="video/webm" />
        <source src="/videos/watamu-coast-hero.mp4" type="video/mp4" />
      </video>
    </>
  );
}