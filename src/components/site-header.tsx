"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp-button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/activities", label: "Activities" },
  { href: "/villas", label: "Villas" },
];

/**
 * Sticky site header. Transparent over the video hero, then turns into a
 * frosted sand bar once the user scrolls past ~80px. Mobile menu closes on
 * link tap and on Escape.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const overHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-night/10 bg-sand/85 shadow-[0_1px_0_rgb(255_255_255/0.6)_inset] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className={cn(
            "font-heading text-lg font-semibold tracking-tight transition-colors",
            overHero ? "text-white drop-shadow" : "text-night",
          )}
        >
          Watamu<span className="text-lagoon">Hub</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:underline hover:underline-offset-4",
                overHero ? "text-white/90 hover:text-white" : "text-night/80 hover:text-night",
                pathname === link.href && (overHero ? "text-white" : "text-night"),
                pathname === link.href &&
                  "underline decoration-coral decoration-2 underline-offset-4",
              )}
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton
            size="sm"
            className={cn(overHero && "border-white/40 bg-white/15 text-white backdrop-blur")}
          >
            Chat with an agent
          </WhatsAppButton>
        </nav>

        <button
          type="button"
          className={cn(
            "rounded-md p-2 md:hidden",
            overHero ? "text-white" : "text-night",
          )}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          {menuOpen ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-night/10 bg-sand/95 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-base font-medium text-night hover:bg-lagoon/10",
                  pathname === link.href && "bg-lagoon/10 text-lagoon",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 px-3">
              <WhatsAppButton size="sm" className="w-full">
                Chat with an agent
              </WhatsAppButton>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
