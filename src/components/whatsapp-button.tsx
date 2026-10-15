import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  children?: ReactNode;
  /** Prefilled message; a sensible default is used when omitted. */
  message?: string;
  /** Override the destination number (digits + country code). */
  number?: string;
  className?: string;
  size?: "sm" | "md";
  variant?: "solid" | "outline";
}

/**
 * Reusable WhatsApp click-to-chat button. Plain `<a>` — no JS, no paid API,
 * keyboard accessible for free. Renders a sensible default label when no
 * children are passed.
 */
export function WhatsAppButton({
  children,
  message = "Hello Watamu Hub 👋 I'd like to ask about a property.",
  number,
  className,
  size = "md",
  variant = "solid",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message, number)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2",
        size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm sm:text-base",
        variant === "solid"
          ? "bg-mangrove text-white shadow-[0_8px_24px_rgb(46_158_107/0.35)] hover:bg-mangrove/90"
          : "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
        className,
      )}
    >
      <MessageCircle aria-hidden className={size === "sm" ? "size-4" : "size-5"} />
      {children ?? "Chat on WhatsApp"}
    </a>
  );
}
