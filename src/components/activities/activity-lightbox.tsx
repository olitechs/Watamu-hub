"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ActivityPhoto } from "@/lib/activities";

export function ActivityLightbox({ photos }: { photos: ActivityPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    function onOpen(e: Event) {
      const i = (e as CustomEvent<number>).detail;
      setCurrent(i);
      setOpen(true);
    }
    window.addEventListener("open-lightbox", onOpen as EventListener);
    return () => window.removeEventListener("open-lightbox", onOpen as EventListener);
  }, [photos]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => ref.current?.focus(), 30);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % photos.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photos]);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, [open]);

  if (!open) return null;

  const photo = photos[current];

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${current + 1} of ${photos.length}`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="relative mb-6 max-w-[90vw] max-h-[80vh] rounded-2xl overflow-hidden bg-white shadow-[0_20px_60px_rgb(11_42_60/0.4)]">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={1200}
          height={900}
          className="h-full w-full object-contain"
          sizes="90vw"
        />
        {photo.caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-night/80 to-transparent p-4 text-sm text-white/90">
            {photo.caption}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setCurrent((c) => (c - 1 + photos.length) % photos.length)}
          className="rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/30 focus-visible:outline-2"
          aria-label="Previous photo"
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="text-sm text-white/80">
          <span className="font-medium">{current + 1}</span>
          <span className="mx-1">/</span>
          <span>{photos.length}</span>
        </div>
        <button
          type="button"
          onClick={() => setCurrent((c) => (c + 1) % photos.length)}
          className="rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/30 focus-visible:outline-2"
          aria-label="Next photo"
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ml-auto rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/30 focus-visible:outline-2"
          aria-label="Close lightbox"
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
