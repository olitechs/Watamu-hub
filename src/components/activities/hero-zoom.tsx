"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Drone-zoom hero for the activities page.
 *
 * Uses the existing coast hero video that is already in the repo
 * (public/videos/watamu-coast-hero.{webm,mp4}) so we do not add a new
 * video asset for this request. The video sits at a fixed cover frame and
 * a gentle CSS zoom slowly pushes the viewer from a wide sky/frame toward
 * the ground and shoreline, which is the "zoom from sky to ground" effect
 * requested.
 *
 * Behavior mirrors the existing HeroVideo pattern:
 *  - SSR markup includes every playback spec attribute (autoplay/muted/loop/
 *    playsInline/preload/poster) so the page can render without JS.
 *  - After hydration the component re-asserts `muted` and attempts `play()`,
 *    then only fades the video layer in once `onPlaying` fires. If autoplay
 *    is blocked or the video fails, the poster stays visible and nothing
 *    looks broken.
 *  - Under prefers-reduced-motion the video is never started and the CSS zoom
 *    is disabled, so the poster is the experience.
 */

export function HeroZoom() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => {
      /* autoplay blocked — the poster layer stays, which is fine */
    });
  }, []);

  return (
    <>
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
          "hero-zoom-video absolute inset-0 -z-10 size-full object-cover transition-opacity duration-700",
          playing ? "opacity-100" : "opacity-0",
        )}
      >
        <source src="/videos/watamu-coast-hero.webm" type="video/webm" />
        <source src="/videos/watamu-coast-hero.mp4" type="video/mp4" />
      </video>

      {/* Slow zoom from sky/frame toward ground + shoreline. */}
      <div
        aria-hidden
        className={cn(
          "hero-zoom absolute inset-0 -z-10 overflow-hidden motion-reduce:h-[88svh] motion-reduce:!top-[6svh]",
        )}
      >
        {/* The zoom target is a duplicated, scaled hero layer so the crop can
            move downward over time without changing the source video frame. */}
        <div
          className={cn(
            "hero-zoom-target absolute left-0 top-0 h-[130%] w-full origin-top animate-zoom-sky-to-ground motion-reduce:animate-none motion-reduce:!h-[100%]",
          )}
        >
          <div className="motion-reduce:hidden">
            {/* Poster layer under the live video gives the same crop something
                stable to zoom through while the video is still loading or muted
                before autoplay succeeds. */}
            <Image
              src="/videos/hero-poster.jpg"
              alt=""
              aria-hidden
              width={1600}
              height={900}
              className="h-[130%] w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </>
  );
}
