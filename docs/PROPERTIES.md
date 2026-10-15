# Properties page — notes

The `/properties` module ships with mock data and local media so it runs at
$0. This document covers the three swaps you'll want before going live, plus
asset credits.

---

## 1. Swapping the hero video

The hero video lives in `public/videos/`:

| File | Notes |
|------|-------|
| `watamu-coast-hero.mp4` | ~2.6 MB, 15 s, 1080p, H.264 (Safari, Edge) |
| `watamu-coast-hero.webm` | ~2.7 MB, VP9 (Chrome, Firefox) |
| `hero-poster.jpg` | Poster / reduced-motion fallback (~68 KB) |

To replace it, drop in your own clip (keep it **under 5 MB**, **1080p max**,
**MP4 + WebM**, in `public/videos/`) and update the `<video>` sources in
`src/components/properties/video-hero.tsx`:

```tsx
<video ... poster="/videos/your-poster.jpg">
  <source src="/videos/your-clip.webm" type="video/webm" />
  <source src="/videos/your-clip.mp4" type="video/mp4" />
</video>
```

Also update the `<Image src="/videos/hero-poster.jpg">` layer right above the
video (it's the LCP element and the reduced-motion fallback).

Re-encoding tip (keeps the 5 MB budget):

```bash
ffmpeg -i input.mp4 -t 15 -an -c:v libx264 -preset slow -crf 33 \
  -pix_fmt yuv420p -movflags +faststart public/videos/watamu-coast-hero.mp4
```

## 2. Adding a real virtual-tour URL

`src/components/properties/virtual-tour.tsx` renders a placeholder clip in the
modal. To go live, pass an `embedUrl` (Matterport share link or YouTube embed
URL) to the `<TourModal>` component at the bottom of that file:

```tsx
<TourModal
  open={open}
  onClose={() => setOpen(false)}
  title="Watamu coast — 360° tour preview"
  embedUrl="https://www.youtube.com/embed/VIDEO_ID" // or a Matterport share URL
/>
```

When `embedUrl` is set, the modal renders a full-screen `<iframe>` instead of
the placeholder video — no other changes needed. The "360 tour" badge on
property cards is driven by the `hasVirtualTour` flag in
`src/lib/properties.ts`.

## 3. Replacing mock data with Supabase

The data layer is intentionally thin:

- `src/lib/properties.ts` — typed `Property[]` mock data + `filterProperties()`
- `src/lib/agents.ts` — typed `Agent[]` mock data

To move to Supabase:

1. **Create the tables.** Enquiries already have a migration —
   `supabase/migrations/0002_property_enquiries.sql` (anyone may INSERT, only
   admins may SELECT; see the RLS policies there). Add `properties` and
   `agents` tables in a new migration (e.g. `0003_properties.sql`) mirroring
   the `Property` / `Agent` types.
2. **Swap the reads.** In `src/lib/properties.ts`, replace the hardcoded array
   with a server-side query:

   ```ts
   import { getSupabaseServer } from "@/lib/supabase/server";

   export async function getProperties() {
     const supabase = getSupabaseServer();
     if (!supabase) return properties; // fallback to mock data
     const { data } = await supabase
       .from("properties")
       .select("*")
       .order("created_at", { ascending: false });
     return (data ?? []) as Property[];
   }
   ```

   Because `/properties` already renders per-request (`export const instant =
   false`, needed for `searchParams` filtering), awaiting a Supabase query in
   the page is a drop-in. Detail pages at `/properties/[slug]` use
   `generateStaticParams()` — switch them to a runtime query (or ISR) when the
   data becomes dynamic.
3. **Keep the enquiry write as-is.** The server action in
   `src/app/properties/actions.ts` already inserts into `property_enquiries`
   using the anon key; RLS enforces insert-only for the public. Set
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your
   environment (see `.env.example`). Without them, the form still succeeds and
   offers the WhatsApp fallback — nothing is lost.
4. **Agents.** Same pattern as properties — swap `src/lib/agents.ts` for a
   query; the components consume the `Agent` type and won't need changes.

## 4. Phone numbers & WhatsApp

`src/lib/phone.ts` normalises to `+254` (accepts `0712…`, `712…`, `+254 712…`).
`src/lib/whatsapp.ts` builds `wa.me` deep links with prefilled messages — no
paid API anywhere, per the project's $0 principle. Replace `WHATSAPP_NUMBER`
with the agency's real line when going live.

## 5. Asset credits (free licences)

- **Video:** [Mixkit — "Flying low over the sea of a beach"](https://mixkit.co/free-stock-video/flying-low-over-the-sea-of-a-beach-44392/)
  (Mixkit Free License: free for commercial use, no attribution required),
  re-encoded locally.
- **Photography:** [Pexels](https://www.pexels.com/license/) (free for
  commercial use, attribution not required). Images used on the properties
  page: `villa-pool`, `coastal-ground`, `thatch-cottage`, `living-pool`,
  `palm-dunes`, `aerial-houses`, `reef-aerial`, `watamu-beach`,
  `lagoon-bungalow`, and `tour/poster` — all downloaded to `public/images/`
  (no hotlinking). Blur-up placeholders (`blurDataURL`) are generated
  20 px JPEGs.
- **Icons:** `lucide-react` (ISC licence).
- **Fonts:** Inter + Poppins via `next/font/google` (Google Fonts, free).

## 6. Known limitations

- The 21st.dev CLI (`npx shadcn@latest add "https://21st.dev/r/…"`) returned
  **403 / auth required** from this environment, so the hero was hand-built to
  the same spec (video background, gradient overlay, poster fallback,
  reduced-motion). If you have 21st.dev access, you can still drop one in and
  adapt `src/components/properties/video-hero.tsx`.
- Agent photos are monograms, not headshots — the spec forbids inventing real
  people, so no synthetic faces are used. Swap in real team photos by
  replacing the monogram `<span>` in
  `src/components/properties/agents-section.tsx` with a `<Image>`.
- Lighthouse numbers weren't measured in this sandbox (no Chrome available);
  the page is built for it — local media, `next/image` with `priority` only on
  LCP, lazy below-fold images, server components by default, and a ~205 KB
  HTML payload for `/properties`.
