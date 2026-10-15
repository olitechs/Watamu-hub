/**
 * Typed mock data for the /properties module.
 *
 * All listings are DEMO data: fictional properties with placeholder
 * photography (Pexels, free licence — see credits in docs/PROPERTIES.md).
 * Prices are realistic for the Watamu market, quoted in KES.
 *
 * To move to Supabase: keep the `Property` type, swap the exports for a
 * query against a `properties` table (see docs/PROPERTIES.md).
 */

export type ListingStatus = "for-sale" | "for-rent" | "just-listed";
export type PropertyType = "villa" | "house" | "apartment" | "land";

export interface PropertyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tiny base64 JPEG used as a blur-up placeholder while the image loads. */
  blurDataURL: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  /** Watamu neighbourhood, e.g. "Turtle Bay". */
  area: string;
  type: PropertyType;
  status: ListingStatus;
  /** Monthly rent in KES when status is for-rent, sale price otherwise. */
  priceKes: number;
  /** True for rentals — price displays "/ month". */
  isMonthly: boolean;
  beds: number | null; // null for land plots
  baths: number | null;
  /** Interior size in square metres. */
  sizeSqm: number;
  /** Short feature chips shown on the card. */
  features: string[];
  /** One-paragraph description for the detail page. */
  description: string;
  /** Has a virtual tour (shows the 360° badge + tour preview). */
  hasVirtualTour: boolean;
  /** Stable slug for /properties/[slug]; also used for enquiry prefill. */
  agentId: string;
  image: PropertyImage;
}

/** Format a KES amount the way Watamu agencies quote it: 12,500,000 → "KES 12.5M". */
export function formatKes(priceKes: number, isMonthly = false): string {
  const suffix = isMonthly ? "/ month" : "";
  if (priceKes >= 1_000_000) {
    const millions = priceKes / 1_000_000;
    const rounded = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1);
    return `KES ${rounded}M${suffix}`;
  }
  return `KES ${priceKes.toLocaleString("en-KE")}${suffix}`;
}

