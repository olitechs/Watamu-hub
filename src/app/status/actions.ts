"use server";

import { reportSchema } from "@/lib/report-schema";
import { getSupabaseServer } from "@/lib/supabase/server";

export interface SubmitReportResult {
  ok: boolean;
  /** False when Supabase isn't configured — the UI still succeeds + offers WhatsApp. */
  saved: boolean;
  errors?: Record<string, string[]>;
}

/**
 * Submit a Status Board entry (outage or "it's back on").
 *
 * Target table: `status_reports` with RLS allowing anon INSERT (matching
 * `property_enquiries`). When Supabase env vars are absent the action
 * reports saved=false and the client falls back to WhatsApp, so the report
 * is never lost — same contract as the property enquiry action.
 */
export async function submitReport(
  _prev: SubmitReportResult | null,
  formData: FormData,
): Promise<SubmitReportResult> {
  const parsed = reportSchema.safeParse({
    utility: formData.get("utility"),
    kind: formData.get("kind"),
    area: formData.get("area") ?? "",
    note: formData.get("note") ?? "",
    phone: formData.get("phone") ?? "",
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
    console.warn("[status] Supabase env not set; report not persisted.");
    return { ok: true, saved: false };
  }

  const { error } = await supabase.from("status_reports").insert({
    utility: parsed.data.utility,
    status: parsed.data.kind === "back" ? "restored" : "active",
    area: parsed.data.area,
    note: parsed.data.note || null,
    phone: parsed.data.phone || null,
    source: "status-page",
  });

  if (error) {
    console.error("[status] insert failed:", error.message);
    // Keep the user on the success screen with the WhatsApp fallback rather
    // than a dead form; the underlying error is logged server-side.
    return { ok: true, saved: false };
  }

  return { ok: true, saved: true };
}