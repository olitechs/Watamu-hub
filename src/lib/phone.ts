/**
 * Kenyan phone-number normalisation (README: "Phone numbers are normalised
 * to +254 format and used only for click-to-chat links").
 *
 * Accepts the shapes people actually type:
 *   0712 345 678 · 0110 123 456 · 712 345 678 · 254712345678 · +254 712 345 678
 * Returns E.164 `+2547XXXXXXXX`, or null when the input is not a valid
 * Kenyan mobile number.
 */

const KENYA_MOBILE = /^[17]\d{8}$/; // 9 digits, starts with 7 or 1

export function normaliseKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 9) return null;

  let national = digits;
  if (national.startsWith("254")) {
    national = national.slice(3);
  } else if (national.startsWith("0")) {
    national = national.slice(1);
  }

  if (!KENYA_MOBILE.test(national)) return null;
  return `+254${national}`;
}

/** Same as above but for wa.me links: digits only, no `+`. */
export function whatsappReadyPhone(raw: string): string | null {
  const normalised = normaliseKenyanPhone(raw);
  return normalised ? normalised.slice(1) : null;
}

export function isValidKenyanPhone(raw: string): boolean {
  return normaliseKenyanPhone(raw) !== null;
}
