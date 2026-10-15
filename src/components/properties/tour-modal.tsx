"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TourModalProps {
  open: boolean;
  onClose: () => void;
  /** Swap this for a real Matterport / YouTube embed URL when available. */
  embedUrl?: string;
  title: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Keyboard-friendly modal (WCAG APG dialog pattern):
 *  - role="dialog" + aria-modal + labelled by its heading
 *  - focus moves into the dialog on open, is trapped while open,
 *    and returns to the trigger on close
 *  - Escape closes; background scroll is locked
 *
 * Content: a placeholder autoplaying clip until a real Matterport/YouTube
 * URL is dropped into the `embedUrl` prop (then an iframe renders instead).
 */
export function TourModal({ open, onClose, embedUrl, title }: TourModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Remember the element that opened the modal so focus can return to it.
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      return () => {
        triggerRef.current?.focus?.();
      };
    }
  }, [open]);

  // Move focus into the dialog on open.
  useEffect(() => {
    if (!open) return;
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? dialogRef.current)?.focus();
  }, [open]);

  // Escape to close + focus trap + body scroll lock.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4 backdrop-blur-sm"
      onClick={onBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-modal-title"
        tabIndex={-1}
        className="w-full max-w-4xl overflow-hidden rounded-2xl bg-night shadow-2xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 id="tour-modal-title" className="font-heading text-lg font-semibold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close virtual tour"
            className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          {embedUrl ? (
            /* Real tour: drop a Matterport share URL or YouTube embed URL here. */
            <iframe
              src={embedUrl}
              title={`${title} — virtual tour`}
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Placeholder: local loop until a real tour URL exists. */
            <div className="absolute inset-0">
              <video
                className="size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/tour/poster.jpg"
                controls
                aria-label={`${title} — placeholder tour preview`}
              >
                <source src="/videos/watamu-coast-hero.webm" type="video/webm" />
                <source src="/videos/watamu-coast-hero.mp4" type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        <p className="px-5 py-4 text-sm text-white/60">
          Placeholder preview — connect a Matterport or YouTube tour URL in{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5">src/components/properties/virtual-tour.tsx</code>.
        </p>
      </div>
    </div>
  );
}
