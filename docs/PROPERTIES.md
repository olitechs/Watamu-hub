## Hero video — drone point-of-view coastal clip

Swapped 2026-10-15 (both edits share this file):

**Playback fix** — `src/components/properties/video-hero.tsx` now renders a small
client `<HeroVideo>` instead of the raw `<video>` tag. Reason: SSR markup emitted by
React omits the `muted` property, so the autoplay policy can block the initial
`play()` before hydration re-sets it (classic React DOM behaviour), leaving the
poster frozen. `<HeroVideo>`:

- re-asserts `muted` + fires `play()` after hydration,
- fades the video **in only when `onPlaying` fires** (progressive enhancement —
  if autoplay is blocked the poster stays put, no broken-looking frames),
- keeps the exact spec attribute set (`autoplay`, `muted`, `loop`,
  `playsInline`, `preload="metadata"`, `poster`) and the reduced-motion poster-only
  fallback from the original spec.

**Drone view of the Watamu coast** — replaced the old generic "flying low over a
beach" clip (Mixkit `flying-low-over-the-sea-of-a-beach-44392`) with a drone
aerial of a turquoise coastal bay:

- Source: Mixkit free licence — "Turquoise blue water bay from above"
  (https://mixkit.co/free-stock-video/turquoise-blue-water-bay-from-above-5008/)
- Re-encoded locally to **15 s / 1080p / ~1.4 MB** MP4 + 1.2 MB VP9 WebM
  (`public/videos/watamu-coast-hero.{mp4,webm}`), poster regenerated in
  `public/videos/hero-poster.jpg` so it matches the clip.
- Reuse the same pattern for your own drone footage: place a 1080p MP4 + WebM
  under `public/videos/` (MP4 first for Safari/Edge, WebM for Chrome/Firefox),
  update the `<source>` order and the credit comment in
  `src/components/properties/video-hero.tsx` and the credit here.

## Asset credits — activities page (Wikimedia Commons, free licences)

| Photo | Source | Licence | Author |
|---|---|---|---|
| `act-hero.jpg` | Watamu Beach, Kenya 03 | CC BY-SA 4.0 | Jenny Kellett |
| `act-mida.jpg` | Watamu Mida Creek 9 | CC0 | ordercrazy |
| `act-gedi.jpg` | Gede Gedi Ruins 01 | CC0 | ordercrazy |
| `act-starfish.jpg` | Watamu Beach, Kenya Starfish | CC BY-SA 4.0 | Jenny Kellett |
| `act-dhow.jpg` | Watamu (DSC02033) | CC BY 2.0 | Nina R |
| `act-sunset.jpg` | Watamu beach Kenya Sunset | CC BY 4.0 | IBM2024 |
| `act-ocean.jpg` | Indian Ocean view | CC BY-SA 4.0 | Lyfec |

Reused local property photos for the forest trip / turtle card. All are used as
local `next/image` sources (no hotlinking); credits are embedded in the page
footer and in `docs/PROPERTIES.md`.