export const properties: Property[] = [
  {
    id: "prop-001",
    slug: "kaskazi-beach-villa",
    title: "Kaskazi beachfront villa",
    area: "Watamu Beach",
    type: "villa",
    status: "for-sale",
    priceKes: 42_000_000,
    isMonthly: false,
    beds: 4,
    baths: 4,
    sizeSqm: 320,
    features: ["Oceanfront", "Pool", "Staff quarter", "Solar backup"],
    description:
      "A four-bedroom villa sitting directly on the Watamu Beach sand line, with an infinity pool facing the Indian Ocean, mature coconut gardens, and staff accommodation. Ten minutes by dhow from the Marine Park channels.",
    hasVirtualTour: true,
    agentId: "agent-001",
    image: {
      src: "/images/properties/villa-pool.jpg",
      alt: "White-walled beachfront villa with a pool framed by palms at dusk",
      width: 1400,
      height: 934,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAeQABAAMBAQAAAAAAAAAAAAAABAEDAgYFAQEBAQAAAAAAAAAAAAAAAAABAgQQAyECAwUFCQEAAAAAAAAAAAECAwQAETETIRIFgUFRItKisdGRNOJhUlNUEQABBAAFBQEAAAAAAAAAAAABABEDAkGhE1ORsTLiIeNx/8AAEQgADQAUAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8A8p3U4zTnQ1fLeSRXFRCxjZVNu0T2kDrSnkhDgiSkJUCMiC3wOVWQlVOFsjCYS0wqCr7EmvdKQ4zRIDNAmzmGG/Dl44yOK9CT3B/w5OrlNzQM1mOPrMA9EpTsCk+lePzRzwM4v4H+R7yc6Jovkbm6bR0zF8j8+17ZfrybluPJZmhXYh5+a//Z",
    },
  },
  {
    id: "prop-002",
    slug: "mida-creek-view-plot",
    title: "Mida Creek view plot",
    area: "Mida Creek",
    type: "land",
    status: "for-sale",
    priceKes: 3_900_000,
    isMonthly: false,
    beds: null,
    baths: null,
    sizeSqm: 4_000,
    features: ["0.5 acre", "Creek view", "Title deed ready", "Water on plot"],
    description:
      "A half-acre titled plot on the Mida Creek side of Watamu, gently elevated with sunset views over the mangroves. Power and water connections at the boundary; building plans available on request.",
    hasVirtualTour: false,
    agentId: "agent-002",
    image: {
      src: "/images/properties/coastal-ground.jpg",
      alt: "Sandy coastal plot with palms and low greenery under a bright sky",
      width: 1400,
      height: 934,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAagABAQEBAAAAAAAAAAAAAAAABgIHBQEBAQAAAAAAAAAAAAAAAAAAAQQQAAIABAQFBQEBAAAAAAAAAAECABEhAzFBBgQSYQVRE5RxFBWh0WMRAAICAwEAAAAAAAAAAAAAAAACEgETQTER/8AAEQgADQAUAwEiAAIRAAMRAP/aAAwDAQACEQMRAD8ALbfUvWbbtJ2vUwZQy0OIpnyhTtdZ38L+0BJnVONcswQ0aiUVsQO+GEci70zbO5uFAGJmSFWvvMGcR27Vwph7sMrqL5IDi3etZFfDduCYzDKBQ8xOL+7P+3pb/wDIXKPGOEGnIKPwACL4j3hyMMD/2Q==",
    },
  },
  {
    id: "prop-003",
    slug: "turtle-bay-garden-villa",
    title: "Turtle Bay garden villa",
    area: "Turtle Bay",
    type: "villa",
    status: "just-listed",
    priceKes: 24_500_000,
    isMonthly: false,
    beds: 3,
    baths: 3,
    sizeSqm: 240,
    features: ["200m to beach", "Tropical garden", "Generator", "Fenced"],
    description:
      "A calm three-bedroom villa set back 200 metres from Turtle Bay behind a mature tropical garden. Open-plan living opens onto a covered terrace; borehole water, standby generator and a fully fenced compound.",
    hasVirtualTour: true,
    agentId: "agent-001",
    image: {
      src: "/images/properties/thatch-cottage.jpg",
      alt: "Thatched-roof villa behind palm trees on a sandy lane",
      width: 1400,
      height: 880,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAeQAAAwEBAQEAAAAAAAAAAAAABQMCBAcGAQEAAwEBAAAAAAAAAAAAAAAAAwEEAAUQAAEDAwIDBQkBAAAAAAAAAAEAAhExIQMTBBIFQVEUIoFxkoOTcjLhYbFCVBEAAgECBwEAAAAAAAAAAAAAAAECgVFSkTESEQPwMv/AABEIABIAFAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AAxvE+BBcSRSfICDefWq+noZ2tyDM14diPjJHhaTQSLT1uYgo8OTbZGiNviaB/TBwuEXsbRfqo2v5ZlD5pME6paaCzjMEz+IQHF2JFLqa+1kwNwbrbMadbC97y4mQ40gRIixNfNVd95f/my+19kRDDyc0v79boco7D8cp8SsbfHFH1AMxOc8DiJd6mf2u2jGnUlrfqPQJNvRq9tnTJ85VZylpKhcbG1ksntK11UqYA//2Q==",
    },
  },
  {
    id: "prop-004",
    slug: "blue-lagoon-sea-view-apartment",
    title: "Blue Lagoon sea-view apartment",
    area: "Blue Lagoon",
    type: "apartment",
    status: "for-rent",
    priceKes: 145_000,
    isMonthly: true,
    beds: 2,
    baths: 2,
    sizeSqm: 130,
    features: ["Sea view", "Fully furnished", "WiFi ready", "Shared pool"],
    description:
      "A furnished two-bedroom apartment above the Blue Lagoon channel with wide sea views from the balcony. Ideal for a season-by-the-ocean workation: fibre WiFi at the door, shared pool, housekeeping optional.",
    hasVirtualTour: false,
    agentId: "agent-003",
    image: {
      src: "/images/properties/living-pool.jpg",
      alt: "Bright living room looking out to a pool and tropical greenery",
      width: 1400,
      height: 934,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAegAAAwEBAQEAAAAAAAAAAAAABgIEAQADBQEAAwEBAAAAAAAAAAAAAAAAAwEEAAUQAAEDAwIDBQkBAAAAAAAAAAEAAhExIQMTBBIFQVEUIoFxkoOTcjLhYbFCVBEAAgECBwEAAAAAAAAAAAAAAAECgVFSkTESEQPwMv/AABEIABIAFAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AAxvE+BBcSRSfICDefWq+noZ2tyDM14diPjJHhaTQSLT1uYgo8OTbZGiNviaB/TBwuEXsbRfqo2v5ZlD5pME6paaCzjMEz+IQHF2JFLqa+1kwNwbrbMadbC97y4mQ40gRIixNfNVd95f/my+19kRDDyc0v79boco7D8cp8SsbfHFH1AMxOc8DiJd6mf2u2jGnUlrfqPQJNvRq9tnTJ85VZylpKhcbG1ksntK11UqYA//2Q==",
    },
  },
  {
    id: "prop-005",
    slug: "local-ocean-surf-house",
    title: "Local Ocean surf house",
    area: "Local Ocean",
    type: "house",
    status: "for-sale",
    priceKes: 18_750_000,
    isMonthly: false,
    beds: 3,
    baths: 2,
    sizeSqm: 195,
    features: ["Walk to surf", "Roof terrace", "Borehole", "Cozy garden"],
    description:
      "A characterful three-bedroom surf house two minutes' walk from the Local Ocean break. Rooftop terrace for sundowners, outdoor shower, borehole water and a cosy bougainvillea garden.",
    hasVirtualTour: false,
    agentId: "agent-002",
    image: {
      src: "/images/properties/palm-dunes.jpg",
      alt: "Palm tree leaning over pale sand dunes near the shore",
      width: 1400,
      height: 1854,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAeQAAAwEBAQEAAAAAAAAAAAAABQMCBAcGAQEAAwEBAAAAAAAAAAAAAAAAAwEEAAUQAAEDAwIDBQkBAAAAAAAAAAEAAhExIQMTBBIFQVEUIoFxkoOTcjLhYbFCVBEAAgECBwEAAAAAAAAAAAAAAAECgVFSkTESEQPwMv/AABEIABIAFAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AAxvE+BBcSRSfICDefWq+noZ2tyDM14diPjJHhaTQSLT1uYgo8OTbZGiNviaB/TBwuEXsbRfqo2v5ZlD5pME6paaCzjMEz+IQHF2JFLqa+1kwNwbrbMadbC97y4mQ40gRIixNfNVd95f/my+19kRDDyc0v79boco7D8cp8SsbfHFH1AMxOc8DiJd6mf2u2jGnUlrfqPQJNvRq9tnTJ85VZylpKhcbG1ksntK11UqYA//2Q==",
    },
  },
  {
    id: "prop-006",
    slug: "jacana-bay-beach-house",
    title: "Jacana bay beach house",
    area: "Watamu Beach",
    type: "house",
    status: "for-sale",
    priceKes: 31_200_000,
    isMonthly: false,
    beds: 5,
    baths: 4,
    sizeSqm: 410,
    features: ["Beach access", "Two floors", "Cottage", "Mature trees"],
    description:
      "A generous five-bedroom family beach house a short barefoot walk from the sand at Jacana Bay, with a separate one-bedroom cottage, mature shade trees and a wide veranda built for long lunches.",
    hasVirtualTour: true,
    agentId: "agent-003",
    image: {
      src: "/images/properties/aerial-houses.jpg",
      alt: "Aerial view of beach houses nestled among palms near the shore",
      width: 1400,
      height: 1246,
      blurDataURL:
        "/9j//gARTGF2YzU4LjEzNC4xMDAA/9sAQwAIDAwODA4QEBAQEBATEhMUFBQTExMTFBQUFRUVGRkZFRUVFBQVFRgYGRkbHBsaGhkaHBweHh4kJCIiKiorMzM+/8QAegAAAwEBAQEAAAAAAAAAAAAABgIEAQADBQEAAwEBAAAAAAAAAAAAAAAAAwEEAAUQAAEDAwIDBQkBAAAAAAAAAAEAAhExIQMTBBIFQVEUIoFxkoOTcjLhYbFCVBEAAgECBwEAAAAAAAAAAAAAAAECgVFSkTESEQPwMv/AABEIABIAFAMBIgACEQADEQD/2gAMAwEAAhEDEQA/AAxvE+BBcSRSfICDefWq+noZ2tyDM14diPjJHhaTQSLT1uYgo8OTbZGiNviaB/TBwuEXsbRfqo2v5ZlD5pME6paaCzjMEz+IQHF2JFLqa+1kwNwbrbMadbC97y4mQ40gRIixNfNVd95f/my+19kRDDyc0v79boco7D8cp8SsbfHFH1AMxOc8DiJd6mf2u2jGnUlrfqPQJNvRq9tnTJ85VZylpKhcbG1ksntK11UqYA//2Q==",
    },
  },
];

