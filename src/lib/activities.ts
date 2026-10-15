/**
 * Typed data for the /activities tourist page.
 *
 * DEMO data: indicative 2026 prices in KES, realistic for Watamu; booking
 * happens on WhatsApp (no paid APIs). Imagery is Wikimedia Commons
 * photography of Watamu itself — credits in the page footer comment and
 * docs/PROPERTIES.md.
 */
import { blurFor } from "./lqip";

export type ActivityCategory = "sea" | "nature" | "culture";

export interface ActivityImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  category: ActivityCategory;
  /** Nearest Watamu landmark. */
  location: string;
  duration: string;
  /** "per person", "per boat", "per group"… */
  priceNote: string;
  priceFromKes: number;
  description: string;
  highlights: string[];
  /** When it's best (season, tide, time of day). */
  bestTime: string;
  image: ActivityImage;
}

export const activityCategoryLabels: Record<ActivityCategory, string> = {
  sea: "Sea & water",
  nature: "Nature & wildlife",
  culture: "Culture & history",
};

export const activityCategories: { value: "" | ActivityCategory; label: string }[] = [
  { value: "", label: "All activities" },
  { value: "sea", label: "Sea & water" },
  { value: "nature", label: "Nature & wildlife" },
  { value: "culture", label: "Culture & history" },
];

function img(src: string, alt: string, width: number, height: number): ActivityImage {
  return { src, alt, width, height, blurDataURL: blurFor(src) };
}

