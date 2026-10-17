/**
 * Status Board seed data — typed mock data, same approach as
 * `src/lib/properties.ts` (swap for Supabase queries when env vars land;
 * the shape is the row shape).
 *
 * Each report carries a time-to-live so the board can demonstrate the
 * README's "entries expire automatically" behaviour: `ReportList` drops any
 * report whose window has passed, with no cron needed for the demo.
 *
 * Content is illustrative demo content for Watamu — where anything is
 * factual (utility behaviour, vendor names) it is marked `// TODO verify`.
 */

export type Utility = "water" | "power" | "gas";

export type ReportStatus = "active" | "restored";

export interface OutageReport {
  id: string;
  utility: Utility;
  /** Place name people actually use, e.g. "Turtle Bay". */
  area: string;
  status: ReportStatus;
  note: string;
  /** Hours since the report was last confirmed (seed value). */
  ageHours: number;
  /** Report drops off the board once `ageHours` (live) passes this. */
  ttlHours: number;
}

export interface Vendor {
  id: string;
  name: string;
  /** One-line service, e.g. "LPG cylinder exchange & delivery". */
  service: string;
  area: string;
  delivers: string[];
  note: string;
}

export const utilityMeta: Record<
  Utility,
  { label: string; blurb: string; okLine: string }
> = {
  water: {
    label: "Water",
    blurb: "Municipal supply and borehole deliveries",
    okLine: "Supply running normally",
  },
  power: {
    label: "Power",
    blurb: "KPLC mains and local transformers",
    okLine: "No outages reported",
  },
  gas: {
    label: "Gas",
    blurb: "LPG refills and cylinder exchange",
    okLine: "Refills available across town",
  },
};

/**
 * TODO verify: confirm each report with the local utility before going live.
 * Reports older than their TTL disappear automatically.
 */
export const outageReports: OutageReport[] = [
  {
    id: "rep-kplc-jacaranda",
    utility: "power",
    area: "Jacaranda & Watamu town",
    status: "active",
    note: "Feeder line down after last night's storm. KPLC crew reported on site; no ETA yet.",
    ageHours: 3,
    ttlHours: 8,
  },
  {
    id: "rep-water-turtle-bay",
    utility: "water",
    area: "Turtle Bay",
    status: "active",
    note: "Low pressure since early morning — tanks should refill when the supply recovers.",
    ageHours: 6,
    ttlHours: 12,
  },
  {
    id: "rep-water-mida-lane",
    utility: "water",
    area: "Mida lane & Araha",
    status: "restored",
    note: "Supply back — let your tank fill before the evening, the district sometimes runs night shut-offs.",
    ageHours: 2,
    ttlHours: 10,
  },
  {
    id: "rep-gas-delivery-delay",
    utility: "gas",
    area: "Watamu town",
    status: "active",
    note: "Two delivery vans broken down — expect slower LPG cylinder exchange until tomorrow.",
    ageHours: 8,
    ttlHours: 14,
  },
];

/**
 * Who delivers. Contacts route through the agency line so demo data never
 * exposes personal numbers. `// TODO verify` — confirm each vendor.
 */
export const vendors: Vendor[] = [
  {
    id: "vend-kilifi-gas",
    name: "Kilifi Gas Express",
    service: "LPG cylinder exchange & delivery",
    area: "Watamu · Malindi · Garoda",
    delivers: ["13kg & 6kg cylinders", "Home & villa delivery", "Same day within town"],
    note: "Brings refill and swaps your empty cylinder on the spot.",
  },
  {
    id: "vend-mida-water",
    name: "Mida Water Tankers",
    service: "Borehole trucked water",
    area: "Watamu, Mida and Araha",
    delivers: ["5,000L & 10,000L tankers", "Villa pool top-ups", "Dry-season standing orders"],
    note: "Useful when the mains supply is out for more than a day.",
  },
  {
    id: "vend-watamu-ice",
    name: "Watamu Ice Works",
    service: "Block & packet ice delivery",
    area: "Watamu town, Fish Market road",
    delivers: ["20kg blocks", "Packet ice", "Daily market deliveries"],
    note: "Fishermen and villa kitchens — order before noon for same-day drops.",
  },
  {
    id: "vend-coast-power",
    name: "Coast Power Solutions",
    service: "Generator hire & emergency electricians",
    area: "Kilifi County, covers Watamu",
    delivers: ["Portable generators", "Fault finding", "Storm damage repairs"],
    note: "The call to make when the feeder line stays down after dark.",
  },
];

export type UtilityOverview = {
  status: "ok" | "outage";
  headline: string;
};

/**
 * Overview chip per utility, computed from reports that are still inside
 * their TTL (expired ones are ignored, so the chip self-heals over time).
 */
export function utilityOverview(
  reports: OutageReport[] = outageReports,
): Record<Utility, UtilityOverview> {
  const fresh = reports.filter((r) => r.ageHours < r.ttlHours);
  const out: Record<Utility, UtilityOverview> = {
    water: { status: "ok", headline: utilityMeta.water.okLine },
    power: { status: "ok", headline: utilityMeta.power.okLine },
    gas: { status: "ok", headline: utilityMeta.gas.okLine },
  };
  for (const r of fresh) {
    if (r.status !== "active") continue;
    out[r.utility] = {
      status: "outage",
      headline: `${utilityMeta[r.utility].label} outage reported — ${r.area}`,
    };
  }
  return out;
}

/** Human label for a report's age, derived from the seed value. */
export function ageLabel(ageHours: number): string {
  if (ageHours < 1) return "just now";
  if (ageHours === 1) return "1 hr ago";
  if (ageHours < 24) return `${ageHours} hrs ago`;
  const days = Math.round(ageHours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}