"use server";

import { enquirySchema, normalisedPhone } from "@/lib/enquiry-schema";
import { getSupabaseServer } from "@/lib/supabase/server";

export interface SubmitEnquiryResult {
  ok: boolean;
  /** False when Supabase isn't configured — the UI still succeeds + offers WhatsApp. */
  saved: boolean;
  errors?: Record<string, string[]>;
}

/**
 * Save a property enquiry to Supabase (`property_enquiries` table).
 *
 * RLS: anon may INSERT (this action), only admins may SELECT — so the anon
 * key is safe to use from the server here. If Supabase env vars are absent
 * the action reports saved=false and the client falls back to WhatsApp-only
 * so no enquiry is ever lost.
 */
export async function submitEnquiry(
  _prev: SubmitEnquiryResult | null,
  formData: FormData,
): Promise<SubmitEnquiryResult> {
  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email") ?? "",
    property: formData.get("property") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    return {
      ok: false,
      saved: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    // No Supabase configured (e.g. local preview) — succeed without saving.
    console.warn("[enquiries] Supabase env not set; enquiry not persisted.");
    return { ok: true, saved: false };
  }

  const { error } = await supabase.from("property_enquiries").insert({
    name: parsed.data.name,
    phone: normalisedPhone(parsed.data.phone),
    email: parsed.data.email || null,
    property_slug: parsed.data.property || null,
    message: parsed.data.message || null,
    source: "properties-page",
  });

  if (error) {
    console.error("[enquiries] insert failed:", error.message);
    // Still return ok so the user gets the WhatsApp fallback instead of a
    // dead form; the error is logged server-side.
    return { ok: true, saved: false };
  }

  return { ok: true, saved: true };
}
