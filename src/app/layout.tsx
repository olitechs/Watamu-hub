import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://watamuhub.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Watamu Hub — villas, beach homes & land in Watamu, Kenya",
    template: "%s · Watamu Hub",
  },
  description:
    "Verified villas, beachfront homes and land plots in Watamu, Kenya. Local agents, secure viewings and honest advice from a boutique coastal agency.",
  openGraph: {
    type: "website",
    siteName: "Watamu Hub",
    locale: "en_KE",
    images: [
      {
        url: "/images/hero-poster.jpg",
        width: 1600,
        height: 900,
        alt: "Turquoise water on the Watamu coastline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded bg-lagoon px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
