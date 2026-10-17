/**
 * WhatsApp click-to-chat helpers.
 *
 * Watamu Hub never pays for WhatsApp — every "chat" action is a plain
 * https://wa.me/<number>?text=<prefilled> link that opens the app.
 *
 * Replace WHATSAPP_NUMBER with the agency's real number when going live
 * (digits only, country code, no `+`).
 */

export const WHATSAPP_NUMBER = "254745043121";

/**
 * Build a wa.me deep link with a prefilled message.
 * @param message plain-text message, URL-encoded automatically
 * @param number digits-only number with country code (default: agency line)
 */
export function whatsappLink(message: string, number: string = WHATSAPP_NUMBER): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

/** Generic "I found you on Watamu Hub" opener for a property. */
export function propertyWhatsappMessage(title: string, area: string): string {
  return `Hello Watamu Hub 👋 I'm interested in "${title}" in ${area}. Is it still available? I found it on your properties page.`;
}

/** Prefilled Status Board report (outage / back-on) for the WhatsApp fallback. */
export function statusWhatsappMessage(details: {
  utility: "water" | "power" | "gas";
  kind: "outage" | "back";
  area: string;
  note?: string;
  phone?: string;
}): string {
  const label = details.utility === "gas" ? "gas (LPG)" : details.utility;
  const headline =
    details.kind === "back"
      ? `Hello Watamu Hub 👋 Heads up: ${label} is back on in ${details.area}.`
      : `Hello Watamu Hub 👋 Heads up: ${label} is OUT in ${details.area}.`;
  const lines = [headline];
  if (details.note) lines.push("", details.note);
  if (details.phone) lines.push("", `My number: ${details.phone}`);
  return lines.join("\n");
}

/** Prefilled enquiry summary used by the "Continue on WhatsApp" fallback. */
export function enquiryWhatsappMessage(details: {
  name: string;
  phone: string;
  email?: string;
  property?: string;
  message?: string;
}): string {
  const lines = [
    "Hello Watamu Hub 👋 I'd like to enquire about a property.",
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
  ];
  if (details.email) lines.push(`Email: ${details.email}`);
  if (details.property) lines.push(`Interested in: ${details.property}`);
  if (details.message) lines.push("", `"${details.message}"`);
  return lines.join("\n");
}
