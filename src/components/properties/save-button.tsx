"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

/* localStorage as an external store: reads happen via useSyncExternalStore
   (SSR-safe), writes happen in the click handler, and a tiny listener set
   notifies React to re-render — no setState-in-effect. */
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readSaved(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false; // storage blocked — state just won't persist
  }
}

/**
 * Heart/save toggle for property cards. Persisted to localStorage so a
 * shortlist survives navigation; purely client-side (no backend yet).
 */
export function SaveButton({ propertyId, title }: { propertyId: string; title: string }) {
  const storageKey = `wh:saved:${propertyId}`;

  const saved = useSyncExternalStore(
    subscribe,
    () => readSaved(storageKey),
    () => false,
  );

  const toggle = () => {
    try {
      if (saved) {
        window.localStorage.removeItem(storageKey);
      } else {
        window.localStorage.setItem(storageKey, "1");
      }
    } catch {
      /* storage blocked — still flip the visual state */
    }
    for (const listener of listeners) listener();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-night/30 backdrop-blur transition-colors duration-200 hover:bg-night/50",
        saved && "border-coral/60 bg-coral/20",
      )}
    >
      <Heart
        aria-hidden
        className={cn("size-4.5 text-white", saved && "fill-coral text-coral")}
      />
    </button>
  );
}