export const activities: Activity[] = [
  {
    id: "act-001",
    slug: "marine-park-snorkelling",
    title: "Marine Park snorkelling",
    category: "sea",
    location: "Watamu Marine Park",
    duration: "3 hrs",
    priceNote: "per person",
    priceFromKes: 2_500,
    description:
      "Boat out to the coral gardens inside the Watamu Marine National Park with a local guide, drift-snorkel over hard and soft coral, and float above shoals of butterflyfish. Park fees and gear included.",
    highlights: ["Guide + gear included", "Park fees included", "All ages"],
    bestTime: "Morning, calm tide (Oct–Apr)",
    image: img(
      "/images/activities/act-starfish.jpg",
      "Starfish in the clear shallow water of Watamu Beach",
      1400,
      1050,
    ),
  },
  {
    id: "act-002",
    slug: "dhow-sunset-cruise",
    title: "Dhow sunset cruise",
    category: "sea",
    location: "Watamu Beach",
    duration: "2 hrs",
    priceNote: "per person",
    priceFromKes: 3_000,
    description:
      "Sail the evening breeze on a wooden dhow along the beach strip — sundowners, fresh juices and the kind of sunset that ends up on every camera roll.",
    highlights: ["Drinks included", "Private charter option", "Sunset departure"],
    bestTime: "Daily, 1 hr before sunset",
    image: img(
      "/images/activities/act-sunset.jpg",
      "Sunset over the Indian Ocean at Watamu Beach, Kenya",
      1080,
      1440,
    ),
  },
  {
    id: "act-003",
    slug: "deep-sea-fishing",
    title: "Deep-sea fishing charter",
    category: "sea",
    location: "Watamu Bay",
    duration: "Half or full day",
    priceNote: "per boat (up to 6)",
    priceFromKes: 18_000,
    description:
      "Blue-water trolling for marlin, sailfish, tuna and mahi-mahi off the Watamu banks. Catch-and-release for billfish; your captain fillets anything you keep.",
    highlights: ["Captain + crew", "Tackle provided", "Ice & water onboard"],
    bestTime: "Aug–Oct & Jan–Mar peaks",
    image: img(
      "/images/activities/act-ocean.jpg",
      "Open Indian Ocean water off the Watamu coast",
      1400,
      1050,
    ),
  },
  {
    id: "act-004",
    slug: "kitesurfing-lessons",
    title: "Kitesurfing lessons",
    category: "sea",
    location: "Kite Point, north of Watamu Beach",
    duration: "2–3 hrs per lesson",
    priceNote: "per person, 3-lesson course",
    priceFromKes: 12_000,
    description:
      "Watamu's flat-water lagoons are one of the friendliest learning spots on the coast. Certified instructors, radio helmet and full kit — most students are up on the board by lesson three.",
    highlights: ["IKO-certified instructors", "All gear included", "Beginner friendly"],
    bestTime: "Aug–Oct (kaskazi winds)",
    image: img(
      "/images/activities/act-hero.jpg",
      "White sand and turquoise water on the Watamu coastline",
      1400,
      1050,
    ),
  },
  {
    id: "act-005",
    slug: "mida-creek-bird-walk",
    title: "Mida Creek bird walk",
    category: "nature",
    location: "Mida Creek",
    duration: "2.5 hrs",
    priceNote: "per person",
    priceFromKes: 1_200,
    description:
      "Walk the boardwalk and mangrove channels of Mida Creek with a community guide — crab-eating monkeys, kingfishers, herons, and (in season) thousands of migratory waders from Eurasia.",
    highlights: ["Community-run", "Boardwalk + boat option", "Bird list provided"],
    bestTime: "Early morning; Nov–Apr migrants",
    image: img(
      "/images/activities/act-mida.jpg",
      "Mangrove channels and still water at Mida Creek, Watamu",
      1400,
      1050,
    ),
  },
  {
    id: "act-006",
    slug: "turtle-rescue-centre",
    title: "Turtle rescue centre visit",
    category: "nature",
    location: "Turtle Bay",
    duration: "1.5 hrs",
    priceNote: "per person",
    priceFromKes: 1_000,
    description:
      "Meet green and hawksbill turtles recovering in the rehab pools at Turtle Bay, hear how injured turtles are released, and learn what nesting season (Mar–Sep) looks like on these beaches.",
    highlights: ["Education session", "Kids love it", "Supports rehab work"],
    bestTime: "Year-round; nesting talks Mar–Sep",
    image: img(
      "/images/activities/act-dhow.jpg",
      "Coastal scene in Watamu, Kenya",
      1400,
      2100,
    ),
  },
  {
    id: "act-007",
    slug: "gedi-ruins-tour",
    title: "Gedi Ruins & Swahili history",
    category: "culture",
    location: "Gedi, Arabuko-Sokoke edge",
    duration: "3–4 hrs",
    priceNote: "per person",
    priceFromKes: 2_800,
    description:
      "Explore the 13th-century Swahili town of Gedi — mosques, palaces and a ghost town swallowed by forest — with a site guide who brings the coral-stone streets back to life.",
    highlights: ["Site guide included", "UNESCO-listed candidacy", "Combo forest option"],
    bestTime: "Morning, before the heat",
    image: img(
      "/images/activities/act-gedi.jpg",
      "Coral-stone walls of the Gedi Ruins near Watamu",
      1400,
      1050,
    ),
  },
  {
    id: "act-008",
    slug: "arabuko-sokoke-forest-trip",
    title: "Arabuko-Sokoke forest trip",
    category: "culture",
    location: "Arabuko-Sokoke Forest",
    duration: "Full day",
    priceNote: "per person",
    priceFromKes: 4_500,
    description:
      "East Africa's largest coastal forest: the Sokoke scops owl, golden-rumped elephant shrew, ancient mahogany trails and the mangrove boardwalk — paired with a Gedi Ruins stop.",
    highlights: ["Specialist bird guide", "Transfers included", "Small groups"],
    bestTime: "Year-round; best birding Nov–Apr",
    image: img(
      "/images/properties/coastal-ground.jpg",
      "Coastal trees and plants on sandy ground near the forest edge",
      1400,
      934,
    ),
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}

/** Format an activity price the way the cards show it. */
export function formatActivityPrice(a: Activity): string {
  return `From KES ${a.priceFromKes.toLocaleString("en-KE")} ${a.priceNote}`;
}

/** Server-side filter driven by ?category=sea|nature|culture. */
export function filterActivities(
  list: Activity[],
  params: { category?: string },
): Activity[] {
  if (!params.category) return list;
  return list.filter((a) => a.category === (params.category as ActivityCategory));
}

/** Prefilled WhatsApp message for booking an activity. */
export function activityWhatsappMessage(a: Activity): string {
  return `Hello Watamu Hub 👋 I'd like to book "${a.title}" (${a.location}). Is it available next week?`;
}
