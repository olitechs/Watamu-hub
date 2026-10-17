"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitReport, type SubmitReportResult } from "@/app/status/actions";
import {
  reportSchema,
  type ReportValues,
} from "@/lib/report-schema";
import { statusWhatsappMessage } from "@/lib/whatsapp";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FormState = (SubmitReportResult & { values: ReportValues }) | null;

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-night placeholder:text-night/40 transition-colors focus:outline-none";

function fieldClass(invalid: boolean) {
  return cn(
    inputBase,
    invalid
      ? "border-coral focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/30"
      : "border-night/15 focus-visible:border-lagoon focus-visible:ring-2 focus-visible:ring-lagoon/25",
  );
}

/**
 * Status Board report form — Zod-validated on both sides, saves to
 * Supabase `status_reports` when configured, otherwise falls back to a
 * prefilled WhatsApp message. Same accessibility contract as
 * `EnquiryForm`: labelled inputs, aria-invalid, role=alert errors, live
 * status region.
 */
export function ReportForm() {
  const [state, formAction, pending] = useActionState(submitReport, null);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>(
    {},
  );
  const [submitted, setSubmitted] = useState<FormState>(null);

  const result = state as SubmitReportResult | null;
  const valuesForWhatsApp = submitted?.values;

  function onSubmit() {
    const form = document.getElementById("report-form") as HTMLFormElement | null;
    if (!form) return;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    const parsed = reportSchema.safeParse({
      utility: fd.get("utility"),
      kind: fd.get("kind"),
      area: get("area"),
      note: get("note"),
      phone: get("phone"),
    });
    const errs: Record<string, string> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errs[key]) errs[key] = issue.message;
      }
    }
    setClientErrors(errs);
    setSubmitted({
      ok: false,
      saved: false,
      values: {
        utility: parsed.success
          ? parsed.data.utility
          : (fd.get("utility") as ReportValues["utility"]),
        kind: parsed.success
          ? parsed.data.kind
          : (fd.get("kind") as ReportValues["kind"]),
        area: get("area"),
        note: get("note"),
        phone: get("phone"),
      },
    });
  }

  const serverErrors = result?.errors;
  const errorFor = (field: string) =>
    clientErrors[field] ?? serverErrors?.[field]?.[0];

  if (result?.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-mangrove/30 bg-mangrove/8 p-8 text-center"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-mangrove" />
        <h3 className="mt-4 font-heading text-2xl font-semibold text-night">
          {result.saved ? "Thanks — report received!" : "Thanks — noted!"}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-night/70">
          {result.saved
            ? "It will show on the board as soon as it's approved — usually within minutes."
            : "We couldn't reach our database just now, so share it on WhatsApp instead — your details are prefilled."}
        </p>
        {valuesForWhatsApp && !result.saved && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(statusWhatsappMessage(valuesForWhatsApp))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-mangrove px-6 py-3 font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Continue on WhatsApp
            </a>
            <Link
              href="/status"
              className="rounded-full border border-night/15 px-6 py-3 font-semibold text-night transition-colors hover:bg-night/5"
            >
              Back to the board
            </Link>
          </div>
        )}
        {result.saved && (
          <div className="mt-6">
            <Link
              href="/status"
              className="inline-flex rounded-full border border-night/15 px-6 py-3 font-semibold text-night transition-colors hover:bg-night/5"
            >
              Back to the board
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      id="report-form"
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)] sm:p-8"
      aria-describedby="report-intro"
    >
      <p id="report-intro" className="sr-only">
        Report an outage or confirm a supply is back. Area and kind are
        required; your phone number is optional and normalised to +254.
      </p>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-sm font-semibold text-night">
          What&apos;s happening? <span aria-hidden className="text-coral">*</span>
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["outage", "It's out — no water / power / gas"],
              ["back", "It's back on — restored supply"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-night transition-colors",
                errorFor("kind")
                  ? "border-coral/60"
                  : "border-night/15 hover:border-lagoon/50",
              )}
            >
              <input
                type="radio"
                name="kind"
                value={value}
                defaultChecked={value === "outage"}
                className="size-4 accent-[var(--color-lagoon)]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        {errorFor("kind") && (
          <p role="alert" className="text-sm text-coral">
            {errorFor("kind")}
          </p>
        )}
      </fieldset>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="utility" className="text-sm font-semibold text-night">
            Utility <span aria-hidden className="text-coral">*</span>
          </label>
          <select
            id="utility"
            name="utility"
            defaultValue="water"
            aria-invalid={Boolean(errorFor("utility"))}
            className={fieldClass(Boolean(errorFor("utility")))}
          >
            <option value="water">Water</option>
            <option value="power">Power</option>
            <option value="gas">Gas (LPG)</option>
          </select>
          {errorFor("utility") && (
            <p role="alert" className="text-sm text-coral">
              {errorFor("utility")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-night">
            Phone{" "}
            <span className="text-xs font-normal text-night/50">
              (optional)
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errorFor("phone"))}
            aria-describedby={errorFor("phone") ? "report-phone-error" : undefined}
            className={fieldClass(Boolean(errorFor("phone")))}
            placeholder="0712 345 678"
          />
          {errorFor("phone") && (
            <p id="report-phone-error" role="alert" className="text-sm text-coral">
              {errorFor("phone")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="area" className="text-sm font-semibold text-night">
          Area <span aria-hidden className="text-coral">*</span>
        </label>
        <input
          id="area"
          name="area"
          type="text"
          required
          aria-invalid={Boolean(errorFor("area"))}
          aria-describedby={errorFor("area") ? "report-area-error" : undefined}
          className={fieldClass(Boolean(errorFor("area")))}
          placeholder="e.g. Turtle Bay, Jacaranda, Mida lane…"
        />
        {errorFor("area") && (
          <p id="report-area-error" role="alert" className="text-sm text-coral">
            {errorFor("area")}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="note" className="text-sm font-semibold text-night">
          Details{" "}
          <span className="text-xs font-normal text-night/50">(optional)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          aria-invalid={Boolean(errorFor("note"))}
          aria-describedby={errorFor("note") ? "report-note-error" : "report-note-hint"}
          className={cn(fieldClass(Boolean(errorFor("note"))), "resize-y")}
          placeholder="Since when? Anything the crew should know?"
        />
        {errorFor("note") ? (
          <p id="report-note-error" role="alert" className="text-sm text-coral">
            {errorFor("note")}
          </p>
        ) : (
          <p id="report-note-hint" className="text-xs text-night/50">
            Reports carry a short time window and drop off the board
            automatically — fresh info beats long essays.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-night shadow-[0_10px_30px_rgb(255_107_74/0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-coral-deep hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-5 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="size-5" />
              Send report
            </>
          )}
        </button>
        <p className="text-xs text-night/50">
          Seen by the hub first — confirmed reports appear on the board.
        </p>
      </div>
    </form>
  );
}