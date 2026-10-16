import Link from "next/link";
import { MapPin, Clock, Sparkles, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { ActivityLightbox } from "@/components/activities/activity-lightbox";
import { ActivityCard } from "@/components/activities/activity-card";
import { GalleryPhoto } from "@/components/activities/gallery-photo";
import {
  activities,
  areaLabels,
  filterByArea,
  getActivityBySlug,
  whatsappActivityMessage,
} from "@/lib/activities";
import { whatsappLink } from "@/lib/whatsapp";
import { buildTouristAttractionJsonLd } from "@/lib/jsonld";

export async function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return {};
  const firstPhoto = activity.photos[0];
  return {
    title: `${activity.title} — ${areaLabels[activity.area]}`,
    description: activity.intro,
    alternates: { canonical: `/activities/${activity.slug}` },
    openGraph: {
      title: `${activity.title} — ${areaLabels[activity.area]} · Watamu Hub`,
      description: activity.intro,
      url: `/activities/${activity.slug}`,
      images: [
        {
          url: firstPhoto.src,
          width: 1200,
          height: 900,
          alt: firstPhoto.alt,
        },
      ],
    },
  };
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const related = filterByArea(activities, activity.area)
    .filter((a) => a.slug !== activity.slug)
    .slice(0, 3);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildTouristAttractionJsonLd({
              title: activity.title,
              description: activity.intro,
              location: activity.location,
              area: activity.area,
              image: activity.photos[0],
            })
          ),
        }}
      />

      {/* Back + hero */}
      <div className="bg-sand">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-medium text-night/70 transition-colors hover:text-night"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to activities
          </Link>
        </div>
      </div>

      {/* Title area */}
      <section className="bg-sand px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex rounded-full bg-lagoon/10 px-3 py-1 text-xs font-semibold text-lagoon">
            {areaLabels[activity.area]}
          </span>
          <h1 className="mt-3 text-3xl leading-tight font-semibold text-night sm:text-4xl">{activity.title}</h1>
          <p className="mt-3 text-lg text-night/70">{activity.location}</p>
          <span className="mt-2 inline-flex rounded-full bg-sun/20 px-3 py-1 text-sm font-semibold text-night">
            {activity.category}
          </span>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-sand px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activity.photos.map((photo, i) => (
              <GalleryPhoto key={i} photo={photo} index={i} total={activity.photos.length} />
            ))}
          </div>
        </div>
      </section>

      {/* Story content */}
      <section className="bg-sand/80 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* The history */}
          <div className="mb-14">
            <h2 className="font-heading text-2xl font-semibold text-night">The history</h2>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-night/80">
              {activity.history.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* The story — pull-quote intro then paragraphs */}
          <div className="mb-14">
            <h2 className="font-heading text-2xl font-semibold text-night">The story</h2>
            <blockquote className="mt-5 border-l-4 border-sun pl-5 text-lg font-medium text-night italic">
              {activity.intro}
            </blockquote>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-night/80">
              {activity.story.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-14">
            <h2 className="font-heading text-2xl font-semibold text-night">Highlights</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {activity.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-night/10 bg-white px-3.5 py-1.5 text-sm text-night/80 shadow-[0_1px_3px_rgb(11_42_60/0.04)] transition-shadow hover:shadow-[0_4px_12px_rgb(11_42_60/0.08)]"
                >
                  <Sparkles aria-hidden className="mr-1.5 size-3.5 text-sun" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Info panel — no price */}
          {(activity.bestTime || activity.duration) && (
            <div className="rounded-2xl border border-night/8 bg-white p-5 shadow-[0_8px_30px_rgb(11_42_60/0.06)]">
              <h2 className="font-heading text-lg font-semibold text-night">Good to know</h2>
              <ul className="mt-3 space-y-2 text-sm text-night/70">
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
            </div>
          )}
        </div>
      </section>

      {/* More in {area} */}
      {related.length > 0 && (
        <section className="bg-sand px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-xl font-semibold text-night">More in {areaLabels[activity.area]}</h2>
            <p className="mt-2 text-sm text-night/60">Other things to do in {areaLabels[activity.area]}.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a, i) => (
                <ActivityCard key={a.slug} activity={a} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-night px-4 py-16 sm:px-6 sm:py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <MessageCircle className="mx-auto mb-4 size-10 text-sun" aria-hidden />
          <h2 className="font-heading text-2xl font-semibold text-white">Ask about {activity.title}</h2>
          <p className="mt-3 text-base text-white/80">
            Send a WhatsApp message to ask about this activity in {activity.location}.
          </p>
          <a
            href={whatsappLink(whatsappActivityMessage(activity))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-night transition-transform duration-200 hover:-translate-y-0.5 hover:bg-coral-deep"
          >
            Ask on WhatsApp
            <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-sm text-white/60">
            Or{" "}
            <Link href="/properties#enquire" className="underline underline-offset-4 hover:text-white">
              use the contact form
            </Link>
            {" "}to get in touch another way.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <ActivityLightbox photos={activity.photos} />

      {/* Image count credits */}
      <p className="bg-sand/80 px-4 pb-16 text-center text-xs leading-relaxed text-night/50 sm:px-6">
        Activity photography: Wikimedia Commons and placeholder images marked in the page. Replace placeholders with your own photos when you have them.
      </p>
    </>
  );
}