export const featuredProperties = properties;

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

/** Areas used by the hero search bar — keep in sync with the data above. */
export const watamuAreas = [
  "Watamu Beach",
  "Turtle Bay",
  "Blue Lagoon",
  "Mida Creek",
  "Local Ocean",
] as const;

export const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "land", label: "Land" },
];

/** Budget bands for the hero search bar, in KES. */
export const budgetBands: { value: string; label: string; min?: number; max?: number }[] = [
  { value: "under-5m", label: "Under KES 5M", max: 5_000_000 },
  { value: "5m-20m", label: "KES 5M – 20M", min: 5_000_000, max: 20_000_000 },
  { value: "20m-plus", label: "KES 20M+", min: 20_000_000 },
  { value: "rent-under-150k", label: "Rent under KES 150k / month", max: 150_000 },
];

/**
 * Server-side filter used by /properties based on the search bar's
 * query string (?area=…&type=…&budget=…).
 */
export function filterProperties(
  list: Property[],
  params: { area?: string; type?: string; budget?: string },
): Property[] {
  return list.filter((p) => {
    if (params.area && p.area !== params.area) return false;
    if (params.type && p.type !== (params.type as PropertyType)) return false;
    if (params.budget) {
      const band = budgetBands.find((b) => b.value === params.budget);
      if (band) {
        if (band.max !== undefined && p.priceKes > band.max) return false;
        if (band.min !== undefined && p.priceKes < band.min) return false;
        // Rentals band only matches rentals; sale bands only match sale prices.
        if (band.value === "rent-under-150k" && !p.isMonthly) return false;
        if (band.value !== "rent-under-150k" && p.isMonthly) return false;
      }
    }
    return true;
  });
}
