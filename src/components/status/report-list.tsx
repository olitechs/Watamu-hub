"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets, Flame, Zap } from "lucide-react";
import type { OutageReport, Utility } from "@/lib/status";
import { ageLabel, utilityMeta } from "@/lib/status";
import { cn } from "@/lib/utils";

interface ReportListProps {
  reports: OutageReport[];
}

const utilityIcon: Record<Utility, typeof Droplets> = {
  water: Droplets,
  power: Zap,
  gas: Flame,
  };

/**
 * Live outage report list.
 *
 * SSR renders every (server-side filtered) report with its static seed
 * age, so markup and hydration match exactly. After mount a minute-ticker
 * ages each report against its TTL and drops the ones whose window has
 * passed — the README's "entries expire automatically" behaviour, without
 * a cron job in the demo build.
 */
export function ReportList({ reports }: ReportListProps) {
  const mountRef = useRef<number | null>(null);
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  useEffect(() => {
    mountRef.current = Date.now();
    const started = mountRef.current;

    const tick = () => {
      const extraHours = (Date.now() - started) / 3_600_000;
      const expired = reports
        .filter((r) => r.ageHours + extraHours >= r.ttlHours)
        .map((r) => r.id);
      setHidden(new Set(expired));
    };

    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [reports]);

  const visible = reports.filter((r) => !hidden.has(r.id));

  if (visible.length === 0) {
    return (
      <div className="rounded-2xl border border-mangrove/25 bg-mangrove/8 p-8 text-center">
        <p className="font-heading text-xl font-semibold text-night">
          Nothing on the board
        </p>
        <p className="mt-2 text-night/70">
          No active reports for this filter — old entries fall off the board
          on their own once their window passes.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {visible.map((report) => {
        const Icon = utilityIcon[report.utility];
        const active = report.status === "active";
        return (
          <li
            key={report.id}
            className={cn(
              "flex flex-col rounded-2xl border bg-white p-5 shadow-[0_8px_30px_rgb(11_42_60/0.06)]",
              active ? "border-coral/40" : "border-mangrove/30",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-night">
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-lg",
                    report.utility === "power"
                      ? "bg-sun/20 text-sun"
                      : report.utility === "water"
                        ? "bg-lagoon/15 text-lagoon"
                        : "bg-coral/15 text-coral",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                {utilityMeta[report.utility].label}
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
                  active
                    ? "bg-coral/15 text-coral-deep"
                    : "bg-mangrove/15 text-mangrove",
                )}
              >
                {active ? "Active" : "Restored"}
              </span>
            </div>

            <h3 className="mt-3 font-heading text-lg font-semibold text-night">
              {report.area}
            </h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-night/70">
              {report.note}
            </p>

            <p className="mt-4 text-xs text-night/50">
              Last confirmed {ageLabel(report.ageHours)} · visible for{" "}
              {report.ttlHours}h, then it drops off automatically
            </p>
          </li>
        );
      })}
    </ul>
  );
}