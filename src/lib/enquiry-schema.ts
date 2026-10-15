import { z } from "zod";
import { isValidKenyanPhone, normaliseKenyanPhone } from "./phone";

/**
 * Enquiry validation, shared by the client form (instant feedback) and the
 * server action (authoritative check). Phone numbers must normalise to
 * +254; email is optional but format-checked when present.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name")
    .max(120, "That name is a little long"),
  phone: z
    .string()
    .trim()
    .min(1, "Please add a phone number")
    .refine(isValidKenyanPhone, "Enter a Kenyan number, e.g. 0712 345 678"),
  email: z
    .string()
    .trim()
    .email("That email doesn't look right")
    .or(z.literal(""))
    .optional(),
  property: z.string().optional(),
  message: z
    .string()
    .trim()
    .max(1000, "Keep the message under 1000 characters")
    .optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  property: string;
  message: string;
};

export const emptyEnquiry: EnquiryValues = {
  name: "",
  phone: "",
  email: "",
  property: "",
  message: "",
};

/** Normalise phone for storage/WhatsApp once the schema has approved it. */
export function normalisedPhone(raw: string): string {
  return normaliseKenyanPhone(raw) ?? raw;
}
