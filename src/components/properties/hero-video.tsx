"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero background video with resilient playback.
 *
 * The SSR markup carries every spec attribute (autoPlay, muted, loop,
 * playsInline, preload="metadata", poster), but browsers evaluate the
 * autoplay policy while parsing — before React hydration — so a
 * not-yet-muted element can be blocked and never retried. This client
 * component re-asserts `muted` and calls `play()` after hydration, and
 * only fades the video in once it is genuinely playing (`onPlaying`):
 * if autoplay is blocked or the file fails, the poster layer simply stays
 * visible — nothing looks broken.
 *
 * Under prefers-reduced-motion the video is never started (and globals.css
 * hides it entirely), so the poster is what renders.
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
      /* autoplay blocked — the poster layer stays, which is fine */
    });
  }, []);

  return (
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
  );
}
