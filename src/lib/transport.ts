/**
 * Transport Guide seed data — typed mock data, same pattern as
 * `src/lib/properties.ts` (swap for Supabase queries when env vars land).
 *
 * Prices are indicative demo figures for the Watamu / Malindi / Marafa
 * area in Kenyan Shillings and are marked `// TODO verify` — walk the
 * rank and confirm with the drivers' association before going live.
 */

export type RoadMode = "tuk-tuk" | "boda" | "taxi";

export interface RoadRoute {
  id: string;
  from: string;
  to: string;
  /** Typical ride time in traffic. */
  time: string;
  /** TODO verify — indicative KES fares agreed before you ride. */
  fares: Record<RoadMode, string>;
  note?: string;
}

export interface BoatRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  time: string;
  /** TODO verify — indicative KES price, private hire unless noted. */
  price: string;
  note?: string;
}

export interface ModeCard {
  id: RoadMode | "boat";
  title: string;
  tagline: string;
  /** Indicative price line for the summary card. */
  range: string;
  tips: string[];
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  base: string;
  languages: string;
  note: string;
}

// TODO verify every fare and contact below with local operators.
export const roadRoutes: RoadRoute[] = [
  {
    id: "town-turtle-bay",
    from: "Watamu town",
    to: "Turtle Bay / Marine Park gate",
    time: "10 min",
    fares: { "tuk-tuk": "200–300", boda: "150–200", taxi: "500" },
  },
  {
    id: "town-jacaranda",
    from: "Watamu town",
    to: "Jacaranda & Mida lane",
    time: "10–15 min",
    fares: { "tuk-tuk": "250–350", boda: "150–250", taxi: "600" },
  },
  {
    id: "town-araha",
    from: "Watamu town",
    to: "Araha Bay",
    time: "15 min",
    fares: { "tuk-tuk": "300–400", boda: "250", taxi: "700" },
  },
  {
    id: "town-mida",
    from: "Watamu town",
    to: "Mida Creek bridge",
    time: "20 min",
    fares: { "tuk-tuk": "400–500", boda: "300", taxi: "800" },
    note: "Add a little after dark — the last stretch has no lighting.",
  },
  {
    id: "watamu-malindi",
    from: "Watamu",
    to: "Malindi town",
    time: "40–50 min",
    fares: { "tuk-tuk": "1,000–1,300", boda: "700–900", taxi: "2,000–2,500" },
    note: "Agree the full price before you set off; tolls included.",
  },
  {
    id: "watamu-kilifi",
    from: "Watamu",
    to: "Kilifi town",
    time: "45 min",
    fares: { "tuk-tuk": "1,200", boda: "900", taxi: "2,500" },
    note: "Long tuk-tuk runs — bring water and agree a stop if you need one.",
  },
];

// TODO verify — private hire unless noted; snorkel transfers book via the hub.
export const boatRoutes: BoatRoute[] = [
  {
    id: "mida-cruise",
    name: "Mida Creek water taxi",
    from: "Watamu jetty",
    to: "Mida Creek mouth",
    time: "20 min",
    price: "800–1,200",
    note: "Per boat, up to 6 people — best at sunset.",
  },
  {
    id: "sandbank-shuttle",
    name: "Sandbank shuttle",
    from: "Watamu Bay",
    to: "Shelly Beach sandbank",
    time: "25 min",
    price: "2,500–3,500",
    note: "Return trip, shared with other guests when scheduled.",
  },
  {
    id: "malindi-transfer",
    name: "Coast transfer by boat",
    from: "Watamu",
    to: "Malindi",
    time: "1h 15m",
    price: "6,000–8,000",
    note: "Private hire; sea state decides the day — morning is calmest.",
  },
];

export const modeCards: ModeCard[] = [
  {
    id: "tuk-tuk",
    title: "Tuk-tuk",
    tagline: "Three wheels, fixed short-run prices, the town default",
    range: "Town hops from KES 200 · Watamu ↔ Malindi KES 1,000+",
    tips: [
      "Agree the price before you climb in — short hops are fixed.",
      "Small notes and coins make the change painless.",
      "Night runs add a little; settle it before you leave.",
    ],
  },
  {
    id: "boda",
    title: "Boda boda",
    tagline: "Fastest way through traffic, helmet on",
    range: "Town hops from KES 150 · Watamu ↔ Malindi KES 700+",
    tips: [
      "Ask for a helmet — a rider who refuses is a no-go.",
      "Agree whether the price is per rider or per pair.",
      "Keep your bag between you and the rider.",
    ],
  },
  {
    id: "taxi",
    title: "Taxi & private car",
    tagline: "Door to door with luggage, air-con for the coast road",
    range: "Town hops from KES 500 · Watamu ↔ Malindi KES 2,000+",
    tips: [
      "Confirm the fare or meter terms at pickup, not at the drop-off.",
      "For the airport, book the night before — morning slots go early.",
      "Day trips to Gedi or Arabuko-Sokoke work out cheaper hourly.",
    ],
  },
  {
    id: "boat",
    title: "Boat trips & transfers",
    tagline: "Creek taxis, sandbank shuttles and charters",
    range: "Creek water taxi from KES 800 · full-day charter by request",
    tips: [
      "Morning water is calmer — ask for the first slot in rough weeks.",
      "Confirm life jackets for everyone before leaving the jetty.",
      "Weather calls are final: a good captain turns back.",
    ],
  },
];

/**
 * Drivers people ask for by name. Contacts route through the agency line so
 * the demo never exposes personal numbers.
 * // TODO verify — confirm each driver with the local association.
 */
export const drivers: Driver[] = [
  {
    id: "drv-tuk-bwana",
    name: "Bwana Tuk Tuk (Ali)",
    vehicle: "Tuk-tuk · town & Malindi runs",
    base: "Watamu town rank, next to the market",
    languages: "English · Kiswahili",
    note: "Villagers' regular for airport runs — patient with luggage.",
  },
  {
    id: "drv-boda-kilifi",
    name: "Mwanaisha Boda",
    vehicle: "Boda boda · Watamu, Mida & Araha",
    base: "Watamu town stage",
    languages: "Kiswahili · basic English",
    note: "Knows every shortcut to Mida Creek; helmet always on.",
  },
  {
    id: "drv-taxi-coast",
    name: "Coast Driver (Juma)",
    vehicle: "Private car · villas, airport, day trips",
    base: "Mobile — books through the hub",
    languages: "English · Kiswahili · German (basic)",
    note: "The name villas mention for 4am airport transfers.",
  },
];