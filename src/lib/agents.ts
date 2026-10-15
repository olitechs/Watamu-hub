/**
 * Typed mock data for the /properties agent profiles.
 *
 * These are FICTIONAL demo agents (not real people) with placeholder
 * monogram avatars — no photos of real individuals are used. Replace with
 * real team data (or a Supabase `agents` table) before going live.
 */

export interface Agent {
  id: string;
  name: string;
  /** Two-letter monogram used for the generated avatar. */
  initials: string;
  role: string;
  languages: string[];
  /** Watamu areas this agent covers. */
  areas: string[];
  /** Short one-liner shown under the role. */
  blurb: string;
  /** Digits-only number with country code for wa.me links. */
  whatsappNumber: string;
}

export const agents: Agent[] = [
  {
    id: "agent-001",
    name: "Asha M.",
    initials: "AM",
    role: "Beachfront specialist",
    languages: ["English", "Kiswahili", "German"],
    areas: ["Watamu Beach", "Turtle Bay"],
    blurb: "Sells the sand-line villas — knows every tide table and title deed on the beach strip.",
    whatsappNumber: "254745043121",
  },
  {
    id: "agent-002",
    name: "Juma K.",
    initials: "JK",
    role: "Land & plots advisor",
    languages: ["English", "Kiswahili"],
    areas: ["Mida Creek", "Local Ocean"],
    blurb: "Guides buyers through title searches, surveyors and county approvals without the runaround.",
    whatsappNumber: "254745043121",
  },
  {
    id: "agent-003",
    name: "Neema T.",
    initials: "NT",
    role: "Rentals & holiday homes",
    languages: ["English", "Kiswahili", "Italian"],
    areas: ["Blue Lagoon", "Watamu Beach"],
    blurb: "Matches seasonal renters with furnished homes and handles viewings end to end.",
    whatsappNumber: "254745043121",
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
