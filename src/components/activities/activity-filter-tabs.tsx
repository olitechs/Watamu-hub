import Link from "next/link";
import { areaLabels } from "@/lib/activities";

const allAreas = [
  { value: "", label: "All" },
  { value: "watamu", label: "Watamu" },
  { value: "malindi", label: "Malindi" },
  { value: "marafa", label: "Marafa" },
];

export function ActivityFilterTabs({ current }: { current: string }) {
  const items = allAreas.map((area) => {
    const href = area.value ? `/activities?area=${area.value}` : "/activities";
    const active = current === area.value;
    return (
      <li key={area.value}>
        <Link
          href={href}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active
              ? "bg-night px-4 py-2 text-sm font-semibold text-white"
              : "border border-night/15 bg-white px-4 py-2 text-sm font-medium text-night/80 transition-colors hover:border-lagoon/40 hover:text-night"
          }`}
          aria-current={active ? "page" : undefined}
        >
          {area.label}
        </Link>
      </li>
    );
  });

  return (
    <nav aria-label="Filter by area">
      <ul className="flex flex-wrap gap-2">
        {items}
      </ul>
      <p className="mt-6 text-sm text-night/60" role="status">
        {current ? `${areaLabels[current as keyof typeof areaLabels] || "All"}` : "All areas"}
      </p>
    </nav>
  );
}
