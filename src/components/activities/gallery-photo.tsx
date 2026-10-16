"use client";
import Image from "next/image";
import type { ActivityPhoto } from "@/lib/activities";

interface GalleryPhotoProps {
  photo: ActivityPhoto;
  index: number;
  total: number;
}

export function GalleryPhoto({ photo, index, total }: GalleryPhotoProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-lightbox", { detail: index }))}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-night/8 bg-white shadow-[0_8px_30px_rgb(11_42_60/0.06)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgb(11_42_60/0.12)] focus-visible:outline-2 focus-visible:outline-lagoon"
      aria-label={`Open photo ${index + 1} of ${total}: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={1200}
        height={900}
        placeholder="blur"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-night/70 to-transparent" />
      {index === 0 && (
        <span className="absolute top-3 right-3 rounded-full bg-lagoon/20 px-2 py-0.5 text-[11px] font-semibold text-lagoon">
          Featured
        </span>
      )}
    </button>
  );
}
