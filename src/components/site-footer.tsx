import Link from "next/link";

// Static year: `new Date()` is not allowed during prerender (Cache Components).
const YEAR = 2026;

/**
 * Site footer: contact details, quick links, socials and the short
 * licence/legal line. Server component — no interactivity needed.
 */
export function SiteFooter() {
  return (
    <footer className="bg-night text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-lg font-semibold text-white">
              Watamu<span className="text-sun">Hub</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              A boutique coastal agency for villas, beachfront homes and land in
              Watamu, Kilifi County.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <a
                  className="hover:text-white hover:underline hover:underline-offset-4"
                  href="https://wa.me/254745043121"
                >
                  WhatsApp: +254 745 043 121
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white hover:underline hover:underline-offset-4"
                  href="mailto:hello@watamuhub.co.ke"
                >
                  hello@watamuhub.co.ke
                </a>
              </li>
              <li className="text-white/60">Watamu town, Kilifi County, Kenya</li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Explore</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/properties">
                  Properties
                </Link>
              </li>
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/activities">
                  Activities
                </Link>
              </li>
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/properties#enquire">
                  Book a viewing
                </Link>
              </li>
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/villas">
                  Villa Sync
                </Link>
              </li>
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/status">
                  Status Board
                </Link>
              </li>
              <li>
                <Link className="text-white/70 hover:text-white hover:underline hover:underline-offset-4" href="/transport">
                  Transport Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Follow</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  className="text-white/70 hover:text-white hover:underline hover:underline-offset-4"
                  href="https://www.instagram.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-white hover:underline hover:underline-offset-4"
                  href="https://www.facebook.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="text-white/70 hover:text-white hover:underline hover:underline-offset-4"
                  href="https://www.linkedin.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50">
          <p>
            © {YEAR} Watamu Hub. Property listings are illustrative demo
            content. Estate agency operations in Kenya are subject to the Estate Agents Act
            (Cap. 533); verification and licence details are provided on request.
          </p>
        </div>
      </div>
    </footer>
  );
}
