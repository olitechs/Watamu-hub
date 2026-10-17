import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { Activity } from "@/lib/activities";
import { blurFor } from "@/lib/lqip";

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

export function ActivityCard({ activity, index }: ActivityCardProps) {
  const firstPhoto = activity.photos[0];
  return (
    <Reveal delay={(index % 3) * 80}>
      <Link
        href={`/activities/${activity.slug}`}
        className="group flex flex-col rounded-2xl border border-night/8 bg-white shadow-[0_8px_30px_rgb(11_42_60/0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-lagoon/30 hover:shadow-[0_16px_48px_rgb(11_42_60/0.12)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={firstPhoto.src}
            alt={firstPhoto.alt}
            width={1200}
            height={900}
            placeholder="blur"
            blurDataURL={blurFor(firstPhoto.src)}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night/70 to-transparent"
          />
          <span className="absolute top-3 left-3 rounded-full bg-sun/20 px-3 py-1 text-xs font-semibold text-night">
            {activity.area === "watamu" ? "Watamu" : activity.area === "malindi" ? "Malindi" : "Marafa"}
          </span>
          <span className="absolute top-3 right-3 rounded-full bg-lagoon/10 px-3 py-1 text-xs font-semibold text-lagoon">
            {activity.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg leading-snug font-semibold text-night">{activity.title}</h3>
          <p className="mt-1 text-sm text-night/60">{activity.location}</p>
          <ul className="mt-2 space-y-1 text-sm text-night/60">
            {activity.duration && (
              <li className="inline-flex items-center gap-1.5">
                <Clock aria-hidden className="size-4 text-lagoon" />
                {activity.duration}
              </li>
            )}
            {activity.bestTime && (
              <li className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden className="size-4 text-lagoon" />
                {activity.bestTime}
              </li>
            )}
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-night/70">{activity.intro}</p>
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-sand/70 px-3 py-1 text-xs font-medium text-night transition-colors group-hover:bg-sun/20 group-hover:text-night">
              Read the story
              <svg className="size-3.5 -translate-x-0.5 translate-y-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
