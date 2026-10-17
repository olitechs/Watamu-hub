import { z } from "zod";
import { isValidKenyanPhone } from "./phone";

/**
 * Status report validation, shared by the client form (instant feedback)
 * and the server action (authoritative check) — same pattern as
 * `enquirySchema`. Phone is optional; when present it must normalise to a
 * Kenyan number (used only to follow up on WhatsApp).
 */
export const reportSchema = z.object({
  utility: z.enum(["water", "power", "gas"], {
    message: "Pick water, power or gas",
  }),
  kind: z.enum(["outage", "back"], {
    message: "Tell us whether it's out or back on",
  }),
  area: z
    .string()
    .trim()
    .min(2, "Which area is this about?")
    .max(80, "Keep the area name under 80 characters"),
  note: z
    .string()
    .trim()
    .max(300, "Keep the note under 300 characters")
    .optional(),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || isValidKenyanPhone(v), "Enter a Kenyan number, e.g. 0712 345 678")
    .optional(),
});

export type ReportInput = z.input<typeof reportSchema>;
export type ReportValues = z.output<typeof reportSchema>;