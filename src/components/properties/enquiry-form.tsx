"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitEnquiry, type SubmitEnquiryResult } from "@/app/properties/actions";
import {
  enquirySchema,
  normalisedPhone,
  type EnquiryValues,
} from "@/lib/enquiry-schema";
import { enquiryWhatsappMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  properties: { slug: string; title: string; area: string }[];
  /** Preselect a property (e.g. from a detail page). */
  defaultProperty?: string;
}

type FormState = (SubmitEnquiryResult & { values: EnquiryValues }) | null;

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
 * Property enquiry form.
 *
 *  - instant Zod validation on blur/submit (same schema as the server)
 *  - server action inserts into Supabase `property_enquiries`
 *  - success state + "Continue on WhatsApp" link with details prefilled
 *  - accessible: labelled inputs, aria-invalid, role=alert errors,
 *    focus rings, live region for status
 */
export function EnquiryForm({ properties, defaultProperty = "" }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, null);
  // Client-side errors from the shared schema (instant feedback).
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<FormState>(null);

  const result = state as SubmitEnquiryResult | null;

  // Field values for the WhatsApp fallback — read from the last submit.
  const valuesForWhatsApp = submitted?.values;

  function onSubmit() {
    // Mirror server validation instantly; the action still runs authoritative
    // validation either way.
    const fd = new FormData();
    const form = document.getElementById("enquiry-form") as HTMLFormElement | null;
    if (!form) return;
    for (const [k, v] of new FormData(form).entries()) {
      if (typeof v === "string") fd.set(k, v);
    }
    const parsed = enquirySchema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email") ?? "",
      property: fd.get("property") ?? "",
      message: fd.get("message") ?? "",
    });
    const errs: Record<string, string> = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errs[key]) errs[key] = issue.message;
      }
    }
    setClientErrors(errs);
    // Capture values for the WhatsApp fallback.
    setSubmitted({
      ok: false,
      saved: false,
      values: {
        name: String(fd.get("name") ?? ""),
        phone: normalisedPhone(String(fd.get("phone") ?? "")),
        email: String(fd.get("email") ?? ""),
        property: String(fd.get("property") ?? ""),
        message: String(fd.get("message") ?? ""),
      },
    });
  }

  const serverErrors = result?.errors;
  const errorFor = (field: string) => clientErrors[field] ?? serverErrors?.[field]?.[0];

  const savedOk = result?.ok && result.saved;
  const okNoSave = result?.ok && !result.saved;

  if (savedOk || okNoSave) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-mangrove/30 bg-mangrove/8 p-8 text-center"
      >
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-mangrove" />
        <h3 className="mt-4 font-heading text-2xl font-semibold text-night">
          {savedOk ? "Thanks — enquiry sent!" : "Thanks — you're all set!"}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-night/70">
          {savedOk
            ? "An agent will reply on WhatsApp the same day."
            : "We couldn't reach our database just now, but you can still continue on WhatsApp — your details are prefilled."}
        </p>
        {valuesForWhatsApp && (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/254745043121?text=${encodeURIComponent(
                enquiryWhatsappMessage({
                  name: valuesForWhatsApp.name,
                  phone: valuesForWhatsApp.phone,
                  email: valuesForWhatsApp.email,
                  property:
                    properties.find((p) => p.slug === valuesForWhatsApp.property)?.title ??
                    valuesForWhatsApp.property,
                  message: valuesForWhatsApp.message,
                }),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-mangrove px-6 py-3 font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Continue on WhatsApp
            </a>
            <Link
              href="/properties"
              className="rounded-full border border-night/15 px-6 py-3 font-semibold text-night transition-colors hover:bg-night/5"
            >
              Back to properties
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      id="enquiry-form"
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-night/8 bg-white p-6 shadow-[0_8px_30px_rgb(11_42_60/0.06)] sm:p-8"
      aria-describedby="enquiry-intro"
    >
      <p id="enquiry-intro" className="sr-only">
        All fields marked required must be filled in. Your phone number is
        normalised to +254 format.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-night">
            Name <span aria-hidden className="text-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            className={fieldClass(Boolean(errorFor("name")))}
            placeholder="Your full name"
          />
          {errorFor("name") && (
            <p id="name-error" role="alert" className="text-sm text-coral">
              {errorFor("name")}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-night">
            Phone <span aria-hidden className="text-coral">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errorFor("phone"))}
            aria-describedby={errorFor("phone") ? "phone-error" : "phone-hint"}
            className={fieldClass(Boolean(errorFor("phone")))}
            placeholder="0712 345 678"
          />
          <p id="phone-hint" className="text-xs text-night/50">
            Kenyan number — we&apos;ll save it as +254 format.
          </p>
          {errorFor("phone") && (
            <p id="phone-error" role="alert" className="text-sm text-coral">
              {errorFor("phone")}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-night">
            Email <span className="text-xs font-normal text-night/50">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            className={fieldClass(Boolean(errorFor("email")))}
            placeholder="you@example.com"
          />
          {errorFor("email") && (
            <p id="email-error" role="alert" className="text-sm text-coral">
              {errorFor("email")}
            </p>
          )}
        </div>

        {/* Property select */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="property" className="text-sm font-semibold text-night">
            Interested property
          </label>
          <select
            id="property"
            name="property"
            defaultValue={defaultProperty}
            className={cn(inputBase, "border-night/15 focus-visible:border-lagoon")}
          >
            <option value="">Not sure yet — advise me</option>
            {properties.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} — {p.area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-night">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={errorFor("message") ? "message-error" : undefined}
          className={cn(fieldClass(Boolean(errorFor("message"))), "resize-y")}
          placeholder="Tell us what you're looking for, your budget, and when you'd like to view…"
        />
        {errorFor("message") && (
          <p id="message-error" role="alert" className="text-sm text-coral">
            {errorFor("message")}
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
              Send enquiry
            </>
          )}
        </button>
        <p className="text-xs text-night/50">
          We reply on WhatsApp — usually within a few hours.
        </p>
      </div>
    </form>
  );
}
